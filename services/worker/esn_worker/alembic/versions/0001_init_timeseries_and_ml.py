from alembic import op
import sqlalchemy as sa

revision = "0001_init_timeseries_and_ml"
down_revision = None
branch_labels = None
depends_on = None

def upgrade():
  # sensor_readings
  op.create_table(
    "sensor_readings",
    sa.Column("id", sa.String(), primary_key=True),
    sa.Column("tenant_id", sa.String(), nullable=False),
    sa.Column("sensor_id", sa.String(), nullable=False),
    sa.Column("captured_at", sa.DateTime(), nullable=False),

    sa.Column("metric", sa.String(), nullable=False),
    sa.Column("value", sa.Float(), nullable=False),
    sa.Column("unit", sa.String(), nullable=True),

    sa.Column("quality", sa.Enum("GOOD","SUSPECT","BAD","UNKNOWN", name="dataquality"), nullable=False, server_default="UNKNOWN"),
    sa.Column("meta", sa.JSON(), nullable=True),
    sa.Column("created_at", sa.DateTime(), nullable=False),
  )
  op.create_index("ix_sensor_readings_tenant_sensor_time", "sensor_readings", ["tenant_id","sensor_id","captured_at"])
  op.create_index("ix_sensor_readings_tenant_metric_time", "sensor_readings", ["tenant_id","metric","captured_at"])
  op.create_index("ix_sensor_readings_metric_captured", "sensor_readings", ["metric","captured_at"])

  # sensor_events
  op.create_table(
    "sensor_events",
    sa.Column("id", sa.String(), primary_key=True),
    sa.Column("tenant_id", sa.String(), nullable=False),
    sa.Column("sensor_id", sa.String(), nullable=False),
    sa.Column("occurred_at", sa.DateTime(), nullable=False),

    sa.Column("event_type", sa.Enum(
      "DUMPING_DETECTED","BIN_OVERFLOW","NOISE_SPIKE","AIR_QUALITY_SPIKE","WATER_CONTAM_ALERT","OTHER",
      name="sensoreventtype"
    ), nullable=False, server_default="OTHER"),
    sa.Column("severity", sa.Integer(), nullable=True),
    sa.Column("payload", sa.JSON(), nullable=True),
    sa.Column("report_id", sa.String(), nullable=True),
    sa.Column("created_at", sa.DateTime(), nullable=False),
  )
  op.create_index("ix_sensor_events_tenant_sensor_time", "sensor_events", ["tenant_id","sensor_id","occurred_at"])
  op.create_index("ix_sensor_events_tenant_event_time", "sensor_events", ["tenant_id","event_type","occurred_at"])

  # models
  op.create_table(
    "models",
    sa.Column("id", sa.String(), primary_key=True),
    sa.Column("tenant_id", sa.String(), nullable=True),
    sa.Column("name", sa.String(), nullable=False),
    sa.Column("kind", sa.Enum("HEURISTIC","STATISTICAL","ML","DL", name="modelkind"), nullable=False),
    sa.Column("version", sa.String(), nullable=False),
    sa.Column("framework", sa.String(), nullable=True),
    sa.Column("artifact_uri", sa.String(), nullable=True),
    sa.Column("params", sa.JSON(), nullable=True),
    sa.Column("features", sa.JSON(), nullable=True),
    sa.Column("notes", sa.String(), nullable=True),
    sa.Column("created_at", sa.DateTime(), nullable=False),
    sa.Column("updated_at", sa.DateTime(), nullable=False),
  )
  op.create_index("ux_models_tenant_name_version", "models", ["tenant_id","name","version"], unique=True)
  op.create_index("ix_models_name_kind", "models", ["name","kind"])

  # model_runs
  op.create_table(
    "model_runs",
    sa.Column("id", sa.String(), primary_key=True),
    sa.Column("tenant_id", sa.String(), nullable=False),
    sa.Column("model_id", sa.String(), nullable=False),
    sa.Column("started_at", sa.DateTime(), nullable=False),
    sa.Column("ended_at", sa.DateTime(), nullable=True),
    sa.Column("status", sa.Enum("RUNNING","SUCCEEDED","FAILED","CANCELLED", name="runstatus"), nullable=False, server_default="RUNNING"),
    sa.Column("input_window_start", sa.DateTime(), nullable=True),
    sa.Column("input_window_end", sa.DateTime(), nullable=True),
    sa.Column("data_refs", sa.JSON(), nullable=True),
    sa.Column("metrics", sa.JSON(), nullable=True),
    sa.Column("notes", sa.String(), nullable=True),
    sa.Column("created_at", sa.DateTime(), nullable=False),
    sa.Column("updated_at", sa.DateTime(), nullable=False),
  )
  op.create_index("ix_model_runs_tenant_model_started", "model_runs", ["tenant_id","model_id","started_at"])
  op.create_index("ix_model_runs_tenant_status_started", "model_runs", ["tenant_id","status","started_at"])

  # predictions
  op.create_table(
    "predictions",
    sa.Column("id", sa.String(), primary_key=True),
    sa.Column("tenant_id", sa.String(), nullable=False),
    sa.Column("model_run_id", sa.String(), nullable=True),
    sa.Column("corridor_id", sa.String(), nullable=True),
    sa.Column("block_id", sa.String(), nullable=True),
    sa.Column("predicted_at", sa.DateTime(), nullable=False),
    sa.Column("horizon_days", sa.Integer(), nullable=False),
    sa.Column("metric", sa.Enum(
      "RISK_SCORE","DUMPING_VOLUME","HAZARD_DENSITY","RESOLUTION_LATENCY_HOURS","COST_TO_SERVICE","BIN_OVERFLOW_RISK",
      name="predictionmetric"
    ), nullable=False),
    sa.Column("value", sa.Float(), nullable=False),
    sa.Column("confidence", sa.Float(), nullable=True),
    sa.Column("explanation", sa.JSON(), nullable=True),
    sa.Column("created_at", sa.DateTime(), nullable=False),
  )
  op.create_index("ix_predictions_tenant_metric_time", "predictions", ["tenant_id","metric","predicted_at"])
  op.create_index("ix_predictions_tenant_corridor_time", "predictions", ["tenant_id","corridor_id","predicted_at"])
  op.create_index("ix_predictions_tenant_block_time", "predictions", ["tenant_id","block_id","predicted_at"])

def downgrade():
  op.drop_index("ix_predictions_tenant_block_time", table_name="predictions")
  op.drop_index("ix_predictions_tenant_corridor_time", table_name="predictions")
  op.drop_index("ix_predictions_tenant_metric_time", table_name="predictions")
  op.drop_table("predictions")

  op.drop_index("ix_model_runs_tenant_status_started", table_name="model_runs")
  op.drop_index("ix_model_runs_tenant_model_started", table_name="model_runs")
  op.drop_table("model_runs")

  op.drop_index("ix_models_name_kind", table_name="models")
  op.drop_index("ux_models_tenant_name_version", table_name="models")
  op.drop_table("models")

  op.drop_index("ix_sensor_events_tenant_event_time", table_name="sensor_events")
  op.drop_index("ix_sensor_events_tenant_sensor_time", table_name="sensor_events")
  op.drop_table("sensor_events")

  op.drop_index("ix_sensor_readings_metric_captured", table_name="sensor_readings")
  op.drop_index("ix_sensor_readings_tenant_metric_time", table_name="sensor_readings")
  op.drop_index("ix_sensor_readings_tenant_sensor_time", table_name="sensor_readings")
  op.drop_table("sensor_readings")