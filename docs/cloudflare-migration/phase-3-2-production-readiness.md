# Phase 3.2 Production Readiness

Status: PASS_WITH_NOTES

Worker preview:
- Name: `scalvia-landing-preview`
- URL: `https://scalvia-landing-preview.hola-7e3.workers.dev`
- Previous active version: `a2dcf566-9b00-4c0e-a37f-c8c2b416445a`
- New preview version: `517d59ad-c365-4692-8e01-3ee825ee13d0`
- Base commit: `10ce74eb9a0ac9255dde361ddb6baf8f96396591`

Scope:
- No DNS changes.
- No custom domains attached.
- No Vercel production deploy.
- No push.
- No cutover.
- No `ops.scalvia.mx`, `chat.scalvia.mx`, VPS, or Chatwoot changes.
- No `/api/lalanuda/*` endpoint rename.

## Turnstile

Status: READY_WITH_DASHBOARD_CHECK

Preview:
- `PREVIEW_TURNSTILE = testing credentials`
- The Worker preview keeps official Cloudflare testing credentials for safe QA on `workers.dev`.

Production:
- `PRODUCTION_TURNSTILE = real credentials`
- Vercel has both `NEXT_PUBLIC_TURNSTILE_SITE_KEY` and `TURNSTILE_SECRET_KEY` configured for Production.
- The live production `/contacto` bundle includes a real Turnstile sitekey. Only a fingerprint was recorded during QA.
- Vercel does not expose encrypted secret values, and no secret values were copied into docs or reports.

Remaining production check:
- Confirm in Cloudflare Turnstile Dashboard that the production widget hostname allowlist includes `scalvia.mx` and `www.scalvia.mx`.
- Do not replace preview testing keys with production keys while preview still needs safe automated QA.

## Vitelas / La Lanuda Audit

Active dependencies:
- `/api/lalanuda/availability`: `ACTIVE_VITELAS_DEPENDENCY`, `SAFE_TO_KEEP_TEMPORARILY`.
- `/api/lalanuda/notify`: `ACTIVE_VITELAS_DEPENDENCY`, `SAFE_TO_KEEP_TEMPORARILY`.
- Frontend calls in `src/app/vitelas/_components/VitelasPageClient.tsx`: `ACTIVE_VITELAS_DEPENDENCY`.
- Endpoint names and logs containing `lalanuda`: `LEGACY_NAME_ONLY`, `REQUIRES_MIGRATION` later.

Corrected:
- `hola@lalanuda.mx` as active notify recipient: `WRONG_RECIPIENT`, corrected to `hola@vitelas.mx`.
- Google Calendar template title `Cita La Lanuda`: `WRONG_BRANDING`, corrected to `Cita Vitelas`.
- Active `/vitelas` testimonial text that referenced La Lanuda: `WRONG_BRANDING`, corrected to Vitelas.

Safe to keep temporarily:
- `NOTION_LALANUDA_DB_ID` variable name: `LEGACY_NAME_ONLY` as a name, but its current target is not safe for cutover.
- `/api/lalanuda/*` endpoint names: `SAFE_TO_KEEP_TEMPORARILY` because Vitelas frontend still depends on them.
- Legacy static `src/clientes/lalanuda/index.html`: `LEGACY_NAME_ONLY`, hidden from active routing.

Resolved in Phase 3.3:
- A dedicated `Vitelas — Citas` database was created with the required schema.
- Active API code now uses `NOTION_VITELAS_DB_ID`.
- There is no active fallback to `NOTION_LALANUDA_DB_ID`.

## QA Results

- `npm run build`: PASS.
- `npm run build:cloudflare`: PASS.
- Playwright production: PASS, 15/15.
- Playwright preview: PASS, 15/15.
- `/api/contact/challenge` preview: PASS.
- `/api/contact` preview invalid JSON/payload: PASS.
- `/api/contact` preview controlled valid request: PASS.
- `/api/lalanuda/availability?date=2026-08-03` preview: PASS.
- `/api/lalanuda/notify` invalid payload preview: PASS.
- Real `/api/lalanuda/notify`: not executed because it would create Calendar and Resend side effects. Notion itself was validated by direct create/archive in `Vitelas — Citas`.

## Checkpoint Git

Status: READY_FOR_PHASE_3_3_CHECKPOINT

Reason:
- The Notion blocker was resolved in Phase 3.3.

Next required input:
- Create the Phase 3/3.1/3.2/3.3 checkpoint after final secret scan and artifact exclusion checks.
