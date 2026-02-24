# Data Directory

The `data` directory houses canonical definitions, schemas, taxonomies and sample
datasets that underpin the Environmental Sentinel Network (ESN) platform.

The contents of this folder should be treated as source of truth for both the
application layer and research outputs. Changes here should follow the
governance process outlined in [`docs/99-appendix/decision-log.md`](../docs/99-appendix/decision-log.md)
and be accompanied by a pull request describing the rationale and impact.

## Structure

- **`schemas/`** – JSON Schema definitions for data contracts used throughout
  the platform. These schemas are versioned and used to validate incoming
  reports, sensor readings, verification records and corridor scores.
- **`taxonomy/`** – Human‑readable YAML files defining hazard categories,
  severity levels and tags. These taxonomies inform the user interface,
  scoring engine and analytics pipelines.
- **`samples/`** – Small example datasets used for testing and demonstration.
  These are not production data. Use these samples to seed local databases or
  to illustrate expected file formats.
- **`notebooks/`** – Jupyter notebooks containing exploratory analyses,
  corridor risk modelling experiments and evaluation scripts. These are
  provided as starting points for data scientists and researchers.

## Updating Schemas and Taxonomies

When proposing modifications to schemas or taxonomy files:

1. Open a new issue describing the change and its motivation.
2. Draft a pull request updating the relevant files in `schemas/` or
   `taxonomy/`.
3. Add an entry to the decision log explaining the rationale.
4. Ensure all automated tests still pass and that the API continues to
   validate payloads correctly.

## Versioning

Schemas and taxonomy files include version and last updated metadata. When
breaking changes are introduced, increment the major version and document
migration steps in the pull request.