import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CertificateRecord, ProgressState, Role } from "./types";
import { MODULES } from "./modules";
import { issueCertificate } from "./certificate";

const emptyModules = () =>
  Object.fromEntries(
    MODULES.map((m) => [
      m.id,
      {
        lessonDone: false,
        interactionScore: 0,
        interactionMax: 0,
        quizScore: 0,
        quizMax: 0,
        completed: false,
      },
    ]),
  );

const initial: ProgressState = {
  name: "",
  role: null,
  plainLanguage: false,
  pretest: null,
  modules: {},
  sim: { completed: false, scores: null },
  certificate: null,
  startedAt: null,
};

interface Store extends ProgressState {
  hydrateModules: () => void;
  setProfile: (name: string, role: Role) => void;
  setPlain: (v: boolean) => void;
  setPretest: (attempted: number, correct: number) => void;
  markLesson: (moduleId: string) => void;
  markInteraction: (moduleId: string, score: number, max: number) => void;
  markQuiz: (moduleId: string, score: number, max: number) => void;
  completeModule: (moduleId: string) => void;
  completeSim: (scores: NonNullable<ProgressState["sim"]["scores"]>) => void;
  issueIfEligible: () => CertificateRecord | null;
  reset: () => void;
}

function simTotal(scores: NonNullable<ProgressState["sim"]["scores"]>) {
  return (
    scores.classification +
    scores.disposal +
    scores.safety +
    scores.routing +
    scores.documentation +
    scores.evidence
  );
}

export const useProgress = create<Store>()(
  persist(
    (set, get) => ({
      ...initial,
      modules: emptyModules(),
      hydrateModules: () => {
        const current = get().modules;
        const next = emptyModules();
        for (const id of Object.keys(next)) {
          if (current[id]) next[id] = current[id];
        }
        set({ modules: next });
      },
      setProfile: (name, role) =>
        set({
          name,
          role,
          startedAt: get().startedAt ?? new Date().toISOString(),
        }),
      setPlain: (v) => set({ plainLanguage: v }),
      setPretest: (attempted, correct) => set({ pretest: { attempted, correct } }),
      markLesson: (moduleId) =>
        set((s) => ({
          modules: {
            ...s.modules,
            [moduleId]: { ...(s.modules[moduleId] ?? emptyModules()[moduleId]), lessonDone: true },
          },
        })),
      markInteraction: (moduleId, score, max) =>
        set((s) => ({
          modules: {
            ...s.modules,
            [moduleId]: {
              ...(s.modules[moduleId] ?? emptyModules()[moduleId]),
              interactionScore: score,
              interactionMax: max,
            },
          },
        })),
      markQuiz: (moduleId, score, max) =>
        set((s) => ({
          modules: {
            ...s.modules,
            [moduleId]: {
              ...(s.modules[moduleId] ?? emptyModules()[moduleId]),
              quizScore: score,
              quizMax: max,
            },
          },
        })),
      completeModule: (moduleId) =>
        set((s) => ({
          modules: {
            ...s.modules,
            [moduleId]: { ...s.modules[moduleId], completed: true, lessonDone: true },
          },
        })),
      completeSim: (scores) => {
        set({ sim: { completed: true, scores } });
        get().issueIfEligible();
      },
      issueIfEligible: () => {
        const s = get();
        const modulesDone = MODULES.every((m) => s.modules[m.id]?.completed);
        const total = s.sim.scores ? simTotal(s.sim.scores) : 0;
        if (!modulesDone || !s.sim.completed || total < 80 || !s.name || !s.role) return s.certificate;
        if (s.certificate) return s.certificate;
        const cert = issueCertificate({
          name: s.name,
          role: s.role,
          simScore: total,
          moduleAvg: averageModule(s),
        });
        set({ certificate: cert });
        return cert;
      },
      reset: () => set({ ...initial, modules: emptyModules() }),
    }),
    { name: "streets-academy-wr101" },
  ),
);

export function averageModule(s: ProgressState) {
  const vals = MODULES.map((m) => {
    const row = s.modules[m.id];
    if (!row || row.quizMax === 0) return 0;
    return row.quizScore / row.quizMax;
  });
  return Math.round((vals.reduce((a, b) => a + b, 0) / vals.length) * 100);
}

export function moduleProgress(s: ProgressState) {
  const done = MODULES.filter((m) => s.modules[m.id]?.completed).length;
  return { done, total: MODULES.length, pct: Math.round((done / MODULES.length) * 100) };
}

export function overallScore(s: ProgressState) {
  const quiz = averageModule(s);
  const sim = s.sim.scores ? simTotal(s.sim.scores) : 0;
  const pre = s.pretest ? Math.round((s.pretest.correct / s.pretest.attempted) * 100) : 0;
  return { quiz, sim, pre };
}

export { ROLE_LABEL } from "./labels";
