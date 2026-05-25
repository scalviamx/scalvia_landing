import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { Client } from '@notionhq/client'

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
  dateLabel: string
  slotDate: string
  slotStartMin: number
  durationMin: number
  paymentMethod: string
  notes: string
}

async function logToNotion(payload: NotifyPayload): Promise<void> {
  const token = process.env.NOTION_TOKEN
  const dbId  = process.env.NOTION_LALANUDA_DB_ID
  if (!token || !dbId) {
    console.warn('[lalanuda/notify] NOTION_TOKEN or NOTION_LALANUDA_DB_ID not set — skipping log')
    return
  }

  const notion = new Client({ auth: token })

  const serviciosList = payload.items.map(i => `${i.name} ($${i.price})`).join(', ')
  const hh = String(Math.floor(payload.slotStartMin / 60)).padStart(2, '0')
  const mm = String(payload.slotStartMin % 60).padStart(2, '0')
  const horaInicio = `${hh}:${mm}`

  await notion.pages.create({
    parent: { database_id: dbId },
    properties: {
      'ID Cita':         { title:     [{ text: { content: payload.bookingId } }] },
      'Fecha':           { date:      { start: payload.slotDate } },
      'Cliente':         { rich_text: [{ text: { content: payload.clientName || '—' } }] },
      'Email':           { email:     payload.clientEmail || null },
      'Mascota':         { rich_text: [{ text: { content: `${payload.petName} · ${payload.petType}` } }] },
      'Raza':            { rich_text: [{ text: { content: payload.breed || '—' } }] },
      'Tamaño':          { select:    { name: payload.sizeLabel } },
      'Servicios':       { rich_text: [{ text: { content: serviciosList } }] },
      'Total MXN':       { number:    payload.total },
      'Comisión 6% MXN': { number:    Math.round(payload.total * 0.06) },
      'Método de pago':  { select:    { name: payload.paymentMethod } },
      'Notas':           { rich_text: [{ text: { content: payload.notes || '—' } }] },
      'Hora inicio':     { rich_text: [{ text: { content: horaInicio } }] },
      'Duración min':    { number:    payload.durationMin },
    },
  })
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

        <tr>
          <td align="center" style="padding-bottom:24px">
            <span style="font-family:Georgia,serif;font-size:28px;font-weight:700;color:#1C1815;letter-spacing:-0.02em">La Lanuda</span>
            <br>
            <span style="font-size:11px;text-transform:uppercase;letter-spacing:0.15em;color:#8B7355">Estética Canina &amp; Felina</span>
          </td>
        </tr>

        <tr>
          <td style="background:#fff;border-radius:16px;overflow:hidden;border:1px solid rgba(28,24,21,0.08)">

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

            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td style="padding:28px 32px">
                  <p style="margin:0 0 24px;font-size:15px;color:#555;line-height:1.6">
                    Recibimos la cita de <strong>${petName}</strong>. Te esperamos con todo listo.
                  </p>

                  <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px">
                    <tr>
                      <td style="border-left:3px solid #C75D3A;padding:12px 16px;background:#FFF8F5;border-radius:0 8px 8px 0">
                        <p style="margin:0 0 2px;font-size:11px;text-transform:uppercase;letter-spacing:0.1em;color:#8B7355">Fecha y hora</p>
                        <p style="margin:0;font-size:16px;font-weight:700;color:#1C1815">${dateLabel}</p>
                      </td>
                    </tr>
                  </table>

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

  const recipients = ['hola@lalanuda.mx']
  if (clientEmail) recipients.unshift(clientEmail)

  try {
    await resend.emails.send({
      from: 'La Lanuda <noreply@info.scalvia.mx>',
      to: recipients,
      replyTo: 'hola@lalanuda.mx',
      subject: `🐾 Cita confirmada — ${petName} · ${dateLabel.split('·')[0].trim()}`,
      html,
    })
    logToNotion(body).catch(err => console.error('[lalanuda/notify] Notion log error:', err))
    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('[lalanuda/notify] Resend error:', err)
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 })
  }
}
