# STREETS Academy (source snapshot)

Flagship course **STREETS-WR101** — Oakland Waste & Recycling Certification.

This directory is the curriculum implementation snapshot (modules, labs, 98th Avenue simulation, certificate). The **live product** is deployed from `MysticQuestion/sentinel-civic-heart` at:

**https://oaklandstreets.live/academy**

It is independent civic education. It complements Oakland Recycles and OAK311. It does not replace them.

## Layout

```
src/lib/                  curriculum, progress store, certificate, scenarios
src/components/           sort station, module player, sim, certificate view
src/pages/                /academy nested routes (react-router)
src/features/             AcademyApp shell
```

Progress persist key: `streets-academy-wr101` (device localStorage). No account required.

Certificate verification on the live site is `/academy/verify`. Site `/verify` is an admin redirect and must not be reused.

See `docs/08-academy/STREETS-WR101.md` for the curriculum.
