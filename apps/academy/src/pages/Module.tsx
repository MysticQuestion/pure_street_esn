import { Link, useParams } from "react-router-dom";
import { ModulePlayer } from "@/components/academy/module-player";
import { MODULE_MAP } from "@/lib/academy/modules";

function ModulePage() {
  const { moduleId = "" } = useParams();
  const mod = MODULE_MAP[moduleId];
  if (!mod) {
    return (
      <div className="mx-auto max-w-lg px-4 py-16 text-center">
        <h1 className="font-display text-2xl font-semibold">Module not found</h1>
        <Link to="/academy/course" className="mt-4 inline-block text-sm underline">
          Back to course map
        </Link>
      </div>
    );
  }
  return <ModulePlayer mod={mod} />;
}

export default ModulePage;
