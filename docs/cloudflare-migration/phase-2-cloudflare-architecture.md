# Scalvia Cloudflare Migration - Phase 2 Architecture

## Decision

Use Cloudflare Workers with `@opennextjs/cloudflare`, not a static export.

## Evidence

- The app has App Router route handlers under `/api/contact`, `/api/contact/challenge`, `/api/lalanuda/availability`, `/api/lalanuda/notify`, and `/api/lalanuda/debug`.
- `/vitelas` is explicitly `dynamic = "force-dynamic"`.
- The contact form depends on server-side validation, signed timing tokens, Cloudflare Turnstile verification, and Resend.
- Lalanuda/Vitelas booking flows depend on Google Calendar, Notion, Resend, and runtime environment variables.
- `npm run build:cloudflare` completed successfully with OpenNext and generated `.open-next/worker.js`.

## Runtime

- Next.js: 15.5.22 resolved in the current lockfile.
- React: 19.2.5 resolved in the current install.
- Local Node used by the build: 22.22.3.
- Cloudflare adapter: `@opennextjs/cloudflare@1.20.2`.
- Wrangler: `wrangler@4.118.0`.
- Worker compatibility date: `2026-08-01`.
- Worker compatibility flags: `nodejs_compat`, `global_fetch_strictly_public`.

## Config Added

- `wrangler.jsonc` defines a Worker named `scalvia-landing` with static assets from `.open-next/assets`.
- `open-next.config.ts` uses the default Cloudflare OpenNext config.
- `package.json` adds:
  - `build:cloudflare`
  - `preview:cloudflare`
  - `cf:typegen`
- `.gitignore` excludes `.open-next`, `.wrangler`, and local `.dev.vars*`.
- `public/_headers` adds immutable cache headers for `/_next/static/*`.

## Deployment Boundary

No production deployment was run. No Cloudflare DNS, routes, custom domains, Vercel production settings, `ops.scalvia.mx`, or `chat.scalvia.mx` were modified.

## Sources Checked

- OpenNext Cloudflare guide: https://opennext.js.org/cloudflare
- OpenNext existing-app setup: https://opennext.js.org/cloudflare/get-started
- OpenNext CLI behavior: https://opennext.js.org/cloudflare/cli
- Cloudflare Workers Next.js guide: https://developers.cloudflare.com/workers/framework-guides/web-apps/nextjs/
- Cloudflare Workers Node.js compatibility: https://developers.cloudflare.com/workers/runtime-apis/nodejs/
