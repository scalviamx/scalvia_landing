# La Lanuda: Fix Notify → Notion + Google Calendar

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Fix `POST /api/lalanuda/notify` so it reliably writes to Notion and Google Calendar before returning, and add a debug endpoint to isolate failures.

**Architecture:** Root cause is fire-and-forget promises in a serverless context — Vercel kills the execution context the moment the response is returned, so unresolved `.catch()`-only promises never execute. Fix: `await Promise.allSettled([logToNotion(...), createCalendarEvent(...)])` before returning. Add a `GET /api/lalanuda/debug` endpoint that calls each integration with dummy data and returns raw results/errors.

**Tech Stack:** Next.js 14 App Router, `@notionhq/client`, `googleapis` (OAuth2), Vercel serverless (Node.js runtime)

---

## File Map

| File | Action | What changes |
|------|--------|-------------|
| `src/app/api/lalanuda/notify/route.ts` | Modify | Await Notion + Calendar with `Promise.allSettled` before returning |
| `src/app/api/lalanuda/debug/route.ts` | Create | Debug endpoint: calls each integration with dummy data, returns JSON with results |

---

## Task 1: Add debug endpoint

**Files:**
- Create: `src/app/api/lalanuda/debug/route.ts`

This endpoint calls `logToNotion` and `createCalendarEvent` with controlled dummy data and returns the outcome of each call as structured JSON. It never throws — it catches and returns errors inline.

- [ ] **Step 1: Create the debug route file**

```typescript
// src/app/api/lalanuda/debug/route.ts
import { NextResponse } from 'next/server'
import { Client } from '@notionhq/client'
import { createCalendarEvent } from '@/lib/google-calendar'

export const runtime = 'nodejs'

export async function GET() {
  const results: Record<string, unknown> = {}

  // ── Notion ──────────────────────────────────────────────────────────────
  const token = process.env.NOTION_TOKEN
  const dbId  = process.env.NOTION_LALANUDA_DB_ID
  if (!token || !dbId) {
    results.notion = { ok: false, error: 'NOTION_TOKEN or NOTION_LALANUDA_DB_ID not set in env' }
  } else {
    try {
      const notion = new Client({ auth: token })
      const page = await notion.pages.create({
        parent: { database_id: dbId },
        properties: {
          'ID Cita':         { title:     [{ text: { content: 'debug_endpoint_test' } }] },
          'Fecha':           { date:      { start: new Date().toISOString().slice(0, 10) } },
          'Cliente':         { rich_text: [{ text: { content: 'Debug Test' } }] },
          'Email':           { email:     'debug@test.com' },
          'Mascota':         { rich_text: [{ text: { content: 'TestPet · Perro' } }] },
          'Raza':            { rich_text: [{ text: { content: 'Labrador' } }] },
          'Tamaño':          { select:    { name: 'Grande' } },
          'Servicios':       { rich_text: [{ text: { content: 'Baño ($300)' } }] },
          'Total MXN':       { number:    300 },
          'Comisión 6% MXN': { number:    18 },
          'Método de pago':  { select:    { name: 'Efectivo' } },
          'Notas':           { rich_text: [{ text: { content: '—' } }] },
          'Hora inicio':     { rich_text: [{ text: { content: '15:00' } }] },
          'Duración min':    { number:    60 },
        },
      })
      results.notion = { ok: true, pageId: (page as { id: string }).id }
    } catch (err) {
      results.notion = { ok: false, error: err instanceof Error ? err.message : String(err) }
    }
  }

  // ── Google Calendar ──────────────────────────────────────────────────────
  try {
    // Tomorrow at 10am, 30-min duration
    const tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() + 1)
    const dateStr = tomorrow.toISOString().slice(0, 10)

    const eventId = await createCalendarEvent({
      date: dateStr,
      startMin: 600,       // 10:00am
      durationMin: 30,
      summary: '🐾 Debug Test — La Lanuda',
      description: 'Automated debug endpoint test. Safe to delete.',
    })
    results.calendar = { ok: true, eventId, date: dateStr, startMin: 600 }
  } catch (err) {
    results.calendar = { ok: false, error: err instanceof Error ? err.message : String(err) }
  }

  const allOk = Object.values(results).every((r) => (r as { ok: boolean }).ok)
  return NextResponse.json({ allOk, results }, { status: allOk ? 200 : 500 })
}
```

- [ ] **Step 2: Deploy to Vercel**

```bash
git add src/app/api/lalanuda/debug/route.ts
git commit -m "feat(lalanuda): add debug endpoint for Notion + Calendar integration check"
git push
```

Wait for Vercel deploy (~60s), then hit:
```
GET https://scalvia.mx/api/lalanuda/debug
```

Expected success:
```json
{
  "allOk": true,
  "results": {
    "notion":   { "ok": true,  "pageId": "..." },
    "calendar": { "ok": true,  "eventId": "...", "date": "2026-05-26", "startMin": 600 }
  }
}
```

If `notion.ok === false`: the `error` field tells you exactly which Notion property name or type mismatches the DB schema. Fix the property name/type in `logToNotion` to match.

If `calendar.ok === false`: the `error` field will show the OAuth error (expired token, wrong scope, etc.).

**Do not proceed to Task 2 until both show `ok: true`.**

---

## Task 2: Fix notify route — await Notion + Calendar

**Files:**
- Modify: `src/app/api/lalanuda/notify/route.ts:232-248`

The current code:
```typescript
// BROKEN — fire-and-forget, Vercel kills context before these resolve
logToNotion(body).catch(err => console.error('[lalanuda/notify] Notion log error:', err))
createCalendarEvent({...}).catch(err => console.error('[lalanuda/notify] Google Calendar error:', err))
```

Replace with `Promise.allSettled` so both operations complete before the response is returned.

- [ ] **Step 1: Replace lines 232–248 in notify/route.ts**

Find this block (lines 232–248):
```typescript
  // Notion + Calendar run first — independent of email
  logToNotion(body).catch(err => console.error('[lalanuda/notify] Notion log error:', err))
  createCalendarEvent({
    date: slotDate,
    startMin: slotStartMin,
    durationMin,
    summary: `🐾 ${petName} · ${items.map((i: BookingItem) => i.name).join(' + ')}`,
    description: [
      `Cliente: ${clientName}`,
      `Email: ${clientEmail}`,
      `Mascota: ${petName} (${petType})`,
      `Raza: ${body.breed ?? '—'}`,
      `Tamaño: ${body.sizeLabel}`,
      `Pago: ${paymentMethod}`,
      `Notas: ${notes || '—'}`,
      `ID Cita: ${bookingId}`,
    ].join('\n'),
  }).catch(err => console.error('[lalanuda/notify] Google Calendar error:', err))
```

Replace with:
```typescript
  // Await both — fire-and-forget is killed by Vercel before resolving
  const [notionResult, calendarResult] = await Promise.allSettled([
    logToNotion(body),
    createCalendarEvent({
      date: slotDate,
      startMin: slotStartMin,
      durationMin,
      summary: `🐾 ${petName} · ${items.map((i: BookingItem) => i.name).join(' + ')}`,
      description: [
        `Cliente: ${clientName}`,
        `Email: ${clientEmail}`,
        `Mascota: ${petName} (${petType})`,
        `Raza: ${body.breed ?? '—'}`,
        `Tamaño: ${body.sizeLabel}`,
        `Pago: ${paymentMethod}`,
        `Notas: ${notes || '—'}`,
        `ID Cita: ${bookingId}`,
      ].join('\n'),
    }),
  ])
  if (notionResult.status === 'rejected')
    console.error('[lalanuda/notify] Notion error:', notionResult.reason)
  if (calendarResult.status === 'rejected')
    console.error('[lalanuda/notify] Calendar error:', calendarResult.reason)
```

- [ ] **Step 2: Commit and deploy**

```bash
git add src/app/api/lalanuda/notify/route.ts
git commit -m "fix(lalanuda): await Notion + Calendar in notify — fire-and-forget killed by Vercel serverless"
git push
```

---

## Task 3: End-to-end test — booking creates event + blocks slot

**Prereq:** Task 1 and Task 2 complete and deployed.

- [ ] **Step 1: Make a test booking via the UI**

Open `https://scalvia.mx/lalanuda`. Fill in:
- Pet name: `TestDebug`
- Date: tomorrow (2026-05-26)
- Time: 15:00 (3pm)
- Any service, any size, any payment method

Submit. UI should show "¡Cita agendada!".

- [ ] **Step 2: Verify Notion entry**

Open `https://www.notion.so/a81ca967454a457aab6ed09a752b699c`. A new row should appear with:
- `ID Cita`: the booking ID
- `Fecha`: 2026-05-26
- `Mascota`: TestDebug · Perro (or whatever was selected)
- `Hora inicio`: 15:00

If no row: check Vercel runtime logs for `[lalanuda/notify] Notion error:` — the error message will identify the failing property.

- [ ] **Step 3: Verify Google Calendar event**

Open `https://calendar.google.com` (r.magalllanesp@gmail.com). Check 2026-05-26 at 15:00. Event `🐾 TestDebug · <services>` should exist.

If missing: check Vercel runtime logs for `[lalanuda/notify] Calendar error:`.

- [ ] **Step 4: Verify availability blocks the slot**

```bash
curl "https://scalvia.mx/api/lalanuda/availability?date=2026-05-26"
```

Expected (the 15:00 slot blocked — 540 min = 9:00am baseline offset + actual times will vary):
```json
{
  "date": "2026-05-26",
  "busy": [
    { "startMin": <N>, "endMin": <N+duration> }
  ]
}
```

The `startMin` will be minutes-since-midnight on `America/Monterrey` timezone. For 15:00 that is `900`.

- [ ] **Step 5: Verify UI shows lock on that slot**

Open `https://scalvia.mx/lalanuda`, pick date 2026-05-26. The 3pm slot (and any overlap) must show 🔒 and be unclickable.

- [ ] **Step 6: Commit verification notes**

No code change. If all checks passed:

```bash
git commit --allow-empty -m "chore(lalanuda): verified notify → Notion + Calendar + availability blocking (2026-05-26)"
```

---

## Self-review

**Spec coverage:**
- ✅ Debug endpoint (`GET /api/lalanuda/debug`) — Task 1
- ✅ Fix notify (await both integrations) — Task 2
- ✅ Verify availability blocks in prod UI — Task 3
- ✅ Timezone `America/Monterrey` — already correct in `google-calendar.ts`, unchanged
- ✅ Email best-effort (non-blocking) — already correct in current code, unchanged

**Placeholder scan:** None. All steps include full code.

**Type consistency:** `CalendarEventInput` interface in `google-calendar.ts` matches all usages in debug and notify routes.

**Known risk:** If the debug endpoint (Task 1) surfaces a Notion property mismatch error, the property names in `logToNotion` must be corrected before Task 2 matters. The debug endpoint will give the exact error — fix it there before proceeding.
