import { BlurFade } from '@/components/ui/BlurFade'
import { MagicCard } from '@/components/ui/MagicCard'
import { SectionTextCta } from '@/components/ui/SectionTextCta'

const CARDS = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
      </svg>
    ),
    title: 'Pierdes leads porque nadie responde a tiempo',
    desc: 'Los prospectos fuera de horario se van sin respuesta, y se van con la competencia.',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
      </svg>
    ),
    title: 'Tu equipo invierte horas en tareas que se repiten',
    desc: 'Facturas, seguimientos, reportes, procesos que consumen tiempo valioso todos los días.',
  },
]

export function Problema() {
  return (
    <section id="problema" className="py-24 bg-white" aria-labelledby="problema-title">
      <div className="w-full max-w-[1120px] mx-auto px-6">

        <BlurFade className="text-center max-w-xl mx-auto mb-14">
          <p className="text-xs font-bold tracking-widest uppercase text-growth mb-3">
            El problema
          </p>
          <h2 id="problema-title" className="text-[clamp(1.75rem,4vw,2.5rem)] font-extrabold tracking-tight leading-tight text-ink">
            ¿Te suena familiar alguno de estos problemas?
          </h2>
        </BlurFade>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-10">
          {CARDS.map((card, i) => (
            <BlurFade key={card.title} delay={0.1 * (i + 1)}>
              <MagicCard className="group bg-surface border border-border p-7 flex gap-4 items-start h-full">
                <div className="w-11 h-11 rounded-lg bg-growth/10 flex items-center justify-center text-green flex-shrink-0 group-hover:bg-growth/15 transition-colors duration-200">
                  {card.icon}
                </div>
                <div>
                  <p className="font-bold text-[0.9375rem] text-ink leading-snug mb-1.5">
                    {card.title}
                  </p>
                  <p className="text-sm text-ink-60 leading-relaxed">{card.desc}</p>
                </div>
              </MagicCard>
            </BlurFade>
          ))}
        </div>

        <SectionTextCta
          href="/problema"
          label="Ver el diagnóstico completo →"
          theme="light"
          className="text-center"
        />

      </div>
    </section>
  )
}
