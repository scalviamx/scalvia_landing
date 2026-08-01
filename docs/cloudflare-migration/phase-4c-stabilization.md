# Phase 4C Stabilization

Result: PASS

MIGRATION STATUS: CLOSED

Generated: 2026-08-01T07:44:36Z

## Production State

Production is stable on Cloudflare Workers:
- `scalvia.mx` routes to Cloudflare Worker `scalvia-landing`.
- `www.scalvia.mx` routes to Cloudflare Worker `scalvia-landing`.
- Active Worker version: `b65efec1-58fe-469d-acc8-448401700fe2`.
- Worker URL: `https://scalvia-landing.hola-7e3.workers.dev`.

Vercel remains available as rollback:
- Deployment: `dpl_8reqJeE2NY3vrVPidQ7NLjqn1LN9`.
- Status: `Ready`.
- Vercel project and aliases were not deleted.

## Stabilization Changes

Code changes are limited to:
- `src/middleware.ts`: preserve `scalvia.mx` to `www.scalvia.mx` redirect with HTTP `307`.
- `src/app/layout.tsx`: set `metadataBase` and OpenGraph URL to `https://www.scalvia.mx`.

No API names, branding, DNS records, Ops, Chatwoot, or VPS configuration were changed.

## Worker Inspection

Read-only inspection confirmed:
- Deployment active at 100%: `b65efec1-58fe-469d-acc8-448401700fe2`.
- Compatibility date: `2026-08-01`.
- Compatibility flags: `nodejs_compat`, `global_fetch_strictly_public`.
- Handler: `fetch`.
- Assets binding: `ASSETS`.
- Required production secrets are configured by name.
- `NOTION_LALANUDA_DB_ID` is not configured in the production Worker.

Routes:
- `scalvia.mx/*`
- `www.scalvia.mx/*`

Route evidence:
- `www.scalvia.mx` returns `x-opennext: 1`.
- `www.scalvia.mx` no longer returns `x-vercel-id`.
- `ops.scalvia.mx` still returns Vercel headers.

Errors:
- A short Worker tail window captured no exception events.
- No 5xx was observed in the 4C smoke checks.
- The tail window did not capture sampled request events, so this is a limited no-error observation, not a full log audit.

## Smoke Results

All expected production paths returned successful responses from the Worker:
- `/`
- `/problema`
- `/soluciones`
- `/proceso`
- `/marketing`
- `/resultados`
- `/contacto`
- `/privacidad`
- `/terminos`
- `/cookies`
- `/vitelas`
- `/rotunno-interiores`
- `/nutricionpamcastro`
- `/robots.txt`
- `/sitemap.xml`
- `/api/contact/challenge`
- `/api/lalanuda/availability?date=2026-08-03`

Result: PASS.

## Playwright

Command:

```bash
BASE_URL=https://www.scalvia.mx npx playwright test tests/smoke/parity.spec.ts
```

Result:
- PASS, 15/15.

## Canonical / SEO

Canonical routing:
- `https://scalvia.mx` returns `307`.
- Location: `https://www.scalvia.mx/`.

Metadata:
- `metadataBase`: `https://www.scalvia.mx`.
- OpenGraph URL: `https://www.scalvia.mx`.
- Sitemap URLs use `https://www.scalvia.mx`.
- `robots.txt` points to `https://www.scalvia.mx/sitemap.xml`.
- `workers.dev` is absent from production HTML, robots, and sitemap.

## Integrations

Contact:
- `GET /api/contact/challenge`: PASS.
- Invalid `POST /api/contact`: PASS, rejected safely.
- Turnstile widget: `Scalvia Production`.
- Turnstile hostnames: `scalvia.mx`, `www.scalvia.mx`.
- Resend was already validated in Phase 4B with one controlled internal QA send.

Vitelas:
- `GET /api/lalanuda/availability?date=2026-08-03`: PASS.
- Google Calendar-backed response: PASS.
- `NOTION_VITELAS_DB_ID`: configured by production Worker secret.
- `hola@vitelas.mx`: active in code.
- Vitelas branding: active in code.
- Real booking was not executed.

## Security Headers

Production responses preserve:
- `content-security-policy-report-only`
- `strict-transport-security`
- `x-content-type-options: nosniff`
- `x-frame-options: DENY`
- `referrer-policy: strict-origin-when-cross-origin`
- `permissions-policy`

No security header was relaxed.

## Isolation

`ops.scalvia.mx`:
- Still on Vercel.
- Still returns `/sign-in` redirect for signed-out users.
- No changes made.

`chat.scalvia.mx`:
- Still returns the preexisting Cloudflare `502`.
- Treated as a separate Chatwoot incident.
- No changes made.

## Backlog

Deferred, not implemented in Phase 4C:
- Rename `/api/lalanuda/*` to `/api/vitelas/*`.
- Rename remaining legacy variables.
- Resolve 6 high npm vulnerabilities.
- Decide ISR/R2 persistence strategy for Nutricion Pam.
- Retire remaining legacy references/documentation.
- Review eventual retirement of Vercel rollback.
- Repair `chat.scalvia.mx` / Chatwoot as a separate incident.
