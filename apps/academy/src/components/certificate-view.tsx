import { Link } from "react-router-dom";
import type { CertificateRecord } from "@/lib/academy/types";
import { ROLE_LABEL } from "@/lib/academy/labels";
import { StreetsMark } from "@/components/academy/streets-mark";

export function CertificateView({ cert, verifyPath }: { cert: CertificateRecord; verifyPath: string }) {
  const issued = new Date(cert.issued).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const until = new Date(cert.validUntil).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="overflow-hidden rounded-lg bg-card shadow-elevated">
      <div className="highway-stripe" />
      <div className="bg-primary px-6 py-5 text-primary-foreground sm:px-10">
        <div className="flex items-center gap-3">
          <StreetsMark className="size-10" invert />
          <p className="text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-accent">
            OaklandSTREETS · STREETS-WR101
          </p>
        </div>
        <h2 className="mt-3 font-display text-2xl font-semibold sm:text-3xl">Waste & Recycling Literacy</h2>
        <p className="mt-1 text-sm text-primary-foreground/75">Certified</p>
      </div>
      <div className="grid gap-6 px-6 py-8 sm:grid-cols-[1fr_auto] sm:px-10">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">Issued to</p>
          <p className="mt-1 font-display text-2xl font-semibold">{cert.name}</p>
          <p className="mt-1 text-sm text-muted-foreground">{ROLE_LABEL[cert.role]}</p>
          <p className="mt-4 text-sm">
            Completion {issued} · Valid through {until}
          </p>
          <p className="mt-1 font-mono text-xs tracking-wider text-asphalt-soft">{cert.id}</p>
          <ul className="mt-6 flex flex-wrap gap-2">
            {cert.competencies.map((c) => (
              <li key={c} className="rounded-full bg-muted px-3 py-1 text-xs font-medium">
                {c}
              </li>
            ))}
          </ul>
        </div>
        <div className="flex flex-col items-center justify-center gap-3 rounded-md border border-border p-4">
          <QrMark value={verifyPath} />
          <p className="max-w-28 text-center text-[0.65rem] leading-snug text-muted-foreground">Public validation</p>
        </div>
      </div>
      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border px-6 py-4 text-xs text-muted-foreground sm:px-10">
        <span>
          Combined score {cert.score} · simulation {cert.simScore}/100
        </span>
        <Link to={`/academy/verify/${cert.id}?t=${encodeURIComponent(cert.token)}`} className="underline">
          Open validation page
        </Link>
      </div>
    </div>
  );
}

function QrMark({ value }: { value: string }) {
  const cells = hashGrid(value, 17);
  return (
    <svg viewBox="0 0 17 17" className="size-28" role="img" aria-label="Certificate validation mark">
      {cells.map((row, y) =>
        row.map((on, x) =>
          on ? <rect key={`${x}-${y}`} x={x} y={y} width={1} height={1} fill="hsl(var(--primary))" /> : null,
        ),
      )}
    </svg>
  );
}

function hashGrid(s: string, n: number) {
  const grid = Array.from({ length: n }, () => Array<boolean>(n).fill(false));
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  for (let y = 0; y < n; y++) {
    for (let x = 0; x < n; x++) {
      h = Math.imul(h ^ (x * 73 + y * 19), 16777619);
      const finder = (x < 4 && y < 4) || (x > n - 5 && y < 4) || (x < 4 && y > n - 5);
      grid[y][x] = finder
        ? x === 0 || y === 0 || x === 3 || y === 3 || (x === 1 && y === 1) || (x === n - 2 && y === 1) || (x === 1 && y === n - 2)
        : (h >>> 0) % 3 !== 0;
    }
  }
  return grid;
}
