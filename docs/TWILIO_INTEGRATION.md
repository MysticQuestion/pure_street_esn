# STREETS Twilio Integration Foundation

This repository now includes a Twilio webhook foundation in `apps/web-reporting` for inbound SMS/MMS intake and status callbacks.

## Endpoints
- `POST /api/twilio/inbound`
- `POST /api/twilio/status`

## Environment Variables
See `apps/web-reporting/.env.example` for:
- TWILIO_ACCOUNT_SID
- TWILIO_AUTH_TOKEN
- TWILIO_MESSAGING_SERVICE_SID
- TWILIO_PHONE_NUMBER
- TWILIO_WEBHOOK_AUTH_SECRET
- TWILIO_STATUS_CALLBACK_SECRET
- PUBLIC_STREETS_BASE_URL
- SUPABASE_URL
- SUPABASE_SERVICE_ROLE_KEY
- CONTACT_HASH_SALT

## Current behavior
- Parses inbound Twilio fields (From/To/Body/MessageSid/media).
- Applies deterministic issue/severity classification.
- Detects missing location and requests follow-up location.
- Returns TwiML confirmation response.
- Hashes reporter phone before storage/logging.
- Safe no-op helper provided when credentials are missing.

## Privacy
- Raw phone numbers are not persisted in the current foundation implementation.
- Hashed identifiers are generated with `CONTACT_HASH_SALT`.

## Production setup
1. Configure Twilio number webhook URL to `https://<your-domain>/api/twilio/inbound`.
2. Configure status callback URL to `https://<your-domain>/api/twilio/status`.
3. Add all required env vars in Vercel project settings.
4. Deploy from production branch via connected Git workflow.

## Limitations
- Supabase write path is not wired yet in this repo snapshot.
- Twilio signature verification is not yet implemented.
- Follow-up STATUS/ADD/LOCATION command handling is pending.
