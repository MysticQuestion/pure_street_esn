# Data Architecture

ESN’s data architecture is designed around the principles of contract‑first schemas, geospatial indexing, and separation of concerns.

## Persistence Layer

- **PostgreSQL with PostGIS:** Used for storing reports, verification states, corridor definitions, and scoring outputs.  PostGIS enables efficient geospatial queries (e.g. finding all reports within a radius or aggregating by corridor).
- **Object Storage:** Images and attachments (photos, videos) are stored in a blob store such as Supabase Storage or S3.  Database records reference attachment URIs.
- **Redis (optional):** Provides caching and job queues for async tasks (e.g. sending notifications, background scoring).

## Schemas

All inbound and outbound payloads are defined by JSON Schema files in `data/schemas/`.  Key schemas include:

- `hazard-report.schema.json` – Structure of a report submitted by a user or imported from 311.
- `verification.schema.json` – State machine and metadata for verification and moderation workflows.
- `corridor-score.schema.json` – Aggregated scoring results for a corridor over time.
- `sensor-reading.schema.json` – Telemetry data from environmental sensors.

## Taxonomies

The human‑editable taxonomy in `data/taxonomy/` defines hazard categories, severity levels, tags, and context modifiers.  This taxonomy drives the UI, scoring algorithms, and routing logic.

## Data Pipeline

1. Raw reports and sensor readings are ingested via the API.
2. Verification and scoring services transform raw data into verified hazards and corridor scores.
3. Aggregated metrics are stored and exposed via dashboards and exports.
4. Open data snapshots (redacted) can be generated using scripts in the `scripts/` directory to promote transparency and research.
