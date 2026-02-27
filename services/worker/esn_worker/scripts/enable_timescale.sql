-- Run once (DB must have timescaledb extension installed)
CREATE EXTENSION IF NOT EXISTS timescaledb;

-- Convert sensor_readings to hypertable
SELECT create_hypertable('sensor_readings', 'captured_at', if_not_exists => TRUE);

-- Helpful index for downsampling queries
CREATE INDEX IF NOT EXISTS ix_sensor_readings_sensor_metric_time
  ON sensor_readings (sensor_id, metric, captured_at DESC);