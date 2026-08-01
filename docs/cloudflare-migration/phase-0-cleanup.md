# Phase 0 Cleanup

## Objective

Clean the public surface before Cloudflare work by making the allowed domains, routes, and APIs explicit, while keeping legacy implementations in the repository.

## Implemented

- Added a typed public allowlist in `src/config/public-allowlist.ts`.
- Added generated `robots.txt` through `src/app/robots.ts`.
- Added generated `sitemap.xml` through `src/app/sitemap.ts`.
- Excluded hidden routes and debug endpoints from the sitemap.
- Added `X-Robots-Tag: noindex, nofollow, noarchive` for hidden routes handled by middleware.
- Changed `/api/lalanuda/debug` to return 404 when not authorized and to send noindex/no-store headers.
- Kept `/[cliente]` guarded by `src/clientes/manifest.ts`; slugs outside the manifest call `notFound()`.

## Not changed

- No production DNS, Vercel, Cloudflare, or VPS configuration was changed.
- No legacy code or historical documentation was deleted.
- `/api/lalanuda/availability` and `/api/lalanuda/notify` were not renamed because Vitelas currently depends on them.

## Runtime note

`dynamicParams = false` was intentionally not used for `/[cliente]` because it produced noisy `NoFallbackError` logs for unknown slugs during local QA. The manifest guard still returns 404 for nonexistent clients.

## Future migration note

Move Vitelas from `/api/lalanuda/availability` and `/api/lalanuda/notify` to `/api/vitelas/availability` and `/api/vitelas/notify` in a separate compatibility phase:

1. Add `/api/vitelas/*` routes that call the current handlers.
2. Update the Vitelas frontend to call `/api/vitelas/*`.
3. Monitor production logs for remaining `/api/lalanuda/*` usage.
4. Remove old aliases only after a defined deprecation window.
