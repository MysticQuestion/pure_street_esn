from fastapi import APIRouter
from datetime import datetime, timezone

router = APIRouter()

@router.get("")
def healthcheck() -> dict:
    """Return a simple health status for the API."""
    return {
        "status": "ok",
        "service": "esn-api",
        "time": datetime.now(timezone.utc).isoformat(),
    }