# Routing Connectors

Connectors integrate ESN with external systems such as municipal 311 APIs, Business Improvement District (BID) systems, and partner nonprofits.  Each connector encapsulates the details of a specific API or messaging channel.

This directory currently contains placeholders for future connectors.  To add a connector:

1. Create a subdirectory named after the partner (e.g., `oakland311`).
2. Implement classes/functions to authenticate and send hazard data to that partner’s API.
3. Write unit tests under `services/routing/tests` to validate the integration logic.

For guidance on partner requirements, see `docs/05-policy-and-procurement/procurement-ready-overview.md`.