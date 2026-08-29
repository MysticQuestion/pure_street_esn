import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

export function StreetsMark({ className, invert = false }: { className?: string; invert?: boolean }) {
  return (
    <svg
      viewBox="0 0 32 32"
      className={cn("size-9 shrink-0", className)}
      aria-hidden
    >
      <rect width="32" height="32" rx="7" fill={invert ? "hsl(var(--mark))" : "hsl(var(--primary))"} />
      <path d="M5 16h22" stroke="hsl(var(--caltrans-orange))" strokeWidth="2.4" strokeLinecap="round" />
      <path
        d="M16 6.5v19"
        stroke="hsl(var(--caltrans-orange))"
        strokeWidth="1.8"
        strokeDasharray="2.4 2.8"
        strokeLinecap="round"
      />
      <circle cx="16" cy="16" r="2.6" fill="hsl(var(--primary-foreground))" />
    </svg>
  );
}

export function Wordmark({
  compact = false,
  invert = false,
}: {
  compact?: boolean;
  invert?: boolean;
}) {
  return (
    <Link to="/academy" className="group flex items-center gap-3">
      <StreetsMark invert={invert} />
      <span className="leading-tight">
        <span
          className={cn(
            "block font-display text-sm font-semibold tracking-tight",
            invert ? "text-primary-foreground" : "text-foreground",
          )}
        >
          STREETS Oakland
        </span>
        <span
          className={cn(
            "block text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-caltrans",
            compact && "hidden sm:block",
          )}
        >
          Academy
        </span>
      </span>
    </Link>
  );
}
