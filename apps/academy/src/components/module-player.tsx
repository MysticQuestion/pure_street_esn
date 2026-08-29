import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight, BookOpen, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { InteractionSwitch } from "./interactions";
import { Quiz } from "./quiz";
import type { LessonBlock, ModuleDef } from "@/lib/academy/types";
import { useProgress } from "@/lib/academy/progress";
import { nextModuleId } from "@/lib/academy/modules";
import { cn } from "@/lib/utils";

function Block({ block, plain }: { block: LessonBlock; plain: boolean }) {
  const text = plain && block.plain ? block.plain : block.text;
  if (block.kind === "p") return <p className="text-[0.975rem] leading-relaxed text-asphalt-soft">{text}</p>;
  if (block.kind === "quote")
    return (
      <blockquote className="border-l-2 border-caltrans pl-4 font-display text-xl font-medium text-foreground">
        {text}
      </blockquote>
    );
  if (block.kind === "rule")
    return (
      <div className="rounded-md border border-primary/20 bg-primary/5 p-4">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">{block.title}</p>
        <p className="mt-2 text-sm leading-relaxed">{text}</p>
      </div>
    );
  if (block.kind === "callout")
    return (
      <div
        className={cn(
          "rounded-md p-4",
          block.tone === "warn" && "bg-accent/12",
          block.tone === "critical" && "bg-critical/10",
          block.tone === "success" && "bg-success/10",
          (!block.tone || block.tone === "info") && "bg-info/10",
        )}
      >
        {block.title && <p className="text-sm font-semibold">{block.title}</p>}
        <p className="mt-1 text-sm leading-relaxed text-asphalt-soft">{text}</p>
      </div>
    );
  if (block.kind === "list")
    return (
      <div>
        {block.title && <p className="text-sm font-semibold">{block.title}</p>}
        <ul className="mt-2 space-y-1.5">
          {block.items?.map((it) => (
            <li key={it} className="flex gap-2 text-sm leading-relaxed text-asphalt-soft">
              <span className="mt-2 size-1.5 shrink-0 rounded-full bg-caltrans" />
              <span>{it}</span>
            </li>
          ))}
        </ul>
      </div>
    );
  return null;
}

export function ModulePlayer({ mod }: { mod: ModuleDef }) {
  const progress = useProgress();
  const [step, setStep] = useState<"lesson" | "lab" | "quiz" | "done">("lesson");
  const roleNotes = progress.role ? mod.roleNotes?.[progress.role] : undefined;
  const nxt = nextModuleId(mod.id);
  const row = progress.modules[mod.id];

  useEffect(() => {
    progress.hydrateModules();
    if (row?.completed) setStep("done");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mod.id]);

  const stepIndex = step === "lesson" ? 0 : step === "lab" ? 1 : step === "quiz" ? 2 : 3;

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
      <Link to="/academy/course" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft className="size-4" /> Course map
      </Link>
      <p className="eyebrow mt-6">Module {String(mod.number).padStart(2, "0")} · {mod.durationMin} min</p>
      <h1 className="mt-2 font-display text-3xl font-semibold tracking-tight">{mod.title}</h1>
      <p className="mt-2 text-base text-asphalt-soft">{mod.essentialQuestion}</p>
      <Progress className="mt-6" value={(stepIndex / 3) * 100} aria-label="Module step" />

      {step === "lesson" && (
        <div className="mt-8 space-y-5">
          <div className="rounded-lg bg-card p-5 shadow-card">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">You will be able to</p>
            <ul className="mt-2 space-y-1.5">
              {mod.objectives.map((o) => (
                <li key={o} className="flex gap-2 text-sm">
                  <BookOpen className="mt-0.5 size-4 shrink-0 text-primary" />
                  {o}
                </li>
              ))}
            </ul>
          </div>
          {mod.lesson.map((b, idx) => (
            <Block key={idx} block={b} plain={progress.plainLanguage} />
          ))}
          {roleNotes?.map((b, idx) => (
            <div key={`r${idx}`}>
              <Badge variant="primary">For your role</Badge>
              <div className="mt-2">
                <Block block={b} plain={progress.plainLanguage} />
              </div>
            </div>
          ))}
          <p className="text-xs text-muted-foreground">
            Source: {mod.governance.source}. Last reviewed {mod.governance.lastReviewed}. {mod.governance.jurisdiction}.
          </p>
          <Button
            onClick={() => {
              progress.markLesson(mod.id);
              setStep("lab");
            }}
          >
            Continue to lab <ArrowRight />
          </Button>
        </div>
      )}

      {step === "lab" && (
        <div className="mt-8">
          <InteractionSwitch
            kind={mod.interaction.kind}
            itemIds={mod.interaction.itemIds}
            caseIds={mod.interaction.caseIds}
            title={mod.interaction.title}
            intro={mod.interaction.intro}
            onComplete={(score, max) => {
              progress.markInteraction(mod.id, score, max);
              setStep("quiz");
            }}
          />
        </div>
      )}

      {step === "quiz" && (
        <div className="mt-8">
          <Quiz
            questions={mod.quiz}
            plain={progress.plainLanguage}
            onComplete={(score, max) => {
              progress.markQuiz(mod.id, score, max);
              progress.completeModule(mod.id);
              setStep("done");
            }}
          />
        </div>
      )}

      {step === "done" && (
        <div className="mt-8 rounded-lg bg-card p-6 shadow-card">
          <CheckCircle2 className="size-8 text-success" />
          <h2 className="mt-3 font-display text-2xl font-semibold">Module {mod.number} complete</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Knowledge check {row?.quizScore ?? 0}/{row?.quizMax ?? 5}. Lab {row?.interactionScore ?? 0}/
            {row?.interactionMax ?? 0}.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            {nxt ? (
              <Button asChild>
                <Link to={`/academy/course/${nxt}`}>
                  Next module <ArrowRight />
                </Link>
              </Button>
            ) : (
              <Button asChild>
                <Link to="/academy/sim">
                  98th Avenue simulation <ArrowRight />
                </Link>
              </Button>
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
