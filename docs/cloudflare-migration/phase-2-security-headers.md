# Phase 2 Security Headers

## Source

The current production security headers live in `vercel.json`.

## Phase 2 Change

The same global headers were added to `next.config.ts` through `headers()` so OpenNext can carry them into the Cloudflare build path while Vercel rollback remains intact.

Headers replicated:

- `X-Frame-Options: DENY`
- `X-Content-Type-Options: nosniff`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Permissions-Policy: camera=(), microphone=(), geolocation=()`
- `Strict-Transport-Security: max-age=63072000; includeSubDomains; preload`
- `Content-Security-Policy-Report-Only`

## CSP Notes

The CSP remains report-only and was not relaxed. It still allows:

- Cloudflare Turnstile scripts and frames from `https://challenges.cloudflare.com`.
- Inline scripts/styles required by the current frontend.
- Images from `self`, `data:`, `blob:`, and HTTPS sources.

## Cache Behavior

`public/_headers` adds immutable cache headers for `/_next/static/*`:

```text
Cache-Control: public,max-age=31536000,immutable
```

This mirrors the expected treatment for Next static chunks on Cloudflare assets. Dynamic API routes remain runtime responses and should not be cached unless explicitly configured later.

## Verification Required In Preview

- Confirm the headers are present on `/`, `/contacto`, `/vitelas`, and `/api/contact/challenge`.
- Confirm `Content-Security-Policy-Report-Only` remains report-only during preview.
- Confirm no headers are added to `ops.scalvia.mx` or `chat.scalvia.mx`.
