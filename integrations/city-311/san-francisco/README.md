# San Francisco 311 Integration

This directory contains a placeholder for an integration with the City of
San Francisco's 311 system. The goals are similar to those of the Oakland
integration but will require city‑specific payloads and endpoints.

Tasks for an eventual implementation include:

1. **Authentication** – Determine the required authentication method for
   San Francisco's 311 API (API key, OAuth, etc.).
2. **Submission** – Map ESN hazard report fields to San Francisco's 311
   schema and submit incidents.
3. **Status retrieval** – Poll or subscribe to updates on report status and
   sync these updates back to ESN.
4. **Data ingestion** – Import historical or ongoing 311 data for
   correlation and deduplication with ESN reports.

Document any API quirks or limitations in this README as you develop the
integration.