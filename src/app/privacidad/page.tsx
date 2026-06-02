import type { Metadata } from 'next'
import { Nav } from '@/components/sections/Nav'
import { Footer } from '@/components/sections/Footer'
import { WaFab } from '@/components/WaFab'
import { LegalPage } from '@/components/sections/LegalPage'

export const metadata: Metadata = {
  title: 'Política de Privacidad | Scalvia',
  description:
    'Política de Privacidad de Scalvia sobre el uso de datos personales, WhatsApp, automatización, inteligencia artificial y canales digitales.',
}

export default function PrivacidadPage() {
  return (
    <>
      <Nav variant="solid" animated={false} />
      <LegalPage
        title="Política de Privacidad"
        updatedAt="2 de junio de 2026"
        intro={[
          'En Scalvia respetamos la privacidad de nuestros usuarios, prospectos, clientes y visitantes. Esta Política de Privacidad explica cómo recopilamos, usamos, protegemos y, en su caso, compartimos la información personal que nos proporcionas al visitar nuestro sitio web, llenar formularios de contacto, comunicarte con nosotros por WhatsApp, correo electrónico, redes sociales, teléfono u otros canales digitales.',
          'Al utilizar nuestro sitio web o comunicarte con nosotros, aceptas los términos descritos en esta Política de Privacidad.',
        ]}
        sections={[
          {
            title: '1. Información que recopilamos',
            body: [
              'Podemos recopilar información personal proporcionada voluntariamente por el usuario, incluyendo nombre, empresa, cargo, correo electrónico, número telefónico, número de WhatsApp, ciudad, país, mensajes, solicitudes comerciales, preferencias de contacto, información relacionada con los servicios solicitados, datos de facturación en caso de contratar servicios e historial de interacción con nuestros canales digitales.',
              'También podemos recopilar información técnica de navegación, como dirección IP, tipo de navegador, sistema operativo, páginas visitadas, fecha y hora de acceso, fuente de tráfico e interacciones dentro del sitio.',
            ],
          },
          {
            title: '2. Finalidades del uso de datos',
            body: [
              'Utilizamos la información para responder solicitudes, contactar a prospectos o clientes, enviar cotizaciones, agendar llamadas, brindar soporte, gestionar comunicaciones por WhatsApp, correo electrónico o teléfono, prestar servicios contratados, mejorar nuestros procesos internos y cumplir obligaciones legales, fiscales, administrativas o contractuales.',
              'También podemos utilizar la información para enviar contenido relacionado con nuestros servicios, realizar seguimiento comercial, medir la efectividad de campañas, generar análisis internos y mejorar la calidad de atención.',
            ],
          },
          {
            title: '3. Uso de WhatsApp',
            body: [
              'Al contactarnos por WhatsApp, el usuario acepta que podamos utilizar este canal para responder solicitudes, dar seguimiento comercial, brindar atención, confirmar información, enviar recordatorios, compartir propuestas o continuar una conversación relacionada con nuestros servicios.',
              'Podemos utilizar WhatsApp Business, WhatsApp Cloud API, Meta Business, CRM, plataformas de automatización o sistemas de atención al cliente para gestionar conversaciones y mejorar la experiencia de atención.',
              'No utilizaremos WhatsApp para enviar spam, mensajes masivos no solicitados, contenido engañoso o comunicaciones ajenas a la relación comercial o solicitud iniciada por el usuario.',
              'El usuario puede solicitar en cualquier momento que dejemos de contactarlo por WhatsApp escribiendo mensajes como “Baja”, “No deseo recibir mensajes”, “Eliminar mis datos” o una solicitud equivalente.',
            ],
          },
          {
            title: '4. Automatización e inteligencia artificial',
            body: [
              'Scalvia puede utilizar herramientas tecnológicas, automatización e inteligencia artificial para mejorar la atención, clasificar solicitudes, responder preguntas frecuentes, canalizar mensajes, generar recordatorios, registrar interacciones o asistir al equipo humano en procesos comerciales y de soporte.',
              'El uso de estas herramientas tiene como objetivo mejorar la rapidez, calidad y continuidad de la atención. Cuando sea necesario, una persona del equipo podrá revisar o intervenir en la conversación para dar seguimiento adecuado.',
            ],
          },
          {
            title: '5. Transferencia de datos a proveedores tecnológicos',
            body: [
              'Podemos compartir información con proveedores necesarios para operar nuestros servicios, como plataformas de hosting, CRM, correo electrónico, mensajería, analítica, automatización, facturación, contabilidad, infraestructura tecnológica, Meta, WhatsApp u otros proveedores relacionados con la prestación del servicio.',
              'No vendemos datos personales a terceros.',
            ],
          },
          {
            title: '6. Conservación de datos',
            body: [
              'Conservaremos la información personal durante el tiempo necesario para cumplir las finalidades descritas, mantener la relación comercial, atender solicitudes, cumplir obligaciones legales, resolver controversias o conservar registros administrativos.',
              'Cuando la información ya no sea necesaria, será eliminada, anonimizada o bloqueada conforme a nuestras posibilidades técnicas, operativas y legales.',
            ],
          },
          {
            title: '7. Seguridad de la información',
            body: [
              'Implementamos medidas razonables de seguridad administrativas, técnicas y organizacionales para proteger los datos personales contra pérdida, acceso no autorizado, alteración, divulgación o uso indebido.',
              'Estas medidas pueden incluir control de accesos, uso de contraseñas seguras, restricción de permisos internos, protección de cuentas administrativas, uso de plataformas confiables y buenas prácticas de manejo de datos.',
              'Aunque aplicamos medidas razonables, ningún sistema digital, transmisión por internet o canal de comunicación puede garantizar seguridad absoluta.',
            ],
          },
          {
            title: '8. Derechos ARCO',
            body: [
              'El usuario tiene derecho a acceder, rectificar, cancelar u oponerse al tratamiento de sus datos personales, así como a revocar su consentimiento cuando legalmente proceda.',
              'Para ejercer estos derechos, el usuario puede enviar una solicitud al correo: privacidad@scalvia.mx.',
              'La solicitud deberá incluir nombre completo, medio de contacto, descripción clara de la solicitud y, cuando sea necesario, información que permita acreditar identidad.',
            ],
          },
          {
            title: '9. Cookies y tecnologías similares',
            body: [
              'Nuestro sitio puede utilizar cookies, píxeles y tecnologías similares para mejorar la experiencia del usuario, analizar tráfico, medir campañas, recordar preferencias y optimizar nuestros servicios.',
              'Estas tecnologías pueden recopilar información como páginas visitadas, tiempo de navegación, fuente de acceso, dispositivo utilizado, navegador e interacciones con formularios o anuncios.',
              'El usuario puede limitar o desactivar cookies desde la configuración de su navegador. Sin embargo, algunas funciones del sitio podrían no operar correctamente si las cookies son deshabilitadas.',
            ],
          },
          {
            title: '10. Publicidad y medición',
            body: [
              'Podemos utilizar herramientas de publicidad y medición de terceros, incluyendo plataformas como Meta, Google u otras soluciones digitales, para mostrar anuncios, medir conversiones, analizar tráfico o mejorar campañas.',
              'Estas plataformas pueden utilizar cookies, píxeles u otras tecnologías conforme a sus propias políticas de privacidad.',
            ],
          },
          {
            title: '11. Cambios a esta política',
            body: [
              'Podemos actualizar esta Política de Privacidad en cualquier momento para reflejar cambios legales, tecnológicos, operativos o comerciales.',
              'La versión vigente estará disponible en este sitio web con la fecha de última actualización.',
            ],
          },
          {
            title: '12. Contacto',
            body: [
              'Para dudas relacionadas con esta Política de Privacidad o el tratamiento de datos personales, el usuario puede contactarnos en:',
              'Scalvia. Sitio web: https://scalvia.mx. Correo: privacidad@scalvia.mx. Ubicación: México.',
            ],
          },
        ]}
      />
      <Footer />
      <WaFab />
    </>
  )
}
