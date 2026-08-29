export type Role =
  | "resident"
  | "employee"
  | "owner"
  | "property"
  | "trainee";

export type Stream = "recycle" | "compost" | "trash" | "special";

export type Pathway =
  | "wm"
  | "cws"
  | "oak311"
  | "stopwaste"
  | "property"
  | "other";

export type Severity = 0 | 1 | 2 | 3;

export interface SortItem {
  id: string;
  name: string;
  alt: string;
  stream: Stream;
  hint: string;
  why: Record<Stream, string>;
  icon: "can" | "bottle" | "paper" | "food" | "bag" | "battery" | "wood" | "foam" | "glass" | "device" | "textile" | "bulb" | "paint" | "tangler" | "carton" | "cup";
}

export interface Question {
  id: string;
  prompt: string;
  plain?: string;
  options: { id: string; label: string }[];
  correct: string;
  explain: string;
}

export interface Governance {
  jurisdiction: string;
  source: string;
  sourceUrl: string;
  effectiveDate: string;
  lastReviewed: string;
  reviewedBy: string;
  courseVersion: string;
}

export type InteractionKind =
  | "sort"
  | "trace"
  | "scene"
  | "route"
  | "field"
  | "coffee"
  | "redflag"
  | "levels"
  | "prevent"
  | "ej"
  | "protocol";

export interface LessonBlock {
  kind: "p" | "callout" | "list" | "rule" | "quote";
  title?: string;
  text?: string;
  plain?: string;
  items?: string[];
  tone?: "info" | "warn" | "success" | "critical";
}

export interface ModuleDef {
  id: string;
  number: number;
  title: string;
  essentialQuestion: string;
  durationMin: number;
  objectives: string[];
  lesson: LessonBlock[];
  interaction: {
    kind: InteractionKind;
    title: string;
    intro: string;
    itemIds?: string[];
    caseIds?: string[];
  };
  quiz: Question[];
  roleNotes?: Partial<Record<Role, LessonBlock[]>>;
  governance: Governance;
}

export interface IncidentCase {
  id: string;
  title: string;
  neighborhood: string;
  location: string;
  body: string;
  options: { id: Pathway; label: string }[];
  correct: Pathway;
  explain: string;
  known: string[];
  unknown: string[];
}

export interface SceneHotspot {
  id: string;
  label: string;
  x: number;
  y: number;
  issue:
    | "contamination"
    | "overflow"
    | "dumping"
    | "unsafe"
    | "hazard"
    | "access"
    | "capacity"
    | "ok";
  explain: string;
}

export interface SimCondition {
  id: string;
  label: string;
  x: number;
  y: number;
  stream: Stream | "none";
  hazard: boolean;
  pathway: Pathway;
  severity: Severity;
  facts: string[];
  inferences: string[];
  classify: string;
}

export interface CertificateRecord {
  id: string;
  token: string;
  name: string;
  role: Role;
  score: number;
  simScore: number;
  issued: string;
  competencies: string[];
  validUntil: string;
}

export interface ProgressState {
  name: string;
  role: Role | null;
  plainLanguage: boolean;
  pretest: { attempted: number; correct: number } | null;
  modules: Record<
    string,
    {
      lessonDone: boolean;
      interactionScore: number;
      interactionMax: number;
      quizScore: number;
      quizMax: number;
      completed: boolean;
    }
  >;
  sim: {
    completed: boolean;
    scores: {
      classification: number;
      disposal: number;
      safety: number;
      routing: number;
      documentation: number;
      evidence: number;
    } | null;
  };
  certificate: CertificateRecord | null;
  startedAt: string | null;
}
