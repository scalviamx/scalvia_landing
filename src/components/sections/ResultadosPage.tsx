'use client'

import { motion } from 'framer-motion'
import { BlurFade } from '@/components/ui/BlurFade'
import { MagicCard } from '@/components/ui/MagicCard'

const METRICAS = [
  {
    value: '<1 min',
    label: 'Tiempo de respuesta al cliente',
    description: 'Tus clientes reciben respuesta inmediata, 24/7, sin depender de disponibilidad humana.',
  },
  {
    value: '40%',
    label: 'Más cierres en 60 días',
    description: 'El agente de ventas califica prospectos, da seguimiento y agenda reuniones de forma autónoma.',
  },
  {
    value: '5 días',
    label: 'Ciclo de contratación',
    description: 'El agente de reclutamiento filtra CVs, coordina entrevistas y entrega shortlist en días, no semanas.',
  },
  {
    value: '2–4 sem',
    label: 'De diagnóstico a producción',
    description: 'Nuestro proceso estructurado lleva cada agente de IA a producción en menos de un mes.',
  },
]

const PILARES = [
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" aria-hidden="true">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
    title: 'Atención a clientes IA',
    description: 'Agente que responde preguntas frecuentes, gestiona pedidos y escala casos complejos a un humano.',
    beneficio: 'Disponibilidad 24/7 sin incrementar nómina',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" aria-hidden="true">
        <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
        <polyline points="16 7 22 7 22 13" />
      </svg>
    ),
    title: 'Agente de ventas IA',
    description: 'Califica prospectos automáticamente, hace seguimiento por WhatsApp/email y agenda demos sin intervención manual.',
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
    description: 'Filtra cientos de CVs, aplica evaluaciones iniciales, coordina entrevistas y entrega shortlist en 5 días.',
    beneficio: 'Ciclo de contratación 3× más rápido',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" aria-hidden="true">
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <path d="M8 21h8M12 17v4" />
        <path d="M7 8h4M7 11h2" />
        <path d="M15 8l1.5 1.5L19 7" />
      </svg>
    ),
    title: 'Automatización de operaciones',
    description: 'Flujos inteligentes que eliminan tareas repetitivas: reportes, notificaciones, sincronización de datos y aprobaciones.',
    beneficio: 'Más de 20 horas/semana liberadas por área',
  },
]

export function ResultadosContent() {
  return (
    <main className="bg-white">
      {/* Hero de página */}
      <section className="bg-forest pt-32 pb-20 relative overflow-hidden">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse 60% 80% at 50% 0%, rgba(61,187,122,0.08) 0%, transparent 70%)',
          }}
          aria-hidden="true"
        />
        <div className="relative z-10 max-w-[860px] mx-auto px-6 text-center">
          <BlurFade delay={0.1}>
            <div className="inline-flex items-center gap-2 text-[0.6875rem] font-bold tracking-[0.1em] uppercase text-growth bg-growth/10 border border-growth/20 px-3.5 py-1.5 rounded-full mb-6">
              <span className="w-1.5 h-1.5 bg-growth rounded-full animate-pulse-dot" />
              Resultados reales
            </div>
          </BlurFade>
          <BlurFade delay={0.2}>
            <h1 className="text-[clamp(2rem,5vw,3.25rem)] font-extrabold text-white leading-[1.1] tracking-tight mb-5">
              Qué logran nuestros clientes<br />
              <span className="text-growth">en los primeros 60 días</span>
            </h1>
          </BlurFade>
          <BlurFade delay={0.35}>
            <p className="text-white/60 text-lg leading-relaxed max-w-[560px] mx-auto">
              Métricas documentadas de implementaciones reales de agentes IA en empresas de Monterrey.
            </p>
          </BlurFade>
        </div>
      </section>

      {/* Métricas */}
      <section className="py-20 px-6 bg-surface">
        <div className="max-w-[1120px] mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {METRICAS.map((m, i) => (
              <BlurFade key={m.value} delay={0.1 + i * 0.1}>
                <MagicCard className="bg-white border border-border p-6 flex flex-col gap-3 h-full">
                  <span className="text-[2.5rem] font-extrabold text-growth leading-none tracking-tight">
                    {m.value}
                  </span>
                  <p className="text-sm font-bold text-ink leading-snug">{m.label}</p>
                  <p className="text-sm text-ink-60 leading-relaxed flex-1">{m.description}</p>
                </MagicCard>
              </BlurFade>
            ))}
          </div>
        </div>
      </section>

      {/* Los 4 Pilares */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-[1120px] mx-auto">
          <BlurFade delay={0.1}>
            <div className="text-center mb-14">
              <p className="text-[0.75rem] font-bold tracking-[0.12em] uppercase text-growth mb-3">Los 4 pilares</p>
              <h2 className="text-[clamp(1.75rem,4vw,2.75rem)] font-extrabold text-ink leading-tight tracking-tight">
                Qué automatizamos
              </h2>
            </div>
          </BlurFade>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {PILARES.map((pilar, i) => (
              <BlurFade key={pilar.title} delay={0.15 + i * 0.1}>
                <MagicCard className="border border-border bg-white p-8 h-full flex flex-col gap-5">
                  <div className="w-12 h-12 rounded-xl bg-growth/10 text-growth flex items-center justify-center flex-shrink-0">
                    {pilar.icon}
                  </div>
                  <div className="flex flex-col gap-2 flex-1">
                    <h3 className="text-xl font-bold text-ink">{pilar.title}</h3>
                    <p className="text-ink-60 leading-relaxed">{pilar.description}</p>
                  </div>
                  <div className="flex items-center gap-2 pt-2 border-t border-border">
                    <motion.span
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.2 + i * 0.1, duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      className="w-2 h-2 rounded-full bg-growth flex-shrink-0"
                    />
                    <span className="text-sm font-semibold text-growth">{pilar.beneficio}</span>
                  </div>
                </MagicCard>
              </BlurFade>
            ))}
          </div>
        </div>
      </section>

      {/* CTA final */}
      <section className="py-20 px-6 bg-forest">
        <BlurFade delay={0.1}>
          <div className="max-w-[640px] mx-auto text-center flex flex-col items-center gap-6">
            <h2 className="text-[clamp(1.75rem,4vw,2.5rem)] font-extrabold text-white leading-tight tracking-tight">
              ¿Listo para ver estos resultados<br />en tu empresa?
            </h2>
            <p className="text-white/60 text-lg leading-relaxed">
              Agenda un diagnóstico gratuito de 30 minutos y te mostramos exactamente qué automatizar primero.
            </p>
            <a
              href="/#contacto"
              className="inline-flex items-center gap-2 text-[0.9375rem] font-bold text-ink bg-growth px-7 py-4 rounded-xl hover:bg-[#2ea865] transition-all duration-200 hover:-translate-y-px"
            >
              Agendar diagnóstico gratuito
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
          </div>
        </BlurFade>
      </section>
    </main>
  )
}
