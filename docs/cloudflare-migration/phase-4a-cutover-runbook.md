# Phase 4A Cutover Runbook

Status: READY

CUTOVER STATUS: GO for planning. Do not execute without a separate explicit Phase 4B approval.

This runbook is for the future Phase 4B. Do not execute it during Phase 4A.

## Scope

Move only:
- `scalvia.mx`
- `www.scalvia.mx`

Preserve exactly:
- `ops.scalvia.mx`
- `chat.scalvia.mx`

Do not touch:
- Vercel project deletion
- VPS
- Chatwoot
- Ops app
- unrelated subdomains

## Before

1. Confirm Git checkpoint:
   - `git rev-parse HEAD`
   - Expected rollback checkpoint before Phase 4A docs: `1b386253fec48b69de9ae8c0569ffe6a1d6fbd88`

2. Confirm Vercel rollback deployment:
   - `npx vercel inspect dpl_8reqJeE2NY3vrVPidQ7NLjqn1LN9`
   - Expected: `status Ready`, target `production`, aliases include `https://scalvia.mx` and `https://www.scalvia.mx`.

3. Confirm production Worker exists and is isolated:
   - `npx wrangler deployments list --name scalvia-landing`
   - Expected: production Worker exists at version `1a54fe14-3d8b-4d1b-856a-18f2ebe67230` or a later approved version.
   - Expected: no custom domains or routes are attached before the approved cutover window.

4. Confirm production Worker version:
   - `npx wrangler versions list --name scalvia-landing`
   - Record the version ID selected for cutover.

5. Confirm production secrets by name:
   - `npx wrangler secret list --name scalvia-landing`
   - Do not print values.
   - Required names are listed in `phase-4a-production-preparation.md`.

6. Confirm Turnstile:
   - Real production widget exists.
   - Hostname allowlist includes `scalvia.mx` and `www.scalvia.mx`.
   - Worker production uses the matching site key and secret key.
   - Preview testing keys are not used in production.

7. Capture DNS snapshot:
   - Preserve a sanitized snapshot for `scalvia.mx`, `www.scalvia.mx`, `ops.scalvia.mx`, and `chat.scalvia.mx`.
   - Verify `ops.scalvia.mx` and `chat.scalvia.mx` are not selected for modification.

8. Smoke baseline:
   - `curl -I https://scalvia.mx`
   - `curl -I https://www.scalvia.mx`
   - `curl -I https://ops.scalvia.mx`
   - `curl -I https://chat.scalvia.mx`

## Cutover

Execute only after explicit approval.

1. In Cloudflare, attach Worker routing only for:
   - `scalvia.mx/*`
   - `www.scalvia.mx/*`

2. Point both hostnames to the production Worker `scalvia-landing` using Cloudflare's approved Worker route or custom domain mechanism.

3. Preserve current canonical redirect:
   - `https://scalvia.mx` should redirect to `https://www.scalvia.mx/`.
   - `https://www.scalvia.mx` should serve the canonical site.

4. Do not change:
   - `ops.scalvia.mx`
   - `chat.scalvia.mx`
   - MX/TXT/mail records
   - VPS records
   - unrelated subdomains

## Immediate Validation

Run:

```bash
curl -I https://scalvia.mx
curl -I https://www.scalvia.mx
curl -I https://www.scalvia.mx/contacto
curl -I https://www.scalvia.mx/vitelas
curl -I https://www.scalvia.mx/rotunno-interiores
curl -I https://www.scalvia.mx/nutricionpamcastro
curl -I https://www.scalvia.mx/robots.txt
curl -I https://www.scalvia.mx/sitemap.xml
curl -I https://www.scalvia.mx/api/contact/challenge
curl -I "https://www.scalvia.mx/api/lalanuda/availability?date=2026-08-03"
```

Expected:
- root redirect preserved.
- `www` pages return `200`.
- `robots.txt` returns `200`.
- `sitemap.xml` returns `200`.
- contact challenge returns `200`.
- Vitelas availability returns `200`.
- headers remain present: `x-content-type-options`, `x-frame-options`, `referrer-policy`, `permissions-policy`, `strict-transport-security`.

Then run the full Playwright parity suite against production:

```bash
BASE_URL=https://www.scalvia.mx npx playwright test
```

Expected:
- full suite PASS.
- no real booking writes generated unless explicitly approved.

## Acceptance

Phase 4B can be accepted only when:
- `scalvia.mx` and `www.scalvia.mx` serve from Cloudflare Worker production.
- canonical redirect is preserved.
- contact challenge and guarded contact flow work.
- Vitelas availability works.
- `ops.scalvia.mx` remains on Vercel.
- `chat.scalvia.mx` remains untouched.
- Vercel production deployment remains available as rollback.
