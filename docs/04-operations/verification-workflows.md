# Verification Workflows

The verification engine is the gatekeeper that ensures only valid, actionable hazard reports enter the queue.

## Steps

1. **Ingest:** A new report arrives with photo, location, category, and reporter metadata.
2. **EXIF Check:** Validate that the photo was taken at the reported location and within an acceptable timeframe.
3. **Duplicate Check:** Use proximity and category checks to merge duplicates.  Increment the confidence of the existing report.
4. **Trust Scoring:** Evaluate the reporter’s trust score (based on past reports and confirmation rate).  If the trust score is above a threshold, auto‑verify; otherwise send to moderation.
5. **Moderator Review:** Human moderators review borderline cases, spurious reports, and categories requiring manual inspection.
6. **Final State:** Mark report as `verified`, `rejected`, or `duplicate_merged`.  Verified reports are passed to routing and scoring services.

## States

Reports progress through the following states: `pending` → `auto_verified` / `moderation` → `verified` / `rejected` / `duplicate_merged` → `resolved` / `closed_unresolved`.

Transition logic is codified in `services/verifier` and documented in the verification schema.
