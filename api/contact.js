import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido' });
  }

  const { nombre, email, negocio, telefono, giro, mensaje, _honeypot } = req.body ?? {};

  // Honeypot: bot detectado → respuesta silenciosa falsa
  if (_honeypot) {
    return res.status(200).json({ success: true });
  }

  // Validación server-side
  if (!nombre?.trim() || !email?.trim() || !negocio?.trim()) {
    return res.status(400).json({ error: 'Por favor completa los campos requeridos.' });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email.trim())) {
    return res.status(400).json({ error: 'Correo electrónico inválido.' });
  }

  try {
    await resend.emails.send({
      from: 'Scalvia <noreply@info.scalvia.mx>',
      to: 'hola@scalvia.mx',
      replyTo: email.trim(),
      subject: `Nuevo prospecto: ${negocio.trim()}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: #0F3D2E; padding: 24px; border-radius: 8px 8px 0 0;">
            <h2 style="color: #3DBB7A; margin: 0; font-size: 20px;">Nuevo prospecto — Scalvia</h2>
          </div>
          <div style="background: #f9f9f9; padding: 24px; border-radius: 0 0 8px 8px; border: 1px solid #e0e0e0; border-top: none;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 10px 0; font-weight: bold; color: #555; width: 40%;">Nombre</td>
                <td style="padding: 10px 0; color: #222;">${escapeHtml(nombre.trim())}</td>
              </tr>
              <tr style="background: #f0f0f0;">
                <td style="padding: 10px; font-weight: bold; color: #555;">Correo</td>
                <td style="padding: 10px; color: #222;">${escapeHtml(email.trim())}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; font-weight: bold; color: #555;">Negocio</td>
                <td style="padding: 10px 0; color: #222;">${escapeHtml(negocio.trim())}</td>
              </tr>
              ${giro ? `
              <tr style="background: #f0f0f0;">
                <td style="padding: 10px; font-weight: bold; color: #555;">Giro</td>
                <td style="padding: 10px; color: #222;">${escapeHtml(giro.trim())}</td>
              </tr>` : ''}
              ${telefono ? `
              <tr>
                <td style="padding: 10px 0; font-weight: bold; color: #555;">Teléfono</td>
                <td style="padding: 10px 0; color: #222;">${escapeHtml(telefono.trim())}</td>
              </tr>` : ''}
              ${mensaje ? `
              <tr style="background: #f0f0f0;">
                <td style="padding: 10px; font-weight: bold; color: #555; vertical-align: top;">Mensaje</td>
                <td style="padding: 10px; color: #222; white-space: pre-wrap;">${escapeHtml(mensaje.trim())}</td>
              </tr>` : ''}
            </table>
            <p style="margin-top: 24px; font-size: 12px; color: #999;">
              Responde directamente a este correo para contactar al prospecto.
            </p>
          </div>
        </div>
      `,
    });

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error('[contact] Error al enviar email:', err);
    return res.status(500).json({ error: 'Error al enviar el mensaje. Intenta de nuevo.' });
  }
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}
