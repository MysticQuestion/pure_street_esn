import { ArrowRight, Check } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { MODULES } from "@/lib/academy/modules";
import { useProgress, moduleProgress, ROLE_LABEL } from "@/lib/academy/progress";
import { cn } from "@/lib/utils";

function CourseMap() {
  const progress = useProgress();
  const mp = moduleProgress(progress);
  const next = MODULES.find((m) => !progress.modules[m.id]?.completed);

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
      <p className="eyebrow">WR101</p>
      <h1 className="mt-2 font-display text-3xl font-semibold">Course map</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        {progress.name ? `${progress.name} · ` : ""}
        {progress.role ? ROLE_LABEL[progress.role] : "Not enrolled yet"}
        {progress.pretest
          ? ` · baseline ${Math.round((progress.pretest.correct / progress.pretest.attempted) * 100)}%`
          : ""}
      </p>
      <Progress className="mt-6" value={mp.pct} aria-label="Course completion" />
      <p className="mt-2 font-mono text-xs tabular-nums tracking-wider text-muted-foreground">
        {mp.done} of {mp.total} modules · then 98th Avenue simulation
      </p>

      <div className="mt-6 flex flex-wrap gap-2">
        {!progress.role && (
          <Button asChild>
            <Link to="/academy/start">
              Enroll <ArrowRight />
            </Link>
          </Button>
        )}
        {progress.role && next && (
          <Button asChild>
            <Link to={`/academy/course/${next.id}`}>
              {mp.done === 0 ? "Begin Module 01" : `Continue Module ${String(next.number).padStart(2, "0")}`}
              <ArrowRight />
            </Link>
          </Button>
        )}
        {mp.done === mp.total && (
          <Button asChild>
            <Link to="/academy/sim">
              Open 98th Avenue simulation <ArrowRight />
            </Link>
          </Button>
        )}
      </div>

      <ol className="mt-10 space-y-2">
        {MODULES.map((m) => {
          const row = progress.modules[m.id];
          const done = row?.completed;
          return (
            <li key={m.id}>
              <Link to={`/academy/course/${m.id}`}
                className={cn(
                  "flex items-start gap-4 rounded-lg bg-card p-4 shadow-card transition-transform hover:-translate-y-0.5",
                  done && "ring-1 ring-success/30",
                )}
              >
                <span
                  className={cn(
                    "mt-0.5 grid size-8 shrink-0 place-items-center rounded-md font-mono text-xs font-semibold",
                    done ? "bg-success text-success-foreground" : "bg-muted",
                  )}
                >
                  {done ? <Check className="size-4" /> : String(m.number).padStart(2, "0")}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block font-display font-semibold">{m.title}</span>
                  <span className="mt-1 block text-sm text-muted-foreground">{m.essentialQuestion}</span>
                </span>
                <span className="hidden text-xs text-muted-foreground sm:block">{m.durationMin} min</span>
              </Link>
            </li>
          );
        })}
        <li>
          <Link to="/academy/sim" className="flex items-start gap-4 rounded-lg bg-primary p-4 text-primary-foreground shadow-card">
            <span className="mt-0.5 grid size-8 place-items-center rounded-md bg-accent font-mono text-xs font-bold text-accent-foreground">
              98
            </span>
            <span>
              <span className="block font-display font-semibold">Final field simulation — 98th Avenue</span>
              <span className="mt-1 block text-sm text-primary-foreground/80">
                Passing score 80/100. Required for certification.
              </span>
            </span>
          </Link>
        </li>
      </ol>
    </div>
  );
}

export default CourseMap;
