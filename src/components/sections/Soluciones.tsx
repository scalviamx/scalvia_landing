import { BlurFade } from '@/components/ui/BlurFade'
import { MagicCard } from '@/components/ui/MagicCard'

const PILARES = [
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
      </svg>
    ),
    name: 'Atención a clientes IA',
    price: '$8k–18k setup + $1,500/mes',
    desc: 'Agente de IA que responde, califica y agenda 24/7 sin contratar más personas. Integrado en WhatsApp, web y correo.',
    results: [
      'Respuesta en menos de 1 minuto en cualquier canal',
      'Calificación automática de leads antes de llegar al equipo',
      'Reducción de carga operativa en atención al cliente',
    ],
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
      </svg>
    ),
    name: 'Agente de ventas IA',
    price: '$12k–25k setup + $2,000/mes',
    desc: 'Seguimiento automático de leads, envío de propuestas y cierre asistido. Integrado con CRM, WhatsApp y correo.',
    results: [
      'Seguimiento automático a las 24, 48 y 72 hrs post-contacto',
      'Calificación y scoring de leads sin intervención humana',
      'Propuestas enviadas automáticamente según perfil del prospecto',
    ],
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
        <circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
    name: 'Reclutamiento IA',
    price: '$10k–22k setup + $1,800/mes',
    desc: 'Filtra CVs, realiza entrevistas iniciales automatizadas y entrega un ranking de candidatos listos para segunda ronda.',
    results: [
      'Ciclo de contratación de semanas a días',
      'Ranking automático con score de compatibilidad',
      'Entrevistas iniciales 24/7 sin costo de hora-hombre',
    ],
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
        <rect x="3" y="14" width="7" height="7"/><path d="M14 17.5h7M17.5 14v7"/>
      </svg>
    ),
    name: 'Automatización de operaciones',
    price: '$5k–20k setup + $800–1,500/mes',
    desc: 'Facturas, reportes, correos, WhatsApp, documentos — todo fluye automáticamente sin intervención manual.',
    results: [
      'Emisión automática de CFDI al cerrar una venta',
      'Reportes ejecutivos generados y enviados sin intervención',
      'Flujos de WhatsApp y correo automatizados end-to-end',
    ],
  },
]

export function Soluciones() {
  return (
    <section id="soluciones" className="py-24 bg-surface" aria-labelledby="soluciones-title">
      <div className="w-full max-w-[1120px] mx-auto px-6">

        <BlurFade className="text-center max-w-xl mx-auto mb-14">
          <p className="text-xs font-bold tracking-widest uppercase text-growth mb-3">
            Soluciones de IA
          </p>
          <h2 id="soluciones-title" className="text-[clamp(1.75rem,4vw,2.5rem)] font-extrabold tracking-tight leading-tight text-ink mb-4">
            Soluciones de IA diseñadas para el negocio real
          </h2>
          <p className="text-base text-ink-60">
            Cuatro pilares que eliminan cuellos de botella, reducen costos operativos y escalan sin contratar.
          </p>
        </BlurFade>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {PILARES.map((pilar, i) => (
            <BlurFade key={pilar.name} delay={0.1 * (i + 1)}>
              <MagicCard className="bg-white border border-border h-full">
                <a
                  href="#contacto"
                  className="flex flex-col gap-5 p-9 h-full group cursor-pointer"
                  aria-label={`Ver solución: ${pilar.name}`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="w-13 h-13 rounded-xl bg-growth/10 flex items-center justify-center text-green flex-shrink-0 group-hover:bg-growth/15 transition-colors duration-200">
                      {pilar.icon}
                    </div>
                    <span className="text-xs font-bold text-green bg-growth/8 border border-growth/20 px-2.5 py-1 rounded-full whitespace-nowrap">
                      {pilar.price}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-xl font-extrabold text-ink tracking-tight leading-snug mb-2">
                      {pilar.name}
                    </h3>
                    <p className="text-[0.9375rem] text-ink-60 leading-relaxed">{pilar.desc}</p>
                  </div>

                  <ul className="flex flex-col gap-2 list-none">
                    {pilar.results.map((r) => (
                      <li key={r} className="flex items-start gap-2.5 text-sm text-ink-60">
                        <span className="w-1.5 h-1.5 rounded-full bg-growth flex-shrink-0 mt-1.5" />
                        {r}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-auto flex items-center gap-1.5 text-sm font-bold text-green group-hover:gap-3 transition-all duration-200">
                    Agendar diagnóstico
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
                      <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                  </div>
                </a>
              </MagicCard>
            </BlurFade>
          ))}
        </div>

      </div>
    </section>
  )
}
