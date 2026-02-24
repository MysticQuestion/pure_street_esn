# Hazard Taxonomy

ESN standardizes the categorization of environmental hazards using a formal taxonomy defined in YAML at `data/taxonomy/hazard-categories.yml`.  Each category has an identifier, a human‑readable label, default priority, base severity, SLA target, and associated tags.  The taxonomy also includes scoring modifiers that adjust hazard severity based on context (e.g. proximity to schools or waterways).

Having a canonical taxonomy ensures consistent reporting, analytics, and routing across all city deployments.  If you propose changes or additions to the taxonomy, please open an issue using the “Data Taxonomy Change” template.
