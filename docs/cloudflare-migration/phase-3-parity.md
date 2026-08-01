# Phase 3 Parity

Status: PASS_WITH_SAFE_TEST_LIMITATION

Page parity:
- `/`: PASS
- `/contacto`: PASS
- `/vitelas`: PASS
- `/rotunno-interiores`: PASS
- `/nutricionpamcastro`: PASS

Hidden content:
- Preview returns 404 for `/lalanuda`, `/otunno-interiores`, and `/cliente-falso`.
- Production also returns 404 for those routes in smoke tests.
- `/api/lalanuda/debug` returns 404 on preview. Production still returns 401 because production is behind the Phase 0/1 cleanup commit.

SEO parity:
- Preview `/robots.txt`: 200.
- Preview `/sitemap.xml`: 200.
- Production `/sitemap.xml`: 404 at the time of Phase 3 QA because production has not received the migration prep commit.
- Preview has `X-Robots-Tag: noindex, nofollow, noarchive` on all tested responses.

Header parity:
- Security headers matched on main HTML pages: `Strict-Transport-Security`, `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`, `X-Frame-Options`.
- `Content-Security-Policy` was absent in both production and preview.
- Expected preview-only difference: `X-Robots-Tag` is present on preview only.
- Expected runtime/cache difference: static generated pages on preview use Cloudflare/OpenNext cache headers such as `s-maxage=31536000`; production Vercel pages use `public, max-age=0, must-revalidate`.

API parity:
- `/api/contact/challenge`: PASS.
- `/api/contact`: PASS. Validation, invalid origin, Turnstile challenge, and controlled Resend send were tested.
- `/api/lalanuda/availability`: PASS. The preview now returns 200 for `2026-08-03`.
- `/api/lalanuda/notify`: SAFE_TEST_LIMITATION. Invalid payload returns 400; real booking notification was not executed because it can create calendar events, Notion rows, and emails.
- `/api/lalanuda/debug`: PASS on preview as hidden/removed route.

Conclusion:
- Frontend, routing, Contact API, and Calendar availability are ready for continued Cloudflare migration work.
- Production cutover should still wait until testing Turnstile keys are replaced with production-grade keys and the Vitelas notification recipient mismatch is addressed or explicitly accepted.
