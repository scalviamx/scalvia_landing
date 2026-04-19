'use client'

import { motion } from 'framer-motion'
import { BackgroundPaths } from '@/components/ui/BackgroundPaths'
import { AnimatedWords } from '@/components/ui/AnimatedWords'
import { ShimmerButton } from '@/components/ui/ShimmerButton'
import { BlurFade } from '@/components/ui/BlurFade'

const STATS = [
  { value: '<1 min', label: 'Tiempo de respuesta al cliente' },
  { value: '40%', label: 'Más cierres en 60 días' },
  { value: '5 días', label: 'Ciclo de contratación' },
  { value: '2–4 sem', label: 'De diagnóstico a producción' },
]

const PILARES = [
  'Atención a clientes IA',
  'Agente de ventas IA',
  'Reclutamiento IA',
  'Automatización de operaciones',
]

export function Hero() {
  return (
    <section
      id="inicio"
      className="relative bg-forest min-h-dvh flex flex-col justify-center pt-20 pb-20 overflow-hidden"
    >
      {/* Background Paths — el efecto principal */}
      <BackgroundPaths />

      {/* Radial gradient para que el texto tenga contraste en el centro */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse 80% 60% at 40% 50%, transparent 30%, rgba(15,61,46,0.6) 70%, rgba(15,61,46,0.95) 100%)',
        }}
        aria-hidden="true"
      />

      {/* Glow orbs sutiles */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-growth/8 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/3 w-80 h-80 bg-green/10 rounded-full blur-[80px]" />
      </div>

      <div className="relative z-10 w-full max-w-[1120px] mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-12 lg:gap-16 items-center">

          {/* ── Copy ── */}
          <div className="flex flex-col gap-7">

            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="inline-flex items-center gap-2 text-[0.6875rem] font-bold tracking-[0.1em] uppercase text-growth bg-growth/10 border border-growth/20 px-3.5 py-1.5 rounded-full w-fit"
            >
              <span className="w-1.5 h-1.5 bg-growth rounded-full animate-pulse-dot" />
              The path to scale
            </motion.div>

            {/* Headline con animación palabra-por-palabra */}
            <h1 className="text-[clamp(2.1rem,5.5vw,3.5rem)] font-extrabold leading-[1.12] tracking-[-0.03em] text-white">
              <AnimatedWords
                text="Tu empresa pierde tiempo y dinero en procesos manuales."
                delay={0.1}
                className="block mb-2"
              />
              <AnimatedWords
                text="Nosotros los automatizamos con inteligencia artificial."
                delay={0.5}
                highlightWords={['automatizamos']}
                highlightClassName="text-growth italic"
              />
            </h1>

            {/* Subheadline */}
            <BlurFade delay={0.85}>
              <p className="text-[clamp(1rem,2vw,1.15rem)] text-white/60 leading-relaxed max-w-[500px]">
                Agentes de IA para atención al cliente, ventas, reclutamiento y operaciones —
                implementados en <span className="text-white/90 font-semibold">2 a 4 semanas</span>.
              </p>
            </BlurFade>

            {/* CTAs */}
            <BlurFade delay={1.05}>
              <div className="flex flex-wrap gap-3">
                <ShimmerButton
                  as="a"
                  href="#contacto"
                  className="rounded-xl text-[0.9375rem]"
                >
                  Agendar diagnóstico gratuito
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </ShimmerButton>

                <a
                  href="#soluciones"
                  className="inline-flex items-center gap-2 text-[0.9375rem] font-semibold text-white/75 hover:text-white border border-white/15 hover:border-white/30 hover:bg-white/5 px-6 py-3.5 rounded-xl transition-all duration-200 hover:-translate-y-px"
                >
                  Ver soluciones
                </a>
              </div>
            </BlurFade>

            {/* Social proof strip */}
            <BlurFade delay={1.2}>
              <div className="flex items-center gap-3 pt-2">
                <div className="flex -space-x-2">
                  {['#1A6B45', '#2d8a5e', '#3DBB7A', '#5dcf94'].map((c, i) => (
                    <div
                      key={i}
                      className="w-8 h-8 rounded-full border-2 border-forest flex items-center justify-center text-white text-xs font-bold"
                      style={{ background: c }}
                    >
                      {['MX', 'NL', 'MT', 'RG'][i]}
                    </div>
                  ))}
                </div>
                <p className="text-sm text-white/45">
                  Empresas en Monterrey confían en Scalvia
                </p>
              </div>
            </BlurFade>
          </div>

          {/* ── Stats panel ── */}
          <BlurFade delay={0.6} className="hidden lg:block">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="relative"
            >
              {/* Glow behind card */}
              <div className="absolute -inset-4 bg-growth/10 rounded-3xl blur-2xl" />

              <div className="relative bg-white/5 border border-white/10 rounded-3xl p-8 flex flex-col gap-6 backdrop-blur-md">
                {/* Stats grid */}
                <div>
                  <p className="text-[0.65rem] font-bold tracking-[0.12em] uppercase text-growth/80 mb-4">
                    Resultados típicos
                  </p>
                  <div className="grid grid-cols-2 gap-4">
                    {STATS.map((stat, i) => (
                      <motion.div
                        key={stat.value}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.9 + i * 0.1, duration: 0.4 }}
                        className="flex flex-col gap-1"
                      >
                        <span className="text-[1.75rem] font-extrabold text-growth leading-none tracking-tight">
                          {stat.value}
                        </span>
                        <span className="text-xs text-white/45 leading-snug">{stat.label}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>

                <div className="h-px bg-white/8" />

                {/* Pillars */}
                <div>
                  <p className="text-[0.65rem] font-bold tracking-[0.12em] uppercase text-growth/80 mb-3">
                    Los 4 pilares
                  </p>
                  <div className="flex flex-col gap-2.5">
                    {PILARES.map((pilar, i) => (
                      <motion.div
                        key={pilar}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 1.1 + i * 0.1, duration: 0.35 }}
                        className="flex items-center gap-3 text-sm text-white/65 font-medium"
                      >
                        <motion.span
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: 1.1 + i * 0.1, duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                          className="w-1.5 h-1.5 rounded-full bg-growth flex-shrink-0"
                        />
                        {pilar}
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </BlurFade>

        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        aria-hidden="true"
      >
        <span className="text-[0.625rem] font-semibold tracking-[0.15em] uppercase text-white/25">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
          className="w-px h-7 bg-gradient-to-b from-white/30 to-transparent"
        />
      </motion.div>
    </section>
  )
}
