# Phase 1 DNS And Routing

Date: 2026-08-01

## DNS provider

The `scalvia.mx` zone uses Cloudflare nameservers:

- `bjorn.ns.cloudflare.com`
- `paloma.ns.cloudflare.com`

## Routing by hostname

### `scalvia.mx`

- DNS: Cloudflare proxied A records.
- HTTP: `307` to `https://www.scalvia.mx/`.
- Edge/proxy: Cloudflare.
- Origin/hosting: Vercel deployment `dpl_8reqJeE2NY3vrVPidQ7NLjqn1LN9`.
- Keep during cutover: apex redirect behavior and any mail/TXT records.

### `www.scalvia.mx`

- DNS: Cloudflare proxied A records.
- HTTP: `200`.
- Edge/proxy: Cloudflare.
- Origin/hosting: Vercel project `scalvia-landing`.
- Vercel headers observed behind Cloudflare: `x-vercel-id`, `x-vercel-cache`, `x-matched-path`.

### `ops.scalvia.mx`

- DNS: CNAME to Vercel DNS target.
- HTTP: direct Vercel response; no Cloudflare proxy headers observed.
- Origin/hosting: Vercel project `scalviadashboard`.
- Keep as-is during public-site cutover.

### `chat.scalvia.mx`

- DNS: Cloudflare proxied A/AAAA records.
- HTTP: Cloudflare `502`.
- Edge/proxy: Cloudflare.
- Origin/hosting: local inventory points to Chatwoot Docker on `scalvia-vps`.
- Keep DNS intact during public-site cutover; investigate origin health separately.

## TXT records observed

- Google site verification TXT record.
- SPF TXT record using Google SPF include.

No TXT values are secrets, but they must be preserved during DNS migration/cutover.

## DNS records to preserve intact

- `ops.scalvia.mx` CNAME to Vercel DNS target.
- `chat.scalvia.mx` Cloudflare proxied record(s).
- Existing TXT records for Google verification and SPF.
- Any email provider records not fully audited in this phase.
- Apex-to-`www` redirect behavior.
