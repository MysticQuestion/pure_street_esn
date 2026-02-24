# SLA and Triage

Service Level Agreements (SLAs) define the maximum time allowable from verification to hazard resolution.  Triaging determines the order in which verified hazards are addressed.

## Default SLA Targets

| Priority  | Target Resolution  | Examples                         |
|---------|--------------------|---------------------------------|
| Critical | 4 hours            | Biohazard, hazardous materials   |
| High     | 24 hours           | Illegal dumping (bulk), large debris |
| Medium   | 7 days             | Infrastructure decay             |
| Low      | 14 days            | Litter, graffiti, weeds          |

SLAs may be adjusted based on corridor risk scores, proximity modifiers, and available resources.

## Triage Rules

1. **Severity First:** Critical and high‑priority hazards are addressed before medium and low.
2. **Confidence Score:** Within the same priority, reports with higher verification confidence are handled first.
3. **Time Sensitivity:** Older reports (higher time decay) rise in priority over newer ones.
4. **Corridor Equity:** Corridors with historically poor sanitation scores may be prioritized to address disparities.

These rules are implemented in the routing service and configurable per deployment.
