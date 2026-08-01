# Phase 1 Service Dependencies

Date: 2026-08-01

## Public site: `scalvia.mx` / `www.scalvia.mx`

Runtime:

- Vercel LAMBDAS deployment.
- Next.js App Router.
- Node.js serverless functions for APIs.

Dependencies:

- Resend for contact/notification email.
- Cloudflare Turnstile for contact form verification.
- Google Calendar for Vitelas availability/booking integration.
- Notion for Vitelas booking logging.
- Clerk package is present and used by current Vitelas auth flow.
- External WordPress/WooCommerce handoff for Nutricion Pam Castro.
- External assets from configured remote image sources.

Cloudflare cutover risk:

- A static export is not sufficient unless API routes and server integrations are replaced.
- `/api/lalanuda/availability` and `/api/lalanuda/notify` must keep working for Vitelas until compatibility `/api/vitelas/*` routes are introduced.
- Turnstile, Resend, Google Calendar, Notion, Clerk, and external WooCommerce flows must be validated in preview before changing production DNS.

## Ops: `ops.scalvia.mx`

Runtime:

- Vercel LAMBDAS deployment.
- Next.js App Router.
- Project `scalviadashboard`.

Dependencies by variable name:

- `DATABASE_URL`
- `BETTER_AUTH_SECRET`
- `BETTER_AUTH_URL`
- `APP_URL`
- `NEXT_PUBLIC_APP_URL`
- `GOOGLE_CLIENT_ID`
- `GOOGLE_CLIENT_SECRET`
- `INITIAL_OWNER_EMAIL`
- `EMAIL_PROVIDER`
- `EMAIL_FROM`
- `RESEND_API_KEY`
- `CRON_SECRET`

Observed discrepancy:

- Current repo code is BetterAuth-based.
- Production `ops.scalvia.mx` currently shows Clerk headers and `/sign-in` routing.
- Do not use the public-site migration to change or redeploy Ops.

## Chat: `chat.scalvia.mx`

Runtime:

- Local inventories identify Chatwoot on `scalvia-vps`.
- Docker services: Rails, Sidekiq, Postgres, Redis.
- Remote path: `/opt/scalvia/chatwoot`.

Dependencies:

- Docker and Docker Compose on `scalvia-vps`.
- Postgres container/volume.
- Redis container/volume.
- Sidekiq worker.
- Cloudflare public proxy/DNS.
- Host firewall permits HTTP/HTTPS according to Scalvia VPS inventory.

Known risk:

- `scalvia-chatwoot-rails` is documented as restarting before this phase.
- Public `chat.scalvia.mx` currently returns Cloudflare `502`.
- Repair and backup Chatwoot in a dedicated maintenance window before any public reliance.
