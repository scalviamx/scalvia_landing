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
    desc: 'Responde, califica y agenda 24/7 sin contratar más personas.',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
      </svg>
    ),
    name: 'Agente de ventas IA',
    desc: 'Seguimiento automático de leads y cierre asistido sin intervención manual.',
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
    desc: 'Filtra candidatos, coordina entrevistas y entrega shortlist en 5 días.',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
        <rect x="3" y="14" width="7" height="7"/><path d="M14 17.5h7M17.5 14v7"/>
      </svg>
    ),
    name: 'Automatización de operaciones',
    desc: 'Facturas, reportes, correos y documentos — todo fluye sin intervención.',
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
            Cuatro pilares para escalar sin contratar
          </h2>
          <p className="text-base text-ink-60">
            Agentes de IA que eliminan cuellos de botella y reducen costos operativos.
          </p>
        </BlurFade>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-10">
          {PILARES.map((pilar, i) => (
            <BlurFade key={pilar.name} delay={0.1 * (i + 1)}>
              <MagicCard className="bg-white border border-border h-full hover:border-growth/30 hover:bg-growth/5 transition-all duration-300">
                <a
                  href="/soluciones"
                  className="flex flex-col gap-5 p-8 h-full group cursor-pointer"
                  aria-label={`Ver solución: ${pilar.name}`}
                >
                  <div className="w-12 h-12 rounded-xl bg-growth/10 flex items-center justify-center text-green flex-shrink-0 group-hover:bg-growth/15 transition-colors duration-200">
                    {pilar.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-extrabold text-ink tracking-tight leading-snug mb-2">
                      {pilar.name}
                    </h3>
                    <p className="text-[0.9375rem] text-ink-60 leading-relaxed">{pilar.desc}</p>
                  </div>
                  <div className="mt-auto flex items-center gap-1.5 text-sm font-bold text-green group-hover:gap-3 transition-all duration-200">
                    Ver solución completa
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
                      <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                  </div>
                </a>
              </MagicCard>
            </BlurFade>
          ))}
        </div>

        <BlurFade delay={0.5} className="text-center">
          <a
            href="/soluciones"
            className="inline-flex items-center gap-2 text-sm font-bold text-green hover:text-growth transition-colors duration-200"
          >
            Ver todas las soluciones con detalle completo →
          </a>
        </BlurFade>

      </div>
    </section>
  )
}
