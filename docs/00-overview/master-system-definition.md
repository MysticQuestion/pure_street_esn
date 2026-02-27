# Environmental Sentinel Network (ESN)
## Master System Definition (ESN-Lite → ESN Core → ESN Premiere)

> Pure Street | Civic Environmental Intelligence Infrastructure  
> Document: master-system-definition.md  
> Purpose: canonical system definition for engineering, procurement, grants, and investor diligence.

---

## 1. Definitive System Identity

Environmental Sentinel Network (ESN) is a verification-driven civic environmental intelligence platform that converts community hazard reports, municipal service-resolution data, environmental measurements, and corridor-level degradation signals into measurable block scores, corridor risk modeling, and an operational Neighborhood Health Index.

ESN is not a reporting app. It is a closed-loop verification and response architecture:

**Report → Verify → Act → Measure → Publish → Improve**

---

## 2. System Tiers

### 2.1 ESN-Lite (Prototype / Pilot / Hackathon)
**Goal:** prove the closed loop with minimal surface area.

**Includes:**
- Geo-tagged hazard reporting with photos
- Hazard taxonomy + severity selection
- Status lifecycle (Open/Verified/In Progress/Resolved)
- Block Clean Score (0–100) with basic recurrence + resolution-time weighting
- Corridor aggregation + risk bands + heat map
- Basic dashboard + CSV/PDF export
- Basic de-duplication (radius clustering)
- Manual 311 export or API-ready connector stub
- Simple dispatch board and route clustering (lite)

### 2.2 ESN Core (Operational Municipal/BID Product)
**Goal:** operate as a dependable field and analytics system.

**Adds:**
- Reputation scoring + moderation queue + spam controls
- Advanced Block Environmental Health Index (EHI) with historical archive + degradation velocity
- Corridor risk modeling: clustering, seasonality, rainfall-triggered amplification, proximity overlays
- Environmental context: AQI, heat, rainfall, wind dispersion, correlation analytics
- Workforce integration: dispatch optimization, SLA tracking, cost-per-block, equipment logic
- Institutional dashboards: performance benchmarking, corridor KPIs, budget modeling
- Research hub: quarterly reports, ESG exports, open data snapshots, audit-ready exports

### 2.3 ESN Premiere / Ultimate (Multi-City Infrastructure SaaS)
**Goal:** multi-tenant, cross-city benchmarking, predictive intelligence.

**Adds:**
- AI-assisted risk forecasting + hotspot probability modeling
- Multi-city tenant isolation + white-label configurations
- ESG + climate resilience dashboards at investor-grade rigor
- Open Environmental API + SDK for sensors/partners
- Optional tamper-evident audit layer (future phase)

---

## 3. Core Layers (Canonical)

### 3.1 Community Intelligence Layer
- Structured geo-tagged reporting
- Photo evidence + severity weighting
- Follow blocks/corridors + alerts
- Comment threads, tags, volunteer coordination
- Verified reporter tiers + reputation scoring
- Anonymous reporting option (policy gated)

### 3.2 Block-Level Scoring Engine
- Clean Score (0–100) and EHI composite
- Severity-weighted degradation
- Recurrence multipliers + decay model
- Resolution time bonuses/penalties
- Trend indicators and historical performance archive

### 3.3 Corridor Risk Modeling
- Block-to-corridor aggregation
- Density clustering + recurrence heat modeling
- Seasonality + rainfall/storm amplification
- Equity overlays (schools, vulnerable populations, EJ indicators)
- Parcel-level aggregation view (where permitted)

### 3.4 Environmental Context & Measurement
- AQI + sensor feeds ingestion architecture
- Weather feeds: rainfall, heat index, wind dispersion
- Time-series storage + event correlation analytics
- Heat-island overlays and future noise proxy modeling

### 3.5 Research & Civic Intelligence Hub
- Grant-ready reporting exports (PDF/CSV)
- Open-data snapshots (redacted/anonymized)
- Performance transparency dashboards
- Policy tracking + research collaboration framework

### 3.6 Institutional & Workforce Integration
- Dispatch routing optimization + smart scheduling
- Equipment allocation logic + cost-per-block analytics
- SLA compliance dashboards for BIDs/municipal partners
- Environmental impact metrics (tons diverted, emissions offset proxies)

---

## 4. Data Integration (All Tiers)
- 311 ingestion + municipal resolution feeds
- Open data portal sync
- GIS overlays
- Weather + sensor feeds
- Longitudinal storage (time-series + spatial)

---

## 5. Defensibility (Moat)
- Longitudinal block/corridor dataset accumulation
- Benchmarking archive and corridor performance history
- Verification + workforce integration synergy
- Cross-city standardization of EHI
- Predictive degradation modeling (phase-based)

---

## 6. Revenue Model (Scalable)
- Free community layer
- BID corridor dashboards (subscription)
- Municipal SaaS contracts
- ESG reporting services
- Grant/impact reporting support
- Multi-city licensing + optional data services (aggregated/anonymized)

---

## 7. Technical Direction (Reference)
- Mobile: React Native / Expo
- Web dashboards: React + TypeScript
- Backend: FastAPI (or Node/TS) + PostgreSQL + PostGIS + Redis
- Worker: task queue for scoring, clustering, ingestion, reporting
- Infra: Docker + Terraform; K8s as scaling layer

---

## 8. Success Criteria (Initial)
- Median verification time decreases over pilot
- Corridor risk bands correlate with observed conditions
- SLA adherence improves for partnered corridors
- Monthly corridor report export is used by at least one institutional partner
