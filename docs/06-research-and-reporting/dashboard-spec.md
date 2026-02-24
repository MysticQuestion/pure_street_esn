## Dashboard Specification

The ESN dashboard is the primary interface for operations teams, city officials, and BIDs to monitor corridor conditions, triage reports, and export analytics.  This document outlines the functional and technical specifications for the dashboard.

### Audience and Use Cases

* **Field Operations** – View incoming hazard reports, verify data, assign tasks, and update status.
* **Municipal Officials** – Track corridor scores, evaluate contract performance, and generate monthly reports.
* **Business Improvement Districts** – Monitor specific corridors, schedule cleanups, and demonstrate impact to merchants.
* **Researchers** – Access aggregated data and metrics for analysis and reporting.

### Core Features

1. **Map View**
   - Interactive city map with overlays for hazard locations and corridor boundaries.
   - Heat map layer showing sanitation scores by block.
   - Filter controls (category, severity, time range, verification status).
2. **Queue Management**
   - Table of unverified reports with sortable columns (date, category, severity, confidence).
   - Bulk actions (verify, reject, merge duplicates) and assignment to crews.
3. **Corridor Dashboard**
   - List of corridors with current score, trend indicator, and number of open hazards.
   - Drill‑down to corridor details, including time series of score, distribution of hazard categories, and response latency.
4. **Analytics & Exports**
   - Generate PDF/CSV reports for a selected date range and geography (e.g., monthly corridor report).  Use templates in `docs/06-research-and-reporting/reporting-templates`.
   - Charts for hazard density, response times, and equity metrics.
5. **User Management** (Phase II)
   - Role‑based access control (resident, crew, supervisor, admin).
   - Audit logs for all actions performed via the dashboard.

### Technology Stack

* **Frontend** – React/Next.js for web dashboard; reuse component library used in the mobile app where possible.
* **Backend** – GraphQL or REST endpoints from `services/api` for retrieving reports, corridor scores, and user data.
* **Maps** – Mapbox GL JS or Leaflet with Mapbox tiles.  PostGIS used for spatial queries on the backend.
* **Charts** – Use a lightweight chart library (e.g., Recharts or Chart.js) that supports accessible, responsive visualizations.

### Accessibility

The dashboard must conform to WCAG 2.1 AA standards.  Provide keyboard navigation, high contrast mode, screen reader support, and descriptive alt text for charts and maps.  See `docs/02-product/accessibility.md` for guidelines.

### Mockups and Wireframes

Design assets and prototypes should be stored under the `design/` directory if available.  Include high‑resolution mockups of the main views and annotate them with component behaviors.