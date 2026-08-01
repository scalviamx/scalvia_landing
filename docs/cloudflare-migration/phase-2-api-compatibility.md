# Phase 2 API Compatibility

## `/api/contact`

Status: COMPATIBLE

- Uses `NextRequest`, `NextResponse`, `Resend`, `node:crypto`, `Buffer`, and Turnstile verification via `fetch`.
- Requires `RESEND_API_KEY`.
- Requires `TURNSTILE_SECRET_KEY` when challenge validation is needed.
- Should have `CONTACT_FORM_SIGNING_SECRET` in Workers secrets to avoid per-isolate fallback behavior.
- Build result: included in OpenNext bundle.

## `/api/contact/challenge`

Status: COMPATIBLE

- Creates signed timing token server-side.
- Uses `node:crypto` through `contactSecurity`.
- Requires `CONTACT_FORM_SIGNING_SECRET` for stable token validation across isolates.
- Build result: included in OpenNext bundle.

## `/api/lalanuda/availability`

Status: REQUIRES_ADAPTATION

- Uses `googleapis` through `src/lib/google-calendar.ts`.
- Build passes with `nodejs_compat`.
- Runtime must be smoke-tested in Workers with Google OAuth refresh credentials.
- If the SDK fails in Workers, replace the `googleapis` dependency on this path with direct Google Calendar REST calls using `fetch`.

## `/api/lalanuda/notify`

Status: REQUIRES_ADAPTATION

- Uses Resend, Notion, and Google Calendar.
- Resend and Notion are expected to work through `fetch`-based HTTP clients.
- Google Calendar has the same SDK risk as `/api/lalanuda/availability`.
- Email is best-effort; Notion/Calendar failures are logged and do not currently fail the booking response.

## `/api/lalanuda/debug`

Status: LEGACY

- Phase 0 changed this route to return 404 unless `DEBUG_SECRET` is configured and supplied.
- Keep it hidden during migration.
- Do not enable it in Cloudflare unless explicitly needed for a short diagnostic window.

## API Preview Checks For Phase 3

- `GET /api/contact/challenge` returns JSON and no-store cache header.
- `POST /api/contact` rejects malformed payloads and accepts valid payloads with preview-safe recipient strategy.
- `GET /api/lalanuda/availability?date=YYYY-MM-DD` works in `DEMO_MODE=true`, then with real Google credentials.
- `POST /api/lalanuda/notify` works in `DEMO_MODE=true`; test real integrations only with an intentional preview booking.
