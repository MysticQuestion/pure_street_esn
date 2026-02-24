"""Duplicate detection logic for ESN hazard reports.

This module defines simple geographic duplicate detection based on a radial threshold.
If a new report falls within the radius of an existing report of the same category,
it is considered a duplicate.
"""

from math import radians, cos, sin, asin, sqrt
from dataclasses import dataclass
from typing import Iterable, Optional


@dataclass(frozen=True)
class GeoReportCandidate:
    report_id: str
    lat: float
    lng: float
    category_id: str


@dataclass(frozen=True)
class DedupDecision:
    is_duplicate: bool
    duplicate_of_report_id: Optional[str]
    distance_meters: Optional[float]
    action: str  # "CREATE_NEW_TICKET" | "MERGE_DUPLICATE"


def haversine_meters(lat1: float, lon1: float, lat2: float, lon2: float) -> float:
    """Calculate distance between two geo points in meters using the haversine formula."""
    lon1, lat1, lon2, lat2 = map(radians, [lon1, lat1, lon2, lat2])
    dlon = lon2 - lon1
    dlat = lat2 - lat1
    a = sin(dlat / 2) ** 2 + cos(lat1) * cos(lat2) * sin(dlon / 2) ** 2
    km = 2 * asin(sqrt(a)) * 6371  # Radius of Earth in KM
    return km * 1000


def check_duplicate(
    new_lat: float,
    new_lng: float,
    new_category_id: str,
    existing: Iterable[GeoReportCandidate],
    radius_meters: float = 40.0,
) -> DedupDecision:
    """
    Determine if a new hazard report is a duplicate of an existing one.

    Args:
        new_lat: Latitude of the new report.
        new_lng: Longitude of the new report.
        new_category_id: Category of the new report (e.g., "BIO_01").
        existing: Iterable of existing report candidates to compare against.
        radius_meters: Distance threshold for duplicate detection.

    Returns:
        DedupDecision: Whether the report is a duplicate and associated metadata.
    """
    best_match: Optional[tuple[str, float]] = None
    for item in existing:
        # Only consider candidates in the same category to avoid false merges.
        if item.category_id != new_category_id:
            continue
        distance = haversine_meters(new_lat, new_lng, item.lat, item.lng)
        if distance <= radius_meters:
            if best_match is None or distance < best_match[1]:
                best_match = (item.report_id, distance)

    if best_match:
        return DedupDecision(
            is_duplicate=True,
            duplicate_of_report_id=best_match[0],
            distance_meters=round(best_match[1], 2),
            action="MERGE_DUPLICATE",
        )
    return DedupDecision(
        is_duplicate=False,
        duplicate_of_report_id=None,
        distance_meters=None,
        action="CREATE_NEW_TICKET",
    )