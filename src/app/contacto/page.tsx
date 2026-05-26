import type { Metadata } from 'next'
import { Nav } from '@/components/sections/Nav'
import { Footer } from '@/components/sections/Footer'
import { WaFab } from '@/components/WaFab'
import { Contacto } from '@/components/sections/Contacto'

export const metadata: Metadata = {
  title: 'Contacto · Scalvia',
  description:
    'Agenda un diagnóstico gratuito con Scalvia y descubre qué procesos de tu empresa puedes automatizar con agentes de IA.',
}

export default function ContactoPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Nav />
      <main className="flex-1 bg-white flex flex-col">
        <Contacto />
      </main>
      <Footer />
      <WaFab />
    </div>
  )
}
