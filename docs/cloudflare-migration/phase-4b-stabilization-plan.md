# Phase 4B Stabilization Plan

Status: ACTIVE

Cutover completed: 2026-08-01T07:31Z.

## Keep Vercel Rollback

Do not delete:
- Vercel project `scalvia-landing`.
- Deployment `dpl_8reqJeE2NY3vrVPidQ7NLjqn1LN9`.
- Vercel aliases or rollback metadata.

Suggested stabilization window:
- Keep rollback intact through the initial production monitoring period.

## Monitor

During stabilization, monitor:
- `https://www.scalvia.mx/`
- `https://scalvia.mx/`
- `/contacto`
- `/api/contact/challenge`
- `/api/lalanuda/availability`
- `/vitelas`
- Cloudflare Worker errors for `scalvia-landing`
- Contact email delivery
- Vitelas booking flow

## Rollback Triggers

Rollback if any of these persist:
- `www.scalvia.mx` inaccessible.
- TLS/certificate failure.
- redirect loop.
- broken primary assets.
- Worker 5xx.
- Contact API broken.
- Google Calendar availability broken.
- Vitelas booking flow broken.
- Turnstile production broken.
- `ops.scalvia.mx` affected.
- `chat.scalvia.mx` DNS changed.

## Rollback Action

Remove only the Worker routes:

```text
scalvia.mx/*
www.scalvia.mx/*
```

Restore traffic to the previous Vercel routing represented by:

```text
dpl_8reqJeE2NY3vrVPidQ7NLjqn1LN9
```

Do not touch:
- `ops.scalvia.mx`
- `chat.scalvia.mx`
- VPS
- Chatwoot
- unrelated DNS records

## Deferred Cleanup

Do not perform during stabilization:
- Remove Vercel.
- Remove Vercel aliases.
- Rename `/api/lalanuda/*`.
- Redesign.
- Change canonical metadata.
- Repair Chatwoot.
