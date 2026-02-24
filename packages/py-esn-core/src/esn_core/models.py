"""Common data models shared across ESN services.

These dataclasses mirror the JSON schemas defined under `data/schemas`. They
provide type hints and convenience methods for Python code interacting with
hazard reports, sensor readings, verification records and corridor scores.
"""

from __future__ import annotations

from dataclasses import dataclass, field
from datetime import datetime
from typing import List, Optional, Dict


@dataclass
class Attachment:
    attachment_id: str
    kind: str  # photo, video, audio
    uri: str
    thumbnail_uri: Optional[str] = None
    sha256: Optional[str] = None
    exif: Optional[Dict[str, Optional[str]]] = None


@dataclass
class HazardLocation:
    lat: float
    lng: float
    accuracy_meters: Optional[float] = None
    geohash: Optional[str] = None
    corridor_id: Optional[str] = None
    blockface_id: Optional[str] = None


@dataclass
class HazardReport:
    report_id: str
    reporter_id: str
    source_type: str
    category_id: str
    location: HazardLocation
    observed_at: datetime
    submitted_at: datetime
    verification_status: str
    subcategory_tag: Optional[str] = None
    description: Optional[str] = None
    severity_raw: Optional[int] = None
    attachments: List[Attachment] = field(default_factory=list)
    verification_confidence: Optional[float] = None
    duplicate_of_report_id: Optional[str] = None
    trust_score_snapshot: Optional[float] = None
    routing_targets: List[str] = field(default_factory=list)
    privacy_flags: Optional[Dict[str, bool]] = None


@dataclass
class SensorReading:
    reading_id: str
    node_id: str
    captured_at: datetime
    temperature_c: Optional[float] = None
    pm25_ug_m3: Optional[float] = None
    no2_ppb: Optional[float] = None
    noise_db: Optional[float] = None
    humidity_pct: Optional[float] = None


@dataclass
class VerificationRecord:
    verification_id: str
    report_id: str
    verified_at: datetime
    status: str
    verifier_id: Optional[str] = None
    confidence: Optional[float] = None
    comments: Optional[str] = None


@dataclass
class CorridorScore:
    corridor_id: str
    score: float
    grade: str
    computed_at: datetime
    trend: Optional[str] = None
    details: Optional[Dict[str, float]] = None