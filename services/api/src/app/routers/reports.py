from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, Field
from uuid import UUID, uuid4
from datetime import datetime, timezone
from typing import Optional, Literal, Dict

router = APIRouter()

# In-memory storage for demonstration purposes.  Replace with database integration.
_FAKE_DB: Dict[str, Dict] = {}


class Location(BaseModel):
    lat: float
    lng: float
    accuracy_meters: Optional[float] = None
    corridor_id: Optional[str] = None


class CreateHazardReportRequest(BaseModel):
    reporter_id: UUID
    source_type: Literal["resident", "crew", "partner", "sensor", "imported_311"] = "resident"
    category_id: str = Field(pattern=r"^[A-Z]+_[0-9]{2}$")
    severity_raw: Optional[int] = Field(default=None, ge=1, le=5)
    description: Optional[str] = Field(default=None, max_length=2000)
    location: Location
    observed_at: datetime


class HazardReportResponse(BaseModel):
    report_id: UUID
    verification_status: str
    verification_confidence: float
    created_at: datetime


@router.post("", response_model=HazardReportResponse, status_code=201)
def create_report(payload: CreateHazardReportRequest) -> HazardReportResponse:
    """
    Create a new hazard report.  The report is stored in memory for demonstration.
    Future versions will persist to a database and queue verification.
    """
    if payload.location.lat == 0 and payload.location.lng == 0:
        raise HTTPException(status_code=400, detail="Invalid location coordinates.")

    report_id = uuid4()
    now = datetime.now(timezone.utc)
    record = {
        "report_id": str(report_id),
        "verification_status": "pending",
        "verification_confidence": 0.25,
        "payload": payload.model_dump(mode="json"),
        "created_at": now.isoformat(),
    }
    _FAKE_DB[str(report_id)] = record

    return HazardReportResponse(
        report_id=report_id,
        verification_status=record["verification_status"],
        verification_confidence=record["verification_confidence"],
        created_at=now,
    )


@router.get("/{report_id}")
def get_report(report_id: UUID) -> dict:
    """Retrieve a hazard report by its ID."""
    record = _FAKE_DB.get(str(report_id))
    if not record:
        raise HTTPException(status_code=404, detail="Report not found")
    return record