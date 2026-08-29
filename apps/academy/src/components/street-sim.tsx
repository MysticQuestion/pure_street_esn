import type { ReactNode } from "react";
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BlockScene } from "./block-scene";
import { SIM_CONDITIONS, SIM_META, SIM_WEIGHTS } from "@/lib/academy/sim-98th";
import { PATHWAY_LABEL, STREAM_LABEL } from "@/lib/academy/labels";
import type { Pathway, Stream } from "@/lib/academy/types";
import { useProgress } from "@/lib/academy/progress";
import { cn } from "@/lib/utils";

type StreamChoice = Stream | "none";

const CLASS_OPTIONS = [
  "overflow / service-capacity",
  "extra recycling set-out (may be legitimate)",
  "bulky item in public right-of-way",
  "abandoned e-waste",
  "contamination (compost)",
  "scattered organics / litter",
  "accessibility obstruction",
  "C&D / possible dumping",
  "normal set-out (not a defect)",
  "scattered litter",
];

export function StreetSim() {
  const completeSim = useProgress((s) => s.completeSim);
  const [active, setActive] = useState<string | null>(SIM_CONDITIONS[0]?.id ?? null);
  const [classPick, setClassPick] = useState<Record<string, string>>({});
  const [streamPick, setStreamPick] = useState<Record<string, StreamChoice>>({});
  const [hazardPick, setHazardPick] = useState<Record<string, boolean>>({});
  const [pathPick, setPathPick] = useState<Record<string, Pathway>>({});
  const [factPick, setFactPick] = useState<Record<string, string[]>>({});
  const [submitted, setSubmitted] = useState(false);
  const [scores, setScores] = useState<null | {
    classification: number;
    disposal: number;
    safety: number;
    routing: number;
    documentation: number;
    evidence: number;
  }>(null);

  const cond = SIM_CONDITIONS.find((c) => c.id === active) ?? SIM_CONDITIONS[0];
  const doneCount = SIM_CONDITIONS.filter(
    (c) => classPick[c.id] && streamPick[c.id] && pathPick[c.id] && factPick[c.id]?.length && hazardPick[c.id] !== undefined,
  ).length;

  const result = useMemo(() => {
    if (!submitted || !scores) return null;
    const total = Object.values(scores).reduce((a, b) => a + b, 0);
    return { total, pass: total >= 80 };
  }, [submitted, scores]);

  function toggleFact(id: string, line: string) {
    setFactPick((p) => {
      const cur = p[id] ?? [];
      return { ...p, [id]: cur.includes(line) ? cur.filter((x) => x !== line) : [...cur, line] };
    });
  }

  function grade() {
    let classification = 0;
    let disposal = 0;
    let safety = 0;
    let routing = 0;
    let documentation = 0;
    let evidence = 0;
    const n = SIM_CONDITIONS.length;
    for (const c of SIM_CONDITIONS) {
      if (classPick[c.id] === c.classify) classification += 1;
      if (streamPick[c.id] === c.stream) disposal += 1;
      if (hazardPick[c.id] === c.hazard) safety += 1;
      if (pathPick[c.id] === c.pathway) routing += 1;
      const facts = new Set(c.facts);
      const chosen = factPick[c.id] ?? [];
      const truePos = chosen.filter((x) => facts.has(x)).length;
      const falsePos = chosen.filter((x) => !facts.has(x)).length;
      if (truePos === c.facts.length && falsePos === 0) {
        documentation += 1;
        evidence += 1;
      } else if (truePos > 0 && falsePos === 0) {
        documentation += 0.5;
        evidence += 0.5;
      } else if (truePos > 0 && falsePos > 0) {
        documentation += 0.25;
      }
    }
    const scored = {
      classification: Math.round((classification / n) * SIM_WEIGHTS.classification),
      disposal: Math.round((disposal / n) * SIM_WEIGHTS.disposal),
      safety: Math.round((safety / n) * SIM_WEIGHTS.safety),
      routing: Math.round((routing / n) * SIM_WEIGHTS.routing),
      documentation: Math.round((documentation / n) * SIM_WEIGHTS.documentation),
      evidence: Math.round((evidence / n) * SIM_WEIGHTS.evidence),
    };
    setScores(scored);
    setSubmitted(true);
    completeSim(scored);
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
      <p className="eyebrow">Final field simulation</p>
      <h1 className="mt-2 font-display text-3xl font-semibold tracking-tight">{SIM_META.title}</h1>
      <p className="mt-1 font-mono text-xs tracking-wider text-muted-foreground">WR-98 · {SIM_META.location}</p>
      <p className="mt-4 max-w-2xl text-[0.975rem] leading-relaxed text-asphalt-soft">{SIM_META.intro}</p>

      <div className="mt-6">
        <BlockScene label="98th Avenue · simulated block · not a live camera">
          {SIM_CONDITIONS.map((c, idx) => (
            <button
              key={c.id}
              type="button"
              onClick={() => setActive(c.id)}
              style={{ left: `${c.x}%`, top: `${c.y}%` }}
              className={cn(
                "absolute z-20 flex size-8 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full text-xs font-bold",
                active === c.id ? "bg-accent text-accent-foreground" : "bg-primary text-primary-foreground",
                classPick[c.id] && streamPick[c.id] && pathPick[c.id] && "ring-2 ring-success",
              )}
              aria-label={c.label}
            >
              {idx + 1}
            </button>
          ))}
        </BlockScene>
      </div>

      {cond && !submitted && (
        <article className="mt-6 overflow-hidden rounded-lg bg-card shadow-card">
          <header className="flex flex-wrap items-center justify-between gap-2 border-b border-border bg-muted/60 px-4 py-2.5 sm:px-5">
            <span className="record-id">WR-98-{String(SIM_CONDITIONS.findIndex((c) => c.id === cond.id) + 1).padStart(3, "0")}</span>
            <span className="flex items-center gap-3">
              <span className="text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-caltrans">
                East Oakland
              </span>
              <Badge>{doneCount}/10 logged</Badge>
            </span>
          </header>
          <div className="p-5 sm:p-6">
            <h2 className="font-display text-lg font-semibold">{cond.label}</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <Field label="Classify the condition">
                <select
                  className="h-11 w-full rounded-md border border-input bg-background px-3 text-sm"
                  value={classPick[cond.id] ?? ""}
                  onChange={(e) => setClassPick((p) => ({ ...p, [cond.id]: e.target.value }))}
                >
                  <option value="">Select classification</option>
                  {CLASS_OPTIONS.map((o) => (
                    <option key={o} value={o}>
                      {o}
                    </option>
                  ))}
                </select>
              </Field>
              <Field label="Waste stream (or none)">
                <select
                  className="h-11 w-full rounded-md border border-input bg-background px-3 text-sm"
                  value={streamPick[cond.id] ?? ""}
                  onChange={(e) => setStreamPick((p) => ({ ...p, [cond.id]: e.target.value as StreamChoice }))}
                >
                  <option value="">Select stream</option>
                  <option value="none">None / not a disposal item</option>
                  {(Object.keys(STREAM_LABEL) as Stream[]).map((s) => (
                    <option key={s} value={s}>
                      {STREAM_LABEL[s]}
                    </option>
                  ))}
                </select>
              </Field>
              <Field label="Hazard requiring distance?">
                <div className="flex gap-2">
                  <button
                    type="button"
                    className={cn(
                      "h-11 flex-1 rounded-md border text-sm",
                      hazardPick[cond.id] === true ? "border-critical bg-critical/10" : "border-border",
                    )}
                    onClick={() => setHazardPick((p) => ({ ...p, [cond.id]: true }))}
                  >
                    Yes — keep distance
                  </button>
                  <button
                    type="button"
                    className={cn(
                      "h-11 flex-1 rounded-md border text-sm",
                      hazardPick[cond.id] === false ? "border-primary bg-primary/10" : "border-border",
                    )}
                    onClick={() => setHazardPick((p) => ({ ...p, [cond.id]: false }))}
                  >
                    No immediate handling hazard
                  </button>
                </div>
              </Field>
              <Field label="First service pathway">
                <select
                  className="h-11 w-full rounded-md border border-input bg-background px-3 text-sm"
                  value={pathPick[cond.id] ?? ""}
                  onChange={(e) => setPathPick((p) => ({ ...p, [cond.id]: e.target.value as Pathway }))}
                >
                  <option value="">Select pathway</option>
                  {(Object.keys(PATHWAY_LABEL) as Pathway[]).map((p) => (
                    <option key={p} value={p}>
                      {PATHWAY_LABEL[p]}
                    </option>
                  ))}
                </select>
              </Field>
            </div>
            <Field label="Check only verified facts — leave inferences unchecked">
              <ul className="mt-2 space-y-2">
                {[...cond.facts, ...cond.inferences].map((line) => (
                  <li key={line}>
                    <label className="flex items-start gap-2 text-sm">
                      <input
                        type="checkbox"
                        className="mt-1 size-4"
                        checked={(factPick[cond.id] ?? []).includes(line)}
                        onChange={() => toggleFact(cond.id, line)}
                      />
                      <span>{line}</span>
                    </label>
                  </li>
                ))}
              </ul>
            </Field>
            <div className="mt-4 flex flex-wrap gap-2">
              {SIM_CONDITIONS.map((c, idx) => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => setActive(c.id)}
                  className={cn(
                    "size-9 rounded-md text-xs font-semibold",
                    active === c.id ? "bg-primary text-primary-foreground" : "bg-muted",
                  )}
                >
                  {idx + 1}
                </button>
              ))}
            </div>
            <Button className="mt-6" disabled={doneCount < 10} onClick={grade}>
              Score the 98th Avenue record
            </Button>
          </div>
        </article>
      )}

      {submitted && scores && result && (
        <div className="mt-6 rounded-lg bg-card p-6 shadow-card">
          <Badge variant={result.pass ? "success" : "critical"}>
            {result.pass ? "Pass" : "Below 80 — review and retry"}
          </Badge>
          <p className="mt-3 font-display text-4xl font-semibold tabular-nums">{result.total}/100</p>
          <ul className="mt-4 grid gap-2 sm:grid-cols-2">
            {Object.entries(SIM_WEIGHTS).map(([k, max]) => (
              <li key={k} className="flex justify-between rounded-md bg-muted px-3 py-2 text-sm">
                <span className="capitalize">{k}</span>
                <span className="tabular-nums">
                  {scores[k as keyof typeof scores]}/{max}
                </span>
              </li>
            ))}
          </ul>
          <div className="mt-6 flex flex-wrap gap-2">
            {result.pass ? (
              <Button asChild>
                <Link to="/academy/certificate">View certificate</Link>
              </Button>
            ) : (
              <Button onClick={() => window.location.reload()}>Retry simulation</Button>
            )}
            <Button asChild variant="outline">
              <Link to="/academy/course">Course map</Link>
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="block text-sm font-medium">
      {label}
      <div className="mt-1.5 font-normal">{children}</div>
    </label>
  );
}
