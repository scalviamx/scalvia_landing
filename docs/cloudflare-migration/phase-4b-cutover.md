# Phase 4B Cutover

Result: PASS

CUTOVER: SUCCESS

Generated: 2026-08-01T07:33:45Z

## Scope

Cutover authorized and executed only for:
- `scalvia.mx`
- `www.scalvia.mx`

Preserved:
- `ops.scalvia.mx`
- `chat.scalvia.mx`
- VPS
- Chatwoot
- Ops Dashboard
- Vercel rollback deployment

## Pre-Cutover State

- Git checkpoint: `0f80e0d6e3a7242f0d474a1b4453ccbc2035f0d7`
- Working tree before Phase 4B: clean.
- Vercel rollback deployment: `dpl_8reqJeE2NY3vrVPidQ7NLjqn1LN9`, status `Ready`.
- Worker candidate before traffic: `scalvia-landing`.
- Candidate URL: `https://scalvia-landing.hola-7e3.workers.dev`.
- Candidate version after canonical redirect redeploy: `eb921aa7-525b-4bd0-b727-4d2c74209506`.

## Canonical Redirect Fix

Before attaching production routes, `src/middleware.ts` was updated to preserve the existing Vercel behavior:

```text
https://scalvia.mx
        ↓ 307
https://www.scalvia.mx
```

Reason:
- The previous apex redirect was observable on Vercel.
- The Worker app did not previously implement host-level apex-to-www redirect.
- Without this fix, cutover could have changed canonical behavior.

The updated Worker candidate was rebuilt, redeployed, and validated before traffic was changed.

## Cutover Action

Executed:

```bash
npx wrangler triggers deploy --name scalvia-landing --route 'scalvia.mx/*' --route 'www.scalvia.mx/*'
```

Result:
- `scalvia.mx/*` attached to `scalvia-landing`.
- `www.scalvia.mx/*` attached to `scalvia-landing`.
- `https://scalvia-landing.hola-7e3.workers.dev` remains available.

No DNS records were edited directly.
No custom domains were attached through Vercel.
No Vercel deployment or alias was removed.

## Post-Cutover Evidence

`https://scalvia.mx`:
- HTTP `307`.
- Location: `https://www.scalvia.mx/`.
- `server: cloudflare`.
- No `x-vercel-id` observed.

`https://www.scalvia.mx`:
- HTTP `200`.
- `server: cloudflare`.
- `x-opennext: 1`.
- No `x-vercel-id` observed.

Production Worker:
- Name: `scalvia-landing`.
- Active version: `eb921aa7-525b-4bd0-b727-4d2c74209506`.
- Deployment message: `phase-4b-canonical-redirect-candidate`.

TLS:
- `scalvia.mx`: valid certificate observed.
- `www.scalvia.mx`: valid certificate observed.
- Issuer observed: Let's Encrypt.

## Production Validation

- Playwright production: PASS, 15/15.
- `/`: PASS.
- `/contacto`: PASS.
- `/vitelas`: PASS.
- `/rotunno-interiores`: PASS.
- `/nutricionpamcastro`: PASS.
- `/robots.txt`: PASS.
- `/sitemap.xml`: PASS.
- `/api/contact/challenge`: PASS.
- `/api/lalanuda/availability?date=2026-08-03`: PASS.

Contact API:
- Challenge endpoint: PASS.
- Invalid payload: PASS, rejected without email side effect.
- Positive controlled QA send: PASS, `200 success`.
- Turnstile challenge path: PASS, `403 challenge_required` with server challenge.

Vitelas:
- Availability endpoint: PASS.
- Google Calendar-backed response: PASS.
- `NOTION_VITELAS_DB_ID`: configured by Worker secret name.
- `NOTION_LALANUDA_DB_ID`: not configured in production Worker.
- Notify invalid payload: PASS, rejected before Notion/Calendar/Resend side effects.
- No real Vitelas booking was created.

SEO:
- Production `robots.txt`: PASS.
- Production `sitemap.xml`: PASS.
- `workers.dev` not present in production HTML, robots, or sitemap.
- Preview `workers.dev` keeps `X-Robots-Tag: noindex, nofollow, noarchive`.

Headers:
- CSP report-only: PASS.
- HSTS: PASS.
- `X-Content-Type-Options`: PASS.
- `X-Frame-Options`: PASS.
- `Referrer-Policy`: PASS.
- `Permissions-Policy`: PASS.
- Cache headers: PASS.

## Preserved Subdomains

`ops.scalvia.mx`:
- Still returns Vercel headers.
- Still redirects signed-out users to `/sign-in`.
- DNS target remains Vercel.

`chat.scalvia.mx`:
- Still returns Cloudflare `502`.
- This was preexisting and unchanged.

## Rollback

Rollback was not executed.

Rollback remains available via Vercel deployment:
- `dpl_8reqJeE2NY3vrVPidQ7NLjqn1LN9`

If rollback is needed, remove only the Worker routes for:
- `scalvia.mx/*`
- `www.scalvia.mx/*`

Do not modify:
- `ops.scalvia.mx`
- `chat.scalvia.mx`
- VPS
- Chatwoot
