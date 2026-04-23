'use client'

import clsx from 'clsx'
import { BlurFade } from '@/components/ui/BlurFade'
import { MagicCard } from '@/components/ui/MagicCard'
import { SectionTextCta } from '@/components/ui/SectionTextCta'

type Service = {
  icon: React.ReactNode
  name: string
  compactDesc: string
  detailedDesc: string
  includes: string[]
}

const SERVICES: Service[] = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
      </svg>
    ),
    name: 'Presencia en Google Maps',
    compactDesc: 'Google Business Profile + reseñas orgánicas',
    detailedDesc:
      'Google Business Profile optimizado, estrategia de reseñas orgánicas y posicionamiento local en Monterrey y ZMM.',
    includes: [
      'Configuración completa de Google Business Profile',
      'Estrategia de reseñas orgánicas',
      'Optimización de categorías y atributos',
      'Respuesta a reseñas mensual',
    ],
  },
  {
    icon: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <rect x="2" y="4" width="20" height="14" rx="2" />
        <path d="M8 21h8M12 18v3" />
      </svg>
    ),
    name: 'Sitio web profesional',
    compactDesc: 'Landing page o sitio 3–5 páginas, SEO, responsive',
    detailedDesc:
      'Landing page o sitio de 3–5 páginas, diseño responsive, SEO básico y velocidad optimizada.',
    includes: [
      'Diseño responsive (mobile-first)',
      'SEO técnico básico',
      'Integración con WhatsApp y formularios',
      'Mantenimiento y hosting mensual',
    ],
  },
  {
    icon: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <rect x="3" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="3" width="7" height="7" rx="1" />
        <rect x="3" y="14" width="7" height="7" rx="1" />
        <rect x="14" y="14" width="7" height="7" rx="1" />
      </svg>
    ),
    name: 'Redes sociales',
    compactDesc: '8–12 posts/mes, diseño y copywriting en español',
    detailedDesc:
      '8–12 posts al mes, diseño y copywriting en español, orientado a generar confianza y leads en tu mercado local.',
    includes: [
      '8–12 publicaciones por mes',
      'Diseño gráfico + copywriting en español',
      'Calendario editorial mensual',
      'Reporte de métricas mensual',
    ],
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z" />
      </svg>
    ),
    name: 'Publicidad pagada',
    compactDesc: 'Google Ads y Meta Ads orientados a resultados',
    detailedDesc:
      'Google Ads y Meta Ads orientados a resultados medibles. El presupuesto de pauta siempre lo maneja el cliente directamente.',
    includes: [
      'Configuración de campañas Google / Meta',
      'Segmentación por zona y audiencia',
      'A/B testing de creativos y copys',
      'Reporte quincenal de rendimiento',
    ],
  },
]

type ComplementaryServicesSectionProps = {
  id?: string
  background?: 'white' | 'surface'
  layout?: 'split' | 'cards-only'
  variant?: 'compact' | 'detailed'
  showCta?: boolean
  className?: string
}

export function ComplementaryServicesSection({
  id,
  background = 'white',
  layout = 'split',
  variant = 'compact',
  showCta = true,
  className,
}: ComplementaryServicesSectionProps) {
  const titleId = id ? `${id}-title` : 'complementary-services-title'

  const cardsGridClass =
    variant === 'compact' ? 'grid grid-cols-1 sm:grid-cols-2 gap-4' : 'grid grid-cols-1 md:grid-cols-2 gap-6'

  const renderCard = (service: Service) => {
    if (variant === 'compact') {
      return (
        <MagicCard
          key={service.name}
          className="group bg-surface border border-border p-5 flex flex-col gap-3 h-full"
        >
          <div className="w-9 h-9 rounded-lg bg-growth/8 flex items-center justify-center text-green group-hover:bg-growth/12 transition-colors duration-200">
            {service.icon}
          </div>
          <div>
            <p className="text-sm font-bold text-ink mb-0.5">{service.name}</p>
            <p className="text-xs text-ink-60 leading-relaxed">{service.compactDesc}</p>
          </div>
        </MagicCard>
      )
    }

    return (
      <MagicCard key={service.name} className="border border-border bg-white p-8 h-full flex flex-col gap-5">
        <div className="w-12 h-12 rounded-xl bg-growth/10 text-green flex items-center justify-center flex-shrink-0">
          {service.icon}
        </div>
        <div className="flex flex-col gap-2 flex-1">
          <h3 className="text-xl font-bold text-ink">{service.name}</h3>
          <p className="text-ink-60 leading-relaxed">{service.detailedDesc}</p>
        </div>
        <ul className="flex flex-col gap-2 list-none">
          {service.includes.map((item) => (
            <li key={item} className="flex items-start gap-2.5 text-sm text-ink-60">
              <span className="w-1.5 h-1.5 rounded-full bg-growth flex-shrink-0 mt-1.5" />
              {item}
            </li>
          ))}
        </ul>
      </MagicCard>
    )
  }

  return (
    <section
      id={id}
      className={clsx(
        'px-6 py-24',
        background === 'surface' ? 'bg-surface' : 'bg-white',
        className
      )}
      aria-labelledby={layout === 'split' ? titleId : undefined}
    >
      <div className="w-full max-w-[1120px] mx-auto">
        {layout === 'split' ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <div className="flex flex-col">
              <BlurFade className="flex flex-col gap-5">
                <p className="text-xs font-bold tracking-widest uppercase text-growth">
                  Servicios complementarios
                </p>
                <h2
                  id={titleId}
                  className="text-[clamp(1.75rem,4vw,2.5rem)] font-extrabold tracking-tight leading-tight text-ink"
                >
                  También cubrimos tu presencia digital completa
                </h2>
                <p className="text-base text-ink-60 leading-relaxed">
                  Integramos tu marketing digital con tus agentes de IA para un ecosistema que trabaja solo.
                </p>
              </BlurFade>
              {showCta && (
                <SectionTextCta
                  href="/marketing"
                  label="Ver todos los servicios →"
                  theme="light"
                  className="text-left mt-2"
                />
              )}
            </div>

            <BlurFade delay={0.2} className={cardsGridClass}>
              {SERVICES.map(renderCard)}
            </BlurFade>
          </div>
        ) : (
          <BlurFade className={cardsGridClass}>{SERVICES.map(renderCard)}</BlurFade>
        )}
      </div>
    </section>
  )
}
