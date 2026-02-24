# City 311 Integrations

This directory contains connectors to municipal 311 systems. Each city has
unique API endpoints, authentication requirements and data formats. To keep
these details encapsulated, create a subdirectory for each city you
integrate with and implement the client logic there.

Current implementations:

- **Oakland** (`oakland/`) – Placeholder for a client targeting the City of
  Oakland's 311 system. When implemented, this module should be capable of
  submitting hazard reports, querying incident status and retrieving
  historical data via the city's APIs.
- **San Francisco** (`san-francisco/`) – Placeholder for integration with
  San Francisco's 311 system. Similar goals as the Oakland module.

When adding a new city integration, please document any rate limits,
authentication mechanisms and data mappings in the submodule's README.