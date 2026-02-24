# py-esn-core

This package provides shared Python models, utilities and constants used
across multiple ESN services. Extracting common code into a separate
package avoids duplication and keeps service implementations lean.

Examples of content suitable for `py-esn-core` include:

- Dataclasses representing hazard reports, sensor readings, verification
  records and corridor scores.
- Utility functions for geospatial calculations, time conversions and
  validation.
- Constants for default values, enumerations and taxonomy lookups.

Install this package in other services via editable installs (e.g.
`pip install -e ../packages/py-esn-core`).