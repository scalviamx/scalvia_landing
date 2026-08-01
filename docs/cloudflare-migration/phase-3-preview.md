# Phase 3 Preview

Status: PASS_WITH_SAFE_TEST_LIMITATION

Preview Worker:
- Name: `scalvia-landing-preview`
- URL: `https://scalvia-landing-preview.hola-7e3.workers.dev`
- Cloudflare account: `Hola@scalvia.mx's Account`
- Base Git commit: `10ce74eb9a0ac9255dde361ddb6baf8f96396591`
- Phase 3.1 code deploy version: `1f272500-5406-4b22-8494-6191ca0ff06b`
- Final active version after Turnstile preview secret restore: `a2dcf566-9b00-4c0e-a37f-c8c2b416445a`

Scope:
- Created and tested an isolated Cloudflare Workers preview.
- No custom domain was attached.
- No DNS records were changed.
- No Vercel production deployment was modified.
- `ops.scalvia.mx`, `chat.scalvia.mx`, VPS, and Chatwoot were not touched.

Deployment history recorded during Phase 3:
- Initial preview upload: `0355ddae-b080-4fec-adff-b63afd806500`
- Preview noindex upload: `250ce38f-bbeb-4d54-9f49-0c82ed5fe055`
- Latest tested upload: `d5fcebf4-9cee-412c-a39c-3db661770c2d`
- Phase 3.1 code upload: `1f272500-5406-4b22-8494-6191ca0ff06b`
- Phase 3.1 final active version after secret restore: `a2dcf566-9b00-4c0e-a37f-c8c2b416445a`

Important note:
- The deployed Worker was built from base commit `10ce74eb9a0ac9255dde361ddb6baf8f96396591` plus local Phase 3 changes that are not committed yet.
- The local `wrangler.jsonc` name was changed from `scalvia-landing` to `scalvia-landing-preview` to avoid deploying to the future production Worker.

Secrets:
- Loaded into preview by name only: `CLERK_SECRET_KEY`, `NOTION_TOKEN`, `NOTION_LALANUDA_DB_ID`, `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, `GOOGLE_REFRESH_TOKEN`, `GOOGLE_CALENDAR_ID`, `CONTACT_ALLOWED_ORIGINS`, `CONTACT_FORM_SIGNING_SECRET`, `CONTACT_TO_EMAIL`, `RESEND_API_KEY`, `TURNSTILE_SECRET_KEY`, `NEXT_PUBLIC_TURNSTILE_SITE_KEY`.
- Missing for full parity validation: none for preview functional QA.
- Production-cutover note: Turnstile values are official testing keys and must be replaced before cutover.
- No secret values were copied into repository files or reports.

Preview indexing:
- All `*.workers.dev` requests receive `X-Robots-Tag: noindex, nofollow, noarchive`.
- `/robots.txt` and `/sitemap.xml` remain reachable for technical QA.
