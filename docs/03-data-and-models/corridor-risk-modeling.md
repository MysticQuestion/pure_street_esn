# Corridor Risk Modeling

Corridors are the fundamental unit of spatial analysis in ESN.  By aggregating hazards within defined corridors, we can measure sanitation levels, prioritize interventions, and benchmark performance across neighborhoods.

## Defining Corridors

Corridors are typically defined as segments of streets bounded by cross streets or natural features.  The `corridor_id` field in reports associates each hazard with its block.  City planners and BIDs may provide official corridor definitions; otherwise, we generate them based on GIS data.

## Aggregation

For each corridor and reporting period:

1. Collect all verified hazard reports within the corridor boundaries.
2. Compute severity × confidence × time decay for each hazard (see `scoring-spec.md`).
3. Sum the contributions and divide by the product of corridor area and population density.
4. Normalize the result to a 0–100 scale.

Corridors with few or no hazards retain high scores.  Corridors with persistent, severe hazards will see scores decline until remediation occurs.

## Visualization

Corridor scores are visualized as heat maps in the dashboard.  Color ramps (e.g. green→yellow→red) indicate the severity of sanitation issues.  Trend arrows signal whether conditions are improving or deteriorating compared to the previous period.

## Use Cases

- **Operational Triage:** Determine which corridors require immediate cleaning or investigation.
- **Equity Analysis:** Compare scores across neighborhoods to identify disparities and prioritize resources.
- **Performance Benchmarking:** Track improvements over time and evaluate the impact of interventions or policy changes.
