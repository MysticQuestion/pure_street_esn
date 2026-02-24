# Integration Map

ESN interacts with a variety of external systems.  This section provides a high‑level overview of current and planned integrations.

| Domain       | Integration              | Status       | Notes |
|-------------|--------------------------|-------------|-------|
| **City 311** | Oakland 311 API         | Planned      | Import existing complaints and route verified reports.  Export resolved statuses back to 311. |
|             | San Francisco 311 API    | Planned      | Same pattern as Oakland; to be implemented after the pilot. |
| **GIS**     | Mapbox                   | In Use       | Provides base maps and tiles for corridor heat maps.  Future phases may integrate with ArcGIS. |
| **Sensors** | PurpleAir                | Planned      | Ingest real‑time air quality readings for corridor scoring. |
|             | Custom Waste Sensors     | Future       | Explore integrating waste‑density sensors or IoT devices. |
| **Messaging** | Twilio (SMS)           | Planned      | Send status updates to residents and crew via SMS. |
|             | SendGrid (Email)         | Planned      | Deliver reports, alerts, and monthly summaries to stakeholders. |
| **Research** | Public Data Portals      | Planned      | Publish redacted open datasets and dashboards for transparency and research. |

Integration modules live in `integrations/` and are organized by domain (city‑311, gis, sensors, messaging).  Each integration has its own README and tests.
