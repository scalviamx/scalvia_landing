# Cloudflare Migration Rollback

## Current Rollback State

Vercel production remains untouched.

- Project: `scalvia-landing`
- Repository: `scalviamx/scalvia_landing`
- Production deployment: `dpl_8reqJeE2NY3vrVPidQ7NLjqn1LN9`
- Domains currently on Vercel: `scalvia.mx`, `www.scalvia.mx`

## Before Cutover

- Do not remove Vercel project settings.
- Do not remove Vercel environment variables.
- Do not remove `.vercel`.
- Keep Cloudflare preview isolated on `*.workers.dev` or a separately approved temporary hostname.

## If Preview Fails

1. Stop Cloudflare preview testing.
2. Leave DNS pointed at the existing Vercel target.
3. Keep `ops.scalvia.mx` and `chat.scalvia.mx` unchanged.
4. Fix locally and rerun:
   - `npm run build`
   - `npm run build:cloudflare`
   - `git diff --check`

## If Cutover Later Fails

1. Revert Cloudflare DNS/routes for `scalvia.mx` and `www.scalvia.mx` back to the previously confirmed Vercel target.
2. Do not modify `ops.scalvia.mx`.
3. Do not modify `chat.scalvia.mx`.
4. Confirm Vercel serves:
   - `https://scalvia.mx`
   - `https://www.scalvia.mx`
5. Review Cloudflare Worker logs separately before another cutover attempt.

## Commit Boundary

After Phase 2 PASS, create a single preparation commit before Phase 3 preview work:

```text
chore: prepare scalvia site for cloudflare migration
```
