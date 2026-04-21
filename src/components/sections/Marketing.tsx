import { BlurFade } from '@/components/ui/BlurFade'
import { MagicCard } from '@/components/ui/MagicCard'
import { SectionTextCta } from '@/components/ui/SectionTextCta'

const SERVICIOS = [
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
      </svg>
    ),
    name: 'Presencia en Google Maps',
    desc: 'Google Business Profile + reseñas orgánicas',
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="2" y="4" width="20" height="14" rx="2"/><path d="M8 21h8M12 18v3"/>
      </svg>
    ),
    name: 'Sitio web profesional',
    desc: 'Landing page o sitio 3–5 páginas, SEO, responsive',
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/>
        <rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>
      </svg>
    ),
    name: 'Redes sociales',
    desc: '8–12 posts/mes, diseño y copywriting en español',
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z"/>
      </svg>
    ),
    name: 'Publicidad pagada',
    desc: 'Google Ads y Meta Ads orientados a resultados',
  },
]

export function Marketing() {
  return (
    <section id="marketing" className="py-24 bg-white" aria-labelledby="marketing-title">
      <div className="w-full max-w-[1120px] mx-auto px-6">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

          <div className="flex flex-col">
            <BlurFade className="flex flex-col gap-5">
              <p className="text-xs font-bold tracking-widest uppercase text-growth">
                Servicios complementarios
              </p>
              <h2 id="marketing-title" className="text-[clamp(1.75rem,4vw,2.5rem)] font-extrabold tracking-tight leading-tight text-ink">
                También cubrimos tu presencia digital completa
              </h2>
              <p className="text-base text-ink-60 leading-relaxed">
                Integramos tu marketing digital con tus agentes de IA para un ecosistema que trabaja solo.
              </p>
            </BlurFade>
            <SectionTextCta
              href="/marketing"
              label="Ver todos los servicios →"
              theme="light"
              className="text-left mt-2"
            />
          </div>

          <BlurFade delay={0.2} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {SERVICIOS.map((s) => (
              <MagicCard
                key={s.name}
                className="group bg-surface border border-border p-5 flex flex-col gap-3 h-full"
              >
                <div className="w-9 h-9 rounded-lg bg-growth/8 flex items-center justify-center text-green group-hover:bg-growth/12 transition-colors duration-200">
                  {s.icon}
                </div>
                <div>
                  <p className="text-sm font-bold text-ink mb-0.5">{s.name}</p>
                  <p className="text-xs text-ink-60 leading-relaxed">{s.desc}</p>
                </div>
              </MagicCard>
            ))}
          </BlurFade>

        </div>
      </div>
    </section>
  )
}
