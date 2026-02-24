## Research Methodology

ESN isn’t just an operational tool—it’s a research platform that supports public health, urban planning, and environmental justice studies.  This document outlines the methodological principles for using ESN data in rigorous research.

### Data Collection

* **Structured Reports** – Hazard reports collected through the mobile or web interface include mandatory fields (location, category, timestamp) and optional fields (photo, notes).  These fields conform to the schemas defined in `data/schemas/`.
* **Verification Layer** – Each report is assigned a verification status and confidence score.  Only verified or auto‑verified reports are used in research analyses by default.
* **Supplementary Data** – Sensor readings (PM2.5, NO₂, noise, humidity) and corridor boundary definitions provide context for hazard data.  Demographic and socioeconomic datasets from public sources are joined at the corridor or census-block level.

### Analysis Framework

1. **Hazard Density** – Calculate the number of verified hazards per corridor per time unit (e.g., per month).  Normalize by corridor area and population density.
2. **Response Latency** – Measure the time between report submission and resolution.  Compare across categories and geographic areas.
3. **Risk Scoring** – Use the scoring specification (`docs/03-data-and-models/scoring-spec.md`) to compute block-level sanitation scores and categorize corridors (A, C, F).
4. **Equity Metrics** – Cross‑tabulate hazard density and response latency against demographic indicators (income, race, housing tenure).  Conduct statistical tests to assess disparities.
5. **Longitudinal Tracking** – Build time series of corridor scores to evaluate the impact of interventions (cleaning campaigns, policy changes).

### Ethical Considerations

* **Privacy Protection** – All analyses must use de‑identified data.  Personal identifiers (user IDs, faces in images) are removed or aggregated.
* **Community Review** – Share preliminary findings with impacted communities before public release.  Incorporate their feedback and contextual knowledge.
* **Reproducibility** – All code used for analysis should be version‑controlled in the `notebooks/` or `scripts/` directories.  Provide clear documentation and dependencies to allow reproduction.

### Publication

Research outputs (white papers, policy briefs, peer‑reviewed articles) should be stored in the `docs/06-research-and-reporting/` folder or linked to external repositories.  Use the citation guide (`citations-and-sources.md`) to attribute data sources correctly.