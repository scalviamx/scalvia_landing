import type { Metadata } from 'next'
import { Nav } from '@/components/sections/Nav'
import { Footer } from '@/components/sections/Footer'
import { WaFab } from '@/components/WaFab'
import { ResultadosContent } from '@/components/sections/ResultadosPage'

export const metadata: Metadata = {
  title: 'Resultados · Scalvia',
  description: 'Métricas reales y los 4 pilares de IA que implementamos: atención al cliente, ventas, reclutamiento y automatización de operaciones.',
}

export default function ResultadosPage() {
  return (
    <>
      <Nav />
      <ResultadosContent />
      <Footer />
      <WaFab />
    </>
  )
}
