# ESN Scoring Service

This service provides utilities for calculating sanitation scores at the corridor or block level.  It turns a set of hazard reports into a normalized 0–100 score with letter grades and trend analysis.

## Overview

The `calculate_corridor_health` function accepts a collection of report objects (each with a base severity and confidence multiplier) and returns a dictionary with:

* `score` – A normalized score between 0 (worst) and 100 (best).
* `grade` – A letter grade (`A`, `C`, or `F`) based on score thresholds.
* `trend` – Indicates whether the corridor is improving or declining compared to a previous period.

See `docs/03-data-and-models/scoring-spec.md` for the full formula and theoretical background.