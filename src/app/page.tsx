import { Nav } from '@/components/sections/Nav'
import { Hero } from '@/components/sections/Hero'
import { LogosBand } from '@/components/sections/LogosBand'
import { Problema } from '@/components/sections/Problema'
import { Soluciones } from '@/components/sections/Soluciones'
import { Proceso } from '@/components/sections/Proceso'
import { Resultados } from '@/components/sections/Resultados'
import { Marketing } from '@/components/sections/Marketing'
import { Contacto } from '@/components/sections/Contacto'
import { Footer } from '@/components/sections/Footer'
import { WaFab } from '@/components/WaFab'

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <LogosBand />
        <Problema />
        <Soluciones />
        <Proceso />
        <Resultados />
        <Marketing />
        <Contacto />
      </main>
      <Footer />
      <WaFab />
    </>
  )
}
