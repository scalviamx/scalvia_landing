import type { Metadata } from 'next'
import { Nav } from '@/components/sections/Nav'
import { Footer } from '@/components/sections/Footer'
import { WaFab } from '@/components/WaFab'
import { ProblemaContent } from '@/components/sections/ProblemaPage'

export const metadata: Metadata = {
  title: 'El Problema · Scalvia',
  description: 'Por qué las empresas pierden tiempo y dinero en procesos manuales — y cómo la IA lo resuelve.',
}

export default function ProblemaPage() {
  return (
    <>
      <Nav />
      <ProblemaContent />
      <Footer />
      <WaFab />
    </>
  )
}
