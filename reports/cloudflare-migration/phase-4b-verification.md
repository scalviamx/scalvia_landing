# Phase 4B Verification

Generated: 2026-08-01T07:33:45Z

Result: PASS

CUTOVER: SUCCESS

## Commands Executed

Preflight:
- `git status --short --untracked-files=all`
- `git log -3 --oneline`
- `npx wrangler deployments list --name scalvia-landing`
- `npx wrangler secret list --name scalvia-landing`
- `npx wrangler turnstile widget list --json`
- `npx vercel inspect dpl_8reqJeE2NY3vrVPidQ7NLjqn1LN9`

Pre-cutover smoke:
- `BASE_URL=https://scalvia-landing.hola-7e3.workers.dev npx playwright test tests/smoke/parity.spec.ts`
- `curl -I` checks against candidate routes and APIs.

Production candidate redeploy:
- `npm run build`
- `npm run build:cloudflare`
- `npx wrangler deploy .open-next/worker.js --name scalvia-landing ... --message phase-4b-canonical-redirect-candidate`

Cutover:
- `npx wrangler triggers deploy --name scalvia-landing --route 'scalvia.mx/*' --route 'www.scalvia.mx/*'`

Post-cutover validation:
- HTTP header checks for `scalvia.mx`, `www.scalvia.mx`, core pages, APIs, `ops.scalvia.mx`, and `chat.scalvia.mx`.
- DNS checks with `dig`.
- TLS checks with `openssl s_client`.
- `BASE_URL=https://www.scalvia.mx npx playwright test tests/smoke/parity.spec.ts`
- Contact challenge, invalid payload, positive QA payload, and Turnstile challenge-path tests.
- Vitelas availability and invalid notify payload tests.
- SEO fetch checks for HTML, robots, sitemap, and preview noindex.

## Cutover Command

```bash
npx wrangler triggers deploy --name scalvia-landing --route 'scalvia.mx/*' --route 'www.scalvia.mx/*'
```

Output confirmed:
- `https://scalvia-landing.hola-7e3.workers.dev`
- `scalvia.mx/*`
- `www.scalvia.mx/*`

## Origin Evidence

Before:
- `www.scalvia.mx` had `x-vercel-id`.

After:
- `www.scalvia.mx` has `x-opennext: 1`.
- `www.scalvia.mx` has no `x-vercel-id`.
- Active Worker deployment: `eb921aa7-525b-4bd0-b727-4d2c74209506`.

## Validation Summary

- `scalvia.mx` on Cloudflare Worker: PASS.
- `www.scalvia.mx` on Cloudflare Worker: PASS.
- canonical redirect: PASS.
- SSL: PASS.
- Playwright production: PASS, 15/15.
- Contact API: PASS.
- Turnstile: PASS.
- Google Calendar: PASS.
- Vitelas: PASS.
- Notion Vitelas configuration: PASS.
- Resend: PASS through controlled QA contact send.
- robots: PASS.
- sitemap: PASS.
- headers: PASS.
- `ops.scalvia.mx` intact: PASS.
- `chat.scalvia.mx` DNS intact: PASS, preexisting 502 preserved.
- Vercel rollback retained: PASS.

## Rollback

Rollback was not executed.

Rollback target remains:
- `dpl_8reqJeE2NY3vrVPidQ7NLjqn1LN9`

## Scope Confirmation

No changes were made to:
- `ops.scalvia.mx`
- `chat.scalvia.mx`
- VPS
- Chatwoot
- Ops Dashboard
- Vercel deployment deletion
- Vercel aliases deletion
- `/api/lalanuda/*` names
- branding

No push was performed.
