# Cloudflare Migration Verification

Date: 2026-08-01

## Phase 0 result

PARTIAL

Phase 0 code and documentation changes were completed locally. Result is marked PARTIAL because no production deployment, DNS, Cloudflare preview, or external hosting confirmation was performed in this phase.

## Commands

| Check | Result | Notes |
|---|---:|---|
| JSON parse for inventory and Phase 0 reports | PASS | `reports/scalvia-domain-inventory.json`, `reports/cloudflare-migration/public-allowlist.json`, and `reports/cloudflare-migration/hidden-routes.json` parsed successfully. |
| `npm run lint` | N/A | Script does not exist in `package.json`. |
| `npm run typecheck` | N/A | Script does not exist in `package.json`. |
| `npm run test` | N/A | Script does not exist in `package.json`. |
| `npm run build` | PASS | Next.js build completed successfully. |

## Local route checks

Verified against `next start -p 4173` after a production build.

| Path | Expected | Result |
|---|---|---|
| `/lalanuda` | 404 + noindex | PASS |
| `/otunno-interiores` | 404 + noindex | PASS |
| `/cliente-falso` | 404 + noindex | PASS |
| `/api/lalanuda/debug` without secret | 404 + noindex + no-store | PASS |
| `/robots.txt` | Generated and disallows hidden routes | PASS |
| `/sitemap.xml` | Includes allowlisted public pages only | PASS |
| `/vitelas` | 200 | PASS |
| `/rotunno-interiores` | 200 | PASS |

## Redirects

No application-level redirects are configured in `vercel.json` or Next.js for Phase 0. The prior audit observed `https://scalvia.mx/` redirecting to `https://www.scalvia.mx/`; that redirect appears to be controlled outside this repository and should be confirmed during Phase 1/4 infrastructure review.

## Open items for later phases

- Confirm hosting for `ops.scalvia.mx`.
- Confirm hosting for `chat.scalvia.mx`.
- Decide Cloudflare Workers + OpenNext vs static export in Phase 2.
- Add compatibility routes for `/api/vitelas/availability` and `/api/vitelas/notify` before renaming the current `/api/lalanuda/*` endpoints.
