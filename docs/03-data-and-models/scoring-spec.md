# Scoring Specification

To provide a defensible technology moat, ESN scores environmental hazards and corridors using a transparent formula that balances severity, verification confidence, time decay, area, and population density.

## Hazard Severity

Each hazard category is assigned a `base_severity` between 1 and 5 in the taxonomy.  Verified hazards inherit this severity, which may be adjusted by context modifiers (e.g. hazards near schools or waterways have higher impact).

## Verification Confidence

Reports receive a `verification_confidence` between 0 and 1:

- 1.0 for photo‑verified, moderator‑approved reports from trusted users
- 0.75 for photo‑verified reports from new users
- 0.5 for unverified reports
- 0.0 for rejected reports

Duplicates merge into the original report and increment its confidence.

## Time Decay

Hazards that remain unresolved for longer periods contribute more to the corridor risk score.  Let `t` be the number of hours since the hazard was reported.  We define a decay factor `T_f` such that:

```
T_f = 1 + min(0.5, t / 168)
```

where 168 hours = 7 days.  Thus, hazards older than a week add up to 50% more risk.

## Corridor Risk Score

The Environmental Risk Score (`ERS`) for a corridor over a time window is computed as:

```
ERS = \frac{\sum (S_h \times V_c \times T_f)}{A \times P}

Where:
  S_h = hazard severity (1–10 scale, derived from category and context)
  V_c = verification confidence (0.0–1.0)
  T_f = time decay factor
  A = area of the corridor (square feet)
  P = population density (people per square mile)
```

The resulting score ranges from 0 (pristine) to 100 (crisis).  Corridor grades (A–F) and trends (improving/declining) are derived from the score and its change relative to the previous reporting period.

## Implementation Notes

- Scores are recalculated daily or when new verified hazards are ingested.
- Corridors with no hazards default to a score of 100 (grade A).
- Severity, confidence, and modifiers may evolve as we gather more data and feedback.  Changes will be documented with version numbers.
