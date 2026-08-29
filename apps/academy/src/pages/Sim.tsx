import { Link } from "react-router-dom";
import { StreetSim } from "@/components/academy/street-sim";
import { MODULES } from "@/lib/academy/modules";
import { useProgress } from "@/lib/academy/progress";

function SimPage() {
  const progress = useProgress();
  const ready = MODULES.every((m) => progress.modules[m.id]?.completed);
  if (!ready) {
    return (
      <div className="mx-auto max-w-lg px-4 py-16 text-center">
        <p className="eyebrow">Simulation locked</p>
        <h1 className="mt-2 font-display text-2xl font-semibold">Finish the twelve modules first</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          The 98th Avenue exercise is the certification gate, not a shortcut.
        </p>
        <Link to="/academy/course" className="mt-6 inline-block text-sm font-medium underline">
          Return to course map
        </Link>
      </div>
    );
  }
  return <StreetSim />;
}

export default SimPage;
