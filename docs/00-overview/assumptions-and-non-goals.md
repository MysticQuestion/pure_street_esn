# Assumptions and Non‑Goals

This project makes several assumptions and explicitly excludes some objectives to maintain focus and feasibility.

## Assumptions

1. **Smartphone adoption:** Residents and field crews have access to smartphones capable of running the ESN mobile client or a web interface.
2. **Municipal cooperation:** Cities are willing to integrate ESN data with existing systems (311) and provide baseline datasets (e.g. corridor definitions, existing complaints).
3. **Data availability:** Publicly available geospatial datasets (e.g. parcel maps, census data) exist to contextualize corridor scoring and equity analyses.

## Non‑Goals

1. **Real‑time sensor mesh deployment in ESN‑Lite:** Sensor integration is planned for later phases and is not part of the MVP scope.
2. **Deep learning for image classification:** While ML clustering is planned, initial verification relies on metadata and simple proximity checks rather than image recognition.
3. **Blockchain implementation:** A cryptographic audit layer is optional and reserved for a future exploratory phase.
