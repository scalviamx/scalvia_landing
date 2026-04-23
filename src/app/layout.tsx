import type { Metadata } from 'next'
import { Plus_Jakarta_Sans } from 'next/font/google'
import './globals.css'
import { HashAnchorScroller } from '@/components/HashAnchorScroller'

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '600', '700', '800'],
  style: ['normal', 'italic'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Scalvia · The path to scale.',
  description:
    'Agencia de inteligencia artificial para empresas. Agentes de IA para atención al cliente, ventas, reclutamiento y automatización de operaciones.',
  openGraph: {
    title: 'Scalvia · The path to scale.',
    description:
      'Agentes de IA para atención al cliente, ventas, reclutamiento y operaciones, implementados en 2 a 4 semanas.',
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
      </head>
      <body className={`${plusJakartaSans.className} text-ink bg-white`}>
        <HashAnchorScroller />
        {children}
      </body>
    </html>
  )
}
