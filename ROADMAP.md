# ESN Roadmap

This document outlines the planned stages of development for the Environmental Sentinel Network.  Dates are approximate and may adjust based on feedback, funding, and emerging opportunities.

## Phase 0 – Foundation (Now → 3 weeks)

- Initialize monorepo with governance and documentation
- Define data contracts (hazard taxonomy, report schema)
- Scaffold ESN‑Lite API using FastAPI and PostGIS
- Migrate existing sensor intelligence module
- Set up continuous integration, linting, and testing

## Phase 1 – ESN‑Lite (0–90 days)

- Implement hazard report intake endpoints (`POST /v1/reports`, `GET /v1/reports/{id}`)
- Implement verification queue with confidence scoring and duplicate detection
- Build minimal dashboard: report queue, corridor heat map, and export (PDF/CSV)
- Develop basic mobile/web client for citizen and crew reporting (Expo/Next.js)
- Prepare pilot data import from Oakland 311 datasets

## Phase 2 – ESN v1 (3–6 months)

- Integrate external sensors (e.g. air quality via PurpleAir)
- Add ML clustering for deduplication and anomaly detection
- Implement predictive corridor sanitation modeling
- Expand dashboard with SLA tracking and trend analysis
- Pilot multi‑city deployment and refine API to support multi‑tenant instances
- Publish research methodologies and early findings in docs/06-research-and-reporting/

## Phase 3 – ESN v2 (6–12 months)

- Full 311 API integration (bidirectional) for participating cities
- Incorporate environmental justice analytics and equity dashboards
- Implement procurement performance benchmarking and ROI calculators for BIDs
- Explore cryptographic audit integrity layer (optional)
- Release open data snapshots and public dashboards for transparency

## Success Criteria

At each phase, we will evaluate success based on:

- **Operational readiness:** the system runs end‑to‑end with real data
- **Usability:** field crews and residents can report and view hazards easily
- **Accuracy:** verification and scoring align with on‑the‑ground observations
- **Impact:** measurable improvements in corridor sanitation and response times

Feedback from stakeholders (city agencies, NGOs, residents) will refine priorities for subsequent phases.