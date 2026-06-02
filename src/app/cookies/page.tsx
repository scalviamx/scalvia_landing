import type { Metadata } from 'next'
import { Nav } from '@/components/sections/Nav'
import { Footer } from '@/components/sections/Footer'
import { WaFab } from '@/components/WaFab'
import { LegalPage } from '@/components/sections/LegalPage'

export const metadata: Metadata = {
  title: 'Política de Cookies | Scalvia',
  description: 'Información sobre el uso de cookies y tecnologías similares en el sitio web de Scalvia.',
}

export default function CookiesPage() {
  return (
    <>
      <Nav variant="solid" />
      <LegalPage
        title="Política de Cookies"
        updatedAt="2 de junio de 2026"
        intro={[
          'Esta Política de Cookies explica cómo Scalvia puede utilizar cookies y tecnologías similares en el sitio web https://scalvia.mx para operar el sitio, mejorar la experiencia del usuario, analizar tráfico y optimizar nuestros canales digitales.',
        ]}
        sections={[
          {
            title: '1. Qué son las cookies',
            body: [
              'Las cookies son pequeños archivos o fragmentos de información que pueden almacenarse en el navegador o dispositivo del usuario cuando visita un sitio web. También podemos utilizar tecnologías similares, como píxeles, etiquetas o identificadores digitales, para finalidades relacionadas con navegación, medición, seguridad, funcionalidad o campañas digitales.',
            ],
          },
          {
            title: '2. Cookies esenciales',
            body: [
              'Son necesarias para el funcionamiento básico del sitio, la navegación, la seguridad, la carga de páginas o la operación de funciones solicitadas por el usuario. Sin estas tecnologías, algunas partes del sitio podrían no funcionar correctamente.',
            ],
          },
          {
            title: '3. Cookies de rendimiento',
            body: [
              'Pueden utilizarse para comprender el desempeño del sitio, detectar errores, medir tiempos de carga, identificar áreas de mejora y mantener una experiencia estable para los visitantes.',
            ],
          },
          {
            title: '4. Cookies de funcionalidad',
            body: [
              'Pueden ayudar a recordar preferencias generales del usuario, mantener configuraciones de navegación o mejorar la continuidad de la experiencia dentro del sitio.',
            ],
          },
          {
            title: '5. Cookies de analítica',
            body: [
              'Pueden utilizarse para analizar tráfico, páginas visitadas, fuente de acceso, interacciones con formularios, duración de visitas y comportamiento agregado dentro del sitio. Esta información nos ayuda a mejorar contenidos, servicios y procesos comerciales.',
            ],
          },
          {
            title: '6. Cookies publicitarias',
            body: [
              'Pueden utilizarse para medir campañas, analizar conversiones, optimizar anuncios o mostrar comunicaciones relacionadas con nuestros servicios en plataformas digitales. Estas tecnologías pueden ser gestionadas por proveedores externos conforme a sus propias políticas.',
            ],
          },
          {
            title: '7. Herramientas de terceros',
            body: [
              'Nuestro sitio puede apoyarse en herramientas de terceros como Meta, Google, CRM, formularios, WhatsApp, plataformas de automatización o herramientas de analítica. Dichas herramientas pueden utilizar cookies, píxeles o tecnologías similares para operar sus servicios, medir interacciones, facilitar comunicaciones o mejorar campañas.',
              'No agregamos en esta política una lista cerrada de cookies específicas, ya que las herramientas utilizadas pueden cambiar por razones técnicas, operativas o comerciales.',
            ],
          },
          {
            title: '8. Cómo administrar cookies',
            body: [
              'El usuario puede administrar, limitar, bloquear o eliminar cookies desde la configuración de su navegador. La ubicación exacta de estas opciones depende del navegador utilizado.',
              'Si el usuario desactiva cookies, algunas funciones del sitio podrían no operar correctamente o la experiencia de navegación podría verse limitada.',
            ],
          },
          {
            title: '9. Contacto',
            body: [
              'Para dudas relacionadas con esta Política de Cookies o el tratamiento de datos personales, puedes escribir a privacidad@scalvia.mx.',
            ],
          },
        ]}
      />
      <Footer />
      <WaFab />
    </>
  )
}
