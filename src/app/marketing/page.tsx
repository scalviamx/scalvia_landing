import type { Metadata } from 'next'
import { Nav } from '@/components/sections/Nav'
import { Footer } from '@/components/sections/Footer'
import { WaFab } from '@/components/WaFab'
import { MarketingContent } from '@/components/sections/MarketingPage'

export const metadata: Metadata = {
  title: 'Marketing Digital · Scalvia',
  description: 'Servicios de marketing digital complementarios a tus agentes de IA: Google, web, redes sociales y publicidad pagada.',
}

export default function MarketingPage() {
  return (
    <>
      <Nav />
      <MarketingContent />
      <Footer />
      <WaFab />
    </>
  )
}
