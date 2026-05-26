# La Lanuda — Google Calendar Availability Integration

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace localStorage-based slot blocking with real Google Calendar availability so that booked slots appear locked for all clients in real time.

**Architecture:** A service account (no user OAuth required) reads/writes one Google Calendar. Two new API routes handle availability queries and event creation. The `DateTimePicker` component fetches availability from the server instead of reading localStorage. `localStorage` is kept only as a short-lived optimistic cache so the UI updates instantly after the user confirms, without waiting for the next API fetch.

**Tech Stack:** `googleapis` npm package, Google Cloud service account, Next.js API routes (Node.js runtime), existing `src/app/lalanuda/page.tsx`.

---

## File Map

| File | Action | Responsibility |
|------|--------|---------------|
| `src/app/api/lalanuda/availability/route.ts` | **Create** | `GET ?date=YYYY-MM-DD` → returns busy `[startMin, endMin]` pairs from Google Calendar |
| `src/app/api/lalanuda/notify/route.ts` | **Modify** | After sending email, also creates a Google Calendar event |
| `src/lib/google-calendar.ts` | **Create** | Shared helper: build auth client, `getBusySlots(date)`, `createCalendarEvent(...)` |
| `src/app/lalanuda/page.tsx` | **Modify** | `DateTimePicker` fetches from `/api/lalanuda/availability` instead of reading localStorage |

---

## Pre-requisites (manual, one-time setup — do before running tasks)

1. Go to [Google Cloud Console](https://console.cloud.google.com) → Create project `lalanuda` (or reuse existing).
2. Enable **Google Calendar API**.
3. Create a **Service Account** → download JSON key.
4. Share the target calendar (e.g. Roberto's Google Calendar) with the service account email (give it **"Make changes to events"** permission).
5. Find the **Calendar ID**: Google Calendar → Settings → calendar → "Calendar ID" (looks like `abc123@group.calendar.google.com` or `your@gmail.com` for primary).
6. Add to `.env.local`:
   ```
   GOOGLE_SERVICE_ACCOUNT_EMAIL=your-service-account@project.iam.gserviceaccount.com
   GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
   GOOGLE_CALENDAR_ID=roberto@gmail.com
   ```
   > For the private key: copy the `private_key` field from the downloaded JSON. Replace literal `\n` with `\\n` so it fits on one line in `.env.local`.

---

## Task 1: Install googleapis and create shared helper

**Files:**
- Create: `src/lib/google-calendar.ts`

- [ ] **Step 1: Install googleapis**

```bash
cd /Users/robertomagallanes/Downloads/Scalvia/05_Repos/scalvia_landing
npm install googleapis
```

Expected: `added N packages` with no errors.

- [ ] **Step 2: Create `src/lib/google-calendar.ts`**

```typescript
import { google } from 'googleapis'

function getAuth() {
  const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL
  const key = process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY?.replace(/\\n/g, '\n')
  if (!email || !key) throw new Error('Missing GOOGLE_SERVICE_ACCOUNT_EMAIL or GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY')
  return new google.auth.JWT(email, undefined, key, ['https://www.googleapis.com/auth/calendar'])
}

export type BusyBlock = { startMin: number; endMin: number }

/**
 * Returns busy time blocks (in minutes-since-midnight) for a given date.
 * dateStr: 'YYYY-MM-DD'
 */
export async function getBusySlots(dateStr: string): Promise<BusyBlock[]> {
  const calendarId = process.env.GOOGLE_CALENDAR_ID
  if (!calendarId) throw new Error('Missing GOOGLE_CALENDAR_ID')

  const auth = getAuth()
  const calendar = google.calendar({ version: 'v3', auth })

  // Query freebusy for the full day in UTC-6 (Monterrey)
  const dayStart = new Date(`${dateStr}T00:00:00-06:00`)
  const dayEnd   = new Date(`${dateStr}T23:59:59-06:00`)

  const res = await calendar.freebusy.query({
    requestBody: {
      timeMin: dayStart.toISOString(),
      timeMax: dayEnd.toISOString(),
      timeZone: 'America/Monterrey',
      items: [{ id: calendarId }],
    },
  })

  const busy = res.data.calendars?.[calendarId]?.busy ?? []
  return busy.map(b => {
    const start = new Date(b.start!)
    const end   = new Date(b.end!)
    const toMin = (d: Date) => d.getHours() * 60 + d.getMinutes()
    return { startMin: toMin(start), endMin: toMin(end) }
  })
}

export interface CalendarEventInput {
  date: string        // 'YYYY-MM-DD'
  startMin: number    // minutes since midnight
  durationMin: number
  summary: string     // e.g. "Baño + Corte — Firulais"
  description?: string
}

export async function createCalendarEvent(input: CalendarEventInput): Promise<string> {
  const calendarId = process.env.GOOGLE_CALENDAR_ID
  if (!calendarId) throw new Error('Missing GOOGLE_CALENDAR_ID')

  const auth = getAuth()
  const calendar = google.calendar({ version: 'v3', auth })

  const toISO = (dateStr: string, min: number) => {
    const d = new Date(`${dateStr}T00:00:00-06:00`)
    d.setMinutes(d.getMinutes() + min)
    return d.toISOString()
  }

  const res = await calendar.events.insert({
    calendarId,
    requestBody: {
      summary: input.summary,
      description: input.description,
      start: { dateTime: toISO(input.date, input.startMin), timeZone: 'America/Monterrey' },
      end:   { dateTime: toISO(input.date, input.startMin + input.durationMin), timeZone: 'America/Monterrey' },
    },
  })
  return res.data.id ?? ''
}
```

- [ ] **Step 3: Verify TypeScript compiles**

```bash
npx tsc --noEmit 2>&1 | head -20
```

Expected: no errors (or only pre-existing unrelated warnings).

- [ ] **Step 4: Commit**

```bash
git add src/lib/google-calendar.ts package.json package-lock.json
git commit -m "feat(lalanuda): add Google Calendar helper (getBusySlots, createCalendarEvent)"
```

---

## Task 2: Availability API route

**Files:**
- Create: `src/app/api/lalanuda/availability/route.ts`

- [ ] **Step 1: Create the route**

```typescript
// src/app/api/lalanuda/availability/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { getBusySlots } from '@/lib/google-calendar'

export const runtime = 'nodejs'

export async function GET(req: NextRequest) {
  const date = req.nextUrl.searchParams.get('date')
  if (!date || !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    return NextResponse.json({ error: 'Missing or invalid date param (YYYY-MM-DD)' }, { status: 400 })
  }

  try {
    const busy = await getBusySlots(date)
    return NextResponse.json({ date, busy })
  } catch (err) {
    console.error('[lalanuda/availability] error:', err)
    return NextResponse.json({ error: 'Failed to fetch availability' }, { status: 500 })
  }
}
```

- [ ] **Step 2: Smoke-test the route locally**

Start the dev server (`npm run dev`) then open in browser or curl:
```bash
curl "http://localhost:3000/api/lalanuda/availability?date=2026-05-26"
```

Expected response (if credentials set up):
```json
{ "date": "2026-05-26", "busy": [] }
```
Or with a real event:
```json
{ "date": "2026-05-26", "busy": [{ "startMin": 900, "endMin": 960 }] }
```

If credentials are missing you'll get `{ "error": "Missing GOOGLE_SERVICE_ACCOUNT_EMAIL..." }` — that's expected until `.env.local` is populated.

- [ ] **Step 3: Commit**

```bash
git add src/app/api/lalanuda/availability/route.ts
git commit -m "feat(lalanuda): add GET /api/lalanuda/availability route"
```

---

## Task 3: Create calendar event on booking confirmation

**Files:**
- Modify: `src/app/api/lalanuda/notify/route.ts`

- [ ] **Step 1: Read the current notify route**

Open `src/app/api/lalanuda/notify/route.ts` and locate the `POST` handler. Find where `resend.emails.send(...)` is called — the calendar event creation goes right after the `logToNotion` call, before the final `return NextResponse.json({ success: true })`.

- [ ] **Step 2: Add calendar event creation to notify route**

Add the import at the top of `src/app/api/lalanuda/notify/route.ts`:
```typescript
import { createCalendarEvent } from '@/lib/google-calendar'
```

Then, just before `return NextResponse.json({ success: true })`, add:
```typescript
    // Create Google Calendar event (non-blocking — don't fail the booking if this errors)
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

- [ ] **Step 3: Verify TypeScript compiles**

```bash
npx tsc --noEmit 2>&1 | head -20
```

Expected: no new errors.

- [ ] **Step 4: Commit**

```bash
git add src/app/api/lalanuda/notify/route.ts
git commit -m "feat(lalanuda): create Google Calendar event on booking confirmation"
```

---

## Task 4: Wire DateTimePicker to real availability API

**Files:**
- Modify: `src/app/lalanuda/page.tsx`

The `DateTimePicker` component currently receives `bookings: StoredBooking[]` from localStorage. We'll add a `busyBlocks` state fetched from the API, and update `isSlotAvailable` logic to also check against those blocks. localStorage is kept as optimistic cache for the current session only.

- [ ] **Step 1: Add fetch inside DateTimePicker when date changes**

Locate the `DateTimePicker` function in `page.tsx`. It already has a `selectedDate` state. Add a `busyBlocks` state and a `useEffect` that fetches from the availability API when `selectedDate` changes:

```typescript
// Add inside DateTimePicker, after the existing useState declarations:
const [busyBlocks, setBusyBlocks] = useState<{ startMin: number; endMin: number }[]>([])
const [loadingAvailability, setLoadingAvailability] = useState(false)

useEffect(() => {
  if (!selectedDate) return
  const dateStr = toISODate(selectedDate)
  setLoadingAvailability(true)
  fetch(`/api/lalanuda/availability?date=${dateStr}`)
    .then(r => r.json())
    .then(data => {
      if (data.busy) setBusyBlocks(data.busy)
    })
    .catch(err => console.warn('[DateTimePicker] availability fetch error:', err))
    .finally(() => setLoadingAvailability(false))
}, [selectedDate])
```

- [ ] **Step 2: Update slot availability check to include Google Calendar blocks**

Find the call to `isSlotAvailable(dateStr, startMin, durationMin, bookings)` inside the `slots.map(...)` render in `DateTimePicker`. Replace it with:

```typescript
const available = isSlotAvailable(dateStr, startMin, durationMin, bookings) &&
  !busyBlocks.some(b => startMin < b.endMin && (startMin + durationMin) > b.startMin)
```

- [ ] **Step 3: Show loading indicator on the time grid**

Locate the `<div className="grid grid-cols-3 ...">` that renders the slot buttons. Wrap it conditionally:

```tsx
{loadingAvailability ? (
  <div className="rounded-2xl p-5 text-sm text-center italic" style={{ backgroundColor: "#FFFEFC", border: "1px solid rgba(28,24,21,0.1)", color: "rgba(28,24,21,0.55)" }}>
    Verificando disponibilidad…
  </div>
) : slots.length === 0 ? (
  <div className="rounded-2xl p-5 text-sm text-center italic" style={{ backgroundColor: "#FFFEFC", border: "1px solid rgba(28,24,21,0.1)", color: "rgba(28,24,21,0.55)" }}>No hay horarios disponibles ese día.</div>
) : (
  <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2">
    {/* existing slot buttons */}
  </div>
)}
```

- [ ] **Step 4: Verify TypeScript and test locally**

```bash
npx tsc --noEmit 2>&1 | head -20
```

Open `http://localhost:3000/lalanuda` → navigate to the booking flow → select services → pick a date. The time grid should show "Verificando disponibilidad…" briefly, then resolve.

- [ ] **Step 5: Commit**

```bash
git add src/app/lalanuda/page.tsx
git commit -m "feat(lalanuda): DateTimePicker fetches real availability from Google Calendar"
```

---

## Task 5: End-to-end test with Roberto's calendar

> **This is the manual testing task.** Do it after adding credentials to `.env.local`.

- [ ] **Step 1: Add credentials to `.env.local`**

```
GOOGLE_SERVICE_ACCOUNT_EMAIL=<service-account-email>
GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
GOOGLE_CALENDAR_ID=<roberto-calendar-id>
```

- [ ] **Step 2: Add the credentials to Vercel too**

```bash
vercel env add GOOGLE_SERVICE_ACCOUNT_EMAIL
vercel env add GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY
vercel env add GOOGLE_CALENDAR_ID
```

- [ ] **Step 3: Test — book 3pm tomorrow**

Open `http://localhost:3000/lalanuda` → complete the booking flow → select Mié 26 May at 15:00 → confirm → verify:
- Email arrives at `hola@lalanuda.mx`
- Google Calendar shows a new event at 15:00

- [ ] **Step 4: Test — try to rebook the same slot**

Open a new incognito window → same flow → same date (26 May) → same time (15:00) → verify the slot shows the **lock icon** and cannot be selected.

- [ ] **Step 5: Deploy to production**

```bash
git push origin main
```

Vercel will auto-deploy. Test again at `scalvia.mx/lalanuda`.

---

## Self-Review

**Spec coverage:**
- ✅ Slots blocked based on real calendar — Task 4
- ✅ Booking creates calendar event — Task 3
- ✅ Same slot blocked for second booking — Task 4 (busyBlocks check)
- ✅ Loading state while fetching — Task 4 Step 3
- ✅ Fallback (localStorage) still works if API fails — existing code untouched

**Placeholder scan:** None found — all steps have concrete code.

**Type consistency:** `BusyBlock` defined in `google-calendar.ts`, used inline as `{ startMin: number; endMin: number }[]` in `page.tsx` to avoid an extra import into the large page file. Consistent throughout.
