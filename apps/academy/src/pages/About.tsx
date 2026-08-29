import { ADVANCED_BADGES, COURSE_VERSION, DISCLAIMER, LINKS, REVIEWED } from "@/lib/academy/sources";

function About() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <p className="eyebrow">Governance</p>
      <h1 className="mt-2 font-display text-3xl font-semibold">About STREETS Academy</h1>
      <p className="mt-4 text-[0.975rem] leading-relaxed text-asphalt-soft">
        STREETS Academy is civic infrastructure: a maintained course, not a pile of environmental trivia. Waste rules
        change. Every module stores jurisdiction, source, effective date, last reviewed, reviewer, and course version. A
        rules update should trigger review of every dependent question.
      </p>
      <dl className="mt-8 grid gap-3 text-sm sm:grid-cols-2">
        <Item k="Course" v="STREETS-WR101" />
        <Item k="Version" v={COURSE_VERSION} />
        <Item k="Last reviewed" v={REVIEWED} />
        <Item k="Jurisdiction" v="City of Oakland, California" />
      </dl>

      <h2 className="mt-10 font-display text-xl font-semibold">Independence</h2>
      <p className="mt-2 text-sm leading-relaxed text-asphalt-soft">{DISCLAIMER}</p>
      <p className="mt-3 text-sm leading-relaxed text-asphalt-soft">
        Possible future partner courses (WMAC, StopWaste, City of Oakland, CWS) must not be represented as partnerships
        until an agreement exists. None are claimed here.
      </p>
      <p className="mt-3 text-sm leading-relaxed text-asphalt-soft">
        STREETS Oakland is an independent civic evidence project. It is not represented as a City of Oakland system,
        nonprofit, City contractor, or academically validated program without separate documentation establishing that
        status.
      </p>

      <h2 className="mt-10 font-display text-xl font-semibold">Privacy and field ethics</h2>
      <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-asphalt-soft">
        <li>Conditions, not people.</li>
        <li>No biometric identification, person tracking, encampment targeting, or person-based prediction.</li>
        <li>Observe, document, maintain distance, refer — especially around hazardous material and sharps.</li>
        <li>
          A published conflict-of-interest firewall separates STREETS evidence from Pure Street commercial services.
        </li>
        <li>
          Public methodology lives at{" "}
          <a className="underline" href={LINKS.streetsAbout}>
            oaklandstreets.live/about
          </a>
          .
        </li>
      </ul>

      <h2 className="mt-10 font-display text-xl font-semibold">Advanced badges</h2>
      <p className="mt-2 text-sm text-asphalt-soft">
        After WR101, optional specializations. Not City credentials. Not issued in this pilot except as listed
        curriculum.
      </p>
      <ul className="mt-4 space-y-2">
        {ADVANCED_BADGES.map((b) => (
          <li key={b.id} className="rounded-md bg-card p-3 shadow-card">
            <p className="font-medium">{b.name}</p>
            <p className="mt-0.5 text-sm text-muted-foreground">{b.requires}</p>
          </li>
        ))}
      </ul>

      <h2 className="mt-10 font-display text-xl font-semibold">Languages</h2>
      <p className="mt-2 text-sm text-asphalt-soft">
        Architecture is ready for English, Spanish, Chinese, Vietnamese, Tagalog, and Arabic. This pilot ships in
        English. Translations must preserve Oakland-specific rules, not generic national recycling copy.
      </p>

      <h2 className="mt-10 font-display text-xl font-semibold">Accessibility</h2>
      <p className="mt-2 text-sm text-asphalt-soft">
        Target WCAG 2.2 AA. Keyboard navigation, named objects (assessments do not depend on color alone), tap targets at
        least 44px, plain-language mode, save-and-resume on this device.
      </p>
    </div>
  );
}

function Item({ k, v }: { k: string; v: string }) {
  return (
    <div className="rounded-md bg-card p-3 shadow-card">
      <dt className="text-xs text-muted-foreground">{k}</dt>
      <dd className="mt-1 font-medium">{v}</dd>
    </div>
  );
}

export default About;
