# Phase 2 Compatibility Matrix

| Area | Status | Evidence | Action |
| --- | --- | --- | --- |
| Next.js App Router | COMPATIBLE | Cloudflare documents App Router support; OpenNext build passed. | Use Workers + OpenNext. |
| Next.js version | COMPATIBLE | Resolved version is 15.5.22; OpenNext supports latest Next 15 minors. | Keep lockfile consistent. |
| React version | COMPATIBLE | Resolved React/React DOM are 19.2.5; Next build passed. | None. |
| Route handlers | COMPATIBLE | All `/api/*` route handlers compiled into OpenNext bundle. | Smoke test in Cloudflare preview. |
| Middleware | COMPATIBLE | Middleware uses `NextResponse` and allowlist config only; no Node APIs in middleware. | Keep Node APIs out of middleware. |
| Node runtime routes | COMPATIBLE | `export const runtime = 'nodejs'` is used in API routes; OpenNext Cloudflare uses Next Node runtime on Workers. | Keep `nodejs_compat`. |
| `node:crypto` | COMPATIBLE | Used by contact security; Cloudflare Node compatibility supports crypto. | Keep `nodejs_compat`. |
| `Buffer` | COMPATIBLE | Used in contact body size and token comparison; Cloudflare Node compatibility supports Buffer. | Keep `nodejs_compat`. |
| `fs` / `path` in `[cliente]` | COMPATIBLE | Used during SSG for known client HTML; OpenNext build passed. | Do not rely on runtime filesystem for new dynamic clients. |
| `fetch` | COMPATIBLE | Used for Turnstile and YouTube feed; Workers has native fetch. | Smoke test external calls in preview. |
| Resend SDK | COMPATIBLE | Build passed; SDK is used from route handlers. | Confirm real email send only in controlled preview. |
| Turnstile verification | COMPATIBLE | Uses standards-based `fetch` and `URLSearchParams`. | Add `TURNSTILE_SECRET_KEY` in Workers secrets. |
| Notion SDK | COMPATIBLE | Build passed; SDK is fetch-based in route handler path. | Add `NOTION_TOKEN` and DB ID; smoke test preview. |
| Google Calendar SDK | REQUIRES_ADAPTATION | `googleapis` transitively imports Node modules including `https`, `stream`, `fs`, and `child_process`; OpenNext build passed with `nodejs_compat`, but runtime call still needs Workers preview validation. | Prefer smoke test first; if runtime fails, replace SDK calls with Google REST API + OAuth token refresh via `fetch`. |
| Clerk | UNKNOWN | Current public Vitelas layout wraps `ClerkProvider`, but middleware is not Clerk-based in this branch. | Preview auth-sensitive paths before cutover; keep Ops out of scope. |
| ISR / `next.revalidate` | REQUIRES_ADAPTATION | `/nutricionpamcastro/mi-canal` uses `fetch(..., { next: { revalidate: 3600 } })`; default OpenNext cache is local/dummy without R2 persistence. | Optional R2 cache binding before production if persistent ISR matters. |
| Image optimization | REQUIRES_ADAPTATION | Next remote images configured for Clerk and Unsplash; Cloudflare supports image optimization via Cloudflare Images. | Verify image routes in preview; configure Cloudflare Images if needed. |
| Native packages | COMPATIBLE | No app dependency requires a native runtime package in source paths. | None. |
| Worker size | UNKNOWN | Build generated `.open-next`; upload size must be checked by `wrangler` during preview/upload. | Check size in Phase 3 preview/upload. |

## Known Blockers

None found during Phase 2 build validation.

## Non-Blocking Risks

- Google Calendar should be runtime-smoked in Workers because `googleapis` is Node-heavy.
- Persistent ISR cache is not configured with R2 yet.
- npm install reports high severity audit findings; do not run automatic fixes without a separate dependency/security task.
