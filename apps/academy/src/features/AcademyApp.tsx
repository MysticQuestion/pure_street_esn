import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import AcademyShell from "@/components/academy/AcademyShell";
import { useProgress } from "@/lib/academy/progress";

export default function AcademyApp() {
  const hydrateModules = useProgress((s) => s.hydrateModules);
  useEffect(() => {
    hydrateModules();
  }, [hydrateModules]);

  return (
    <AcademyShell>
      <Outlet />
    </AcademyShell>
  );
}
