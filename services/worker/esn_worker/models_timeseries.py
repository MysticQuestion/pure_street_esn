from sqlalchemy import (
  Column, String, DateTime, Float, Integer, Boolean, JSON, Enum, ForeignKey, Index
)
from sqlalchemy.orm import declarative_base
import enum
from datetime import datetime

Base = declarative_base()

class DataQuality(str, enum.Enum):
  GOOD = "GOOD"
  SUSPECT = "SUSPECT"
  BAD = "BAD"
  UNKNOWN = "UNKNOWN"

class SensorEventType(str, enum.Enum):
  DUMPING_DETECTED = "dumping_detected"
  BIN_OVERFLOW = "bin_overflow"
  NOISE_SPIKE = "noise_spike"
  AIR_QUALITY_SPIKE = "air_quality_spike"
  WATER_CONTAM_ALERT = "water_contam_alert"
  OTHER = "other"

class SensorReading(Base):
  __tablename__ = "sensor_readings"

  id = Column(String, primary_key=True)
  tenant_id = Column(String, nullable=False)
  sensor_id = Column(String, nullable=False)  # references Prisma Sensor.id logically
  captured_at = Column(DateTime, nullable=False, index=True)

  metric = Column(String, nullable=False, index=True)  # e.g. "pm25", "noise_db"
  value = Column(Float, nullable=False)
  unit = Column(String, nullable=True)

  quality = Column(Enum(DataQuality), nullable=False, default=DataQuality.UNKNOWN)
  meta = Column(JSON, nullable=True)

  created_at = Column(DateTime, nullable=False, default=datetime.utcnow)

  __table_args__ = (
    Index("ix_sensor_readings_tenant_sensor_time", "tenant_id", "sensor_id", "captured_at"),
    Index("ix_sensor_readings_tenant_metric_time", "tenant_id", "metric", "captured_at"),
  )

class SensorEvent(Base):
  __tablename__ = "sensor_events"

  id = Column(String, primary_key=True)
  tenant_id = Column(String, nullable=False)
  sensor_id = Column(String, nullable=False)
  occurred_at = Column(DateTime, nullable=False, index=True)

  event_type = Column(Enum(SensorEventType), nullable=False, default=SensorEventType.OTHER)
  severity = Column(Integer, nullable=True)  # 1..5 optional
  payload = Column(JSON, nullable=True)

  # Optional link to a Prisma Report created from this event
  report_id = Column(String, nullable=True)

  created_at = Column(DateTime, nullable=False, default=datetime.utcnow)

  __table_args__ = (
    Index("ix_sensor_events_tenant_sensor_time", "tenant_id", "sensor_id", "occurred_at"),
    Index("ix_sensor_events_tenant_event_time", "tenant_id", "event_type", "occurred_at"),
  )