# Sensor Data Specification

In future phases, ESN will ingest telemetry from distributed environmental sensors (e.g. air quality monitors).  This document defines the data model for sensor readings.

## Schema

Sensor readings are defined in `data/schemas/sensor-reading.schema.json` and include:

- `sensor_id` – Unique identifier for the sensor
- `node_id` – Logical node or location grouping
- `temperature_c` – Ambient temperature in degrees Celsius
- `pm25_ug_m3` – PM2.5 concentration in micrograms per cubic meter
- `no2_ppb` – Nitrogen dioxide concentration in parts per billion
- `noise_db` – Sound level in decibels
- `humidity_pct` – Relative humidity in percent
- `captured_at` – Timestamp of the reading (ISO 8601)

Sensors may report additional metrics (e.g. ozone, CO₂) which will be added in later schema versions.  Sensor data is processed by the `sensor-intelligence` module, which computes risk scores and generates alerts when thresholds are exceeded.

## Integration

To onboard new sensor types, contributors should:

1. Define a new sensor schema or extend the existing one in `data/schemas/`.
2. Implement adapters in `integrations/sensors/` to ingest and normalize raw sensor data.
3. Write unit tests for the new integration.
