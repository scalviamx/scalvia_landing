# Phase 3.3 Notion Vitelas

Status: PASS

Worker preview:
- Name: `scalvia-landing-preview`
- URL: `https://scalvia-landing-preview.hola-7e3.workers.dev`
- New preview version: `81e1ebd2-2543-40e0-9ca1-b812d4bf8f3e`
- Base commit: `10ce74eb9a0ac9255dde361ddb6baf8f96396591`
- Timestamp: `2026-08-01T06:38:42Z`

## Existing Notion Audit

Existing database:
- Name: `La Lanuda — Citas`
- Status: reachable.
- Classification: `WRONG_DATABASE` for Vitelas production readiness.

Required schema used by `/api/lalanuda/notify`:
- `ID Cita`: title
- `Fecha`: date
- `Cliente`: rich_text
- `Email`: email
- `Mascota`: rich_text
- `Raza`: rich_text
- `Tamaño`: select
- `Servicios`: rich_text
- `Total MXN`: number
- `Comisión 6% MXN`: number
- `Método de pago`: select
- `Notas`: rich_text
- `Hora inicio`: rich_text
- `Duración min`: number

No existing records were read or copied.

## Vitelas Database

Created:
- Name: `Vitelas — Citas`
- Schema: replicated only the 14 properties required by the current notify code.
- Historical La Lanuda records: not migrated.
- ID handling: stored only in ignored local env and Cloudflare Worker secret, never in Git/docs/reports.

QA row:
- A clearly identified QA row was created directly through the Notion API.
- The QA row was archived immediately after creation.
- No customer data was copied.
- `/api/lalanuda/notify` was not used for this write test because that route also triggers Calendar and Resend.

## Code Changes

- `/api/lalanuda/notify` now uses `NOTION_VITELAS_DB_ID`.
- `/api/lalanuda/debug` now uses `NOTION_VITELAS_DB_ID`.
- No fallback to `NOTION_LALANUDA_DB_ID` remains in active API code, to avoid accidental writes to `La Lanuda — Citas`.
- `/api/lalanuda/*` endpoint names were retained for temporary compatibility with the existing Vitelas frontend.

## Preview Secrets

Configured by name:
- `NOTION_VITELAS_DB_ID`

Legacy note:
- `NOTION_LALANUDA_DB_ID` may still exist as an unused Worker secret, but active API code no longer reads it.

## QA Results

- `npm run build`: PASS.
- `npm run build:cloudflare`: PASS.
- Playwright production: PASS, 15/15.
- Playwright preview: PASS, 15/15.
- `/api/contact/challenge`: PASS.
- `/api/contact`: PASS with controlled request.
- `/api/lalanuda/availability?date=2026-08-03`: PASS.
- `/api/lalanuda/notify` invalid payload: PASS.
- Notion direct QA create/archive in `Vitelas — Citas`: PASS.

Scope guards:
- No DNS changes.
- No custom domains attached.
- No cutover.
- No Vercel production deploy.
- No push.
- No Ops, Chatwoot, or VPS changes.
- No historical La Lanuda data migration.
