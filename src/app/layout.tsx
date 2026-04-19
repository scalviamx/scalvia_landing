import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Scalvia · The path to scale.',
  description:
    'Agencia de inteligencia artificial para empresas. Agentes de IA para atención al cliente, ventas, reclutamiento y automatización de operaciones.',
  openGraph: {
    title: 'Scalvia · The path to scale.',
    description:
      'Agentes de IA para atención al cliente, ventas, reclutamiento y operaciones — implementados en 2 a 4 semanas.',
    url: 'https://scalvia.mx',
    siteName: 'Scalvia',
    locale: 'es_MX',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <head>
        <link rel="icon" type="image/png" sizes="512x512" href="/favicon.png" />
        <link rel="apple-touch-icon" href="/favicon.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="font-sans text-ink bg-white">{children}</body>
    </html>
  )
}
