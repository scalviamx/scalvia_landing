'use client'

import { BlurFade } from '@/components/ui/BlurFade'
import { MagicCard } from '@/components/ui/MagicCard'
import { ShimmerButton } from '@/components/ui/ShimmerButton'

const SERVICIOS = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
      </svg>
    ),
    name: 'Presencia en Google Maps',
    desc: 'Google Business Profile optimizado, estrategia de reseñas orgánicas y posicionamiento local en Monterrey y ZMM.',
    incluye: [
      'Configuración completa de Google Business Profile',
      'Estrategia de reseñas orgánicas',
      'Optimización de categorías y atributos',
      'Respuesta a reseñas mensual',
    ],
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="2" y="4" width="20" height="14" rx="2"/><path d="M8 21h8M12 18v3"/>
      </svg>
    ),
    name: 'Sitio web profesional',
    desc: 'Landing page o sitio de 3–5 páginas, diseño responsive, SEO básico y velocidad optimizada.',
    incluye: [
      'Diseño responsive (mobile-first)',
      'SEO técnico básico',
      'Integración con WhatsApp y formularios',
      'Mantenimiento y hosting mensual',
    ],
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/>
        <rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>
      </svg>
    ),
    name: 'Gestión de redes sociales',
    desc: '8–12 posts al mes, diseño y copywriting en español, orientado a generar confianza y leads en tu mercado local.',
    incluye: [
      '8–12 publicaciones por mes',
      'Diseño gráfico + copywriting en español',
      'Calendario editorial mensual',
      'Reporte de métricas mensual',
    ],
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z"/>
      </svg>
    ),
    name: 'Publicidad pagada',
    desc: 'Google Ads y Meta Ads orientados a resultados medibles. El presupuesto de pauta siempre lo maneja el cliente directamente.',
    incluye: [
      'Configuración de campañas Google / Meta',
      'Segmentación por zona y audiencia',
      'A/B testing de creativos y copys',
      'Reporte quincenal de rendimiento',
    ],
  },
]

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

      {/* Cards */}
      <section className="py-20 px-6 bg-surface">
        <div className="max-w-[1120px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {SERVICIOS.map((s, i) => (
              <BlurFade key={s.name} delay={0.1 + i * 0.1}>
                <MagicCard className="border border-border bg-white p-8 h-full flex flex-col gap-5">
                  <div className="w-12 h-12 rounded-xl bg-growth/10 text-green flex items-center justify-center flex-shrink-0">
                    {s.icon}
                  </div>
                  <div className="flex flex-col gap-2 flex-1">
                    <h3 className="text-xl font-bold text-ink">{s.name}</h3>
                    <p className="text-ink-60 leading-relaxed">{s.desc}</p>
                  </div>
                  <ul className="flex flex-col gap-2 list-none">
                    {s.incluye.map((item) => (
                      <li key={item} className="flex items-start gap-2.5 text-sm text-ink-60">
                        <span className="w-1.5 h-1.5 rounded-full bg-growth flex-shrink-0 mt-1.5" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </MagicCard>
              </BlurFade>
            ))}
          </div>
        </div>
      </section>

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
            <ShimmerButton as="a" href="/#contacto" className="rounded-xl">
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
