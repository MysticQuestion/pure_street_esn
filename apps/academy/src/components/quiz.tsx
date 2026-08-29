import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { Question } from "@/lib/academy/types";
import { cn } from "@/lib/utils";

export function Quiz({
  questions,
  plain,
  onComplete,
}: {
  questions: Question[];
  plain?: boolean;
  onComplete: (score: number, max: number) => void;
}) {
  const [i, setI] = useState(0);
  const [pick, setPick] = useState<string | null>(null);
  const [locked, setLocked] = useState(false);
  const [score, setScore] = useState(0);
  const q = questions[i];
  if (!q) return null;

  function lock() {
    if (!pick || locked) return;
    setLocked(true);
    if (pick === q.correct) setScore((s) => s + 1);
  }

  function next() {
    if (i + 1 >= questions.length) {
      onComplete(score, questions.length);
      return;
    }
    setI((n) => n + 1);
    setPick(null);
    setLocked(false);
  }

  return (
    <div className="rounded-lg bg-card p-5 shadow-card">
      <div className="flex items-baseline justify-between">
        <p className="eyebrow">Knowledge check</p>
        <span className="text-xs tabular-nums text-muted-foreground">
          {i + 1} / {questions.length}
        </span>
      </div>
      <h3 className="mt-2 font-display text-lg font-semibold leading-snug">
        {plain && q.plain ? q.plain : q.prompt}
      </h3>
      <div className="mt-4 grid gap-2">
        {q.options.map((o) => (
          <button
            key={o.id}
            type="button"
            disabled={locked}
            onClick={() => setPick(o.id)}
            className={cn(
              "rounded-md border px-3 py-3 text-left text-sm leading-snug",
              pick === o.id ? "border-primary bg-primary/10" : "border-border hover:bg-muted",
              locked && o.id === q.correct && "border-success bg-success/10",
              locked && pick === o.id && o.id !== q.correct && "border-critical bg-critical/10",
            )}
          >
            {o.label}
          </button>
        ))}
      </div>
      {locked && (
        <div className="mt-4">
          <Badge variant={pick === q.correct ? "success" : "critical"}>
            {pick === q.correct ? "Correct" : "Review"}
          </Badge>
          <p className="mt-2 text-sm leading-relaxed text-asphalt-soft">{q.explain}</p>
        </div>
      )}
      <div className="mt-4">
        {!locked ? (
          <Button disabled={!pick} onClick={lock}>
            Lock answer
          </Button>
        ) : (
          <Button onClick={next}>{i + 1 >= questions.length ? "Record score" : "Next question"}</Button>
        )}
      </div>
    </div>
  );
}
