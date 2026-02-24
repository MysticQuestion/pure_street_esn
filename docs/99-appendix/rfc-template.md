## RFC Template

The Request for Comments (RFC) process is used for proposing significant changes or features to ESN.  RFCs encourage discussion, feedback, and consensus before work begins.  This template provides a structure for writing an RFC.

### Header

* **Title:** Short descriptive title.
* **Author(s):** Names and roles of the proposal authors.
* **Date:** Date the RFC is submitted.
* **Status:** `Draft` | `Accepted` | `Rejected` | `Deferred`.
* **Version:** Start at `1.0`; increment on major revisions.
* **Impact Area:** Which subsystems are affected (apps, API, scoring, operations, etc.).

### Summary

A high‑level overview of the problem being solved and the proposed solution.  Keep it concise (1–2 paragraphs).

### Motivation

Explain why this change is necessary.  Describe current limitations, user pain points, or strategic drivers.

### Proposal

* Describe the proposed solution in detail.
* Include diagrams, data models, or pseudo‑code if helpful.
* Specify changes to existing interfaces, data schemas, or workflows.
* Outline how the change will be delivered (phase plan, milestones).

### Alternatives Considered

Discuss other options you considered and why they were not chosen.  Highlight trade‑offs.

### Backwards Compatibility

Detail how the change affects existing users and systems.  Propose migration strategies or fallback behaviors if necessary.

### Security and Privacy Considerations

Identify potential security or privacy impacts and how you will mitigate them.

### Open Questions

List any unresolved issues or areas where feedback is specifically requested.

### References

Include links to any relevant documents, issues, or external resources.

Once authored, create a pull request with the RFC in `docs/99-appendix/` and request feedback from the team.  Discussion should take place in the PR before acceptance.