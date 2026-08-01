# Phase 3 QA Plan

Status: PASS_WITH_SAFE_TEST_LIMITATION

Targets:
- Production baseline: `https://www.scalvia.mx`
- Cloudflare preview: `https://scalvia-landing-preview.hola-7e3.workers.dev`

Automated smoke coverage:
- Pages: `/`, `/contacto`, `/vitelas`, `/rotunno-interiores`, `/nutricionpamcastro`
- Viewports: desktop `1280x900`, mobile `390x844`
- Hidden routes: `/lalanuda`, `/otunno-interiores`, `/cliente-falso`
- SEO endpoints: `/robots.txt`, `/sitemap.xml`
- API smoke: `/api/contact/challenge`

Manual/API checks:
- `/api/contact/challenge`
- `/api/contact` invalid JSON
- `/api/contact` invalid payload
- `/api/lalanuda/availability?date=2026-08-03`
- `/api/lalanuda/availability?date=bad`
- `/api/lalanuda/notify` invalid payload
- `/api/lalanuda/debug`

Acceptance criteria:
- Main pages render with HTTP 200 and no browser console/page errors.
- Hidden legacy routes return 404.
- Preview responses carry `X-Robots-Tag: noindex, nofollow, noarchive`.
- Security headers match production where applicable.
- APIs either match expected behavior or have documented blockers.
- No DNS, custom domains, cutover, Vercel production deploy, VPS, or Chatwoot changes.

Results:
- Production smoke: 15/15 passed.
- Preview smoke: 15/15 passed.
- Contact challenge API: passed.
- Google Calendar availability: PASS.
- Contact controlled send: PASS with preview `CONTACT_TO_EMAIL`.
- Vitelas notify real booking: SAFE_TEST_LIMITATION because it can create external side effects.
