# Environmental Sentinel Network (ESN) by Pure Street

> Verification‑driven environmental hazard intelligence, response coordination, and accountability for urban corridors.

**ESN** is a civic‑technology platform developed under **Pure Street** to transform environmental neglect—illegal dumping, biohazards, sidewalk waste, air‑quality spikes, and infrastructure decay—into structured, time‑stamped, geo‑verified data that can be acted on, audited, and used to improve corridor health over time.

It is not simply a reporting app.  It is a **verification and response architecture**.

---

## Why ESN Exists

Municipal environmental response systems often suffer from:

- inconsistent resident reporting
- fragmented departmental data
- limited verification
- reactive dispatching
- low transparency
- weak corridor‑level analytics

The result is high spending, low accountability, and poor feedback loops—especially in environmental justice communities.  ESN addresses this through a closed loop:

**Report → Verify → Act → Measure → Publish → Improve**

---

## ESN‑Lite vs Full ESN

### ESN‑Lite (Prototype / Pilot)

- Structured hazard reporting (photo + geo + category)
- Verification queue and confidence scoring
- Corridor heat map and block‑level sanitation scoring
- PDF export reporting
- Municipal / partner routing workflows
- GitHub‑documented transparency and research methods

### Full ESN (Phase II–III)

- Sensor mesh integration
- ML clustering and deduplication at scale
- Predictive sanitation modeling
- 311 API integrations
- Environmental justice analytics
- Procurement performance benchmarking
- (Optional future) cryptographic audit integrity layer

---

## Repository Overview

This monorepo contains everything needed to build and operate the Environmental Sentinel Network:

- **apps/** – user‑facing interfaces (reporting, dashboard)
- **services/** – backend systems (API, verifier, scoring, routing, notifications, sensor intelligence)
- **data/** – schemas, taxonomies, sample data, evaluation notebooks
- **docs/** – product narrative, architecture, operations, policy, procurement, research
- **infra/** – local/dev/prod deployment infrastructure
- **integrations/** – connectors for GIS, messaging, sensors, city systems
- **scripts/** – operational tools (data import/export, backfill, snapshot generation)
- **.github/** – CI workflows, issue/PR templates, security scanning

Each major directory contains its own README describing what it does, how to run it, what environment variables it needs, and who maintains it.

---

## Strategic Positioning

ESN gives Pure Street a defensible advantage by combining:

- civic technology
- field operations
- environmental analytics
- municipal procurement readiness
- research‑grade reporting

This supports:

- Business Improvement District (BID) corridor metrics
- grant impact reporting
- public works procurement proposals
- environmental justice accountability
- long‑term city‑to‑city replication

---

## Quick Start (Planned ESN‑Lite Development Environment)

```bash
# Clone this repository
git clone https://github.com/your‑username/purestreet‑esn.git
cd purestreet‑esn

# Start local dependencies (PostgreSQL/PostGIS, Redis, MinIO optional)
docker compose -f infra/docker/docker-compose.yml up -d

# Run the API (after setup)
cd services/api
python -m venv .venv
source .venv/bin/activate  # On Windows use: .venv\Scripts\activate
pip install -e ".[dev]"
uvicorn app.main:app --reload --port 8000
```

---

## Current Status

This repository is under active development.  The initial focus is **ESN‑Lite** for Oakland corridor pilots:

- hazard reporting
- verification
- scoring
- dashboard exports
- operational response workflows

See `ROADMAP.md`, `docs/01-architecture/system-architecture.md`, and `docs/03-data-and-models/scoring-spec.md` for details.

---

## Contributing

Contributions are welcome! Please read `CONTRIBUTING.md`, `CODE_OF_CONDUCT.md`, and `SECURITY.md` before submitting issues or pull requests.

---

## License

This project is licensed under the terms of the MIT License.  See `LICENSE` for details.