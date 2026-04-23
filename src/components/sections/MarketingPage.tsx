'use client'

import { BlurFade } from '@/components/ui/BlurFade'
import { ShimmerButton } from '@/components/ui/ShimmerButton'
import { ComplementaryServicesSection } from '@/components/sections/ComplementaryServicesSection'

export function MarketingContent() {
  return (
    <main className="bg-white">
      {/* Header */}
      <section className="bg-forest pt-32 pb-20 relative overflow-hidden">
        <div
          className="pointer-events-none absolute inset-0"
          style={{ background: 'radial-gradient(ellipse 60% 80% at 50% 0%, rgba(61,187,122,0.08) 0%, transparent 70%)' }}
          aria-hidden="true"
        />
        <div className="relative z-10 max-w-[860px] mx-auto px-6 text-center">
          <BlurFade delay={0.1}>
            <div className="inline-flex items-center gap-2 text-[0.6875rem] font-bold tracking-[0.1em] uppercase text-growth bg-growth/10 border border-growth/20 px-3.5 py-1.5 rounded-full mb-6">
              <span className="w-1.5 h-1.5 bg-growth rounded-full animate-pulse-dot" />
              Marketing digital
            </div>
          </BlurFade>
          <BlurFade delay={0.2}>
            <h1 className="text-[clamp(2rem,5vw,3.25rem)] font-extrabold text-white leading-[1.1] tracking-tight mb-5">
              Presencia digital completa<br />
              <span className="text-growth">integrada con tus agentes IA</span>
            </h1>
          </BlurFade>
          <BlurFade delay={0.35}>
            <p className="text-white/60 text-lg leading-relaxed max-w-[560px] mx-auto">
              Complementamos tus automatizaciones de IA con una estrategia digital que atrae los clientes correctos.
            </p>
          </BlurFade>
        </div>
      </section>

      <ComplementaryServicesSection
        background="surface"
        layout="cards-only"
        variant="detailed"
        showCta={false}
        className="py-20"
      />

      {/* CTA */}
      <section className="py-20 px-6 bg-forest">
        <BlurFade delay={0.1}>
          <div className="max-w-[640px] mx-auto text-center flex flex-col items-center gap-6">
            <h2 className="text-[clamp(1.75rem,4vw,2.5rem)] font-extrabold text-white leading-tight tracking-tight">
              Construye un ecosistema digital completo
            </h2>
            <p className="text-white/60 text-lg leading-relaxed">
              IA para operar + marketing para crecer. Agenda un diagnóstico y diseñamos el plan combinado.
            </p>
            <ShimmerButton as="a" href="/contacto" className="rounded-xl">
              Agendar diagnóstico gratuito
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </ShimmerButton>
          </div>
        </BlurFade>
      </section>
    </main>
  )
}
