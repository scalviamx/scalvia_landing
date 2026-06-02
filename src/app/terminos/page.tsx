import type { Metadata } from 'next'
import { Nav } from '@/components/sections/Nav'
import { Footer } from '@/components/sections/Footer'
import { WaFab } from '@/components/WaFab'
import { LegalPage } from '@/components/sections/LegalPage'

export const metadata: Metadata = {
  title: 'Términos y Condiciones | Scalvia',
  description: 'Términos y Condiciones de uso del sitio web y servicios digitales de Scalvia.',
}

export default function TerminosPage() {
  return (
    <>
      <Nav variant="solid" animated={false} />
      <LegalPage
        title="Términos y Condiciones"
        updatedAt="2 de junio de 2026"
        intro={[
          'Estos Términos y Condiciones regulan el uso del sitio web https://scalvia.mx y la información publicada por Scalvia. Al acceder al sitio o comunicarte con nosotros por canales digitales, aceptas estos términos en lo que resulte aplicable.',
        ]}
        sections={[
          {
            title: '1. Uso permitido del sitio',
            body: [
              'El usuario debe utilizar este sitio web de forma lícita, responsable y conforme a estos Términos y Condiciones. No está permitido usar el sitio para actividades fraudulentas, envío de información falsa, intentos de acceso no autorizado, afectación de la operación del sitio o cualquier uso contrario a la legislación aplicable.',
            ],
          },
          {
            title: '2. Información comercial no vinculante',
            body: [
              'La información publicada en este sitio tiene fines informativos y comerciales generales. Los contenidos sobre servicios, procesos, beneficios, tiempos estimados o resultados potenciales no constituyen una oferta vinculante ni garantizan resultados específicos para todos los casos.',
            ],
          },
          {
            title: '3. Cotizaciones y propuestas',
            body: [
              'Las cotizaciones, diagnósticos, propuestas comerciales o alcances de servicio serán válidos únicamente conforme a los términos expresamente indicados en cada documento, correo, contrato o acuerdo específico. Scalvia puede actualizar precios, condiciones, alcance y disponibilidad de servicios antes de formalizar una contratación.',
            ],
          },
          {
            title: '4. Propiedad intelectual',
            body: [
              'El contenido del sitio, incluyendo textos, marca, elementos visuales, estructura, diseño, materiales comerciales y recursos digitales, pertenece a Scalvia o se utiliza con autorización. No se permite copiar, distribuir, modificar, publicar o explotar dichos contenidos sin autorización previa por escrito.',
            ],
          },
          {
            title: '5. Servicios digitales, automatización e IA',
            body: [
              'Scalvia presta servicios relacionados con estrategia digital, automatización, inteligencia artificial, atención comercial y optimización de procesos. El alcance específico de cada servicio será definido en la propuesta o contrato correspondiente.',
              'Los sistemas de automatización e inteligencia artificial pueden apoyar procesos internos o externos, pero su desempeño depende de factores técnicos, operativos, datos disponibles, integraciones de terceros y uso adecuado por parte del cliente.',
            ],
          },
          {
            title: '6. Plataformas de terceros',
            body: [
              'Algunos servicios o comunicaciones pueden depender de plataformas de terceros como proveedores de hosting, CRM, analítica, mensajería, correo electrónico, Meta, WhatsApp, Google u otras soluciones tecnológicas. Scalvia no controla completamente la disponibilidad, reglas, cambios técnicos o políticas de dichas plataformas.',
            ],
          },
          {
            title: '7. Comunicaciones',
            body: [
              'El usuario puede contactarnos mediante formularios, correo electrónico, WhatsApp, redes sociales u otros canales digitales disponibles. Al iniciar una comunicación, el usuario acepta que Scalvia pueda responder y dar seguimiento por esos medios conforme a la solicitud realizada y a nuestra Política de Privacidad.',
            ],
          },
          {
            title: '8. Limitación de responsabilidad',
            body: [
              'Scalvia procura mantener información clara y actualizada, pero no garantiza que el sitio esté libre de errores, interrupciones o información desactualizada. En la medida permitida por la legislación aplicable, Scalvia no será responsable por daños derivados del uso indebido del sitio, interrupciones técnicas, fallas de terceros o decisiones tomadas únicamente con base en información general publicada en el sitio.',
            ],
          },
          {
            title: '9. Legislación aplicable',
            body: [
              'Estos Términos y Condiciones se interpretarán conforme a las leyes aplicables en México. Cualquier controversia relacionada con el uso del sitio o servicios deberá atenderse conforme a los acuerdos específicos celebrados entre las partes y la legislación mexicana aplicable.',
            ],
          },
          {
            title: '10. Contacto',
            body: [
              'Para dudas relacionadas con estos Términos y Condiciones, puedes escribir a privacidad@scalvia.mx.',
            ],
          },
        ]}
      />
      <Footer />
      <WaFab />
    </>
  )
}
