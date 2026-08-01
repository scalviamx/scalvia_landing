# Phase 1 Hosting Map

Date: 2026-08-01

## Summary

| Hostname | Classification | DNS provider | Proxy/CDN | Hosting/origin | Confidence | Action |
|---|---|---|---|---|---|---|
| `scalvia.mx` | `VERCEL` | Cloudflare | Cloudflare | Vercel project `scalvia-landing` | HIGH | MIGRATE public site later |
| `www.scalvia.mx` | `VERCEL` | Cloudflare | Cloudflare | Vercel project `scalvia-landing` | HIGH | MIGRATE public site later |
| `ops.scalvia.mx` | `VERCEL` | Cloudflare zone | None observed; direct Vercel route | Vercel project `scalviadashboard` | HIGH | KEEP_AS_IS |
| `chat.scalvia.mx` | `VPS_DOCKER` | Cloudflare | Cloudflare | Scalvia VPS Chatwoot Docker stack | MEDIUM | KEEP_AS_IS, repair separately |

Cloudflare DNS/proxy does not mean Cloudflare hosting. For the public site, Cloudflare is DNS/proxy/CDN in front of Vercel. For `chat.scalvia.mx`, Cloudflare is the public edge, but local inventory points to a Dockerized Chatwoot stack on `scalvia-vps`; the origin is currently unhealthy.

## `scalvia.mx` and `www.scalvia.mx`

Confirmed hosting: Vercel.

Evidence:

- Vercel connector: project `scalvia-landing` (`prj_OHZ1Q1EJPi0Ef8PRlrtkJfFwizSG`) has domains `www.scalvia.mx` and `scalvia.mx`.
- Vercel connector: production deployment `dpl_8reqJeE2NY3vrVPidQ7NLjqn1LN9`, alias includes `www.scalvia.mx` and `scalvia.mx`.
- Vercel deployment metadata links to GitHub repo `scalviamx/scalvia_landing`, branch `main`, commit `70c410196ff45b4f4766513800c458e8696f9270`.
- External HTTP: `https://scalvia.mx/` returns `307` to `https://www.scalvia.mx/`.
- External HTTP: `https://www.scalvia.mx/` returns `200`, `server: cloudflare`, `x-vercel-id`, `x-vercel-cache`, and `x-matched-path: /`.
- DNS: nameservers are Cloudflare (`bjorn.ns.cloudflare.com`, `paloma.ns.cloudflare.com`).
- DNS: apex and `www` resolve to Cloudflare anycast A records, with no public CNAME observed for `www`.

Repository:

- Local repo: `/Users/robertomagallanes/Downloads/Scalvia/05_Repos/scalvia_landing`
- Vercel/GitHub repo: `scalviamx/scalvia_landing`

Important discrepancy:

- Local `.vercel/project.json` contains stale or alternate Vercel project metadata: `projectName=scalvia_landing`, `projectId=prj_KwetKhFnNoeDGLp2eSLwqxE5Q31h`, `orgId=team_1Qc1yaFDjqDS3SMqEhd0gpul`.
- The connected Vercel account and live domains point to `projectName=scalvia-landing`, `projectId=prj_OHZ1Q1EJPi0Ef8PRlrtkJfFwizSG`, `orgId=team_uyGBhzZN5wXadK4wRebv3Wwu`.
- Before any deployment, relink or verify `.vercel/project.json` to avoid deploying to the wrong project.

## `ops.scalvia.mx`

Confirmed hosting: Vercel.

Evidence:

- Vercel connector: project `scalviadashboard` (`prj_mjv2oiUY2NnjSF3X6OMPm68aGF1f`) has domain `ops.scalvia.mx`.
- Vercel connector: production deployment `dpl_97JuZk4ZJjwo5Juycn7BQ6X1RQya`, alias includes `ops.scalvia.mx`.
- Deployment metadata links to GitHub repo `scalviamx/scalviadashboard`, branch `main`, commit `7c4b08231d9d9e2c4a040da115eee9e940599cf7`.
- Local repo `.vercel/project.json` in `../scalviadashboard` matches project `scalviadashboard`.
- DNS CNAME for `ops.scalvia.mx` points to a Vercel DNS target.
- External HTTP: `https://ops.scalvia.mx/dashboard` returns `307` from `server: Vercel`.
- External TLS: certificate SAN includes only `ops.scalvia.mx`.

Repository:

- Local repo: `/Users/robertomagallanes/Downloads/Scalvia/05_Repos/scalviadashboard`
- Vercel/GitHub repo: `scalviamx/scalviadashboard`

Runtime dependencies from local repo:

- Next.js App Router
- Vercel Functions / Node runtime
- Postgres via `DATABASE_URL` and Drizzle
- BetterAuth in current repo code
- Google OAuth variables by name
- Resend variables by name
- Cron route `/api/cron/daily-digest`

Production auth discrepancy:

- The local repo and recent preview docs indicate BetterAuth.
- Current production `ops.scalvia.mx` still exposes Clerk headers and redirects unauthenticated `/dashboard` to `/sign-in`.
- `https://ops.scalvia.mx/login` currently returns 404.
- Treat production auth state as a risk: Vercel hosting is confirmed, but the live production deployment appears older or still Clerk-protected.

Do not migrate or modify `ops.scalvia.mx` during public-site Cloudflare cutover.

## `chat.scalvia.mx`

Confirmed likely hosting: Scalvia VPS Docker. Confidence is MEDIUM because the public endpoint currently returns Cloudflare 502, and no live origin inspection was performed.

Evidence:

- DNS: `chat.scalvia.mx` resolves to Cloudflare anycast A/AAAA records, with no public CNAME observed.
- External HTTP: `https://chat.scalvia.mx/` returns `502` from `server: cloudflare`.
- External TLS: certificate SAN is Cloudflare-facing wildcard coverage for `*.scalvia.mx` and `scalvia.mx`.
- Local infrastructure docs identify `scalvia-vps` as a remote production VPS with paths `/opt/scalvia/chatwoot` and containers `scalvia-chatwoot-*`.
- Local infrastructure docs list productive containers `scalvia-chatwoot-postgres`, `scalvia-chatwoot-rails`, `scalvia-chatwoot-redis`, and `scalvia-chatwoot-sidekiq`.
- Local known issue: `scalvia-chatwoot-rails` was already restarting and should be handled in a dedicated Scalvia production maintenance window.

Origin/service:

- Host: `scalvia-vps`
- Remote path: `/opt/scalvia/chatwoot`
- Services: Chatwoot Rails, Sidekiq, Postgres, Redis
- Public mechanism: Cloudflare proxied hostname to origin; exact origin mechanism is not confirmed from local files.

Do not migrate or modify `chat.scalvia.mx` during public-site Cloudflare cutover. Repair Chatwoot separately before relying on it for production support.
