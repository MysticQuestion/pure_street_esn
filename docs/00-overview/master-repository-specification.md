# ESN Master Repository Specification

This document serves as the canonical reference for the **Environmental Sentinel Network (ESN)** repository.  It synthesizes the system’s purpose, feature tiers, architectural expectations, governance principles, revenue logic and defensibility into a single, comprehensive blueprint.  It is designed to be intelligible to engineers, investors, municipal partners and community stakeholders alike.

## I. Platform Classification

ESN is a **civic environmental intelligence infrastructure platform**.  It is not a simple reporting tool, a replacement for 311, a sanitation tracker or a social feed.  Instead, it provides a series of coordinated services that transform disparate signals into actionable intelligence:

- **Environmental signal aggregation** – combining community reports, sensor readings, municipal records and external measurements.
- **Block‐level scoring engine** – generating a normalized 0–100 clean score for each block based on hazard severity, recurrence and resolution latency.
- **Corridor risk modeling** – aggregating block scores into corridor‑level risk bands and forecasting risk trajectories.
- **Workforce optimization** – powering routing and dispatch based on risk, severity and service level agreements.
- **Civic analytics SaaS** – exposing dashboards, reports and data exports for business improvement districts (BIDs), municipal departments and researchers.
- **Longitudinal archive** – storing years of environmental performance data to enable trend analysis and benchmarking.

## II. Product Tiers & Feature Distribution

ESN is designed to evolve through clear tiers.  This allows early pilots to prove value quickly while leaving room for an enterprise‑grade product.

### 🟢 ESN‑Lite (Prototype / Pilot)

**Objective:** Deliver a working demonstration of the scoring logic, corridor aggregation and basic dashboards.

**Features:**

1. **Community reporting (minimal)**
   - Geo‑tag submission via mobile or web.
   - Single photo upload.
   - Category selection (dumping, graffiti, damage, biohazard, etc.).
   - Severity slider (1–5).
   - Status toggle (open / resolved).

2. **Block scoring engine (core logic)**
   - Severity‑weighted scoring.
   - Recurrence multiplier to penalize repeated offenses.
   - Resolution time modifier (fast responses boost scores).
   - Block clean score (0–100).
   - Basic trend indicator (improving / declining).

3. **Corridor aggregation**
   - Average of constituent blocks.
   - Risk band classification (low / moderate / high / severe).
   - Simple heatmap visualization.

4. **Dashboard**
   - Block list with current scores.
   - Corridor ranking table.
   - Score change over time chart.
   - Issue density chart.

5. **Data storage**
   - Prototype uses PostgreSQL or SQLite.
   - Schema captures reports, blocks, corridors and resolution events.

### 🔵 ESN Core (Municipal / BID Deployable)

**Objective:** Provide a deployable product for BIDs and city pilots.  Builds on ESN‑Lite with expanded community engagement, improved scoring and operational integrations.

**Additional Features:**

1. **Expanded community intelligence layer**
   - Comment threading on reports.
   - Validation workflow for moderators.
   - Verified citizen badges and trust scores.
   - Reputation scoring for frequent reporters.
   - Volunteer tagging and coordination.
   - Follow / subscribe to blocks and corridors.
   - Issue upvote weighting.
   - Duplicate report merging logic.

2. **Advanced block‑level scoring**
   - Historical performance archive for each block.
   - Rolling 30/60/90‑day trend lines.
   - Environmental Health Index (EHI) composite score, normalizing across categories.
   - Normalized degradation curves to standardize across block sizes.
   - Time‑weighted recurrence penalties.
   - Predictive decay modeling using simple heuristics.

3. **Corridor risk modeling**
   - Spatial density clustering of issues.
   - Recurrence heat mapping.
   - Seasonal pattern recognition.
   - Rainfall‑triggered amplification model (e.g. illegal dumping increases after storms).
   - Stormwater proximity weighting.
   - School and equity overlays to highlight environmental justice concerns.
   - Parcel‑level aggregation view.
   - GIS integration support (Mapbox, ArcGIS).

4. **Environmental context layer**
   - Air quality index (AQI) ingestion.
   - Weather API integration for temperature, rainfall and wind.
   - Heat index tracking.
   - Correlation charts (e.g. dumping vs rainfall).
   - Historical measurement storage.
   - Sensor integration architecture (for Phase III sensors).

5. **Workforce integration layer**
   - Crew dispatch optimization logic.
   - Risk‑prioritized routing (attend to critical blocks first).
   - Equipment allocation modeling.
   - Cost‑per‑block analytics.
   - SLA tracking dashboards for BIDs and city partners.
   - Time‑to‑resolution reporting.
   - Workforce hour logging.
   - Impact tracking (waste diverted, emissions avoided).

6. **Civic intelligence hub**
   - Corridor performance export to PDF / CSV.
   - ESG report generation.
   - Quarterly neighborhood health reports.
   - Public works transparency comparison metrics.
   - Grant‑ready environmental justice reporting.
   - Open data synchronization.
   - Research API endpoints.

### 🟣 ESN Ultimate (Multi‑City Infrastructure Platform)

**Objective:** Support multi‑tenant deployments, predictive modeling, sensor integration and institutional analytics at scale.

**Additional Features:**

1. **Multi‑tenant SaaS architecture**
   - Separate data stores per city or tenant.
   - Role‑based permissions (resident, crew, municipal, admin).
   - Tenant dashboards.
   - Municipal‑level comparative benchmarking.
   - Cross‑city anonymized index benchmarking.

2. **Predictive modeling engine**
   - Machine learning–based degradation forecasting.
   - Corridor collapse risk probability modeling.
   - Illegal dumping hotspot prediction.
   - Time‑series anomaly detection.
   - AI‑assisted resource allocation recommendations.

3. **Sensor intelligence layer**
   - Ingestion of IoT sensors (smart bins, air quality sensors, cameras).
   - Fill‑level monitoring for waste containers.
   - Illegal dumping camera metadata ingestion (license plate obfuscation built in).
   - Noise proxy modeling.
   - Heat island sensor integration.
   - Storm drain contamination alerts.

4. **Longitudinal environmental archive**
   - Five‑year performance tracking for blocks and corridors.
   - Corridor recovery index – measuring improvement after interventions.
   - Economic correlation overlays (compare environmental scores with business activity).
   - Property value correlation modeling.
   - Small business stabilization correlation layer (link environmental health to economic resilience).

5. **Institutional analytics suite**
   - Budget allocation simulation for municipal planners.
   - Cost‑benefit impact modeling for proposed interventions.
   - Environmental justice impact analysis.
   - Carbon accounting integration.
   - ESG compliance toolkit for BIDs and developers.
   - Public‑private transparency dashboards.

## III. System Architecture Expectations

### Frontend

- **Web dashboard (React / Next.js)** – for operations, corridor analytics, and research access.
- **Mobile reporting interface (React Native)** – for residents and crews.
- **GIS visualization layer** – Mapbox or Leaflet for block and corridor maps.
- **Admin portal** – manage categories, verify reports, assign tasks.
- **Institutional dashboard** – cross‑corridor and cross‑city analytics.

### Backend

- **Python FastAPI** – RESTful API serving frontend clients.
- **Scoring service** – microservice computing block scores and corridor risk bands.
- **Aggregation engine** – aggregates block data into corridors and calculates trend lines.
- **Risk modeling service** – implements predictive algorithms and environmental correlations.
- **Notification service** – handles email/SMS/web push for alerts and updates.
- **Routing service** – integrates with 311 and dispatch systems for crew routing.
- **Data ingestion service** – ingests sensor feeds, weather data and municipal dumps.

### Data

- **PostgreSQL** as the primary relational store.
- **PostGIS** for spatial queries and corridor modeling.
- **Redis** for caching frequently accessed scores.
- **Time‑series database** (e.g. TimescaleDB) for sensor and environmental measurements.
- **S3‑compatible storage** for photos and other large attachments.

### DevOps

- Services are containerized via **Docker**.
- Deployment orchestrated by **Kubernetes** with Helm charts for multi‑city clusters.
- **CI/CD pipelines** handle testing, linting, security scans, build and deploy.
- Infrastructure managed via **Terraform**.
- **Role‑based authentication** integrated with Supabase or Auth0 in early phases.
- Architecture aligned for **SOC2** compliance and audit logging.

## IV. Governance & Ethics Layer

- **Transparent scoring algorithms** – publish formulas and weighting factors.
- **Anti‑bias validation** – review scoring for disproportionate impact on specific neighborhoods.
- **Data anonymization** – strip personally identifiable information from public datasets.
- **Freedom of information (FOIA) readiness** – provide export formats for public requests.
- **Community oversight** – advisory boards and open comment periods on major changes.
- **Data retention policy** – define retention periods for raw photos vs. derived metrics.
- **Privacy by design** – minimize PII, respect sensor privacy, and adopt least privilege access.

## V. Revenue Architecture

- **Community tier** – free access for residents to submit reports and view aggregate scores.
- **BID dashboard subscription** – monthly or annual subscription providing corridor analytics, SLA tracking, PDF exports and custom reports.
- **Municipal SaaS contracts** – pricing tied to corridor count, resident population and number of integrated systems.
- **ESG analytics add‑on** – additional module for carbon accounting and sustainability reporting.
- **Grant reporting module** – preconfigured templates for environmental justice and climate grants.
- **Sensor hardware integration** – leasing or resale of smart bins and environmental sensors.
- **Multi‑city licensing** – per‑city fee for the ultimate tier.
- **Data API tier** – paid access to longitudinal datasets for researchers and third parties.

## VI. Defensibility Mechanisms

- **Longitudinal dataset moat** – multi‑year block‑level data is difficult for competitors to replicate.
- **Corridor benchmark archive** – unique benchmarks by block, corridor and city.
- **Workforce integration flywheel** – stronger insights improve routing efficiency, which increases adoption and data fidelity.
- **Institutional dashboard lock‑in** – once BIDs and departments rely on the metrics for budgeting and compliance, switching costs rise.
- **Environmental risk modeling IP** – proprietary predictive models tuned to urban sanitation patterns.
- **Data network effects** – more participants yield more comprehensive insights across neighborhoods and cities.

## VII. Core Value Proposition

ESN converts:

- **Reactive complaints** → structured, measurable environmental intelligence.
- **Fragmented data** → unified neighborhood health indices and corridor scores.
- **Manual prioritization** → risk‑based resource allocation.
- **Isolated cleanup efforts** → systematic corridor stabilization.

It enables residents to participate, empowers municipal agencies to act strategically and allows investors and researchers to quantify impact.

## VIII. Final Positioning

ESN is a civic environmental intelligence system that quantifies, predicts and optimizes neighborhood environmental health at the block and corridor levels.  By integrating community input, municipal data, environmental context and workforce execution, it provides a scalable, defensible SaaS platform that supports healthier neighborhoods, stronger economic corridors and transparent environmental governance.

## IX. Physical Repository Structure and Data Model

### Monorepo Structure

The ESN repository is organized as a monorepo to unify frontend, backend and documentation in a single codebase.  A recommended top‑level layout is:

```text
esn-infrastructure/
├── docs/                     # Institutional framing & strategy (Markdown)
│   ├── 00_README.md          # Executive overview
│   ├── 01_VISION_AND_THESIS.md
│   ├── … (market analysis, architecture, data model, etc.)
├── apps/
│   ├── web/                  # Next.js / React dashboard
│   └── mobile/               # React Native reporting interface
├── packages/
│   ├── database/             # Prisma schema or SQL migrations
│   ├── scoring-engine/       # Core scoring algorithms
│   └── config/               # Shared configs
├── services/
│   ├── api/                  # FastAPI backend
│   ├── worker/               # Background tasks (ingestion, modeling)
│   ├── gis/                  # PostGIS spatial modeling utilities
│   └── …                    # Additional services (notifications, routing)
├── .github/                  # CI/CD workflows and templates
├── docker-compose.yml        # Container orchestration for dev and testing
└── README.md                 # Public-facing repository overview
```

### Foundational Database Schema (ESN Core)

The following schema expresses the core entities in ESN using a relational model.  This aligns with the `DATA_MODEL.md` specification and provides a foundation for Prisma or SQL migrations:

```prisma
// schema.prisma

model User {
  id         String    @id @default(uuid())
  role       Role      @default(CITIZEN) // CITIZEN, MUNICIPAL, ADMIN
  reputation Int       @default(0)
  reports    Report[]
  createdAt  DateTime  @default(now())
}

model Block {
  id         String    @id @default(uuid())
  name       String
  coordinates Json      // GeoJSON boundary
  corridorId String
  corridor   Corridor  @relation(fields: [corridorId], references: [id])
  cleanScore Float     // 0–100 Environmental Health Index
  reports    Report[]
  updatedAt  DateTime  @updatedAt
}

model Corridor {
  id        String    @id @default(uuid())
  name      String
  riskLevel RiskTier  @default(LOW) // LOW, MODERATE, HIGH, CRITICAL
  blocks    Block[]
}

model Report {
  id         String   @id @default(uuid())
  userId     String
  user       User     @relation(fields: [userId], references: [id])
  blockId    String
  block      Block    @relation(fields: [blockId], references: [id])
  category   Category // DUMPING, GRAFFITI, DAMAGE, BIOHAZARD
  severity   Int      // 1–5
  status     Status   @default(OPEN)
  photoUrl   String?
  createdAt  DateTime  @default(now())
  resolvedAt DateTime?
}

enum Role { CITIZEN MUNICIPAL ADMIN }
enum Category { DUMPING GRAFFITI DAMAGE BIOHAZARD }
enum Status { OPEN INVESTIGATING RESOLVED }
enum RiskTier { LOW MODERATE HIGH CRITICAL }
```

In later phases (ESN Ultimate) the data model can be extended to incorporate sensors, predictive analytics and economic overlays.  For example:

```prisma
model Sensor {
  id          String    @id @default(uuid())
  type        SensorType
  location    Json      // point or polygon for sensor placement
  installedAt DateTime  @default(now())
  readings    SensorReading[]
}

model SensorReading {
  id          String    @id @default(uuid())
  sensorId    String
  sensor      Sensor    @relation(fields: [sensorId], references: [id])
  capturedAt  DateTime
  metric      String    // e.g. PM2.5, temperature, noise
  value       Float
}

model Prediction {
  id         String    @id @default(uuid())
  corridorId String
  corridor   Corridor  @relation(fields: [corridorId], references: [id])
  predictedAt DateTime  @default(now())
  metric     String    // e.g. risk_score, dumping_volume
  value      Float
  horizon    Int       // days into the future
}

model EconomicIndicator {
  id         String    @id @default(uuid())
  blockId    String
  block      Block     @relation(fields: [blockId], references: [id])
  metric     String    // e.g. business_density, property_value, vacancy_rate
  value      Float
  recordedAt DateTime  @default(now())
}

enum SensorType { AIR_QUALITY NOISE TEMPERATURE HUMIDITY CAMERA SMART_BIN }
```

These additional tables enable ingestion of continuous sensor feeds, storage of predictive outputs and tracking of economic context around each block and corridor.  They provide the basis for the advanced analytics described in the ESN Ultimate tier.
