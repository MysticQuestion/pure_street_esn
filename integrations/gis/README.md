# GIS Integrations

The `gis` folder contains connectors for geographic information services
used by ESN. These services provide map tiles, geocoding, reverse geocoding
and advanced spatial analysis.

## Current placeholders

- **Mapbox** (`mapbox/`) – Integration with the Mapbox APIs for interactive
  maps, geocoding and routing. When implemented, this module will wrap
  Mapbox SDKs or REST endpoints to deliver maps and location services.
- **ArcGIS** (`arcgis/`) – Integration with Esri's ArcGIS platform for
  advanced spatial queries and data visualisation. This module can be used
  to ingest city GIS datasets (e.g. block boundaries, zoning maps) into
  ESN's analytics pipeline.

Each submodule should document usage, authentication and any rate limits.