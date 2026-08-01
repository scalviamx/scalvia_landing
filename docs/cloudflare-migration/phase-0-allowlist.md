# Phase 0 Allowlist

Source of truth for public exposure is `src/config/public-allowlist.ts`.

## Public domains

- `https://scalvia.mx`
- `https://www.scalvia.mx`
- `https://ops.scalvia.mx`
- `https://chat.scalvia.mx`

`ops.scalvia.mx` and `chat.scalvia.mx` are required public services, but their hosting classification is intentionally deferred to Phase 1.

## Public site routes

- `/`
- `/problema`
- `/soluciones`
- `/proceso`
- `/marketing`
- `/resultados`
- `/contacto`
- `/privacidad`
- `/terminos`
- `/cookies`
- `/vitelas`
- `/rotunno-interiores`
- `/nutricionpamcastro`
- `/nutricionpamcastro/tienda`
- `/nutricionpamcastro/carrito`
- `/nutricionpamcastro/consultas`
- `/nutricionpamcastro/mi-historia`
- `/nutricionpamcastro/testimonios`
- `/nutricionpamcastro/mi-canal`
- `/nutricionpamcastro/aviso-de-privacidad`

These routes are the only pages included in `sitemap.xml`.

## Public APIs

- `GET /api/contact/challenge`
- `POST /api/contact`
- `GET /api/lalanuda/availability`
- `POST /api/lalanuda/notify`

The `/api/lalanuda/*` names are currently retained because Vitelas consumes them. Rename them in a later phase to `/api/vitelas/availability` and `/api/vitelas/notify`, with temporary backward-compatible aliases.
