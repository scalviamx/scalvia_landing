# Phase 4A Production Preparation

Status: PASS

CUTOVER STATUS: GO

Generated: 2026-08-01T06:49:32Z
Updated: 2026-08-01T07:08:01Z

Scope guards:
- No DNS changes.
- No custom domains attached.
- No Cloudflare production traffic changes.
- No Vercel deployment.
- No Vercel alias changes.
- No Ops, Chatwoot, VPS, or Chatwoot incident work.
- No push.

## Git Preflight

Rollback checkpoint:
- Commit: `1b386253fec48b69de9ae8c0569ffe6a1d6fbd88`
- Message: `chore: validate cloudflare preview and production readiness`

Recent commits:
- `1b38625 chore: validate cloudflare preview and production readiness`
- `10ce74e chore: prepare scalvia site for cloudflare migration`
- `70c4101 Disable legal pages header animation`

Git remote:
- `origin`: `git@github.com-scalvia:scalviamx/scalvia_landing.git`

## Current Hosting State

Vercel rollback deployment:
- Project: `scalvia-landing`
- Deployment ID: `dpl_8reqJeE2NY3vrVPidQ7NLjqn1LN9`
- Target: `production`
- Status: `Ready`
- Aliases include `https://scalvia.mx` and `https://www.scalvia.mx`

Cloudflare account:
- Account: `Hola@scalvia.mx's Account`
- Account ID: `7e31f4523136bac16637fd728572c4ec`
- Auth source: Wrangler OAuth in local user config.

Worker preview:
- Name: `scalvia-landing-preview`
- URL: `https://scalvia-landing-preview.hola-7e3.workers.dev`
- Current validated version: `81e1ebd2-2543-40e0-9ca1-b812d4bf8f3e`
- `workers_dev`: enabled

Worker production candidate:
- Name: `scalvia-landing`
- Status: CREATED_AND_VALIDATED
- URL: `https://scalvia-landing.hola-7e3.workers.dev`
- Version: `1a54fe14-3d8b-4d1b-856a-18f2ebe67230`
- Created: 2026-08-01T07:05:35.676Z
- Custom domains: none attached.
- Routes: none attached.

## Worker Configuration

Current tracked `wrangler.jsonc` is still configured for preview:
- `name`: `scalvia-landing-preview`
- `main`: `.open-next/worker.js`
- `compatibility_date`: `2026-08-01`
- `compatibility_flags`: `nodejs_compat`, `global_fetch_strictly_public`
- `workers_dev`: `true`
- assets binding: `ASSETS`
- observability: enabled

Build command:
- `npm run build`

Cloudflare build command:
- `npm run build:cloudflare`

Preview deploy command currently implied by config:
- `npx wrangler deploy`

Production candidate deploy command used in Phase 4A.1:
- `npx wrangler deploy .open-next/worker.js --name scalvia-landing --compatibility-date 2026-08-01 --compatibility-flag nodejs_compat --compatibility-flag global_fetch_strictly_public --assets .open-next/assets --secrets-file <temporary-env-file> --keep-vars --message phase-4a1-production-candidate`

The temporary secrets file was outside the repository and was deleted after use.

Rollback command for Worker code only, if the production Worker exists:
- `npx wrangler rollback <previous-version-id> --name scalvia-landing`

DNS rollback remains the primary rollback while Vercel is retained.

## Production Variables

No values were copied into this document.

| Variable | Classification | Required for production | Status |
|---|---|---:|---|
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | BUILD_TIME_PUBLIC | yes | Configured in production Worker |
| `CLERK_SECRET_KEY` | SECRET | yes for Clerk runtime | Configured in production Worker |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | BUILD_TIME_PUBLIC | yes | Configured from real production widget |
| `TURNSTILE_SECRET_KEY` | SECRET | yes | Configured from real production widget |
| `CONTACT_ALLOWED_ORIGINS` | PLAIN_RUNTIME | yes | Configured as `https://scalvia.mx,https://www.scalvia.mx` |
| `CONTACT_FORM_SIGNING_SECRET` | SECRET | yes | Configured in production Worker |
| `CONTACT_TO_EMAIL` | PLAIN_RUNTIME | yes | Configured as `hola@scalvia.mx` |
| `RESEND_API_KEY` | SECRET | yes | Configured in production Worker |
| `NOTION_TOKEN` | SECRET | yes for Vitelas notify/debug | Configured in production Worker |
| `NOTION_VITELAS_DB_ID` | SECRET | yes for Vitelas | Configured in production Worker |
| `GOOGLE_CLIENT_ID` | SECRET | yes for Vitelas availability/booking | Configured in production Worker |
| `GOOGLE_CLIENT_SECRET` | SECRET | yes | Configured in production Worker |
| `GOOGLE_REFRESH_TOKEN` | SECRET | yes | Configured in production Worker |
| `GOOGLE_CALENDAR_ID` | PLAIN_RUNTIME | yes for intended calendar | Configured in production Worker |
| `DEMO_MODE` | PLAIN_RUNTIME | optional | Configured as false |
| `NEXTJS_ENV` | NOT_REQUIRED | no | Not used by current code |
| `DEBUG_SECRET` | NOT_REQUIRED | no | Keep absent unless a controlled debug window is approved |
| `NEXT_PUBLIC_DEMO_MODE` | LEGACY | no | Present in Vercel but not read by code |
| `NOTION_LALANUDA_DB_ID` | LEGACY | no | Must not be used by production Worker |

## Vercel vs Cloudflare Matrix

| Variable group | Vercel Production | Cloudflare Production | Status |
|---|---|---|---|
| Turnstile | configured by name | configured from `Scalvia Production` widget | MATCH |
| Resend | configured by name | configured by name | MATCH |
| Google OAuth | configured by name | configured by name | MATCH |
| Notion | legacy variable still present, active Vitelas variable absent from Vercel list | corrected Vitelas variable configured | DIFFERENT_INTENTIONALLY |
| Contact | configured by name | configured by name | MATCH |
| Clerk | configured by name | configured by name | MATCH |

The target is not to copy Vercel blindly. Cloudflare production should use the corrected Vitelas configuration from Phases 3.1 to 3.3.

## Turnstile

Status: PASS

Evidence:
- `Scalvia Production` widget exists.
- Widget mode is `managed`.
- Hostnames are `scalvia.mx` and `www.scalvia.mx`.
- Sitekey fingerprint recorded only as `sha256:8855e1ba8219`.
- Matching sitekey/secret were configured in the production Worker without printing values.
- Preview remains independent on `scalvia-landing-preview`.

No `workers.dev` hostname was added to the production widget.

## Contact API

Required production `CONTACT_ALLOWED_ORIGINS`:
- `https://scalvia.mx`
- `https://www.scalvia.mx`

Do not keep `workers.dev` in production allowed origins unless explicitly needed for a temporary smoke window, and remove it before cutover.

## Vitelas

Status: READY

Confirmed code state:
- `/api/lalanuda/notify` reads `NOTION_VITELAS_DB_ID`.
- `/api/lalanuda/debug` reads `NOTION_VITELAS_DB_ID`.
- Active code no longer falls back to `NOTION_LALANUDA_DB_ID`.
- Endpoint names `/api/lalanuda/*` remain unchanged for current Vitelas frontend compatibility.
- Vitelas branding and notify recipient were corrected in earlier phases.
- Phase 3.3 validated the dedicated Notion database `Vitelas - Citas` without copying historical La Lanuda records.
- Production Worker secrets include `NOTION_VITELAS_DB_ID` and exclude `NOTION_LALANUDA_DB_ID`.

## Canonical Hostname

Preserve current behavior:
- `https://scalvia.mx` redirects to `https://www.scalvia.mx/`.
- `SITE_ORIGIN` is `https://www.scalvia.mx`.
- `robots.ts` uses `SITE_ORIGIN` for host and sitemap.
- `sitemap.ts` emits URLs based on `SITE_ORIGIN`.

Note:
- OpenGraph `url` in `src/app/layout.tsx` currently uses `https://scalvia.mx`. This is not changed in Phase 4A. It should be reviewed separately only if a canonical metadata cleanup is desired.

## Phase 4A Decision

Result: PASS

CUTOVER STATUS: GO

Blockers:
- None remaining for application readiness.

Phase 4B still requires a separate explicit approval before DNS, routes, or custom domains are changed.
