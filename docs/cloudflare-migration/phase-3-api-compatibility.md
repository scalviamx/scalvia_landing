# Phase 3 API Compatibility

Status: PASS_WITH_SAFE_TEST_LIMITATION

Preview target:
- `https://scalvia-landing-preview.hola-7e3.workers.dev`

Contact API:
- `/api/contact/challenge`: PASS, returns signed timing fields and no-store cache headers.
- `/api/contact` invalid JSON: PASS, returns 400.
- `/api/contact` invalid payload: PASS, returns 400.
- `/api/contact` invalid origin without Turnstile: PASS, returns 403 with `challenge_required`.
- `/api/contact` Turnstile negative path: PASS, verified by temporarily using the official failing Turnstile test secret, then restoring the passing preview secret.
- `/api/contact` controlled valid request: PASS, returns 200 and Resend accepts the send.
- Preview contact sends use `CONTACT_TO_EMAIL` to avoid sending QA messages to the production inbox.

Google Calendar:
- Root cause: `INVALID_CLIENT_ID`.
- Local `GOOGLE_CLIENT_ID` was not shaped like a Google OAuth client ID; production showed the correct long OAuth client ID shape.
- The existing local `GOOGLE_CLIENT_SECRET` and `GOOGLE_REFRESH_TOKEN` were valid when paired with the corrected client ID.
- `/api/lalanuda/availability?date=2026-08-03`: PASS locally and in Cloudflare preview.

Vitelas API:
- Vitelas still calls `/api/lalanuda/availability` from `src/app/vitelas/_components/VitelasPageClient.tsx`.
- Vitelas still calls `/api/lalanuda/notify` from `src/app/vitelas/_components/VitelasPageClient.tsx`.
- No endpoint rename was made.
- `/api/lalanuda/notify` real booking flow was not executed because it can create a Google Calendar event, Notion row, and emails.
- Active notify admin recipient was corrected from `hola@lalanuda.mx` to `hola@vitelas.mx`.
- Notion write compatibility was validated through direct create/archive in `Vitelas — Citas`.

Known Vitelas/La Lanuda naming issues:
- Calendar invite template title now says `Cita Vitelas`.
- Notion variable for active Vitelas writes is now `NOTION_VITELAS_DB_ID`.
- No active fallback to `NOTION_LALANUDA_DB_ID` remains in `/api/lalanuda/notify` or `/api/lalanuda/debug`.
- API paths remain `/api/lalanuda/*`.
- Sender branding is `Vitelas <noreply@info.scalvia.mx>` and reply-to is `hola@vitelas.mx`.

Turnstile:
- Preview uses official Cloudflare testing keys.
- These keys are only for preview/testing and must not be used for production cutover.

Resend:
- `RESEND_API_KEY` is configured as a Worker secret.
- Sender remains `noreply@info.scalvia.mx`.
- Contact preview tests used a controlled Resend test recipient through `CONTACT_TO_EMAIL`.
