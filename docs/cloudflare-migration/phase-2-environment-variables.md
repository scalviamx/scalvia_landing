# Phase 2 Environment Variables

No secret values were copied. This inventory lists names only.

| Variable | Classification | Cloudflare Workers secrets | Cloudflare env vars | Local development | Vercel rollback |
| --- | --- | --- | --- | --- | --- |
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | PUBLIC, BUILD_TIME | No | Yes, build variable | `.env.local` / `.env.development.local` | Keep existing Vercel env |
| `CLERK_SECRET_KEY` | SERVER_SECRET, RUNTIME | Yes | No | `.env.local` | Keep existing Vercel secret |
| `NEXT_PUBLIC_CLERK_SIGN_IN_URL` | PUBLIC, BUILD_TIME | No | Yes, build variable | `.env.local` | Keep existing Vercel env |
| `NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL` | PUBLIC, BUILD_TIME | No | Yes, build variable | `.env.local` | Keep existing Vercel env |
| `NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL` | PUBLIC, BUILD_TIME | No | Yes, build variable | `.env.local` | Keep existing Vercel env |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | PUBLIC, BUILD_TIME | No | Yes, build variable | `.env.local` if testing contact challenge | Keep existing Vercel env |
| `TURNSTILE_SECRET_KEY` | SERVER_SECRET, RUNTIME | Yes | No | `.env.local` if testing contact challenge | Keep existing Vercel secret |
| `CONTACT_ALLOWED_ORIGINS` | RUNTIME, OPTIONAL | No | Yes | `.env.local` optional | Keep existing Vercel env if set |
| `CONTACT_FORM_SIGNING_SECRET` | SERVER_SECRET, RUNTIME, OPTIONAL | Yes | No | `.env.local` recommended | Keep existing Vercel secret if set |
| `RESEND_API_KEY` | SERVER_SECRET, RUNTIME | Yes | No | `.env.local` | Keep existing Vercel secret |
| `NOTION_TOKEN` | SERVER_SECRET, RUNTIME | Yes | No | `.env.local` | Keep existing Vercel secret |
| `NOTION_LALANUDA_DB_ID` | SERVER_SECRET, RUNTIME | Yes | No | `.env.local` | Keep existing Vercel secret |
| `GOOGLE_CLIENT_ID` | SERVER_SECRET, RUNTIME | Yes | No | `.env.local` | Keep existing Vercel secret |
| `GOOGLE_CLIENT_SECRET` | SERVER_SECRET, RUNTIME | Yes | No | `.env.local` | Keep existing Vercel secret |
| `GOOGLE_REFRESH_TOKEN` | SERVER_SECRET, RUNTIME | Yes | No | `.env.local` | Keep existing Vercel secret |
| `GOOGLE_CALENDAR_ID` | RUNTIME, OPTIONAL | No | Yes, unless treated as private | `.env.local` | Keep existing Vercel env |
| `DEBUG_SECRET` | SERVER_SECRET, RUNTIME, LEGACY | Yes, only if debug route is intentionally re-enabled | No | Optional | Keep absent unless needed |
| `DEMO_MODE` | RUNTIME, OPTIONAL | No | Yes | Optional | Keep existing Vercel env if set |
| `NEXTJS_ENV` | RUNTIME, OPTIONAL | No | Local only | `.dev.vars` for Workers local dev | Not needed |

## Cloudflare Notes

- Store sensitive runtime values as Workers secrets.
- Store public `NEXT_PUBLIC_*` values as build variables because Next inlines them during build.
- Keep `.env.local` for `next dev` and local OpenNext builds.
- Keep all Vercel values intact until rollback is no longer needed.
