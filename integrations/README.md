# Integrations

The `integrations` folder contains adapters and connectors to external systems.
Each subfolder groups related integration code, configuration and
documentation. This structure ensures that dependencies are modular and that
city‑specific logic does not pollute the core ESN services.

## Submodules

- **`city-311/`** – Connectors for municipal 311 systems. Implementations
  should handle authentication, payload formatting and response parsing for
  specific cities (e.g. Oakland, San Francisco).
- **`gis/`** – Geographic information system (GIS) integrations such as
  Mapbox or ArcGIS. These modules allow ESN to display maps, perform
  geospatial analysis and integrate with existing city GIS infrastructure.
- **`sensors/`** – Connectors for third‑party environmental sensors
  (e.g. PurpleAir, Luftdaten) and custom hardware. These modules ingest
  telemetry into the ESN sensor API.
- **`messaging/`** – Outbound notification channels such as Twilio (SMS) and
  SendGrid (email). These modules standardise how ESN alerts are dispatched
  to users and partners.

Each integration may define its own README with setup instructions and may
expose a Python package or REST client under `services` for consumption by
other components.