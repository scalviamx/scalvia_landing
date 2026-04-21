'use client'

import { BlurFade } from '@/components/ui/BlurFade'
import { MagicCard } from '@/components/ui/MagicCard'
import { ShimmerButton } from '@/components/ui/ShimmerButton'

const STEPS = [
  {
    n: '01',
    title: 'Diagnóstico gratuito',
    desc: 'Analizamos tus procesos actuales e identificamos dónde tu empresa pierde más tiempo y dinero. Saldrás con un mapa claro de oportunidades de automatización.',
    duracion: '30 minutos · sin costo',
    entregable: 'Mapa de procesos + prioridades de automatización',
  },
  {
    n: '02',
    title: 'Propuesta a medida',
    desc: 'Diseñamos el agente o automatización específica para tu operación, industria y objetivos. No vendemos plantillas, cada solución es construida para tu caso.',
    duracion: '3–5 días hábiles',
    entregable: 'Propuesta técnica + cronograma + métricas de éxito',
  },
  {
    n: '03',
    title: 'Implementación',
    desc: 'Tu solución de IA entra en producción rápidamente, sin interrumpir tu operación actual. Hacemos pruebas en paralelo antes del lanzamiento oficial.',
    duracion: '2–4 semanas',
    entregable: 'Agente o automatización live + capacitación al equipo',
  },
  {
    n: '04',
    title: 'Soporte y escalamiento',
    desc: 'Monitoreamos, mejoramos y escalamos tu solución mes a mes según el crecimiento de tu empresa. Tienes acceso directo al equipo en todo momento.',
    duracion: 'Continuo · mensual',
    entregable: 'Reporte mensual de métricas + mejoras iterativas',
  },
]

export function ProcesoContent() {
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
              El proceso
            </div>
          </BlurFade>
          <BlurFade delay={0.2}>
            <h1 className="text-[clamp(2rem,5vw,3.25rem)] font-extrabold text-white leading-[1.1] tracking-tight mb-5">
              De diagnóstico a producción<br />
              <span className="text-growth">en 2 a 4 semanas</span>
            </h1>
          </BlurFade>
          <BlurFade delay={0.35}>
            <p className="text-white/60 text-lg leading-relaxed max-w-[560px] mx-auto">
              Un proceso estructurado que minimiza el riesgo y maximiza la velocidad de implementación.
            </p>
          </BlurFade>
        </div>
      </section>

      {/* Steps */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-[860px] mx-auto flex flex-col gap-6">
          {STEPS.map((step, i) => (
            <BlurFade key={step.n} delay={0.1 + i * 0.1}>
              <MagicCard className="group bg-surface border border-border p-8 flex gap-6 items-start">
                <div className="w-14 h-14 rounded-full bg-white border-2 border-growth flex items-center justify-center font-extrabold text-green text-lg flex-shrink-0 shadow-[0_0_0_6px_rgba(243,250,248,1)] group-hover:shadow-[0_0_0_6px_rgba(61,187,122,0.08)] transition-all duration-300">
                  {step.n}
                </div>
                <div className="flex flex-col gap-3 flex-1">
                  <div className="flex items-start justify-between gap-4 flex-wrap">
                    <h3 className="text-xl font-bold text-ink">{step.title}</h3>
                    <span className="text-xs font-bold text-green bg-growth/8 border border-growth/20 px-2.5 py-1 rounded-full whitespace-nowrap flex-shrink-0">
                      {step.duracion}
                    </span>
                  </div>
                  <p className="text-ink-60 leading-relaxed">{step.desc}</p>
                  <div className="flex items-center gap-2 pt-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-growth flex-shrink-0" />
                    <span className="text-sm font-semibold text-growth">Entregable: {step.entregable}</span>
                  </div>
                </div>
              </MagicCard>
            </BlurFade>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 bg-forest">
        <BlurFade delay={0.1}>
          <div className="max-w-[640px] mx-auto text-center flex flex-col items-center gap-6">
            <h2 className="text-[clamp(1.75rem,4vw,2.5rem)] font-extrabold text-white leading-tight tracking-tight">
              Empieza con el paso 1, es gratis
            </h2>
            <p className="text-white/60 text-lg leading-relaxed">
              30 minutos de diagnóstico y ya sabes exactamente qué automatizar y cuánto cuesta.
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
