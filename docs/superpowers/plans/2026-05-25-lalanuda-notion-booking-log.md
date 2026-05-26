# La Lanuda — Notion Booking Log Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Every confirmed booking at La Lanuda appends a row to a Notion database, including a commission column (5–8% of total), so Scalvia can track revenue and fees.

**Architecture:** Add a `logToNotion()` call at the end of `/api/lalanuda/notify/route.ts` (fire-and-forget, non-blocking — email never fails because of Notion). The Notion database is created manually once; its ID is stored as a Vercel env var `NOTION_LALANUDA_DB_ID`. Auth uses the existing Notion integration token stored as `NOTION_TOKEN`.

**Tech Stack:** `@notionhq/client` (official SDK), Next.js App Router API route, Vercel env vars.

---

## Pre-requisites (manual, one-time setup)

Before running any task, do this in Notion:

1. Go to [notion.so](https://notion.so) → create a new **full-page database** called `La Lanuda — Citas`
2. Add these properties (exact names matter):

| Property | Type |
|----------|------|
| `ID Cita` | Title |
| `Fecha` | Date |
| `Cliente` | Text |
| `Email` | Email |
| `Mascota` | Text |
| `Raza` | Text |
| `Tamaño` | Select — options: Toy, Pequeño, Mediano, Grande, Gigante |
| `Servicios` | Text |
| `Total MXN` | Number (format: Peso) |
| `Comisión 6% MXN` | Formula → `round(prop("Total MXN") * 0.06)` |
| `Método de pago` | Select — options: Tarjeta en línea, Tarjeta en el lugar, Efectivo en el lugar |
| `Notas` | Text |
| `Hora inicio` | Text |
| `Duración min` | Number |

3. Get the database ID: open the database as a full page → URL looks like `notion.so/<workspace>/<DATABASE_ID>?v=...` → copy the 32-char UUID before `?v`
4. Go to [notion.so/my-integrations](https://notion.so/my-integrations) → open your integration → copy the **Internal Integration Token** (starts with `secret_`)
5. Share the database with your integration: in Notion, open the database → `...` menu → `Add connections` → select your integration

---

## File Structure

- **Modify:** `src/app/api/lalanuda/notify/route.ts` — add `logToNotion()` at end of POST handler
- **No new files** — keep it simple, one responsibility per change

---

### Task 1: Install Notion SDK and add env vars

**Files:**
- Modify: `package.json` (via npm install)
- Modify: `.env.local` (local dev only)

- [ ] **Step 1: Install SDK**

```bash
cd /Users/robertomagallanes/Downloads/Scalvia/05_Repos/scalvia_landing
npm install @notionhq/client
```

Expected: `added 1 package` (or similar), no errors.

- [ ] **Step 2: Add env vars to `.env.local` for local dev**

Open `.env.local` and append:

```
NOTION_TOKEN=secret_XXXXXXXXXXXXXXXX
NOTION_LALANUDA_DB_ID=XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
```

Replace with real values from the pre-requisites above.

- [ ] **Step 3: Add env vars to Vercel production**

```bash
echo "secret_XXXXXXXX" | vercel env add NOTION_TOKEN production
echo "XXXXXXXX" | vercel env add NOTION_LALANUDA_DB_ID production
```

Replace with real values. Run each command and confirm "Added Environment Variable".

- [ ] **Step 4: Commit package changes only**

```bash
git add package.json package-lock.json
git commit -m "chore(lalanuda): add @notionhq/client for booking log"
```

---

### Task 2: Add `logToNotion()` to notify route

**Files:**
- Modify: `src/app/api/lalanuda/notify/route.ts`

- [ ] **Step 1: Add the import at the top of the file**

After the existing `import { Resend } from 'resend'` line, add:

```typescript
import { Client } from '@notionhq/client'
```

- [ ] **Step 2: Add `logToNotion()` function**

Insert this function before `export async function POST(...)`:

```typescript
async function logToNotion(payload: NotifyPayload): Promise<void> {
  const token = process.env.NOTION_TOKEN
  const dbId  = process.env.NOTION_LALANUDA_DB_ID
  if (!token || !dbId) {
    console.warn('[lalanuda/notify] NOTION_TOKEN or NOTION_LALANUDA_DB_ID not set — skipping log')
    return
  }

  const notion = new Client({ auth: token })

  const serviciosList = payload.items.map(i => `${i.name} ($${i.price})`).join(', ')

  // Parse "2026-05-27" from slotDate, build ISO date string
  const fechaISO = payload.slotDate // already "YYYY-MM-DD"

  // Hour:min from slotStartMin
  const hh = String(Math.floor(payload.slotStartMin / 60)).padStart(2, '0')
  const mm = String(payload.slotStartMin % 60).padStart(2, '0')
  const horaInicio = `${hh}:${mm}`

  await notion.pages.create({
    parent: { database_id: dbId },
    properties: {
      'ID Cita':          { title:  [{ text: { content: payload.bookingId } }] },
      'Fecha':            { date:   { start: fechaISO } },
      'Cliente':          { rich_text: [{ text: { content: payload.clientName || '—' } }] },
      'Email':            { email:  payload.clientEmail || null },
      'Mascota':          { rich_text: [{ text: { content: `${payload.petName} · ${payload.petType}` } }] },
      'Raza':             { rich_text: [{ text: { content: payload.breed || '—' } }] },
      'Tamaño':           { select: { name: payload.sizeLabel } },
      'Servicios':        { rich_text: [{ text: { content: serviciosList } }] },
      'Total MXN':        { number: payload.total },
      'Método de pago':   { select: { name: payload.paymentMethod } },
      'Notas':            { rich_text: [{ text: { content: payload.notes || '—' } }] },
      'Hora inicio':      { rich_text: [{ text: { content: horaInicio } }] },
      'Duración min':     { number: payload.durationMin },
    },
  })
}
```

- [ ] **Step 3: Call `logToNotion()` at end of POST handler (fire-and-forget)**

Find the final `return NextResponse.json({ success: true })` inside the try block (around line 199) and replace it:

```typescript
    // Fire-and-forget — don't await, don't block email success
    logToNotion(body).catch(err => console.error('[lalanuda/notify] Notion log error:', err))

    return NextResponse.json({ success: true })
```

- [ ] **Step 4: Verify TypeScript compiles**

```bash
cd /Users/robertomagallanes/Downloads/Scalvia/05_Repos/scalvia_landing
npx tsc --noEmit
```

Expected: no errors. If there are errors about `@notionhq/client` types, run `npm install @notionhq/client` again.

- [ ] **Step 5: Commit**

```bash
git add src/app/api/lalanuda/notify/route.ts
git commit -m "feat(lalanuda): log confirmed bookings to Notion database"
```

---

### Task 3: Deploy and verify

- [ ] **Step 1: Push to production**

```bash
git push origin main
```

Wait ~2 min for Vercel to build.

- [ ] **Step 2: Book a test appointment on scalvia.mx/lalanuda**

Complete the full flow: pick mascota → raza/tamaño → servicios → fecha/hora → confirmar.

- [ ] **Step 3: Verify Notion row appeared**

Open the `La Lanuda — Citas` database in Notion. A new row should appear with:
- `ID Cita` = booking ID (e.g. `b_1779735573592`)
- `Fecha` = the selected date
- `Total MXN` = numeric value
- `Comisión 6% MXN` = formula result (Total × 0.06)

- [ ] **Step 4: Verify email still arrives**

Check that the confirmation email also arrived normally (Notion failure must not block email).

---

## Notes

- `logToNotion` is fire-and-forget — if Notion is down, the booking still confirms and email still sends.
- The `Comisión 6% MXN` column is a Notion Formula, not stored by the API — it calculates automatically.
- To change commission rate, edit the Formula in Notion directly — no code change needed.
- `NOTION_TOKEN` and `NOTION_LALANUDA_DB_ID` must be set in both `.env.local` (local) and Vercel (production).
