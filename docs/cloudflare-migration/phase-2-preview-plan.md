# Phase 2 Preview Plan

## Goal

Create a Cloudflare Workers preview path without connecting `scalvia.mx` or `www.scalvia.mx`.

## Prepared Locally

- Worker name: `scalvia-landing`.
- `workers_dev`: enabled in `wrangler.jsonc`.
- Build command: `npm run build:cloudflare`.
- Local runtime preview command: `npm run preview:cloudflare`.

## Phase 3 Preview Steps

1. Ensure Cloudflare auth is available locally or in CI.
2. Add required Workers secrets and build variables by name only from the inventory.
3. Run `npm run build:cloudflare`.
4. Run `npm run preview:cloudflare` for local workerd validation.
5. If remote preview is desired, deploy only to the `*.workers.dev` hostname first.
6. Do not add routes for `scalvia.mx` or `www.scalvia.mx` until smoke tests pass.

## Smoke Test Scope

- `/`
- `/contacto`
- `/vitelas`
- `/rotunno-interiores`
- `/nutricionpamcastro`
- `/nutricionpamcastro/mi-canal`
- `/api/contact/challenge`
- `/api/contact`
- `/api/lalanuda/availability`
- `/api/lalanuda/notify`

## DNS Boundary

Keep these unchanged:

- `ops.scalvia.mx`
- `chat.scalvia.mx`
- Any VPS/Chatwoot records
- Any Vercel production domain mapping

## Optional Temporary Subdomain

If a branded preview hostname is needed later, propose `preview.scalvia.mx`, but do not create it until Fase 3 approval.
