# Final Architecture

Status: MIGRATION CLOSED

Generated: 2026-08-01T07:44:36Z

## Routing Map

```text
Cloudflare
├── scalvia.mx
└── www.scalvia.mx

Vercel
└── ops.scalvia.mx

VPS
└── chat.scalvia.mx
```

## Production Frontend

Hosting:
- Cloudflare Workers.

Worker:
- `scalvia-landing`.

Active version:
- `b65efec1-58fe-469d-acc8-448401700fe2`.

Production routes:
- `scalvia.mx/*`
- `www.scalvia.mx/*`

Canonical strategy:
- `https://scalvia.mx` redirects to `https://www.scalvia.mx/`.
- `https://www.scalvia.mx` is the canonical serving hostname.

DNS/proxy distinction:
- Public DNS for `scalvia.mx` and `www.scalvia.mx` resolves through Cloudflare.
- Real application hosting is Cloudflare Worker `scalvia-landing`.
- Vercel is no longer the live frontend origin for `scalvia.mx` or `www.scalvia.mx`.

## Ops

Hostname:
- `ops.scalvia.mx`.

Hosting:
- Vercel.

Status:
- Keep as-is.
- Not part of the frontend migration.

DNS/proxy distinction:
- DNS points to a Vercel target.
- Real hosting remains Vercel.

## Chat

Hostname:
- `chat.scalvia.mx`.

Hosting:
- VPS / Chatwoot path.

Status:
- Keep as-is for this migration.
- Current `502` is a preexisting incident.
- Repair must remain a separate Chatwoot incident.

DNS/proxy distinction:
- DNS resolves through Cloudflare.
- Real service is not the Scalvia frontend Worker.

## Rollback

Vercel rollback remains available temporarily:
- Deployment: `dpl_8reqJeE2NY3vrVPidQ7NLjqn1LN9`.
- Status at closure: `Ready`.

Do not remove the Vercel rollback until a separate stabilization review approves it.
