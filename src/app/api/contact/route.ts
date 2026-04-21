import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import {
  CONTACT_BODY_MAX_BYTES,
  CONTACT_RAPID_THRESHOLD,
  createSignedTimingToken,
  escapeHtml,
  getClientIp,
  isOriginAllowed,
  normalizeContactPayload,
  registerIpAttempt,
  verifySignedTimingToken,
  verifyTurnstileToken,
  type SectorKey,
} from '@/lib/contactSecurity'

const BAD_REQUEST_MESSAGE = 'No pudimos procesar tu solicitud. Verifica tus datos e intenta de nuevo.'
const FORBIDDEN_MESSAGE = 'No pudimos validar tu solicitud. Intenta de nuevo.'

export const runtime = 'nodejs'

export async function POST(req: NextRequest) {
  const ip = getClientIp(req)
  const rateState = registerIpAttempt(ip)

  if (rateState.blocked) {
    return NextResponse.json(
      { error: 'Demasiados intentos. Intenta de nuevo en unos minutos.' },
      {
        status: 429,
        headers: {
          'Retry-After': String(Math.ceil(rateState.retryAfterMs / 1000)),
        },
      }
    )
  }

  const rawBody = await req.text().catch(() => '')
  if (Buffer.byteLength(rawBody, 'utf8') > CONTACT_BODY_MAX_BYTES) {
    return NextResponse.json({ error: BAD_REQUEST_MESSAGE }, { status: 413 })
  }

  let parsedBody: unknown = {}
  try {
    parsedBody = rawBody ? JSON.parse(rawBody) : {}
  } catch {
    return NextResponse.json({ error: BAD_REQUEST_MESSAGE }, { status: 400 })
  }

  const payload = normalizeContactPayload(parsedBody)
  if (!payload) {
    return NextResponse.json({ error: BAD_REQUEST_MESSAGE }, { status: 400 })
  }

  if (payload._honeypot) {
    return NextResponse.json({ success: true })
  }

  const originAllowed = isOriginAllowed(req)
  const timingCheck = verifySignedTimingToken(payload.submittedAt, payload.submittedSig)
  const userAgent = req.headers.get('user-agent') || ''
  const isSuspiciousRequest =
    !originAllowed ||
    !timingCheck.valid ||
    rateState.rapidAttempts >= CONTACT_RAPID_THRESHOLD ||
    !userAgent.trim()

  if (isSuspiciousRequest) {
    const turnstileValid = await verifyTurnstileToken(payload.turnstileToken, ip)
    if (!turnstileValid) {
      return NextResponse.json(
        {
          error: FORBIDDEN_MESSAGE,
          code: 'challenge_required',
          challenge: createSignedTimingToken(),
        },
        { status: 403 }
      )
    }
  }

  const sectorLabel: Record<SectorKey, string> = {
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
      replyTo: payload.email,
      subject: `Nuevo prospecto IA: ${payload.empresa}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: #0F3D2E; padding: 24px; border-radius: 8px 8px 0 0;">
            <h2 style="color: #3DBB7A; margin: 0; font-size: 20px;">Nuevo prospecto, Scalvia IA</h2>
          </div>
          <div style="background: #f9f9f9; padding: 24px; border-radius: 0 0 8px 8px; border: 1px solid #e0e0e0; border-top: none;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr><td style="padding:10px 0;font-weight:bold;color:#555;width:40%">Nombre</td><td style="padding:10px 0;color:#222">${escapeHtml(payload.nombre)}</td></tr>
              <tr style="background:#f0f0f0"><td style="padding:10px;font-weight:bold;color:#555">Correo</td><td style="padding:10px;color:#222">${escapeHtml(payload.email)}</td></tr>
              <tr><td style="padding:10px 0;font-weight:bold;color:#555">Empresa</td><td style="padding:10px 0;color:#222">${escapeHtml(payload.empresa)}</td></tr>
              ${payload.whatsapp ? `<tr style="background:#f0f0f0"><td style="padding:10px;font-weight:bold;color:#555">WhatsApp</td><td style="padding:10px;color:#222">${escapeHtml(payload.whatsapp)}</td></tr>` : ''}
              ${payload.sector ? `<tr><td style="padding:10px 0;font-weight:bold;color:#555">Sector</td><td style="padding:10px 0;color:#222">${escapeHtml(sectorLabel[payload.sector])}</td></tr>` : ''}
              ${payload.reto ? `<tr style="background:#f0f0f0"><td style="padding:10px;font-weight:bold;color:#555;vertical-align:top">Reto operativo</td><td style="padding:10px;color:#222;white-space:pre-wrap">${escapeHtml(payload.reto)}</td></tr>` : ''}
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
