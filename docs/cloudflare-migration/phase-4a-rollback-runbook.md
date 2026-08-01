# Phase 4A Rollback Runbook

Status: DRAFT

Use this only if Phase 4B cutover has already happened and traffic must return to Vercel.

## Rollback Target

Primary rollback deployment:
- Vercel project: `scalvia-landing`
- Deployment ID: `dpl_8reqJeE2NY3vrVPidQ7NLjqn1LN9`
- Status at Phase 4A inspection: `Ready`
- Aliases at Phase 4A inspection: `scalvia.mx`, `www.scalvia.mx`

## Hard Boundaries

Do not modify:
- `ops.scalvia.mx`
- `chat.scalvia.mx`
- VPS
- Chatwoot
- unrelated subdomains
- mail records

## DNS / Route Rollback

1. Remove or disable only the Cloudflare Worker bindings/routes/custom domains created for:
   - `scalvia.mx`
   - `www.scalvia.mx`

2. Restore the previous Vercel routing for:
   - `scalvia.mx`
   - `www.scalvia.mx`

3. Keep Vercel aliases assigned to the rollback deployment:
   - `npx vercel inspect dpl_8reqJeE2NY3vrVPidQ7NLjqn1LN9`

4. Recheck DNS/HTTP:

```bash
curl -I https://scalvia.mx
curl -I https://www.scalvia.mx
curl -I https://ops.scalvia.mx
curl -I https://chat.scalvia.mx
```

Expected after rollback:
- `scalvia.mx` redirects to `https://www.scalvia.mx/`.
- `www.scalvia.mx` serves Vercel.
- `x-vercel-id` is present on `scalvia.mx` or `www.scalvia.mx`.
- `ops.scalvia.mx` remains unchanged.
- `chat.scalvia.mx` remains unchanged.

## Worker Code Rollback

If a Cloudflare Worker production deployment exists but only code needs rollback:

```bash
npx wrangler deployments list --name scalvia-landing
npx wrangler rollback <previous-version-id> --name scalvia-landing
```

This does not replace DNS rollback. Use it only when the route should remain on Cloudflare and the issue is isolated to Worker code.

## Validation After Rollback

Run:

```bash
curl -I https://www.scalvia.mx/
curl -I https://www.scalvia.mx/contacto
curl -I https://www.scalvia.mx/vitelas
curl -I https://www.scalvia.mx/robots.txt
curl -I https://www.scalvia.mx/sitemap.xml
curl -I https://www.scalvia.mx/api/contact/challenge
curl -I "https://www.scalvia.mx/api/lalanuda/availability?date=2026-08-03"
```

Then run the production Playwright suite:

```bash
BASE_URL=https://www.scalvia.mx npx playwright test
```

## Rollback Success Criteria

- Production traffic is back on Vercel for `scalvia.mx` and `www.scalvia.mx`.
- Vercel deployment `dpl_8reqJeE2NY3vrVPidQ7NLjqn1LN9` remains ready.
- No changes were made to `ops.scalvia.mx` or `chat.scalvia.mx`.
- User-facing pages and APIs pass smoke tests.
