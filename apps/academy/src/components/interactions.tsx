import { SortStation } from "./sort-station";
import { CaseChrome } from "./case-chrome";
import { BlockScene } from "./block-scene";
import { useMemo, useState } from "react";
import { AlertTriangle, Check, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CASES, CASE_MAP, DUMPSTER_SCENE, SOFA_RECORD } from "@/lib/academy/scenarios";
import { ITEM_MAP } from "@/lib/academy/sort-items";
import { PATHWAY_LABEL, STREAM_LABEL } from "@/lib/academy/labels";
import type { Pathway, Stream } from "@/lib/academy/types";
import { cn } from "@/lib/utils";

export function TracePathway({ onComplete }: { onComplete: (score: number, max: number) => void }) {
  const objects = [
    {
      id: "alum-can",
      wrong: "trash" as Stream,
      wrongNote: "A can in trash is recoverable metal lost to landfill. The MRF never sees it.",
      rightNote: "Empty can → residential recycling cart → CWS collection → MRF → metal commodity.",
    },
    {
      id: "banana",
      wrong: "recycle" as Stream,
      wrongNote: "A peel in recycling is food contamination. It can spoil a paper bale.",
      rightNote: "Peel → compost cart → WM collection → organics processing → soil amendment, not methane in a landfill cell.",
    },
    {
      id: "plastic-bag",
      wrong: "recycle" as Stream,
      wrongNote: "Film wraps around sorting screens. Crews shut lines down to cut it off. The bagged bottles inside may be landfilled too.",
      rightNote: "Film is residual in Oakland curbside. Trash, or a retailer take-back if you have one. Never the recycling cart.",
    },
    {
      id: "battery",
      wrong: "trash" as Stream,
      wrongNote: "Lithium in a packer truck or MRF is a fire pathway. That is not a theoretical risk.",
      rightNote: "Battery → CWS/HHW authorized collection. Never a cart.",
    },
  ];
  const [i, setI] = useState(0);
  const [picked, setPicked] = useState<Stream | null>(null);
  const [score, setScore] = useState(0);
  const cur = objects[i];
  const item = ITEM_MAP[cur.id];

  function pick(s: Stream) {
    if (picked) return;
    setPicked(s);
    if (s === item.stream) setScore((n) => n + 1);
  }

  function next() {
    if (i + 1 >= objects.length) {
      onComplete(score, objects.length);
      return;
    }
    setPicked(null);
    setI((n) => n + 1);
  }

  const finished = i === objects.length - 1 && picked !== null;

  return (
    <div className="rounded-lg bg-card p-5 shadow-card">
      <p className="eyebrow">Trace the object</p>
      <h3 className="mt-1 font-display text-xl font-semibold">{item.name}</h3>
      <p className="mt-1 text-sm text-muted-foreground">
        {i + 1} of {objects.length}. Choose the first sort. Then see how a wrong sort changes the pathway.
      </p>
      <div className="mt-4 grid gap-2 sm:grid-cols-4">
        {(["recycle", "compost", "trash", "special"] as Stream[]).map((s) => (
          <button
            key={s}
            type="button"
            disabled={!!picked}
            onClick={() => pick(s)}
            className={cn(
              "min-h-14 rounded-md border border-border px-3 py-2 text-sm font-medium hover:bg-muted",
              picked === s && s === item.stream && "border-success bg-success/10",
              picked === s && s !== item.stream && "border-critical bg-critical/10",
              picked && s === item.stream && "border-success",
            )}
          >
            {STREAM_LABEL[s]}
          </button>
        ))}
      </div>
      {picked && (
        <div className="mt-4 space-y-3 text-sm leading-relaxed">
          {picked !== item.stream && (
            <p className="rounded-md bg-critical/10 p-3 text-asphalt">{cur.wrongNote}</p>
          )}
          <p className="rounded-md bg-success/10 p-3 text-asphalt">{cur.rightNote}</p>
          <Button onClick={next}>{finished ? "Finish trace" : "Next object"}</Button>
        </div>
      )}
    </div>
  );
}

const COFFEE = [
  { id: "grounds", name: "Coffee grounds" },
  { id: "napkin", name: "Paper napkin" },
  { id: "pla-cup", name: "PLA cup labeled compostable" },
  { id: "chopsticks", name: "Wood stirrer" },
  { id: "utensils", name: "Plastic lid" },
  { id: "cardboard", name: "Cardboard sleeve (clean)" },
  { id: "milk-carton", name: "Milk carton" },
];

export function CoffeeShop({ onComplete }: { onComplete: (score: number, max: number) => void }) {
  const [picks, setPicks] = useState<Record<string, Stream>>({});
  const [submitted, setSubmitted] = useState(false);
  const allIn = COFFEE.every((c) => picks[c.id]);

  function submit() {
    const score = COFFEE.filter((c) => ITEM_MAP[c.id].stream === picks[c.id]).length;
    setSubmitted(true);
    onComplete(score, COFFEE.length);
  }

  return (
    <div className="rounded-lg bg-card p-5 shadow-card">
      <p className="eyebrow">The coffee shop test</p>
      <h3 className="mt-1 font-display text-xl font-semibold">Sort the entire order</h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Oakland compost is not “anything biodegradable.” A compostable label is not local acceptance.
      </p>
      <ul className="mt-4 space-y-3">
        {COFFEE.map((c) => {
          const item = ITEM_MAP[c.id];
          const pick = picks[c.id];
          const right = submitted && pick === item.stream;
          const wrong = submitted && pick !== item.stream;
          return (
            <li key={c.id} className="rounded-md border border-border p-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="font-medium">{c.name}</p>
                {submitted && <Badge variant={right ? "success" : "critical"}>{STREAM_LABEL[item.stream]}</Badge>}
              </div>
              <div className="mt-2 flex flex-wrap gap-2">
                {(["recycle", "compost", "trash", "special"] as Stream[]).map((s) => (
                  <button
                    key={s}
                    type="button"
                    disabled={submitted}
                    onClick={() => setPicks((p) => ({ ...p, [c.id]: s }))}
                    className={cn(
                      "rounded-full border px-3 py-1.5 text-xs font-medium",
                      pick === s ? "border-primary bg-primary text-primary-foreground" : "border-border hover:bg-muted",
                    )}
                  >
                    {STREAM_LABEL[s]}
                  </button>
                ))}
              </div>
              {wrong && <p className="mt-2 text-sm text-asphalt-soft">{item.why[pick]}</p>}
              {right && <p className="mt-2 text-sm text-asphalt-soft">{item.why[item.stream]}</p>}
            </li>
          );
        })}
      </ul>
      {!submitted && (
        <Button className="mt-4" disabled={!allIn} onClick={submit}>
          Check the order
        </Button>
      )}
    </div>
  );
}

const FLAGS = [
  { id: "tv", label: "Abandoned television", escalate: true, why: "E-waste. Do not handle. 311 if on public ROW; HHW for lawful household drop-off." },
  { id: "can", label: "Empty aluminum can in gutter", escalate: false, why: "Ordinary recyclable litter. Not a hazardous escalation." },
  { id: "paint", label: "Open paint cans", escalate: true, why: "HHW. Distance. Do not open further. 311 if abandoned." },
  { id: "bag", label: "Tied bag of bottles", escalate: false, why: "Contamination if it were in recycling — still not a chemical hazard." },
  { id: "batt", label: "Loose lithium cells", escalate: true, why: "Fire risk. Do not put in a cart. Do not pocket them." },
  { id: "needles", label: "Uncapped syringes", escalate: true, why: "Sharps. Distance. 311 / needle response. Not your hands." },
  { id: "leaves", label: "Pile of leaves on a lawn strip", escalate: false, why: "Plant debris — compost pathway, not a red flag." },
  { id: "propane", label: "Small propane cylinder", escalate: true, why: "Pressurized. HHW for small cylinders. Never a cart, never a dumpster." },
];

export function RedFlag({ onComplete }: { onComplete: (score: number, max: number) => void }) {
  const [marked, setMarked] = useState<Record<string, boolean>>({});
  const [submitted, setSubmitted] = useState(false);

  function submit() {
    const score = FLAGS.filter((f) => !!marked[f.id] === f.escalate).length;
    setSubmitted(true);
    onComplete(score, FLAGS.length);
  }

  return (
    <div className="rounded-lg bg-card p-5 shadow-card">
      <p className="eyebrow">Red flag</p>
      <h3 className="mt-1 font-display text-xl font-semibold">Which objects require escalation?</h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Toggle every item that should not be handled or carted. STREETS rule: observe → document → distance → refer.
      </p>
      <ul className="mt-4 grid gap-2 sm:grid-cols-2">
        {FLAGS.map((f) => {
          const on = !!marked[f.id];
          const ok = submitted && on === f.escalate;
          const bad = submitted && on !== f.escalate;
          return (
            <li key={f.id}>
              <button
                type="button"
                disabled={submitted}
                onClick={() => setMarked((m) => ({ ...m, [f.id]: !m[f.id] }))}
                className={cn(
                  "flex min-h-16 w-full items-start gap-3 rounded-md border px-3 py-3 text-left",
                  on ? "border-critical bg-critical/10" : "border-border hover:bg-muted",
                  ok && "border-success bg-success/10",
                  bad && "border-critical",
                )}
              >
                <AlertTriangle className={cn("mt-0.5 size-4 shrink-0", on ? "text-critical" : "text-muted-foreground")} />
                <span>
                  <span className="block text-sm font-medium">{f.label}</span>
                  {submitted && <span className="mt-1 block text-xs text-asphalt-soft">{f.why}</span>}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
      {!submitted && (
        <Button className="mt-4" onClick={submit}>
          Check red flags
        </Button>
      )}
    </div>
  );
}

const LOADS = [
  { id: "l0", level: 0, label: "Closed recycling cart, visible contents all bottles and cardboard", contaminant: "None obvious" },
  { id: "l1", level: 1, label: "Recycling cart with one plastic bag of cans among loose bottles", contaminant: "Bagged recyclables" },
  { id: "l2", level: 2, label: "Compost cart with several PLA cups, a plastic bag, and food scraps", contaminant: "Repeated compostable-plastic + film" },
  { id: "l3", level: 3, label: "Recycling cart dominated by diapers, food, and tangled hose", contaminant: "Load compromised" },
];

export function ContaminationLevels({ onComplete }: { onComplete: (score: number, max: number) => void }) {
  const [picks, setPicks] = useState<Record<string, number>>({});
  const [submitted, setSubmitted] = useState(false);
  function submit() {
    const score = LOADS.filter((l) => picks[l.id] === l.level).length;
    setSubmitted(true);
    onComplete(score, LOADS.length);
  }
  return (
    <div className="rounded-lg bg-card p-5 shadow-card">
      <p className="eyebrow">Field classification</p>
      <h3 className="mt-1 font-display text-xl font-semibold">Assign a STREETS level</h3>
      <p className="mt-1 text-sm text-muted-foreground">
        0 clean · 1 minor · 2 moderate · 3 severe. These are field observations, not hauler determinations.
      </p>
      <ul className="mt-4 space-y-3">
        {LOADS.map((l) => (
          <li key={l.id} className="rounded-md border border-border p-3">
            <p className="text-sm">{l.label}</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {[0, 1, 2, 3].map((n) => (
                <button
                  key={n}
                  type="button"
                  disabled={submitted}
                  onClick={() => setPicks((p) => ({ ...p, [l.id]: n }))}
                  className={cn(
                    "min-w-12 rounded-full border px-3 py-1.5 text-xs font-medium",
                    picks[l.id] === n ? "border-primary bg-primary text-primary-foreground" : "border-border",
                    submitted && n === l.level && "border-success bg-success text-success-foreground",
                  )}
                >
                  L{n}
                </button>
              ))}
            </div>
            {submitted && (
              <p className="mt-2 text-xs text-muted-foreground">
                Target L{l.level}. {l.contaminant}.
              </p>
            )}
          </li>
        ))}
      </ul>
      {!submitted && (
        <Button className="mt-4" disabled={LOADS.some((l) => picks[l.id] === undefined)} onClick={submit}>
          Check levels
        </Button>
      )}
    </div>
  );
}

const MOVE = [
  { id: "sofa", name: "Usable sofa", options: ["Donate / reuse", "WM bulky appointment", "Leave on sidewalk tonight", "Recycling cart"], correct: "Donate / reuse", note: "Preserve utility first. If it must leave, schedule bulky — never a surprise curb pile." },
  { id: "clothes", name: "Wearable clothes", options: ["Donate / reuse", "Recycling cart", "Compost", "HHW"], correct: "Donate / reuse", note: "Textiles are not Oakland curbside recycling." },
  { id: "pizza", name: "Greasy pizza boxes", options: ["Recycling", "Compost", "Trash", "HHW"], correct: "Compost", note: "Food-soiled paper is compost." },
  { id: "paint", name: "Half-full paint cans", options: ["Trash", "Recycling", "HHW drop-off", "Sidewalk"], correct: "HHW drop-off", note: "2100 East 7th Street or 1-800-606-6606." },
  { id: "food", name: "Unopened canned food", options: ["Trash", "Donate", "Recycling unopened", "Compost unopened"], correct: "Donate", note: "Edible food should feed people. Empty cans recycle later." },
  { id: "broken", name: "Broken ceramic mug", options: ["Recycling (glass)", "Trash", "Compost", "HHW"], correct: "Trash", note: "Ceramics are not bottle-and-jar glass." },
];

export function PreventChallenge({ onComplete }: { onComplete: (score: number, max: number) => void }) {
  const [picks, setPicks] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  function submit() {
    const score = MOVE.filter((m) => picks[m.id] === m.correct).length;
    setSubmitted(true);
    onComplete(score, MOVE.length);
  }
  return (
    <div className="rounded-lg bg-card p-5 shadow-card">
      <p className="eyebrow">Move-out</p>
      <h3 className="mt-1 font-display text-xl font-semibold">Minimum landfill</h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Sequence materials so landfill is residual. A curb pile without a bulky appointment is a dumping risk.
      </p>
      <ul className="mt-4 space-y-3">
        {MOVE.map((m) => (
          <li key={m.id} className="rounded-md border border-border p-3">
            <p className="text-sm font-medium">{m.name}</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {m.options.map((o) => (
                <button
                  key={o}
                  type="button"
                  disabled={submitted}
                  onClick={() => setPicks((p) => ({ ...p, [m.id]: o }))}
                  className={cn(
                    "rounded-full border px-3 py-1.5 text-xs font-medium",
                    picks[m.id] === o ? "border-primary bg-primary text-primary-foreground" : "border-border",
                    submitted && o === m.correct && "border-success bg-success text-success-foreground",
                  )}
                >
                  {o}
                </button>
              ))}
            </div>
            {submitted && <p className="mt-2 text-xs text-muted-foreground">{m.note}</p>}
          </li>
        ))}
      </ul>
      {!submitted && (
        <Button className="mt-4" disabled={MOVE.some((m) => !picks[m.id])} onClick={submit}>
          Check the move-out plan
        </Button>
      )}
    </div>
  );
}

const EJ_Q = [
  {
    id: "q1",
    prompt: "Mattresses have returned to the same corner six times in four months. The most useful next question is:",
    options: [
      { id: "a", label: "Who looks like they left it?" },
      { id: "b", label: "Did we post a photo?" },
      { id: "c", label: "What is the recurrence interval, and did any intervention change it?" },
      { id: "d", label: "Can we skip 311 because it never works?" },
    ],
    correct: "c",
  },
  {
    id: "q2",
    prompt: "A pile blocks the curb ramp. Who is most immediately harmed?",
    options: [
      { id: "a", label: "Only tourists" },
      { id: "b", label: "Disabled residents, stroller users, and anyone forced into the street" },
      { id: "c", label: "Only the property’s Yelp rating" },
      { id: "d", label: "No one until a hauler complains" },
    ],
    correct: "b",
  },
  {
    id: "q3",
    prompt: "Which fact belongs in a STREETS record?",
    options: [
      { id: "a", label: "“Typical of this neighborhood.”" },
      { id: "b", label: "“A mattress occupies the sidewalk at 98th & International; no appointment tag visible; path of travel blocked.”" },
      { id: "c", label: "A guess about a tenant’s name" },
      { id: "d", label: "A biometric description of a passerby" },
    ],
    correct: "b",
  },
];

export function EjExercise({ onComplete }: { onComplete: (score: number, max: number) => void }) {
  const [picks, setPicks] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  function submit() {
    const score = EJ_Q.filter((q) => picks[q.id] === q.correct).length;
    setSubmitted(true);
    onComplete(score, EJ_Q.length);
  }
  return (
    <div className="rounded-lg bg-card p-5 shadow-card">
      <p className="eyebrow">Measure the burden</p>
      <h3 className="mt-1 font-display text-xl font-semibold">Evidence, not theater</h3>
      <ul className="mt-4 space-y-4">
        {EJ_Q.map((q) => (
          <li key={q.id}>
            <p className="text-sm font-medium">{q.prompt}</p>
            <div className="mt-2 grid gap-2">
              {q.options.map((o) => (
                <button
                  key={o.id}
                  type="button"
                  disabled={submitted}
                  onClick={() => setPicks((p) => ({ ...p, [q.id]: o.id }))}
                  className={cn(
                    "rounded-md border px-3 py-2 text-left text-sm",
                    picks[q.id] === o.id ? "border-primary bg-primary/10" : "border-border hover:bg-muted",
                    submitted && o.id === q.correct && "border-success bg-success/10",
                  )}
                >
                  {o.label}
                </button>
              ))}
            </div>
          </li>
        ))}
      </ul>
      {!submitted && (
        <Button className="mt-4" disabled={EJ_Q.some((q) => !picks[q.id])} onClick={submit}>
          Check answers
        </Button>
      )}
    </div>
  );
}

export function FieldDecision({ onComplete }: { onComplete: (score: number, max: number) => void }) {
  const [pick, setPick] = useState<string | null>(null);
  const [done, setDone] = useState(false);
  return (
    <CaseChrome id="WR-KONO-035" corridor="KONO · 35th & Telegraph" status="Unverified origin">
      <p className="eyebrow">Field decision</p>
      <h3 className="mt-1 font-display text-xl font-semibold">{SOFA_RECORD.title}</h3>
      <p className="mt-1 text-xs text-muted-foreground">{SOFA_RECORD.location}</p>
      <p className="mt-3 text-sm leading-relaxed">{SOFA_RECORD.body}</p>
      <p className="mt-4 text-sm font-semibold">{SOFA_RECORD.question}</p>
      <div className="mt-2 grid gap-2">
        {SOFA_RECORD.options.map((o) => (
          <button
            key={o.id}
            type="button"
            disabled={done}
            onClick={() => setPick(o.id)}
            className={cn(
              "rounded-md border px-3 py-3 text-left text-sm",
              pick === o.id ? "border-primary bg-primary/10" : "border-border hover:bg-muted",
              done && o.id === SOFA_RECORD.correct && "border-success bg-success/10",
            )}
          >
            <span className="font-semibold">{o.id}.</span> {o.label}
          </button>
        ))}
      </div>
      {!done && (
        <Button
          className="mt-4"
          disabled={!pick}
          onClick={() => {
            setDone(true);
            onComplete(pick === SOFA_RECORD.correct ? 1 : 0, 1);
          }}
        >
          Lock answer
        </Button>
      )}
      {done && <p className="mt-4 text-sm leading-relaxed text-asphalt-soft">{SOFA_RECORD.explain}</p>}
    </CaseChrome>
  );
}

export function SceneInspect({ onComplete }: { onComplete: (score: number, max: number) => void }) {
  const [found, setFound] = useState<string[]>([]);
  const [open, setOpen] = useState<string | null>(null);

  function toggle(id: string) {
    setOpen(id);
    setFound((f) => (f.includes(id) ? f : [...f, id]));
  }

  return (
    <div className="rounded-lg bg-card p-5 shadow-card">
      <p className="eyebrow">What’s wrong here?</p>
      <h3 className="mt-1 font-display text-xl font-semibold">Alley enclosure</h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Tap every marked condition. Include the carts that are fine — noticing “not a defect” is part of literacy.
      </p>
      <div className="mt-4">
        <BlockScene label="KONO alley · simulated" variant="alley">
          {DUMPSTER_SCENE.map((h) => (
            <button
              key={h.id}
              type="button"
              onClick={() => toggle(h.id)}
              style={{ left: `${h.x}%`, top: `${h.y}%` }}
              className={cn(
                "absolute z-20 size-8 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 text-xs font-bold",
                found.includes(h.id)
                  ? h.issue === "ok"
                    ? "border-success bg-success text-success-foreground"
                    : "border-accent bg-accent text-accent-foreground"
                  : "border-primary-foreground bg-primary text-primary-foreground",
              )}
              aria-label={h.label}
            >
              {found.includes(h.id) ? <Check className="mx-auto size-3.5" /> : ""}
            </button>
          ))}
        </BlockScene>
      </div>
      {open && (
        <div className="mt-3 rounded-md bg-muted p-3 text-sm">
          <p className="font-medium">{DUMPSTER_SCENE.find((h) => h.id === open)?.label}</p>
          <p className="mt-1 text-asphalt-soft">{DUMPSTER_SCENE.find((h) => h.id === open)?.explain}</p>
        </div>
      )}
      <p className="mt-3 text-xs tabular-nums text-muted-foreground">
        {found.length} of {DUMPSTER_SCENE.length} marked
      </p>
      {found.length === DUMPSTER_SCENE.length && (
        <Button className="mt-3" onClick={() => onComplete(found.filter((id) => DUMPSTER_SCENE.find((h) => h.id === id)?.issue !== "ok").length + (found.includes("cart-ok") ? 1 : 0), DUMPSTER_SCENE.length)}>
          Log the scene
        </Button>
      )}
    </div>
  );
}

export function RouteTheCase({
  caseIds,
  onComplete,
}: {
  caseIds: string[];
  onComplete: (score: number, max: number) => void;
}) {
  const cases = useMemo(() => caseIds.map((id) => CASE_MAP[id] ?? CASES.find((c) => c.id === id)!).filter(Boolean), [caseIds]);
  const [i, setI] = useState(0);
  const [pick, setPick] = useState<Pathway | null>(null);
  const [score, setScore] = useState(0);
  const [locked, setLocked] = useState(false);
  const cur = cases[i];
  if (!cur) return null;

  function lock() {
    if (!pick || locked) return;
    setLocked(true);
    if (pick === cur.correct) setScore((s) => s + 1);
  }

  function next() {
    if (i + 1 >= cases.length) {
      onComplete(score, cases.length);
      return;
    }
    setI((n) => n + 1);
    setPick(null);
    setLocked(false);
  }

  return (
    <div className="overflow-hidden rounded-lg bg-card shadow-card">
      <header className="flex flex-wrap items-center justify-between gap-2 border-b border-border bg-muted/60 px-4 py-2.5">
        <span className="record-id">WR-{cur.neighborhood.slice(0, 4).toUpperCase()}-{String(i + 1).padStart(3, "0")}</span>
        <span className="text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-caltrans">
          {cur.neighborhood}
        </span>
      </header>
      <div className="p-5">
      <p className="eyebrow">Who handles this?</p>
      <div className="mt-1 flex items-baseline justify-between gap-3">
        <h3 className="font-display text-xl font-semibold">{cur.title}</h3>
        <span className="text-xs tabular-nums text-muted-foreground">
          {i + 1}/{cases.length}
        </span>
      </div>
      <p className="mt-1 text-xs text-muted-foreground">
        {cur.location} · {cur.neighborhood}
      </p>
      <p className="mt-3 text-sm leading-relaxed">{cur.body}</p>
      <div className="mt-4 grid gap-2">
        {cur.options.map((o) => (
          <button
            key={o.id}
            type="button"
            disabled={locked}
            onClick={() => setPick(o.id)}
            className={cn(
              "rounded-md border px-3 py-3 text-left text-sm",
              pick === o.id ? "border-primary bg-primary/10" : "border-border hover:bg-muted",
              locked && o.id === cur.correct && "border-success bg-success/10",
              locked && pick === o.id && o.id !== cur.correct && "border-critical bg-critical/10",
            )}
          >
            {o.label}
          </button>
        ))}
      </div>
      {locked && (
        <div className="mt-4 space-y-2 text-sm">
          <p className="leading-relaxed">{cur.explain}</p>
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-md bg-muted p-3">
              <p className="text-xs font-semibold uppercase tracking-wider">Known</p>
              <ul className="mt-1 list-disc pl-4 text-xs text-asphalt-soft">
                {cur.known.map((k) => (
                  <li key={k}>{k}</li>
                ))}
              </ul>
            </div>
            <div className="rounded-md bg-muted p-3">
              <p className="text-xs font-semibold uppercase tracking-wider">Unverified</p>
              <ul className="mt-1 list-disc pl-4 text-xs text-asphalt-soft">
                {cur.unknown.map((k) => (
                  <li key={k}>{k}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
      <div className="mt-4 flex gap-2">
        {!locked && (
          <Button disabled={!pick} onClick={lock}>
            Lock pathway
          </Button>
        )}
        {locked && (
          <Button onClick={next}>{i + 1 >= cases.length ? "Finish routing" : "Next incident"}</Button>
        )}
      </div>
      </div>
    </div>
  );
}

export function ProtocolRecord({ onComplete }: { onComplete: (score: number, max: number) => void }) {
  const [fact, setFact] = useState("");
  const [infer, setInfer] = useState("");
  const [route, setRoute] = useState<Pathway | "">("");
  const [checked, setChecked] = useState(false);
  const goodFact = /mattress|sidewalk|tag|obstruct|98th/i.test(fact);
  const goodInfer = infer.length > 8;
  const goodRoute = route === "oak311";

  function submit() {
    setChecked(true);
    const score = (goodFact ? 1 : 0) + (goodInfer ? 1 : 0) + (goodRoute ? 1 : 0);
    onComplete(score, 3);
  }

  return (
    <div className="rounded-lg bg-card p-5 shadow-card">
      <p className="eyebrow">Incident record</p>
      <h3 className="mt-1 font-display text-xl font-semibold">Raw scene</h3>
      <p className="mt-2 rounded-md bg-muted p-3 text-sm leading-relaxed">
        98th Avenue at International, east sidewalk. Queen mattress, no appointment tag. Pedestrians stepping into the travel lane. A closed dumpster enclosure is on the private lot, not overflowing. You did not see who placed the mattress.
      </p>
      <label className="mt-4 block text-sm font-medium">Verified facts (what you can see)</label>
      <textarea
        className="mt-1 min-h-20 w-full rounded-md border border-input bg-card p-3 text-sm"
        value={fact}
        onChange={(e) => setFact(e.target.value)}
        placeholder="Record what is physically present and where."
      />
      <label className="mt-4 block text-sm font-medium">Inferences you will not write as fact</label>
      <textarea
        className="mt-1 min-h-16 w-full rounded-md border border-input bg-card p-3 text-sm"
        value={infer}
        onChange={(e) => setInfer(e.target.value)}
        placeholder="e.g. Origin unknown; service status unverified."
      />
      <label className="mt-4 block text-sm font-medium">First pathway</label>
      <select
        className="mt-1 h-11 w-full rounded-md border border-input bg-card px-3 text-sm"
        value={route}
        onChange={(e) => setRoute(e.target.value as Pathway)}
      >
        <option value="">Select</option>
        {(Object.keys(PATHWAY_LABEL) as Pathway[]).map((p) => (
          <option key={p} value={p}>
            {PATHWAY_LABEL[p]}
          </option>
        ))}
      </select>
      {!checked && (
        <Button className="mt-4" disabled={!fact || !infer || !route} onClick={submit}>
          Score the record
        </Button>
      )}
      {checked && (
        <div className="mt-4 space-y-2 text-sm">
          <p className={goodFact ? "text-success" : "text-critical"}>
            {goodFact ? "Facts mention the mattress, sidewalk, or location." : "Name the object and the place. “Messy” is not a record."}
          </p>
          <p className={goodInfer ? "text-success" : "text-critical"}>Label uncertainty. Do not promote a guess.</p>
          <p className={goodRoute ? "text-success" : "text-critical"}>
            First pathway for an untagged mattress blocking a sidewalk is Oakland 311. WM bulky is how a resident lawfully disposes of their own item.
          </p>
        </div>
      )}
    </div>
  );
}

export function InteractionSwitch({
  kind,
  itemIds,
  caseIds,
  title,
  intro,
  onComplete,
}: {
  kind: string;
  itemIds?: string[];
  caseIds?: string[];
  title: string;
  intro: string;
  onComplete: (score: number, max: number) => void;
}) {
  switch (kind) {
    case "sort":
      return <SortStation itemIds={itemIds ?? []} title={title} intro={intro} onComplete={onComplete} />;
    case "trace":
      return <TracePathway onComplete={onComplete} />;
    case "coffee":
      return <CoffeeShop onComplete={onComplete} />;
    case "redflag":
      return <RedFlag onComplete={onComplete} />;
    case "levels":
      return <ContaminationLevels onComplete={onComplete} />;
    case "prevent":
      return <PreventChallenge onComplete={onComplete} />;
    case "ej":
      return <EjExercise onComplete={onComplete} />;
    case "field":
      return <FieldDecision onComplete={onComplete} />;
    case "scene":
      return <SceneInspect onComplete={onComplete} />;
    case "route":
      return <RouteTheCase caseIds={caseIds ?? []} onComplete={onComplete} />;
    case "protocol":
      return <ProtocolRecord onComplete={onComplete} />;
    default:
      return (
        <div className="rounded-md border border-border p-4 text-sm">
          <Info className="mb-2 size-4" />
          Unknown interaction.
        </div>
      );
  }
}


