# System Architecture

The Environmental Sentinel Network follows a microservice architecture to support modularity, scalability, and maintainability.

## Services

1. **API Service (`services/api`)** – Provides REST endpoints for reporting hazards, querying reports, and exporting data.  Acts as the gateway between clients and other services.
2. **Verifier Service (`services/verifier`)** – Implements the verification engine, including metadata checks, duplicate detection, confidence scoring, and moderation queues.
3. **Scoring Service (`services/scoring`)** – Computes hazard severity and corridor health scores based on domain‐specific models.
4. **Routing Service (`services/routing`)** – Determines where verified hazards should be sent (field crews, city departments, BIDs) based on severity and location.
5. **Notifications Service (`services/notifications`)** – Sends status updates via SMS, email, or push notifications.
6. **Sensor Intelligence (`services/sensor-intelligence`)** – Processes telemetry from environmental sensors, such as air quality monitors, and emits alerts.

## Data Flow

1. A resident or crew member submits a hazard report via the mobile or web app.
2. The API service stores the report and forwards it to the Verifier service.
3. The Verifier validates metadata, checks for duplicates, and calculates a confidence score.  It either auto‑verifies the report or queues it for moderation.
4. Verified reports are passed to the Scoring service, which updates corridor health metrics.
5. The Routing service dispatches work orders to appropriate responders (Pure Street crews, city 311) based on severity and SLA rules.
6. Notifications are sent to the reporter and stakeholders.  Dashboards and reports are updated.

## Deployment

Services communicate over HTTP/JSON.  In a production deployment, asynchronous messaging (e.g. Redis, Kafka) can be added to decouple services further.  The infrastructure folder provides Docker Compose for local development and templates for Terraform/Kubernetes in staging and production.
