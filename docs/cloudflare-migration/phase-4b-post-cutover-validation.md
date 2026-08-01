# Phase 4B Post-Cutover Validation

Result: PASS

CUTOVER: SUCCESS

Generated: 2026-08-01T07:33:45Z

## Production Origin

`www.scalvia.mx` is now served by Cloudflare Worker `scalvia-landing`.

Evidence:
- `server: cloudflare`
- `x-opennext: 1`
- no `x-vercel-id`
- active Worker version: `eb921aa7-525b-4bd0-b727-4d2c74209506`

## Routing

- `https://scalvia.mx`: `307` to `https://www.scalvia.mx/`.
- `https://www.scalvia.mx`: `200`.
- No redirect loop observed.
- `workers.dev` is not visible to production users.

## Smoke

- `/`: PASS.
- `/contacto`: PASS.
- `/vitelas`: PASS.
- `/rotunno-interiores`: PASS.
- `/nutricionpamcastro`: PASS.
- `/robots.txt`: PASS.
- `/sitemap.xml`: PASS.
- `/api/contact/challenge`: PASS.
- `/api/lalanuda/availability?date=2026-08-03`: PASS.

## Playwright

Command:

```bash
BASE_URL=https://www.scalvia.mx npx playwright test tests/smoke/parity.spec.ts
```

Result:
- PASS, 15/15.

## Contact

- `GET /api/contact/challenge`: PASS.
- `POST /api/contact` invalid payload: PASS, rejected without email side effect.
- Positive controlled QA submit: PASS, `200 success`.
- Turnstile challenge path: PASS, `403 challenge_required`.

## Vitelas

- `GET /api/lalanuda/availability?date=2026-08-03`: PASS.
- Google Calendar: PASS through availability endpoint.
- `NOTION_VITELAS_DB_ID`: configured by Worker secret name.
- `hola@vitelas.mx`: active in code.
- Branding: Vitelas.
- `/api/lalanuda/notify` invalid payload: PASS, rejected before side effects.
- Real booking: not executed.

## SEO

- `robots.txt`: PASS.
- `sitemap.xml`: PASS.
- canonical strategy preserved as apex-to-www redirect.
- `SITE_ORIGIN`: `https://www.scalvia.mx`.
- `workers.dev`: absent from production HTML, robots, and sitemap.
- preview Worker remains noindex.

Note:
- OpenGraph URL still references `https://scalvia.mx`; this was known before cutover and was not changed in Phase 4B.

## Headers

Observed on production Worker responses:
- `content-security-policy-report-only`
- `strict-transport-security`
- `x-content-type-options`
- `x-frame-options`
- `referrer-policy`
- `permissions-policy`
- route-specific cache headers

## Subdomains

- `ops.scalvia.mx`: preserved, still Vercel.
- `chat.scalvia.mx`: preserved, still preexisting Cloudflare 502.
