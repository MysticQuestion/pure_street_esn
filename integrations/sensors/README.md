# Sensor Integrations

ESN can ingest telemetry from a variety of environmental sensors. The
`sensors` directory contains connectors for third‑party sensor networks and
custom devices. Each subdirectory should implement client libraries,
parsers and authentication logic required to pull or receive sensor data.

## Submodules

- **PurpleAir** (`purpleair/`) – Placeholder for integration with the
  community‑driven PurpleAir air quality sensor network. A full
  implementation could periodically poll the PurpleAir API for sensor
  readings near ESN corridors.
- **Luftdaten** (`luftdaten/`) – Placeholder for integration with the
  open‑source Luftdaten / Sensor.Community air quality sensors.
- **Custom** (`custom/`) – Template for in‑house or bespoke sensors,
  including data formats, ingestion endpoints and calibration routines.