import type { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Wordmark } from "@/components/academy/streets-mark";
import { cn } from "@/lib/utils";
import { useProgress, moduleProgress } from "@/lib/academy/progress";
import { LINKS } from "@/lib/academy/sources";

const NAV = [
  { to: "/academy", label: "Academy", match: (p: string) => p === "/academy" || p === "/academy/" },
  {
    to: "/academy/course",
    label: "Course",
    match: (p: string) =>
      p.startsWith("/academy/course") || p.startsWith("/academy/start") || p.startsWith("/academy/sim"),
  },
  { to: "/academy/resources", label: "Pathways", match: (p: string) => p.startsWith("/academy/resources") },
  { to: "/academy/organizations", label: "Organizations", match: (p: string) => p.startsWith("/academy/organizations") },
  {
    to: "/academy/verify",
    label: "Verify",
    match: (p: string) => p.startsWith("/academy/verify") || p.startsWith("/academy/certificate"),
  },
  { to: "/academy/about", label: "About", match: (p: string) => p.startsWith("/academy/about") },
];

export default function AcademyShell({ children }: { children: ReactNode }) {
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);
  const progress = useProgress();
  const mp = moduleProgress(progress);

  return (
    <div className="flex min-h-dvh flex-col bg-background text-foreground">
      <a
        href="#academy-main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-card focus:px-3 focus:py-2"
      >
        Skip to content
      </a>
      <header className="sticky top-0 z-40 bg-sidebar text-sidebar-foreground">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
          <Wordmark invert />
          <nav className="hidden items-center gap-0.5 lg:flex" aria-label="Academy">
            {NAV.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className={cn(
                  "rounded-md px-3 py-2 text-sm font-medium text-sidebar-foreground/75 transition-colors hover:text-sidebar-foreground",
                  item.match(pathname) && "bg-primary-foreground/10 text-sidebar-foreground",
                )}
              >
                {item.label}
              </Link>
            ))}
            <Link
              to="/"
              className="rounded-md px-3 py-2 text-sm font-medium text-sidebar-foreground/75 hover:text-sidebar-foreground"
            >
              Conditions
            </Link>
            <Link
              to="/map"
              className="rounded-md px-3 py-2 text-sm font-medium text-sidebar-foreground/75 hover:text-sidebar-foreground"
            >
              Map
            </Link>
          </nav>
          <div className="flex items-center gap-2">
            {progress.role && (
              <span className="hidden font-mono text-[0.65rem] tabular-nums tracking-wider text-sidebar-foreground/60 sm:inline">
                {String(mp.done).padStart(2, "0")}/{String(mp.total).padStart(2, "0")}
              </span>
            )}
            <Button asChild size="sm" className="hidden bg-accent text-accent-foreground hover:bg-accent/90 sm:inline-flex">
              <Link to={progress.role ? "/academy/course" : "/academy/start"}>
                {progress.role ? "Resume" : "Start course"}
              </Link>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="text-sidebar-foreground hover:bg-primary-foreground/10 lg:hidden"
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X /> : <Menu />}
            </Button>
          </div>
        </div>
        {open && (
          <div className="border-t border-sidebar-foreground/10 bg-sidebar px-4 py-3 lg:hidden">
            <nav className="flex flex-col" aria-label="Academy mobile">
              {NAV.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={() => setOpen(false)}
                  className={cn("rounded-md px-3 py-3 text-sm font-medium", item.match(pathname) ? "bg-primary-foreground/10" : "")}
                >
                  {item.label}
                </Link>
              ))}
              <Link to="/" onClick={() => setOpen(false)} className="rounded-md px-3 py-3 text-sm font-medium">
                Conditions
              </Link>
              <Link to="/map" onClick={() => setOpen(false)} className="rounded-md px-3 py-3 text-sm font-medium">
                Evidence map
              </Link>
            </nav>
          </div>
        )}
        <div className="highway-stripe" />
      </header>
      <main id="academy-main" className="flex-1">
        {children}
      </main>
      <footer className="border-t border-border bg-card">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-3">
          <div>
            <Wordmark />
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
              Independent civic education for Oakland waste literacy. Complements OAK311 and Oakland Recycles. Does not
              replace them.
            </p>
          </div>
          <div>
            <p className="eyebrow">On this site</p>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <Link to="/academy/course" className="hover:underline">
                  WR101 course
                </Link>
              </li>
              <li>
                <Link to="/academy/resources" className="hover:underline">
                  Who handles what
                </Link>
              </li>
              <li>
                <Link to="/academy/verify" className="hover:underline">
                  Verify a certificate
                </Link>
              </li>
              <li>
                <Link to="/academy/about" className="hover:underline">
                  Academy governance
                </Link>
              </li>
              <li>
                <Link to="/" className="hover:underline">
                  STREETS Oakland
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <p className="eyebrow">Official systems</p>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <a className="hover:underline" href={LINKS.oaklandRecycles}>
                  Oakland Recycles
                </a>
              </li>
              <li>
                <a className="hover:underline" href={LINKS.oak311}>
                  OAK311
                </a>
              </li>
              <li>
                <a className="hover:underline" href={LINKS.stopwaste}>
                  StopWaste
                </a>
              </li>
              <li>
                <Link to="/governance" className="hover:underline">
                  STREETS limits
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-border px-4 py-4 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} STREETS Academy. Rules reviewed against Oakland Recycles (Dec 2025 sorting guide)
          on 29 Aug 2026. Course version WR101-2026.08. Not a City of Oakland system.
        </div>
      </footer>
    </div>
  );
}
