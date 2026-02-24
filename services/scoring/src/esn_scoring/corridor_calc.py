"""Corridor scoring utilities for ESN.

These functions calculate a sanitation score for a corridor based on reported hazards.
The score ranges from 0 (severe environmental crisis) to 100 (pristine).  A letter
grade and trend indicator are also provided.
"""

from dataclasses import dataclass
from typing import Iterable, Dict, Any


@dataclass
class Report:
    base_severity: int
    confidence_multiplier: float


def calculate_corridor_health(reports_in_zone: Iterable[Report], last_month_deductions: float = 0.0) -> Dict[str, Any]:
    """
    Calculate the sanitation health of a corridor.

    Args:
        reports_in_zone: An iterable of Report objects for the corridor.
        last_month_deductions: Total severity deductions from the previous period to determine trend.

    Returns:
        A dictionary containing the score, grade, and trend indicator.
    """
    base_score = 100.0
    deductions = 0.0
    for report in reports_in_zone:
        impact = report.base_severity * report.confidence_multiplier
        deductions += impact
    final_score = max(0.0, base_score - deductions)
    if final_score > 90:
        grade = "A"
    elif final_score > 70:
        grade = "C"
    else:
        grade = "F"
    trend = "improving" if deductions < last_month_deductions else "declining"
    return {
        "score": round(final_score, 2),
        "grade": grade,
        "trend": trend,
    }