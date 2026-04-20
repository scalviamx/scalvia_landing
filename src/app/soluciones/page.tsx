import type { Metadata } from 'next'
import { Nav } from '@/components/sections/Nav'
import { Footer } from '@/components/sections/Footer'
import { WaFab } from '@/components/WaFab'
import { SolucionesContent } from '@/components/sections/SolucionesPage'

export const metadata: Metadata = {
  title: 'Soluciones de IA · Scalvia',
  description: 'Los 4 pilares de IA que implementamos: atención al cliente, ventas, reclutamiento y automatización de operaciones.',
}

export default function SolucionesPage() {
  return (
    <>
      <Nav />
      <SolucionesContent />
      <Footer />
      <WaFab />
    </>
  )
}
