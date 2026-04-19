import { BlurFade } from '@/components/ui/BlurFade'

const CARDS = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
      </svg>
    ),
    title: 'Pierdes leads porque nadie responde a tiempo',
    desc: 'Los prospectos que llegan fuera de horario o en momentos de alta demanda se van sin respuesta — y se van con la competencia.',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
      </svg>
    ),
    title: 'Tu equipo invierte horas en tareas que se repiten',
    desc: 'Facturas, seguimientos, reportes, correos — procesos repetitivos que consumen tiempo valioso de tu gente todos los días.',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
      </svg>
    ),
    title: 'Sin visibilidad de cuántos prospectos se van sin seguimiento',
    desc: 'No hay forma de saber cuántos leads llegaron, cuántos recibieron seguimiento y cuántos se fueron fríos por falta de atención.',
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

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-12">
          {CARDS.map((card, i) => (
            <BlurFade key={card.title} delay={0.1 * (i + 1)}>
              <div className="group bg-surface border border-border rounded-2xl p-7 flex gap-4 items-start hover:shadow-[0_8px_32px_rgba(0,0,0,0.06)] hover:-translate-y-0.5 transition-all duration-300">
                <div className="w-11 h-11 rounded-lg bg-growth/10 flex items-center justify-center text-green flex-shrink-0 group-hover:bg-growth/15 transition-colors duration-200">
                  {card.icon}
                </div>
                <div>
                  <p className="font-bold text-[0.9375rem] text-ink leading-snug mb-1.5">
                    {card.title}
                  </p>
                  <p className="text-sm text-ink-60 leading-relaxed">{card.desc}</p>
                </div>
              </div>
            </BlurFade>
          ))}
        </div>

        <BlurFade delay={0.5}>
          <div className="bg-forest rounded-2xl px-8 py-8 text-center">
            <p className="text-[clamp(2rem,5vw,3rem)] font-extrabold text-growth mb-2">60%</p>
            <p className="text-base text-white/70 max-w-lg mx-auto leading-relaxed">
              de las PyMEs mexicanas pierde más de{' '}
              <strong className="text-white font-bold">20 horas semanales</strong>{' '}
              en procesos que pueden automatizarse hoy con inteligencia artificial.
            </p>
          </div>
        </BlurFade>

      </div>
    </section>
  )
}
