# Phase 3 Known Issues

Status: PASS_WITH_NOTES

Resolved:
- Google Calendar preview credentials were corrected. `/api/lalanuda/availability?date=2026-08-03` now returns 200 in local validation and Cloudflare preview.
- Root cause was `INVALID_CLIENT_ID`: local `GOOGLE_CLIENT_ID` had the value shape of `primary` instead of a Google OAuth client ID. `GOOGLE_CALENDAR_ID` was also aligned to the production shape.
- The existing local `GOOGLE_CLIENT_SECRET` and `GOOGLE_REFRESH_TOKEN` worked once paired with the correct client ID.

Remaining notes:
- Turnstile preview uses official Cloudflare testing keys, not production keys. Do not carry testing keys into production/cutover.
- `RESEND_API_KEY` is configured in the preview Worker and contact sends were tested against a controlled Resend test recipient.
- Notion was validated with a direct QA create/archive in `Vitelas — Citas` to avoid Calendar and Resend side effects from `/api/lalanuda/notify`.
- `/api/lalanuda/notify` no longer uses `hola@lalanuda.mx` as active admin recipient; it now uses `hola@vitelas.mx`.
- `NOTION_VITELAS_DB_ID` is now the active Notion variable for Vitelas.
- `NOTION_LALANUDA_DB_ID` still refers to `La Lanuda — Citas` but active API code no longer reads it.

Known acceptable differences:
- Preview adds `X-Robots-Tag: noindex, nofollow, noarchive`.
- Preview cache headers differ from Vercel production on generated static pages.
- Production `/sitemap.xml` returned 404 because production is behind the migration-prep commit; preview returns 200.

NPM audit:
- `npm audit --json` reported 6 high vulnerabilities.
- Affected packages include `next`, `postcss`, `sharp`, `@clerk/nextjs`, `@opennextjs/cloudflare`, and transitive `@opennextjs/aws`.
- No audit fix was run.

Before production cutover:
- Replace Turnstile testing keys with real keys scoped for the production hostnames.
- Confirm the production Turnstile widget hostname allowlist includes `scalvia.mx` and `www.scalvia.mx`.
- Keep `NOTION_VITELAS_DB_ID` configured in any future production Worker environment before cutover.
- Review and commit or intentionally discard Phase 3/3.1 local changes before configuring production Worker names/routes.
