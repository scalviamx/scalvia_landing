import type { Metadata } from 'next'
import { Nav } from '@/components/sections/Nav'
import { Footer } from '@/components/sections/Footer'
import { WaFab } from '@/components/WaFab'
import { ProcesoContent } from '@/components/sections/ProcesoPage'

export const metadata: Metadata = {
  title: 'Cómo funciona · Scalvia',
  description: 'El proceso de 4 pasos para implementar agentes de IA en tu empresa — de diagnóstico a producción en 2 a 4 semanas.',
}

export default function ProcesoPage() {
  return (
    <>
      <Nav />
      <ProcesoContent />
      <Footer />
      <WaFab />
    </>
  )
}
