# Phase 4A Go / No-Go

Result: PASS

CUTOVER STATUS: GO

Updated: 2026-08-01T07:08:01Z

## Checklist

- [x] Cloudflare production Worker listo
- [x] Production build PASS
- [x] Worker candidate QA PASS
- [x] Production secrets cargados
- [x] Turnstile production hostnames confirmados
- [x] Google Calendar PASS
- [x] Notion Vitelas PASS
- [x] Resend configuration PASS
- [x] `CONTACT_ALLOWED_ORIGINS` correcto in production Worker
- [x] DNS snapshot guardado
- [x] `ops.scalvia.mx` preservado
- [x] `chat.scalvia.mx` preservado
- [x] canonical definido
- [x] robots correcto
- [x] sitemap correcto
- [x] Vercel rollback disponible
- [x] runbook de rollback probado conceptualmente

## Production Candidate

- Worker: `scalvia-landing`
- URL: `https://scalvia-landing.hola-7e3.workers.dev`
- Version: `1a54fe14-3d8b-4d1b-856a-18f2ebe67230`
- Commit: `1b386253fec48b69de9ae8c0569ffe6a1d6fbd88`
- Created: 2026-08-01T07:05:35.676Z

## Turnstile Production

- Widget: `Scalvia Production`
- Mode: `managed`
- Hostnames:
  - `scalvia.mx`
  - `www.scalvia.mx`
- Sitekey fingerprint: `sha256:8855e1ba8219`
- Secret value: configured in Cloudflare Worker, not printed or stored in Git.

No `workers.dev` hostname was added to the production widget.

## Candidate QA

- Playwright smoke against `https://scalvia-landing.hola-7e3.workers.dev`: PASS, 15/15.
- `GET /api/contact/challenge`: PASS.
- `POST /api/contact` invalid payload: PASS, rejected without Resend side effect.
- `GET /api/lalanuda/availability?date=2026-08-03`: PASS, Google Calendar-backed response.
- `POST /api/lalanuda/notify` invalid payload: PASS, rejected before Notion/Calendar/Resend side effects.

## Records Eligible For Cutover

- `scalvia.mx`
- `www.scalvia.mx`

## Records To Preserve Exactly

- `ops.scalvia.mx`
- `chat.scalvia.mx`

## Decision

It is safe to prepare Phase 4B cutover planning from an application-readiness standpoint.

Do not perform cutover without a separate explicit approval for DNS/routes/custom domains.
