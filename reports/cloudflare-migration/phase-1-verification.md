# Phase 1 Verification

Date: 2026-08-01

## Local evidence reviewed

- `reports/scalvia-domain-inventory.md`
- `reports/scalvia-domain-inventory.json`
- `scalvia_landing/.vercel/project.json`
- `scalvia_landing/vercel.json`
- `scalviadashboard/.vercel/project.json`
- `scalviadashboard/vercel.json`
- `scalviadashboard/README.md`
- `scalviadashboard/.env.example`
- `scalviadashboard/deploy.sh`
- `scalviadashboard/docs/deploy/vercel-env-audit.md`
- `/Users/robertomagallanes/Developer/labs/docs/networking/tailscale-scalvia-setup.md`
- `/Users/robertomagallanes/Developer/labs/docs/management/beszel-scalvia-agent-installation.md`
- `/Users/robertomagallanes/Developer/labs/docs/management/central-monitoring-status.md`
- `/Users/robertomagallanes/Developer/labs/inventory/known-issues.yaml`
- `/Users/robertomagallanes/Developer/labs/inventory/hosts.yaml`

## Vercel connector checks

| Check | Result |
|---|---|
| `get_project` for `scalvia-landing` | PASS |
| `get_deployment` for `www.scalvia.mx` | PASS |
| `get_project` for `scalviadashboard` | PASS |
| `get_deployment` for `ops.scalvia.mx` | PASS |

## DNS checks

| Hostname | Result |
|---|---|
| `scalvia.mx` | Cloudflare nameservers; A records redacted; Cloudflare proxy inferred |
| `www.scalvia.mx` | A records redacted; Cloudflare proxy inferred |
| `ops.scalvia.mx` | CNAME to Vercel DNS target |
| `chat.scalvia.mx` | A/AAAA records redacted; Cloudflare proxy inferred |

## HTTP checks

| URL | Result |
|---|---|
| `https://scalvia.mx/` | `307` to `https://www.scalvia.mx/`; Cloudflare + Vercel headers |
| `https://www.scalvia.mx/` | `200`; Cloudflare + Vercel headers |
| `https://ops.scalvia.mx/dashboard` | `307`; Vercel; redirects to `/sign-in` with Clerk headers |
| `https://ops.scalvia.mx/login` | `404`; Vercel; Clerk headers |
| `https://ops.scalvia.mx/sign-in` | `200`; Vercel; Clerk headers |
| `https://chat.scalvia.mx/` | `502`; Cloudflare |
| `https://chat.scalvia.mx/api` | `502`; Cloudflare |

## TLS checks

| Hostname | Result |
|---|---|
| `www.scalvia.mx` | SAN includes `*.scalvia.mx` and `scalvia.mx` |
| `ops.scalvia.mx` | SAN includes `ops.scalvia.mx` |
| `chat.scalvia.mx` | SAN includes `*.scalvia.mx` and `scalvia.mx` |

## Required validation commands

| Command | Result | Notes |
|---|---|---|
| JSON parse for Phase 1 reports | PASS | `hosting-map.json`, `dns-records-sanitized.json`, and `service-dependencies.json` parsed successfully. |
| `npm run build` | PASS | Build completed successfully. Next.js still warns about multiple lockfiles and inferred workspace root. |
| `git diff --check` | PASS | No whitespace errors. |
| `git status --short --untracked-files=all` | PASS | Working tree remains dirty because Phase 0 and Phase 1 files are not staged or committed. |
