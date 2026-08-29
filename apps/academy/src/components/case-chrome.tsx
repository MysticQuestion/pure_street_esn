import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function CaseChrome({
  id,
  corridor,
  status,
  children,
  className,
}: {
  id: string;
  corridor?: string;
  status?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <article className={cn("overflow-hidden rounded-lg bg-card shadow-card", className)}>
      <header className="flex flex-wrap items-center justify-between gap-2 border-b border-border bg-muted/60 px-4 py-2.5 sm:px-5">
        <span className="record-id">{id}</span>
        <span className="flex items-center gap-3">
          {corridor && (
            <span className="text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-caltrans">
              {corridor}
            </span>
          )}
          {status && (
            <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[0.65rem] font-medium text-primary">
              {status}
            </span>
          )}
        </span>
      </header>
      <div className="p-5 sm:p-6">{children}</div>
    </article>
  );
}
