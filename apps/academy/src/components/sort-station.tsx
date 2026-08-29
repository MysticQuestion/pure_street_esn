import { useMemo, useState } from "react";
import { Check, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ItemGlyph } from "./item-glyph";
import { itemsById, STREAM_META } from "@/lib/academy/sort-items";
import type { Stream } from "@/lib/academy/types";
import { cn } from "@/lib/utils";

const BINS: Stream[] = ["recycle", "compost", "trash", "special"];

const LID: Record<Stream, string> = {
  recycle: "lid-recycle",
  compost: "lid-compost",
  trash: "lid-trash",
  special: "lid-special",
};

export function SortStation({
  itemIds,
  title,
  intro,
  onComplete,
}: {
  itemIds: string[];
  title: string;
  intro: string;
  onComplete: (score: number, max: number) => void;
}) {
  const deck = useMemo(() => itemsById(itemIds), [itemIds]);
  const [i, setI] = useState(0);
  const [selected, setSelected] = useState<Stream | null>(null);
  const [correct, setCorrect] = useState(0);
  const [done, setDone] = useState(false);
  const item = deck[i];
  const answered = selected !== null;
  const isRight = selected === item?.stream;

  function choose(stream: Stream) {
    if (answered || !item) return;
    setSelected(stream);
    if (stream === item.stream) setCorrect((c) => c + 1);
  }

  function next() {
    if (!item) return;
    if (i + 1 >= deck.length) {
      setDone(true);
      onComplete(correct, deck.length);
      return;
    }
    setSelected(null);
    setI((n) => n + 1);
  }

  function restart() {
    setI(0);
    setSelected(null);
    setCorrect(0);
    setDone(false);
  }

  if (!item) return null;

  if (done) {
    const pct = Math.round((correct / deck.length) * 100);
    return (
      <div className="rounded-lg bg-card p-6 shadow-card">
        <p className="eyebrow">Sort complete</p>
        <h3 className="mt-2 font-display text-2xl font-semibold">
          {correct} of {deck.length} correct
        </h3>
        <p className="mt-2 text-sm text-muted-foreground">
          {pct}% sorting accuracy on this station. Oakland rules, not generic national guidance.
        </p>
        <div className="mt-6 flex flex-wrap gap-2">
          <Button onClick={restart} variant="outline">
            <RotateCcw /> Retry station
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-lg bg-card p-4 shadow-card sm:p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="eyebrow">Sort it</p>
          <h3 className="mt-1 font-display text-xl font-semibold">{title}</h3>
          <p className="mt-1 text-sm text-muted-foreground">{intro}</p>
        </div>
        <p className="shrink-0 font-mono text-xs tabular-nums tracking-wider text-muted-foreground">
          {String(i + 1).padStart(2, "0")} / {String(deck.length).padStart(2, "0")}
        </p>
      </div>
      <div className="mt-6 flex flex-col items-center gap-3 rounded-md bg-muted/60 px-4 py-8">
        <ItemGlyph item={item} size="lg" reveal={answered} />
        <p className="font-display text-lg font-semibold">{item.name}</p>
        <p className="text-sm text-muted-foreground">{item.alt}</p>
        {!answered && <p className="text-xs text-muted-foreground">{item.hint}</p>}
      </div>

      <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
        {BINS.map((bin) => {
          const meta = STREAM_META[bin];
          const show = answered && (bin === selected || bin === item.stream);
          const good = answered && bin === item.stream;
          const bad = answered && bin === selected && bin !== item.stream;
          return (
            <button
              key={bin}
              type="button"
              onClick={() => choose(bin)}
              disabled={answered}
              className={cn(
                "min-h-20 overflow-hidden rounded-md border text-left transition-colors",
                "border-border bg-background hover:bg-muted",
                good && "border-success bg-success/10",
                bad && "border-critical bg-critical/10",
              )}
            >
              <span className={cn("block h-2 w-full", LID[bin])} />
              <span className="block px-3 py-3">
                <span className="block text-xs font-semibold uppercase tracking-wider">{meta.label}</span>
                <span className="mt-1 block text-xs text-muted-foreground">{meta.short}</span>
                {show && good && <Check className="mt-2 size-4 text-success" />}
              </span>
            </button>
          );
        })}
      </div>

      {answered && (
        <div className="mt-4 rounded-md border border-border bg-muted/40 p-4">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant={isRight ? "success" : "critical"}>{isRight ? "Correct" : "Not that stream"}</Badge>
            <span className="text-sm font-medium">{STREAM_META[item.stream].label}</span>
          </div>
          <p className="mt-2 text-sm leading-relaxed text-asphalt-soft">
            {selected ? item.why[selected] : item.why[item.stream]}
          </p>
          <Button className="mt-4" onClick={next}>
            {i + 1 >= deck.length ? "Finish station" : "Next object"}
          </Button>
        </div>
      )}
      <p className="sr-only">
        {deck.length - i} items remaining in this station.
      </p>
    </div>
  );
}
