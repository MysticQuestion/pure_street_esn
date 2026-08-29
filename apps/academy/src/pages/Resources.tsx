import type { ReactNode } from "react";
import { CONTACTS, DAVIS_STREET, HHW_OAKLAND, LINKS, REVIEWED } from "@/lib/academy/sources";

function Resources() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <p className="eyebrow">Who handles what</p>
      <h1 className="mt-2 font-display text-3xl font-semibold">Oakland pathways</h1>
      <p className="mt-2 text-sm text-asphalt-soft">
        Confirm hours and set-out rules on the official pages before you act. Numbers below were checked against public
        pages on {REVIEWED}.
      </p>

      <section className="mt-10 space-y-6">
        <Card title="California Waste Solutions" href={LINKS.cws}>
          Exclusive residential recycling collector in Oakland. Household battery and used-motor-oil programs — confirm
          current bag-on-cart instructions on CalWaste / Oakland Recycles. Missed recycling carts belong here, not with
          WM.
        </Card>
        <Card title="Waste Management of Alameda County" href={LINKS.wm}>
          Exclusive trash and compost collection. Bulky drop-off at {DAVIS_STREET.name}, {DAVIS_STREET.address}, up to 4
          cubic yards with proof of Oakland residency; curbside bulky by appointment. {CONTACTS.bulky.value}. Place items
          at the curb by 6 a.m. on the appointment day. Do not set bulky out more than one day early — that can be fined.
        </Card>
        <Card title="Oakland 311 / Public Works" href={LINKS.oak311}>
          Public right-of-way: illegal dumping, sidewalk obstruction, abandoned hazardous material, street sharps. Street
          litter cans are for pedestrians’ small personal waste only — it is unlawful to put household or business waste
          in, on, or beside them. STREETS documents conditions; it does not replace 311.
        </Card>
        <Card title="StopWaste / Alameda County HHW" href={LINKS.hhw}>
          County reduction programs and ORRO / SB 1383 enforcement. Household hazardous waste drop-off is free, no
          appointment. {HHW_OAKLAND.name}: {HHW_OAKLAND.address}. {HHW_OAKLAND.hours} {HHW_OAKLAND.note}{" "}
          {CONTACTS.hhw.value}.
        </Card>
        <Card title="Oakland Recycles" href={LINKS.whatGoesWhere}>
          Authoritative what-goes-where. Sorting guide dated Dec 2025. Golden rule for recycling: clean, empty, dry, and
          loose — never bagged. Recycle plastics by shape (bottles, jugs, tubs), not by the chasing-arrows number.
          Oakland Recycles line (SAVE): {CONTACTS.save.value}.
        </Card>
        <Card title="Property owners and businesses">
          Adequate service, indoor color-coded paired containers next to every trash can (restrooms excepted), annual
          education, inspection and feedback. Commercial property managers: tenant notices no later than 14 days after
          move-in and at least 14 days before move-out. Covered food generators: written edible-food recovery agreement
          and monthly pound records — composting leftovers is not a substitute for feeding people.
        </Card>
      </section>

      <p className="mt-10 text-xs text-muted-foreground">
        Sources:{" "}
        <a className="underline" href={LINKS.cityWaste}>
          oaklandca.gov Waste and Recycling
        </a>
        ,{" "}
        <a className="underline" href={LINKS.laws}>
          Oakland Recycles laws
        </a>
        ,{" "}
        <a className="underline" href={LINKS.bulky}>
          bulky service
        </a>
        ,{" "}
        <a className="underline" href={LINKS.hhwFacilities}>
          HHW facilities
        </a>
        .
      </p>
    </div>
  );
}

function Card({ title, href, children }: { title: string; href?: string; children: ReactNode }) {
  return (
    <article className="rounded-lg bg-card p-5 shadow-card">
      <h2 className="font-display text-lg font-semibold">
        {href ? (
          <a className="hover:underline" href={href}>
            {title}
          </a>
        ) : (
          title
        )}
      </h2>
      <p className="mt-2 text-sm leading-relaxed text-asphalt-soft">{children}</p>
    </article>
  );
}

export default Resources;
