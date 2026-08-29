import { ArrowRight, Building2, QrCode, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import PageMeta from "@/components/PageMeta";
import { MODULES } from "@/lib/academy/modules";
import { useProgress, moduleProgress } from "@/lib/academy/progress";
import { DISCLAIMER, ADVANCED_BADGES } from "@/lib/academy/sources";

const IMPACT = [
  { k: "Trained", v: "—" },
  { k: "Certification rate", v: "—" },
  { k: "Sorting accuracy Δ", v: "—" },
  { k: "Organizations", v: "—" },
  { k: "Languages live", v: "EN" },
];

function Home() {
  const progress = useProgress();
  const mp = moduleProgress(progress);

  return (
    <div>
      <PageMeta
        title="STREETS Academy — Oakland waste & recycling literacy"
        description="Free interactive Oakland waste literacy certification. Sort, document, and verify. Complements Oakland Recycles and OAK311."
      />
      <section className="hero-cinematic">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
            STREETS-WR101 · Oakland waste literacy
          </p>
          <h1 className="mt-4 max-w-3xl font-display text-4xl font-semibold leading-[1.08] tracking-tight sm:text-6xl">
            Know the system.
            <br />
            Change the street.
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-primary-foreground/80">
            Oakland’s waste system is learnable. Learn where materials belong, what happens when the system fails, and
            how to document environmental conditions accurately — without inventing blame.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild className="bg-accent text-accent-foreground hover:bg-accent/90" size="lg">
              <Link to={progress.role ? "/academy/course" : "/academy/start"}>
                {progress.role ? "Resume course" : "Start free course"} <ArrowRight />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-primary-foreground/25 bg-transparent text-primary-foreground hover:bg-primary-foreground/10"
            >
              <Link to="/academy/organizations">For organizations</Link>
            </Button>
            <Button asChild variant="ghost" size="lg" className="text-primary-foreground hover:bg-primary-foreground/10">
              <Link to="/academy/verify">
                <QrCode /> Verify certificate
              </Link>
            </Button>
          </div>
          {progress.role && (
            <p className="mt-6 font-mono text-xs tracking-wider text-primary-foreground/60">
              Saved on this device · {String(mp.done).padStart(2, "0")} of {String(mp.total).padStart(2, "0")} modules
            </p>
          )}
        </div>
      </section>

      <section className="border-b border-border bg-card">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-x-8 gap-y-3 px-4 py-4 sm:px-6">
          <Badge variant="accent">Pilot / demonstration data</Badge>
          {IMPACT.map((row) => (
            <div key={row.k} className="flex items-baseline gap-2">
              <span className="font-display text-lg font-semibold tabular-nums">{row.v}</span>
              <span className="text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                {row.k}
              </span>
            </div>
          ))}
        </div>
        <p className="mx-auto max-w-6xl px-4 pb-4 text-xs text-muted-foreground sm:px-6">
          Live impact figures appear only after deployment produces real training records. Nothing here is a City of
          Oakland statistic.
        </p>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <p className="eyebrow">Flagship course</p>
        <div className="accent-rule mt-3" />
        <h2 className="section-title mt-4">Waste literacy, resource recovery & clean streets</h2>
        <p className="lede mt-3 max-w-2xl">
          Interactive certification — not a slide deck. About 60–90 minutes online, optional field practicum, two-year
          OaklandSTREETS Waste & Recycling Literacy Certificate.
        </p>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              k: "Sort it",
              d: "Recycle, compost, trash, or special disposal — Oakland rules, with immediate explanation.",
            },
            {
              k: "What’s wrong here?",
              d: "Read a dumpster scene for contamination, overflow, dumping, hazards, and access.",
            },
            {
              k: "Who handles this?",
              d: "WM, CWS, 311, StopWaste, property, or another service — first pathway only.",
            },
            {
              k: "Field decision",
              d: "Document conditions, not assumptions. Separate fact from inference.",
            },
          ].map((x) => (
            <article key={x.k} className="rounded-lg bg-card p-5 shadow-card">
              <h3 className="font-display text-base font-semibold">{x.k}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{x.d}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-muted/50 py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <p className="eyebrow">Twelve modules</p>
          <h2 className="section-title mt-3">A graduate can answer four questions</h2>
          <p className="mt-2 font-display text-xl text-asphalt-soft">
            What is it? Where does it go? Who handles it? What happens next?
          </p>
          <ol className="mt-8 grid gap-3 md:grid-cols-2">
            {MODULES.map((m) => (
              <li key={m.id} className="flex gap-4 rounded-lg bg-card p-4 shadow-card">
                <span className="font-mono text-xs font-semibold tabular-nums tracking-wider text-caltrans">
                  {String(m.number).padStart(2, "0")}
                </span>
                <span>
                  <span className="block font-medium">{m.title}</span>
                  <span className="mt-1 block text-sm text-muted-foreground">{m.essentialQuestion}</span>
                </span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-6 px-4 py-16 sm:px-6 lg:grid-cols-3">
        <article className="rounded-lg bg-card p-6 shadow-card">
          <ShieldCheck className="size-6 text-primary" />
          <h3 className="mt-3 font-display text-lg font-semibold">Independent of haulers and City ops</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            Complements Oakland Recycles and OAK311. Does not replace them. Field observations are not official
            contamination determinations.
          </p>
        </article>
        <article className="rounded-lg bg-card p-6 shadow-card">
          <Building2 className="size-6 text-primary" />
          <h3 className="mt-3 font-display text-lg font-semibold">Built for cohorts</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            Property managers, restaurants, BIDs, schools, workforce programs. Organization dashboard ships as a
            demonstration until real enrollments exist.
          </p>
        </article>
        <article className="rounded-lg bg-card p-6 shadow-card">
          <QrCode className="size-6 text-primary" />
          <h3 className="mt-3 font-display text-lg font-semibold">Verifiable certificate</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            STREETS-WR-2026-XXXXX, two-year validity, public verification page. Passing the 98th Avenue simulation at
            80/100 is required.
          </p>
        </article>
      </section>

      <section className="border-t border-border bg-card py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <p className="eyebrow">After WR101</p>
          <h2 className="section-title mt-3">Advanced badges</h2>
          <p className="lede mt-3 max-w-2xl">
            Optional specializations. None are represented as City credentials. They stack on WR101.
          </p>
          <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {ADVANCED_BADGES.map((b) => (
              <li key={b.id} className="rounded-lg border border-border p-4">
                <p className="font-display font-semibold">{b.name}</p>
                <p className="mt-1 text-sm text-muted-foreground">{b.requires}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-t border-border px-4 py-10 sm:px-6">
        <p className="mx-auto max-w-3xl text-center text-xs leading-relaxed text-muted-foreground">{DISCLAIMER}</p>
      </section>
    </div>
  );
}

export default Home;
