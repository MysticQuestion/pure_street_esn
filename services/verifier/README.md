# ESN Verifier Service

The verifier service forms the “truth layer” of ESN.  It is responsible for detecting duplicate hazard reports, validating photo metadata, moderating submissions, and assigning confidence scores.  This microservice can be deployed independently of the API to scale verification workloads.

## Components

* `src/esn_verifier/dedup.py` – Contains functions for duplicate detection based on geographic proximity and category.
* `pyproject.toml` – Python package configuration and dependencies.
* `tests/` – Unit tests for verification logic.

## Usage

The `check_duplicate` function takes the latitude and longitude of a new report, its category, and an iterable of existing report candidates.  It returns a `DedupDecision` indicating whether the new report is a duplicate.

```python
from esn_verifier.dedup import GeoReportCandidate, check_duplicate

existing = [GeoReportCandidate(report_id="abc", lat=37.8, lng=-122.4, category_id="BIO_01")]
decision = check_duplicate(new_lat=37.8001, new_lng=-122.4002, new_category_id="BIO_01", existing=existing)
print(decision.is_duplicate, decision.action)
```

Future versions of this service will include modules for image EXIF validation and moderation workflows.  See `docs/04-operations/verification-workflows.md` for business context.