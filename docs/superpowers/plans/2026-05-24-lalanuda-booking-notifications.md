# LaLanuda Booking Notifications Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Al confirmar cita en La Lanuda: enviar email elegante (estilo Lation) vía Resend con botón de Google Calendar embebido, abrir WhatsApp al salón, y quitar el `mailto:` que redirigía la página.

**Architecture:** API route `/api/lalanuda/notify` recibe datos crudos del booking (incluyendo `slotDate`, `slotStartMin`, `durationMin` para construir la URL de GCal server-side). El email HTML incluye un botón "Agregar a Google Calendar" con la URL completa. El frontend llama la API con `fetch()` (sin bloquear), abre WA en nueva pestaña, y pasa directo a la pantalla de "¡Cita agendada!". No hay botón de GCal en la landing — todo queda en el email.

**Tech Stack:** Next.js App Router, Resend SDK (`"resend": "^4.0.0"` ya instalado), Google Calendar URL API (sin OAuth, solo parámetros GET).

---

## Files

- **Modify:** `src/app/lalanuda/page.tsx` — Fix número WA, reemplazar `handleConfirm`, quitar botón GCal de landing
- **Create:** `src/app/api/lalanuda/notify/route.ts` — API route con email HTML estilo Lation + botón GCal

---

### Task 1: Corregir número de WhatsApp y email admin en `page.tsx`

**Files:**
- Modify: `src/app/lalanuda/page.tsx` (~línea 23)

- [ ] **Step 1: Actualizar objeto `company`**

Busca `const company = {` cerca de la línea 23 y reemplaza el bloque completo:

```typescript
const company = {
  name: "La Lanuda",
  address: "Calle Hidalgo 412, Centro · Monterrey",
  phone: "+52 81 2036 7228",
  whatsapp: "528120367228",
  email: "hola@lalanuda.mx",
  platformAdminEmail: "hola@lalanuda.mx",
  salonStaffWhatsapp: "528120367228",
};
```

> Número de Roberto: 8120367228 (Monterrey, área 81). Formato WA = país 52 + 10 dígitos = `528120367228`. El placeholder tenía un `1` extra incorrecto.

- [ ] **Step 2: Commit**

```bash
git add src/app/lalanuda/page.tsx
git commit -m "fix(lalanuda): correct WhatsApp number to 528120367228 and admin email"
```

---

### Task 2: Crear `/api/lalanuda/notify/route.ts`

**Files:**
- Create: `src/app/api/lalanuda/notify/route.ts`

- [ ] **Step 1: Crear directorio**

```bash
mkdir -p src/app/api/lalanuda/notify
```

- [ ] **Step 2: Crear `route.ts` con email estilo Lation + botón GCal embebido**

```typescript
import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

export const runtime = 'nodejs'

interface BookingItem {
  name: string
  price: number
  duration: number
}

interface NotifyPayload {
  bookingId: string
  clientName: string
  clientEmail: string
  petName: string
  petType: string
  breed: string
  sizeLabel: string
  sizeRange: string
  items: BookingItem[]
  total: number
  dateLabel: string      // "Lun 25 de may · 17:00 – 18:00" (para mostrar)
  slotDate: string       // "2026-05-25" (YYYY-MM-DD, para GCal URL)
  slotStartMin: number   // 1020 = 17:00
  durationMin: number    // 60
  paymentMethod: string
  notes: string
}

function buildGCalUrl(slotDate: string, startMin: number, durationMin: number, petName: string, items: BookingItem[], total: number): string {
  const [y, m, d] = slotDate.split('-')
  const pad = (n: number) => String(n).padStart(2, '0')
  const startH = Math.floor(startMin / 60)
  const startM = startMin % 60
  const endTotalMin = startMin + durationMin
  const endH = Math.floor(endTotalMin / 60)
  const endM = endTotalMin % 60
  const dtStart = `${y}${m}${d}T${pad(startH)}${pad(startM)}00`
  const dtEnd   = `${y}${m}${d}T${pad(endH)}${pad(endM)}00`
  const title   = encodeURIComponent(`Cita La Lanuda — ${petName}`)
  const details = encodeURIComponent(
    `Servicios: ${items.map(i => i.name).join(', ')}\nTotal: $${total.toLocaleString('es-MX')} MXN\n\nCalle Hidalgo 412, Centro, Monterrey`
  )
  const location = encodeURIComponent('Calle Hidalgo 412, Centro, Monterrey, N.L., México')
  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${dtStart}/${dtEnd}&details=${details}&location=${location}`
}

export async function POST(req: NextRequest) {
  let body: NotifyPayload
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const {
    bookingId, clientName, clientEmail,
    petName, petType, breed, sizeLabel, sizeRange,
    items, total, dateLabel, slotDate, slotStartMin, durationMin,
    paymentMethod, notes,
  } = body

  if (!bookingId || !petName || !slotDate || !paymentMethod) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
  }

  const gcalUrl = buildGCalUrl(slotDate, slotStartMin, durationMin, petName, items, total)

  const itemsHtml = items.map((it, i) => `
    <tr style="background:${i % 2 === 0 ? '#fff' : '#fafafa'}">
      <td style="padding:10px 16px;font-size:14px;color:#1C1815">${it.name}
        <span style="font-size:12px;color:#8B7355;margin-left:6px">~${it.duration} min</span>
      </td>
      <td style="padding:10px 16px;font-size:14px;color:#1C1815;text-align:right;white-space:nowrap">
        $${it.price.toLocaleString('es-MX')} MXN
      </td>
    </tr>`).join('')

  const html = `<!DOCTYPE html>
<html lang="es">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#F5EFE6;font-family:'Helvetica Neue',Arial,sans-serif">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#F5EFE6;padding:32px 16px">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%">

        <!-- Header: nombre de marca -->
        <tr>
          <td align="center" style="padding-bottom:24px">
            <span style="font-family:Georgia,serif;font-size:28px;font-weight:700;color:#1C1815;letter-spacing:-0.02em">La Lanuda</span>
            <br>
            <span style="font-size:11px;text-transform:uppercase;letter-spacing:0.15em;color:#8B7355">Estética Canina &amp; Felina</span>
          </td>
        </tr>

        <!-- Card principal -->
        <tr>
          <td style="background:#fff;border-radius:16px;overflow:hidden;border:1px solid rgba(28,24,21,0.08)">

            <!-- Card header oscuro -->
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td style="background:#1C1815;padding:28px 32px">
                  <p style="margin:0 0 6px;font-size:11px;text-transform:uppercase;letter-spacing:0.15em;color:#C75D3A">Cita confirmada</p>
                  <h1 style="margin:0;font-size:24px;font-weight:700;color:#F5EFE6;line-height:1.2">
                    ¡Hasta pronto, ${clientName.split(' ')[0]}! 🐾
                  </h1>
                </td>
              </tr>
            </table>

            <!-- Cuerpo -->
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td style="padding:28px 32px">
                  <p style="margin:0 0 24px;font-size:15px;color:#555;line-height:1.6">
                    Recibimos la cita de <strong>${petName}</strong>. Te esperamos con todo listo.
                  </p>

                  <!-- Bloque highlight: fecha -->
                  <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px">
                    <tr>
                      <td style="border-left:3px solid #C75D3A;padding:12px 16px;background:#FFF8F5;border-radius:0 8px 8px 0">
                        <p style="margin:0 0 2px;font-size:11px;text-transform:uppercase;letter-spacing:0.1em;color:#8B7355">Fecha y hora</p>
                        <p style="margin:0;font-size:16px;font-weight:700;color:#1C1815">${dateLabel}</p>
                      </td>
                    </tr>
                  </table>

                  <!-- Detalles mascota -->
                  <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px;border:1px solid rgba(28,24,21,0.08);border-radius:8px;overflow:hidden">
                    <tr style="background:#F5EFE6">
                      <td style="padding:8px 16px;font-size:11px;text-transform:uppercase;letter-spacing:0.1em;color:#8B7355;width:40%">Mascota</td>
                      <td style="padding:8px 16px;font-size:14px;color:#1C1815">${petName} · ${petType} · ${breed}</td>
                    </tr>
                    <tr>
                      <td style="padding:8px 16px;font-size:11px;text-transform:uppercase;letter-spacing:0.1em;color:#8B7355">Tamaño</td>
                      <td style="padding:8px 16px;font-size:14px;color:#1C1815">${sizeLabel} (${sizeRange})</td>
                    </tr>
                    <tr style="background:#F5EFE6">
                      <td style="padding:8px 16px;font-size:11px;text-transform:uppercase;letter-spacing:0.1em;color:#8B7355">Pago</td>
                      <td style="padding:8px 16px;font-size:14px;color:#1C1815">${paymentMethod}</td>
                    </tr>
                    ${notes ? `<tr>
                      <td style="padding:8px 16px;font-size:11px;text-transform:uppercase;letter-spacing:0.1em;color:#8B7355">Notas</td>
                      <td style="padding:8px 16px;font-size:14px;color:#1C1815;font-style:italic">${notes}</td>
                    </tr>` : ''}
                  </table>

                  <!-- Servicios -->
                  <p style="margin:0 0 8px;font-size:11px;text-transform:uppercase;letter-spacing:0.1em;color:#8B7355">Servicios</p>
                  <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid rgba(28,24,21,0.08);border-radius:8px;overflow:hidden;margin-bottom:8px">
                    ${itemsHtml}
                    <tr style="background:#1C1815">
                      <td style="padding:12px 16px;font-size:12px;text-transform:uppercase;letter-spacing:0.1em;color:#F5EFE6;font-weight:600">Total</td>
                      <td style="padding:12px 16px;font-size:20px;color:#F5EFE6;text-align:right;font-weight:700">$${total.toLocaleString('es-MX')} MXN</td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>

            <!-- CTA: Agregar a Google Calendar -->
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td align="center" style="padding:0 32px 32px">
                  <a href="${gcalUrl}"
                    style="display:inline-block;background:#1C1815;color:#F5EFE6;text-decoration:none;padding:14px 32px;border-radius:999px;font-size:14px;font-weight:600;letter-spacing:0.02em">
                    📅 Agregar a Google Calendar
                  </a>
                </td>
              </tr>
            </table>

          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td align="center" style="padding:24px 0 0">
            <p style="margin:0;font-size:12px;color:#8B7355">
              La Lanuda · Calle Hidalgo 412, Centro, Monterrey · hola@lalanuda.mx
            </p>
            <p style="margin:4px 0 0;font-size:11px;color:#aaa">ID de cita: ${bookingId}</p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`

  const resend = new Resend(process.env.RESEND_API_KEY)

  try {
    await resend.emails.send({
      from: 'La Lanuda <noreply@info.scalvia.mx>',
      to: [clientEmail || 'hola@lalanuda.mx', 'hola@lalanuda.mx'].filter(Boolean),
      replyTo: 'hola@lalanuda.mx',
      subject: `🐾 Cita confirmada — ${petName} · ${dateLabel.split('·')[0].trim()}`,
      html,
    })
    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('[lalanuda/notify] Resend error:', err)
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 })
  }
}
```

> **Nota sobre destinatarios:** El email va a `clientEmail` (cliente) Y a `hola@lalanuda.mx` (salón). Si el cliente no tiene email (guest), solo va al salón.

- [ ] **Step 3: Commit**

```bash
git add src/app/api/lalanuda/notify/route.ts
git commit -m "feat(lalanuda): booking confirmation email with Lation-style design and GCal button"
```

---

### Task 3: Actualizar `handleConfirm` en `page.tsx`

**Files:**
- Modify: `src/app/lalanuda/page.tsx` (~línea 654)

La función actual hace `window.location.href = notif.mailtoUrl` que **redirige la página** — esto rompe el flujo. Hay que reemplazarla.

- [ ] **Step 1: Reemplazar la función `handleConfirm` completa**

Encuentra `function handleConfirm()` (~línea 654) y reemplaza todo el bloque:

```typescript
async function handleConfirm() {
  const bookingId = "b_" + Date.now();
  saveBookingToStorage({
    id: bookingId,
    date: booking.slot!.date,
    startMin: booking.slot!.startMin,
    durationMin,
  });
  setExistingBookings(loadBookings());

  const selectedPayment = PAYMENT_METHODS.find(p => p.id === booking.paymentMethod);
  const paymentLabel = selectedPayment
    ? `${selectedPayment.title} (${selectedPayment.status})`
    : "No especificado";

  // Email vía API — no bloquea, no redirige
  fetch("/api/lalanuda/notify", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      bookingId,
      clientName: user?.name || "Invitado",
      clientEmail: user?.email || "",
      petName: booking.petName,
      petType: booking.petType === "perro" ? "Perro" : "Gato",
      breed: booking.breed,
      sizeLabel: size?.label ?? "",
      sizeRange: size?.range ?? "",
      items,
      total,
      dateLabel,
      slotDate: booking.slot!.date,
      slotStartMin: booking.slot!.startMin,
      durationMin,
      paymentMethod: paymentLabel,
      notes: booking.notes,
    }),
  }).catch(err => console.error("[lalanuda] notify error:", err));

  // WhatsApp al salón — nueva pestaña, no redirige
  const notif = buildNotifications(
    {
      petName: booking.petName,
      petType: booking.petType ?? undefined,
      breed: booking.breed,
      notes: booking.notes,
      paymentMethod: booking.paymentMethod ?? undefined,
      bookingId,
      date: dateLabel,
      sizeLabel: size?.label,
      sizeRange: size?.range,
      items,
      total,
    },
    user
  );
  window.open(notif.waUrl, "_blank");

  setStage("confirmed");
}
```

- [ ] **Step 2: Verificar que no quede ninguna referencia a `mailtoUrl` ni `window.location.href` dentro de `handleConfirm`**

```bash
grep -n "mailtoUrl\|window.location.href" src/app/lalanuda/page.tsx
```

Esperado: cero resultados dentro de `handleConfirm`. Si aparece algo, eliminarlo.

- [ ] **Step 3: Commit**

```bash
git add src/app/lalanuda/page.tsx
git commit -m "feat(lalanuda): replace mailto redirect with async fetch in handleConfirm"
```

---

### Task 4: Push y verificar en producción

**Files:** ninguno (solo verificación)

- [ ] **Step 1: Push a main**

```bash
git push origin main
```

- [ ] **Step 2: Esperar deploy en Vercel (~1 min) y probar flujo completo**

Ir a `https://scalvia.mx/lalanuda` y hacer una cita de prueba:

1. ✅ Paso 1–3: flujo normal
2. ✅ Paso 4: confirmar cita
3. ✅ WhatsApp se abre en nueva pestaña con número `528120367228`
4. ✅ Pantalla pasa a "¡Cita agendada!" sin redirigir
5. ✅ Email llega a `hola@lalanuda.mx` con diseño tipo Lation + botón de GCal
6. ✅ Si el cliente tiene email (Clerk), también le llega a él
7. ✅ Botón "Agregar a Google Calendar" en el email abre GCal con la cita pre-llenada

- [ ] **Step 3: Si el email no llega — verificar env var en Vercel**

```bash
vercel env ls
```

Confirmar que `RESEND_API_KEY` aparece en `production`. Si no:

```bash
vercel env add RESEND_API_KEY production
# pegar el valor desde dashboard.resend.com → API Keys
```

Luego redeploy:
```bash
vercel --prod
```

- [ ] **Step 4: Verificar dominio remitente en Resend**

El email sale desde `noreply@info.scalvia.mx`. En `dashboard.resend.com → Domains` verificar que `info.scalvia.mx` está en estado **Verified**.

Si no está verificado, cambiar temporalmente el `from` en `route.ts` a:
```typescript
from: 'La Lanuda <onboarding@resend.dev>',
```
(solo para pruebas — después revertir cuando el dominio esté verificado)
