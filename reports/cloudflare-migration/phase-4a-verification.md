# Phase 4A Verification

Generated: 2026-08-01T06:49:32Z

Result: PASS

CUTOVER STATUS: GO

## Commands Executed

Preflight:
- `git status --short --untracked-files=all`
- `git log -3 --oneline`
- `git diff --check`
- `git rev-parse HEAD`
- `git remote -v`

Read-only hosting checks:
- `npx wrangler whoami`
- `npx wrangler deployments list --name scalvia-landing`
- `npx wrangler deployments list --name scalvia-landing-preview`
- `npx wrangler versions list --name scalvia-landing-preview`
- `npx wrangler secret list --name scalvia-landing-preview`
- `npx wrangler secret list --name scalvia-landing`
- `npx wrangler turnstile widget list`
- `npx vercel env ls`
- `npx vercel inspect dpl_8reqJeE2NY3vrVPidQ7NLjqn1LN9`

HTTP checks:
- `curl -I https://scalvia.mx`
- `curl -I https://www.scalvia.mx`
- `curl -I https://ops.scalvia.mx`
- `curl -I https://chat.scalvia.mx`

Code/config inspection:
- `rg -n "SITE_ORIGIN|metadataBase|robots|sitemap|redirect|permanentRedirect|NEXT_PUBLIC_CLERK|ClerkProvider|process\\.env" src next.config.* wrangler.jsonc package.json`
- `rg -n "redirects|source|destination|scalvia\\.mx|www\\.scalvia\\.mx|metadataBase|canonical" next.config.ts src vercel.json wrangler.jsonc`
- `git check-ignore -v .vercel/project.json .open-next/worker.js .wrangler/state .dev.vars`

Final validation:
- `npm run build`
- `npm run build:cloudflare`
- JSON parse validation for Phase 4A JSON reports
- secret scan over Phase 4A deliverables
- `git diff --check`
- `git status --short --untracked-files=all`

## Read-only Results

Wrangler:
- Account confirmed: `hola@scalvia.mx`.
- Cloudflare account ID confirmed: `7e31f4523136bac16637fd728572c4ec`.
- Preview Worker `scalvia-landing-preview` exists.
- Preview version `81e1ebd2-2543-40e0-9ca1-b812d4bf8f3e` exists.
- Production Worker `scalvia-landing` was not found.
- Preview Worker secrets were listed by name only.
- Production Worker secrets could not be listed because the Worker does not exist.

Turnstile:
- `npx wrangler turnstile widget list` returned `No Turnstile widgets found`.
- Production hostname allowlist is not verified.

Vercel:
- Project `scalvia-landing` has production env vars configured by name.
- Deployment `dpl_8reqJeE2NY3vrVPidQ7NLjqn1LN9` is `Ready`.
- Deployment aliases include `https://scalvia.mx` and `https://www.scalvia.mx`.

HTTP:
- `https://scalvia.mx`: `307` to `https://www.scalvia.mx/`, `server: cloudflare`, `x-vercel-id` present.
- `https://www.scalvia.mx`: `200`, `server: cloudflare`, `x-vercel-id` present.
- `https://ops.scalvia.mx`: `307` to `/sign-in`, `server: Vercel`, Clerk auth headers present.
- `https://chat.scalvia.mx`: `502`, `server: cloudflare`.

Git ignore:
- `.vercel/`, `.open-next/`, `.wrangler/`, and `.dev.vars` are ignored.

## Not Executed

DNS/custom domain cutover:
- Not executed.

Vercel deploy:
- Not executed.

Real booking/email side-effect tests:
- Not executed. `POST /api/lalanuda/notify` was validated with an invalid payload that exits before Notion, Calendar, or Resend side effects.
- Notion debug endpoint was not executed because it creates a test Notion page and Calendar event.

## Final Validation Results

PASS:
- `npm run build`: PASS.
- `npm run build:cloudflare`: PASS after rerun outside sandbox. The first sandboxed run failed with `listen EPERM: operation not permitted 127.0.0.1`; no deployment happened.
- JSON validation: PASS for all Phase 4A JSON reports.
- `git diff --check`: PASS.
- Secret scan over Phase 4A deliverables: PASS.

Working tree:
- Only Phase 4A docs/reports are untracked.
- `.vercel/`, `.open-next/`, `.wrangler/`, and `.dev.vars` are ignored and not part of the working tree changes.

Cutover/deployment confirmation:
- No DNS changes.
- No custom domains attached.
- Cloudflare Worker production candidate deployed only to `workers.dev`.
- No Vercel deploy.
- No push.

## Phase 4A.1 Results

Turnstile:
- Widget `Scalvia Production`: PASS.
- Mode: `managed`.
- Hostnames: `scalvia.mx`, `www.scalvia.mx`.
- Sitekey fingerprint: `sha256:8855e1ba8219`.
- Secret value was not printed or stored in Git.

Worker production candidate:
- Worker: `scalvia-landing`.
- URL: `https://scalvia-landing.hola-7e3.workers.dev`.
- Version: `1a54fe14-3d8b-4d1b-856a-18f2ebe67230`.
- Commit: `1b386253fec48b69de9ae8c0569ffe6a1d6fbd88`.
- No routes or custom domains attached.

Secrets configured by name:
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

Legacy secret intentionally excluded:
- `NOTION_LALANUDA_DB_ID`

Candidate QA:
- `BASE_URL=https://scalvia-landing.hola-7e3.workers.dev npx playwright test tests/smoke/parity.spec.ts`: PASS, 15/15 after rerun outside sandbox.
- `GET /api/contact/challenge`: PASS.
- `POST /api/contact` invalid payload: PASS; rejected without Resend side effect.
- `GET /api/lalanuda/availability?date=2026-08-03`: PASS; returned `busy` array without error.
- `POST /api/lalanuda/notify` invalid payload: PASS; rejected before Notion, Calendar, or Resend side effects.
