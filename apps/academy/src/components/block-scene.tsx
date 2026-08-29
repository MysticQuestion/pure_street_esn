import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function BlockScene({
  label,
  variant = "avenue",
  children,
}: {
  label: string;
  variant?: "avenue" | "alley";
  children: ReactNode;
}) {
  return (
    <div className="relative aspect-[16/10] overflow-hidden rounded-md bg-night shadow-card">
      <div
        className="absolute inset-0"
        style={{
          background:
            variant === "alley"
              ? "radial-gradient(circle at 30% 0%, hsl(168 40% 16% / 0.45), transparent 42%), linear-gradient(180deg, hsl(168 18% 12%) 0%, hsl(210 28% 8%) 38%, hsl(30 8% 16%) 38%, hsl(30 10% 14%) 100%)"
              : "radial-gradient(circle at 18% 8%, hsl(168 45% 22% / 0.28), transparent 36%), radial-gradient(circle at 88% 12%, hsl(43 80% 40% / 0.12), transparent 28%), linear-gradient(180deg, hsl(168 22% 14%) 0%, hsl(210 30% 10%) 40%, hsl(30 10% 18%) 40%, hsl(30 12% 14%) 100%)",
        }}
      />
      <Building x={5} w={16} h={28} />
      <Building x={24} w={14} h={22} delay />
      <Building x={62} w={18} h={30} />
      <Building x={82} w={12} h={20} delay />
      <div className="absolute inset-x-0 top-[38%] h-1.5 bg-caltrans/85" />
      <div className="absolute inset-x-[12%] top-[38.5%] h-0.5 bg-night/40" />
      {variant === "avenue" ? <AvenueProps /> : <AlleyProps />}
      <p className="absolute left-3 top-3 z-10 text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-primary-foreground/80">
        {label}
      </p>
      <div className="absolute inset-0 z-10">{children}</div>
    </div>
  );
}

function Building({ x, w, h, delay }: { x: number; w: number; h: number; delay?: boolean }) {
  return (
    <div
      className={cn("absolute bottom-[62%] rounded-sm bg-asphalt/70", delay && "bg-asphalt-soft/50")}
      style={{ left: `${x}%`, width: `${w}%`, height: `${h}%` }}
    >
      <div className="absolute inset-x-2 top-2 grid grid-cols-3 gap-1 opacity-40">
        {Array.from({ length: 6 }).map((_, i) => (
          <span key={i} className="h-1.5 rounded-[1px] bg-caltrans/50" />
        ))}
      </div>
    </div>
  );
}

function AvenueProps() {
  return (
    <>
      <div className="absolute bottom-[8%] left-[4%] h-[18%] w-[7%] rounded-t-sm bg-bin-recycle" />
      <div className="absolute bottom-[8%] left-[12%] h-[18%] w-[7%] rounded-t-sm bg-bin-compost" />
      <div className="absolute bottom-[8%] left-[20%] h-[18%] w-[7%] rounded-t-sm bg-bin-trash" />
      <div className="absolute bottom-[10%] left-[42%] h-[14%] w-[16%] rounded-sm bg-asphalt-soft" />
      <div className="absolute bottom-[12%] right-[18%] h-[10%] w-[14%] rounded-sm bg-bin-special/80" />
      <div className="absolute bottom-[9%] right-[6%] h-[16%] w-[10%] rounded-sm bg-muted-foreground/70" />
    </>
  );
}

function AlleyProps() {
  return (
    <>
      <div className="absolute bottom-[18%] left-[40%] h-[28%] w-[22%] rounded-sm bg-bin-trash" />
      <div className="absolute bottom-[22%] left-[42%] h-[8%] w-[18%] rounded-sm bg-asphalt-soft" />
      <div className="absolute bottom-[8%] left-[6%] h-[16%] w-[6%] rounded-t-sm bg-bin-recycle" />
      <div className="absolute bottom-[8%] left-[13%] h-[16%] w-[6%] rounded-t-sm bg-bin-compost" />
      <div className="absolute bottom-[10%] right-[18%] h-[16%] w-[18%] rounded-sm bg-asphalt-soft" />
      <div className="absolute bottom-[8%] left-[30%] h-[10%] w-[12%] rounded-sm bg-muted-foreground/60" />
    </>
  );
}
