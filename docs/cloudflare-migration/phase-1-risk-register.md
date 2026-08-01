# Phase 1 Risk Register

Date: 2026-08-01

| ID | Risk | Impact | Mitigation | Status |
|---|---|---|---|---|
| P1-R1 | Local `.vercel/project.json` for `scalvia_landing` points to a different project/team than the live Vercel project. | Accidental deploy to wrong Vercel project. | Verify/relink Vercel project before any deployment. | Open |
| P1-R2 | `ops.scalvia.mx` production is Vercel-hosted but appears Clerk-protected while local repo docs/code indicate BetterAuth. | Auth assumptions can be wrong during QA or incident response. | Treat Ops as separate service; audit auth state before touching Ops. | Open |
| P1-R3 | `chat.scalvia.mx` returns Cloudflare 502 and Chatwoot Rails is documented as restarting. | Support chat may be unavailable; cutover confusion could mask preexisting outage. | Keep DNS intact; repair Chatwoot in a dedicated maintenance window. | Open |
| P1-R4 | Public site depends on Vercel serverless APIs and external services. | Static Cloudflare export could break forms/bookings. | Prefer OpenNext/Workers evaluation in Phase 2 unless APIs are re-architected. | Open |
| P1-R5 | `/api/lalanuda/*` names are legacy but still used by Vitelas. | Renaming during migration would break bookings. | Add `/api/vitelas/*` compatibility first in a separate phase. | Open |
| P1-R6 | Cloudflare is proxying public site and chat, but not observed in front of Ops. | Incorrect DNS assumptions can break independent services. | Preserve `ops` and `chat` DNS during public-site cutover. | Open |
