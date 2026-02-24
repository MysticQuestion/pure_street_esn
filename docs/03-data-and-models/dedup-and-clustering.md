# Deduplication and Clustering

Duplicate reports and overlapping hazard observations can overwhelm response teams and skew analytics.  ESN uses a two‑stage approach to handle duplicates and clusters.

## Proximity Deduplication

When a new report is submitted, the Verifier service checks if it falls within a configurable radius of an existing report of the same category.  If so, the new report is merged into the existing one, and the existing report’s verification confidence is incremented.  See `services/verifier/src/esn_verifier/dedup.py` for the haversine‑based implementation.

## Temporal Clustering (Phase II)

In later phases, we will employ machine learning to detect clusters of similar reports over time and space.  Clustering helps identify persistent hotspots and emerging patterns (e.g. recurring illegal dumping at specific locations).  Clustering algorithms will consider features such as category, severity, confidence, time of day, and spatial distribution.

## Moderator Workflow

Reports that fall on the border of the deduplication radius or from low‑trust reporters may be flagged for manual review.  Moderators can decide whether to merge, reject, or verify such reports.
