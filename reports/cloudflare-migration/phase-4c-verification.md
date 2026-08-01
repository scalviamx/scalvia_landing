# Phase 4C Verification

Generated: 2026-08-01T07:44:36Z

Result: PASS

MIGRATION STATUS: CLOSED

## Worker

- Worker: `scalvia-landing`.
- Active version: `b65efec1-58fe-469d-acc8-448401700fe2`.
- Compatibility date: `2026-08-01`.
- Compatibility flags: `nodejs_compat`, `global_fetch_strictly_public`.
- Assets binding: `ASSETS`.
- Routes in use: `scalvia.mx/*`, `www.scalvia.mx/*`.

Secrets listed by name only:
- `CLERK_SECRET_KEY`
- `CONTACT_ALLOWED_ORIGINS`
- `CONTACT_FORM_SIGNING_SECRET`
- `CONTACT_TO_EMAIL`
- `DEMO_MODE`
- `GOOGLE_CALENDAR_ID`
- `GOOGLE_CLIENT_ID`
- `GOOGLE_CLIENT_SECRET`
- `GOOGLE_REFRESH_TOKEN`
- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
- `NEXT_PUBLIC_TURNSTILE_SITE_KEY`
- `NOTION_TOKEN`
- `NOTION_VITELAS_DB_ID`
- `RESEND_API_KEY`
- `TURNSTILE_SECRET_KEY`

Not configured in production Worker:
- `NOTION_LALANUDA_DB_ID`

Worker log/error check:
- Short tail: no exception events captured.
- Smoke checks: no 5xx observed.
- Tail limitation: no sampled request events were captured during the short window.

## Smoke

Production smoke result: PASS.

Checked:
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

All returned expected non-5xx responses.
Application routes returned from Worker evidence with no `x-vercel-id`.

## Playwright

Command:

```bash
BASE_URL=https://www.scalvia.mx npx playwright test tests/smoke/parity.spec.ts
```

Result:
- PASS, 15/15.

## Canonical

- `https://scalvia.mx`: `307`.
- Location: `https://www.scalvia.mx/`.
- `https://www.scalvia.mx`: `200`.
- OpenGraph URL: `https://www.scalvia.mx`.
- `metadataBase`: `https://www.scalvia.mx`.
- Sitemap uses `https://www.scalvia.mx`.
- `workers.dev` absent from production HTML, robots, and sitemap.
- No redirect loop observed.

## Integrations

Contact:
- Challenge endpoint: PASS.
- Invalid payload rejection: PASS.
- Turnstile production widget and hostnames: PASS.
- Resend: PASS from controlled Phase 4B internal QA send.
- `CONTACT_ALLOWED_ORIGINS`: configured by production Worker secret.

Vitelas:
- Availability endpoint: PASS.
- Google Calendar: PASS through availability endpoint.
- `NOTION_VITELAS_DB_ID`: configured.
- `hola@vitelas.mx`: active in code.
- Vitelas branding: active in code.
- No real booking executed in Phase 4C.

## Security

Headers validated on production:
- CSP report-only: PASS.
- HSTS: PASS.
- `X-Content-Type-Options`: PASS.
- `X-Frame-Options`: PASS.
- `Referrer-Policy`: PASS.
- `Permissions-Policy`: PASS.

## Isolation

`ops.scalvia.mx`:
- Preserved.
- Still Vercel.
- HTTP `307` to `/sign-in`.

`chat.scalvia.mx`:
- Preserved.
- Still preexisting Cloudflare `502`.
- Separate Chatwoot incident.

## Rollback

Vercel rollback:
- Deployment: `dpl_8reqJeE2NY3vrVPidQ7NLjqn1LN9`.
- Status: `Ready`.
- Not deleted.

## Git Validation

Result: PASS.

Commands:
- `npm run build`: PASS.
- `npm run build:cloudflare`: PASS. Initial sandbox run hit `listen EPERM` on `127.0.0.1`; rerun outside the sandbox completed successfully.
- JSON validation: PASS for all `reports/cloudflare-migration/*.json`.
- Secret scan: PASS, no token/key patterns found in post-cutover code, docs, or reports.
- `git diff --check`: PASS.
- `git status --short --untracked-files=all`: only expected post-cutover files before checkpoint.

Excluded from checkpoint:
- `.env.local`
- `.dev.vars*`
- `.vercel/`
- `.wrangler/`
- `.open-next/`
- `test-results/`
- `playwright-report/`
- secrets, tokens, and credentials

## Backlog

Deferred:
- Rename `/api/lalanuda/*` to `/api/vitelas/*`.
- Rename remaining legacy variables.
- Resolve 6 high npm vulnerabilities.
- Decide ISR/R2 persistence for Nutricion Pam.
- Retire remaining legacy references/documentation.
- Review eventual Vercel rollback retirement.
- Repair `chat.scalvia.mx` / Chatwoot separately.
