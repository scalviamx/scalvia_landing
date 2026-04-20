'use client'

import { BlurFade } from '@/components/ui/BlurFade'
import { ShimmerButton } from '@/components/ui/ShimmerButton'

const PROBLEMAS = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
      </svg>
    ),
    title: 'Pierdes leads porque nadie responde a tiempo',
    desc: 'Los prospectos que llegan fuera de horario o en momentos de alta demanda se van sin respuesta — y se van con la competencia.',
    consecuencia: 'Cada lead perdido puede representar $5,000–50,000 MXN en ingresos no capturados.',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
      </svg>
    ),
    title: 'Tu equipo invierte horas en tareas que se repiten',
    desc: 'Facturas, seguimientos, reportes, correos — procesos repetitivos que consumen tiempo valioso de tu gente todos los días.',
    consecuencia: 'El equipo promedio pierde más de 20 horas semanales en tareas automatizables.',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
      </svg>
    ),
    title: 'Sin visibilidad de cuántos prospectos se van sin seguimiento',
    desc: 'No hay forma de saber cuántos leads llegaron, cuántos recibieron seguimiento y cuántos se fueron fríos por falta de atención.',
    consecuencia: 'El 80% de las ventas requieren 5+ seguimientos. La mayoría de empresas hacen 1 o 2.',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
        <circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
    title: 'Contratar nuevo personal toma semanas y sigue saliendo mal',
    desc: 'El proceso de reclutamiento consume semanas del equipo de RH y aún así los candidatos no siempre son los correctos.',
    consecuencia: 'Un proceso de contratación mal ejecutado cuesta entre $30,000–120,000 MXN por posición.',
  },
]

export function ProblemaContent() {
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
              El problema
            </div>
          </BlurFade>
          <BlurFade delay={0.2}>
            <h1 className="text-[clamp(2rem,5vw,3.25rem)] font-extrabold text-white leading-[1.1] tracking-tight mb-5">
              Por qué tu empresa pierde<br />
              <span className="text-growth">tiempo y dinero innecesariamente</span>
            </h1>
          </BlurFade>
          <BlurFade delay={0.35}>
            <p className="text-white/60 text-lg leading-relaxed max-w-[560px] mx-auto">
              Cuatro problemas que el 80% de las PyMEs mexicanas tienen hoy — y que la IA resuelve en semanas.
            </p>
          </BlurFade>
        </div>
      </section>

      {/* Stat */}
      <section className="py-12 bg-surface border-b border-border">
        <BlurFade delay={0.1}>
          <div className="max-w-[860px] mx-auto px-6 text-center">
            <p className="text-[clamp(3rem,8vw,5rem)] font-extrabold text-growth leading-none mb-2">60%</p>
            <p className="text-base text-ink-60 max-w-lg mx-auto leading-relaxed">
              de las PyMEs mexicanas pierde más de{' '}
              <strong className="text-ink font-bold">20 horas semanales</strong>{' '}
              en procesos que pueden automatizarse hoy con inteligencia artificial.
            </p>
          </div>
        </BlurFade>
      </section>

      {/* Problem cards */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-[1120px] mx-auto grid grid-cols-1 sm:grid-cols-2 gap-6">
          {PROBLEMAS.map((p, i) => (
            <BlurFade key={p.title} delay={0.1 + i * 0.1}>
              <div className="group bg-surface border border-border rounded-2xl p-7 flex flex-col gap-4 h-full hover:shadow-[0_8px_32px_rgba(0,0,0,0.06)] hover:-translate-y-0.5 transition-all duration-300">
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-lg bg-growth/10 flex items-center justify-center text-green flex-shrink-0 group-hover:bg-growth/15 transition-colors duration-200">
                    {p.icon}
                  </div>
                  <p className="font-bold text-[0.9375rem] text-ink leading-snug pt-1">{p.title}</p>
                </div>
                <p className="text-sm text-ink-60 leading-relaxed">{p.desc}</p>
                <div className="mt-auto pt-4 border-t border-border">
                  <p className="text-xs font-semibold text-green leading-relaxed">{p.consecuencia}</p>
                </div>
              </div>
            </BlurFade>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 bg-forest">
        <BlurFade delay={0.1}>
          <div className="max-w-[640px] mx-auto text-center flex flex-col items-center gap-6">
            <h2 className="text-[clamp(1.75rem,4vw,2.5rem)] font-extrabold text-white leading-tight tracking-tight">
              ¿Cuál de estos problemas<br />tiene tu empresa hoy?
            </h2>
            <p className="text-white/60 text-lg leading-relaxed">
              En 30 minutos identificamos exactamente qué automatizar primero y te damos un plan concreto.
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
