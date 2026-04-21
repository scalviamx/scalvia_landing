'use client'

import { BlurFade } from '@/components/ui/BlurFade'
import { MagicCard } from '@/components/ui/MagicCard'
import { ShimmerButton } from '@/components/ui/ShimmerButton'

const PILARES = [
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" aria-hidden="true">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
    title: 'Atención a clientes IA',
    desc: 'Agente que responde, califica y agenda 24/7 sin contratar más personas. Integrado en WhatsApp, web y correo.',
    results: [
      'Respuesta en menos de 1 minuto en cualquier canal',
      'Calificación automática de leads antes de llegar al equipo',
      'Reducción de carga operativa en atención al cliente',
    ],
    beneficio: 'Disponibilidad 24/7 sin incrementar nómina',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" aria-hidden="true">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
      </svg>
    ),
    title: 'Agente de ventas IA',
    desc: 'Seguimiento automático de leads, envío de propuestas y cierre asistido. Integrado con CRM, WhatsApp y correo.',
    results: [
      'Seguimiento automático a las 24, 48 y 72 hrs post-contacto',
      'Calificación y scoring de leads sin intervención humana',
      'Propuestas enviadas automáticamente según perfil del prospecto',
    ],
    beneficio: 'Pipeline activo sin depender de SDRs',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" aria-hidden="true">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    title: 'Reclutamiento IA',
    desc: 'Filtra CVs, realiza entrevistas iniciales automatizadas y entrega ranking de candidatos en 5 días.',
    results: [
      'Ciclo de contratación de semanas a días',
      'Ranking automático con score de compatibilidad',
      'Entrevistas iniciales 24/7 sin costo de hora-hombre',
    ],
    beneficio: 'Ciclo de contratación 3× más rápido',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" aria-hidden="true">
        <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" />
        <rect x="3" y="14" width="7" height="7" /><path d="M14 17.5h7M17.5 14v7" />
      </svg>
    ),
    title: 'Automatización de operaciones',
    desc: 'Facturas, reportes, correos, WhatsApp, documentos, todo fluye automáticamente sin intervención manual.',
    results: [
      'Emisión automática de CFDI al cerrar una venta',
      'Reportes ejecutivos generados y enviados sin intervención',
      'Flujos de WhatsApp y correo automatizados end-to-end',
    ],
    beneficio: 'Más de 20 horas/semana liberadas por área',
  },
]

export function SolucionesContent() {
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
              Soluciones de IA
            </div>
          </BlurFade>
          <BlurFade delay={0.2}>
            <h1 className="text-[clamp(2rem,5vw,3.25rem)] font-extrabold text-white leading-[1.1] tracking-tight mb-5">
              Cuatro pilares para escalar<br />
              <span className="text-growth">sin contratar más personas</span>
            </h1>
          </BlurFade>
          <BlurFade delay={0.35}>
            <p className="text-white/60 text-lg leading-relaxed max-w-[560px] mx-auto">
              Agentes de IA que eliminan cuellos de botella, reducen costos operativos y se implementan en 2 a 4 semanas.
            </p>
          </BlurFade>
        </div>
      </section>

      {/* Cards */}
      <section className="py-20 px-6 bg-surface">
        <div className="max-w-[1120px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {PILARES.map((pilar, i) => (
              <BlurFade key={pilar.title} delay={0.1 + i * 0.1}>
                <MagicCard className="border border-border bg-white p-8 h-full flex flex-col gap-5">
                  <div className="w-12 h-12 rounded-xl bg-growth/10 text-green flex items-center justify-center flex-shrink-0">
                    {pilar.icon}
                  </div>
                  <div className="flex flex-col gap-2 flex-1">
                    <h3 className="text-xl font-bold text-ink">{pilar.title}</h3>
                    <p className="text-ink-60 leading-relaxed">{pilar.desc}</p>
                  </div>
                  <ul className="flex flex-col gap-2 list-none">
                    {pilar.results.map((r) => (
                      <li key={r} className="flex items-start gap-2.5 text-sm text-ink-60">
                        <span className="w-1.5 h-1.5 rounded-full bg-growth flex-shrink-0 mt-1.5" />
                        {r}
                      </li>
                    ))}
                  </ul>
                  <div className="flex items-center gap-2 pt-3 border-t border-border">
                    <span className="w-2 h-2 rounded-full bg-growth flex-shrink-0" />
                    <span className="text-sm font-semibold text-growth">{pilar.beneficio}</span>
                  </div>
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
              ¿Cuál pilar necesita tu empresa primero?
            </h2>
            <p className="text-white/60 text-lg leading-relaxed">
              En 30 minutos te decimos exactamente qué automatizar y cuánto tiempo recuperas.
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
