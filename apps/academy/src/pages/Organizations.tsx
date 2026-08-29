import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const DEMO = {
  name: "Acme Apartments",
  enrolled: 34,
  completed: 29,
  certified: 27,
  rate: 85,
  avg: 91,
  due: 5,
};

const IMPACT_ROWS = [
  ["People trained", "—"],
  ["Certificates issued", "—"],
  ["Organizations trained", "—"],
  ["Average pre-test", "—"],
  ["Average post-test", "—"],
  ["Sorting accuracy Δ", "—"],
  ["311 referrals taught", "curriculum"],
  ["Languages completed", "EN"],
];

function Orgs() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="eyebrow">Cohorts</p>
          <h1 className="mt-2 font-display text-3xl font-semibold">Organizations</h1>
          <p className="mt-2 max-w-xl text-sm text-asphalt-soft">
            Property managers, restaurants, BIDs, schools, nonprofits, event operators, workforce programs, and municipal
            partners can enroll cohorts once a live roster exists. This screen is labeled demonstration data on purpose.
          </p>
        </div>
        <Button asChild>
          <Link to="/academy/start">Start as an individual</Link>
        </Button>
      </div>

      <Badge variant="accent" className="mt-8">
        Pilot / demonstration data
      </Badge>

      <section className="mt-4 rounded-lg bg-card p-6 shadow-card">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">Example roster</p>
        <h2 className="mt-1 font-display text-2xl font-semibold">{DEMO.name}</h2>
        <dl className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {[
            ["Employees enrolled", DEMO.enrolled],
            ["Completed", DEMO.completed],
            ["Certified", DEMO.certified],
            ["Completion rate", `${DEMO.rate}%`],
            ["Average assessment", `${DEMO.avg}%`],
            ["Annual training due", DEMO.due],
          ].map(([k, v]) => (
            <div key={k as string}>
              <dt className="text-xs text-muted-foreground">{k}</dt>
              <dd className="mt-1 font-display text-2xl font-semibold tabular-nums">{v}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="mt-8 rounded-lg bg-sidebar p-6 text-sidebar-foreground">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-caltrans">Field impact</p>
        <h2 className="mt-1 font-display text-2xl font-semibold">Measured knowledge improvement</h2>
        <p className="mt-2 max-w-2xl text-sm text-sidebar-foreground/75">
          The partnership-grade metric is sorting accuracy before, after, and at 30-day retention. Until real cohorts
          exist, cells stay empty — not invented.
        </p>
        <dl className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {IMPACT_ROWS.map(([k, v]) => (
            <div key={k}>
              <dt className="text-[0.65rem] uppercase tracking-[0.14em] text-sidebar-foreground/55">{k}</dt>
              <dd className="mt-1 font-display text-xl font-semibold tabular-nums">{v}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="mt-10">
        <h2 className="font-display text-xl font-semibold">Why a cohort</h2>
        <ul className="mt-4 grid gap-3 sm:grid-cols-2">
          {[
            "Indoor paired containers only work if staff know what “compostable” does not mean in Oakland.",
            "Property managers have 14-day tenant notice duties under ORRO — the course names them.",
            "Illegal dumping next to a dumpster is a service-pathway problem, not automatically “the tenant.”",
            "A certificate is useless if the rules are national generic. This one is Oakland-specific and dated.",
          ].map((t) => (
            <li key={t} className="rounded-lg bg-card p-4 text-sm leading-relaxed shadow-card">
              {t}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

export default Orgs;
