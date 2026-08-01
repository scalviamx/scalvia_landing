# Phase 3.1 Integrations

Status: PASS

Worker:
- Name: `scalvia-landing-preview`
- URL: `https://scalvia-landing-preview.hola-7e3.workers.dev`
- Code deploy version: `1f272500-5406-4b22-8494-6191ca0ff06b`
- Final active version after restoring Turnstile preview secret: `a2dcf566-9b00-4c0e-a37f-c8c2b416445a`
- Base commit: `10ce74eb9a0ac9255dde361ddb6baf8f96396591`
- Timestamp: `2026-08-01T06:19:15Z`

Google OAuth / Calendar:
- Scenario: `INVALID_CLIENT_ID`.
- Local `GOOGLE_CLIENT_ID` was set to a short non-OAuth value and did not match the production OAuth client ID shape.
- Existing local `GOOGLE_CLIENT_SECRET` and `GOOGLE_REFRESH_TOKEN` were valid once paired with the corrected client ID.
- `GOOGLE_CALENDAR_ID` was aligned with production.
- Local availability check: PASS, HTTP 200.
- Cloudflare preview availability check: PASS, HTTP 200.

Turnstile:
- Production Turnstile values in Vercel are sensitive and not retrievable via `vercel env pull`.
- Preview was configured with official Cloudflare Turnstile testing keys.
- Positive path: PASS after restoring the preview passing secret.
- Negative path: PASS by temporarily switching to the official failing test secret and restoring the passing secret.
- These test keys are not acceptable for production cutover.

Resend:
- `RESEND_API_KEY` was loaded into the Worker preview.
- Contact API was changed to support `CONTACT_TO_EMAIL` with `hola@scalvia.mx` as default.
- Preview `CONTACT_TO_EMAIL` points to a controlled Resend test recipient.
- Controlled sends returned 200.

Contact API:
- Challenge: PASS.
- Invalid JSON: PASS.
- Invalid payload: PASS.
- Invalid origin without Turnstile: PASS.
- Turnstile failure: PASS.
- Turnstile success: PASS.
- Controlled valid request: PASS.

Vitelas:
- `/api/lalanuda/availability`: PASS.
- `/api/lalanuda/notify`: SAFE_TEST_LIMITATION. Only invalid payload was tested because a real booking can create customer-facing side effects.
- Endpoint names were not changed.

Scope guards:
- No DNS changes.
- No custom domain attached.
- No Vercel deployment.
- No push.
- No commit.
- `ops.scalvia.mx`, `chat.scalvia.mx`, VPS, and Chatwoot were not touched.
