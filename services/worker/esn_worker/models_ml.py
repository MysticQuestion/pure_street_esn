from sqlalchemy import (
  Column, String, DateTime, Float, Integer, JSON, Enum, Index
)
from sqlalchemy.orm import declarative_base
import enum
from datetime import datetime

Base = declarative_base()

class ModelKind(str, enum.Enum):
  HEURISTIC = "HEURISTIC"
  STATISTICAL = "STATISTICAL"
  ML = "ML"
  DL = "DL"

class RunStatus(str, enum.Enum):
  RUNNING = "RUNNING"
  SUCCEEDED = "SUCCEEDED"
  FAILED = "FAILED"
  CANCELLED = "CANCELLED"

class PredictionMetric(str, enum.Enum):
  RISK_SCORE = "RISK_SCORE"
  DUMPING_VOLUME = "DUMPING_VOLUME"
  HAZARD_DENSITY = "HAZARD_DENSITY"
  RESOLUTION_LATENCY_HOURS = "RESOLUTION_LATENCY_HOURS"
  COST_TO_SERVICE = "COST_TO_SERVICE"
  BIN_OVERFLOW_RISK = "BIN_OVERFLOW_RISK"

class Model(Base):
  __tablename__ = "models"

  id = Column(String, primary_key=True)
  tenant_id = Column(String, nullable=True)  # null = global
  name = Column(String, nullable=False)
  kind = Column(Enum(ModelKind), nullable=False)
  version = Column(String, nullable=False)

  framework = Column(String, nullable=True)
  artifact_uri = Column(String, nullable=True)
  params = Column(JSON, nullable=True)
  features = Column(JSON, nullable=True)
  notes = Column(String, nullable=True)

  created_at = Column(DateTime, nullable=False, default=datetime.utcnow)
  updated_at = Column(DateTime, nullable=False, default=datetime.utcnow)

  __table_args__ = (
    Index("ux_models_tenant_name_version", "tenant_id", "name", "version", unique=True),
    Index("ix_models_name_kind", "name", "kind"),
  )

class ModelRun(Base):
  __tablename__ = "model_runs"

  id = Column(String, primary_key=True)
  tenant_id = Column(String, nullable=False)
  model_id = Column(String, nullable=False)

  started_at = Column(DateTime, nullable=False, default=datetime.utcnow)
  ended_at = Column(DateTime, nullable=True)
  status = Column(Enum(RunStatus), nullable=False, default=RunStatus.RUNNING)

  input_window_start = Column(DateTime, nullable=True)
  input_window_end = Column(DateTime, nullable=True)
  data_refs = Column(JSON, nullable=True)
  metrics = Column(JSON, nullable=True)
  notes = Column(String, nullable=True)

  created_at = Column(DateTime, nullable=False, default=datetime.utcnow)
  updated_at = Column(DateTime, nullable=False, default=datetime.utcnow)

  __table_args__ = (
    Index("ix_model_runs_tenant_model_started", "tenant_id", "model_id", "started_at"),
    Index("ix_model_runs_tenant_status_started", "tenant_id", "status", "started_at"),
  )

class Prediction(Base):
  __tablename__ = "predictions"

  id = Column(String, primary_key=True)
  tenant_id = Column(String, nullable=False)
  model_run_id = Column(String, nullable=True)

  corridor_id = Column(String, nullable=True) # Prisma Corridor.id
  block_id = Column(String, nullable=True)    # Prisma Block.id

  predicted_at = Column(DateTime, nullable=False, default=datetime.utcnow)
  horizon_days = Column(Integer, nullable=False)
  metric = Column(Enum(PredictionMetric), nullable=False)
  value = Column(Float, nullable=False)
  confidence = Column(Float, nullable=True)
  explanation = Column(JSON, nullable=True)

  created_at = Column(DateTime, nullable=False, default=datetime.utcnow)

  __table_args__ = (
    Index("ix_predictions_tenant_metric_time", "tenant_id", "metric", "predicted_at"),
    Index("ix_predictions_tenant_corridor_time", "tenant_id", "corridor_id", "predicted_at"),
    Index("ix_predictions_tenant_block_time", "tenant_id", "block_id", "predicted_at"),
  )