# Phase 0 Hidden Content

## Hidden routes

- `/lalanuda`: legacy client landing; expected behavior is 404.
- `/otunno-interiores`: misspelled legacy Rotunno route; expected behavior is 404.
- `/[cliente]`: dynamic route returns 404 for slugs not declared in `src/clientes/manifest.ts`; the current manifest is empty.
- `/api/lalanuda/debug`: diagnostic endpoint retained but hidden from indexation and returns 404 unless `DEBUG_SECRET` is configured and supplied.

## Hidden hosts and references

- `bot.scalvia.mx`: legacy Typebot reference found in old static HTML only.
- `scalvia-landing-demo.vercel.app`: legacy Vercel preview observed as missing in the prior audit.
- `scalvia.com`: legacy branding reference, not part of the public production allowlist.

Historical code and documentation were not deleted. Legacy references remain available for audit context but are excluded from the current public surface.
