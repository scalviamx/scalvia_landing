import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

function escapeHtml(str: string) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({}))
  const { nombre, email, empresa, whatsapp, sector, reto, _honeypot } = body ?? {}

  if (_honeypot) return NextResponse.json({ success: true })

  if (!nombre?.trim() || !email?.trim() || !empresa?.trim()) {
    return NextResponse.json(
      { error: 'Por favor completa los campos requeridos.' },
      { status: 400 }
    )
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email.trim())) {
    return NextResponse.json({ error: 'Correo electrónico inválido.' }, { status: 400 })
  }

  const sectorLabel: Record<string, string> = {
    industrial: 'Industrial / Manufactura',
    bienes_raices: 'Bienes Raíces',
    despacho: 'Despacho / Servicios Profesionales',
    otro: 'Otro',
  }

  try {
    const resend = new Resend(process.env.RESEND_API_KEY)
    await resend.emails.send({
      from: 'Scalvia <noreply@info.scalvia.mx>',
      to: 'hola@scalvia.mx',
      replyTo: email.trim(),
      subject: `Nuevo prospecto IA: ${empresa.trim()}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: #0F3D2E; padding: 24px; border-radius: 8px 8px 0 0;">
            <h2 style="color: #3DBB7A; margin: 0; font-size: 20px;">Nuevo prospecto — Scalvia IA</h2>
          </div>
          <div style="background: #f9f9f9; padding: 24px; border-radius: 0 0 8px 8px; border: 1px solid #e0e0e0; border-top: none;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr><td style="padding:10px 0;font-weight:bold;color:#555;width:40%">Nombre</td><td style="padding:10px 0;color:#222">${escapeHtml(nombre.trim())}</td></tr>
              <tr style="background:#f0f0f0"><td style="padding:10px;font-weight:bold;color:#555">Correo</td><td style="padding:10px;color:#222">${escapeHtml(email.trim())}</td></tr>
              <tr><td style="padding:10px 0;font-weight:bold;color:#555">Empresa</td><td style="padding:10px 0;color:#222">${escapeHtml(empresa.trim())}</td></tr>
              ${whatsapp ? `<tr style="background:#f0f0f0"><td style="padding:10px;font-weight:bold;color:#555">WhatsApp</td><td style="padding:10px;color:#222">${escapeHtml(whatsapp.trim())}</td></tr>` : ''}
              ${sector ? `<tr><td style="padding:10px 0;font-weight:bold;color:#555">Sector</td><td style="padding:10px 0;color:#222">${escapeHtml(sectorLabel[sector] ?? sector)}</td></tr>` : ''}
              ${reto ? `<tr style="background:#f0f0f0"><td style="padding:10px;font-weight:bold;color:#555;vertical-align:top">Reto operativo</td><td style="padding:10px;color:#222;white-space:pre-wrap">${escapeHtml(reto.trim())}</td></tr>` : ''}
            </table>
            <p style="margin-top:24px;font-size:12px;color:#999">Responde directamente a este correo para contactar al prospecto.</p>
          </div>
        </div>
      `,
    })
    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('[contact] Error al enviar email:', err)
    return NextResponse.json({ error: 'Error al enviar el mensaje. Intenta de nuevo.' }, { status: 500 })
  }
}
