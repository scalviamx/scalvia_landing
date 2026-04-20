'use client'

import { motion } from 'framer-motion'
import { BackgroundPaths } from '@/components/ui/BackgroundPaths'
import { AnimatedHeroWord } from '@/components/ui/AnimatedHero'
import { ShimmerButton } from '@/components/ui/ShimmerButton'
import { BlurFade } from '@/components/ui/BlurFade'

export function Hero() {
  return (
    <section
      id="inicio"
      className="relative bg-forest min-h-dvh flex flex-col justify-center pt-20 pb-20 overflow-hidden"
    >
      <BackgroundPaths />

      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse 70% 60% at 50% 50%, transparent 20%, rgba(15,61,46,0.55) 65%, rgba(15,61,46,0.95) 100%)',
        }}
        aria-hidden="true"
      />

      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-growth/8 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/3 w-80 h-80 bg-green/10 rounded-full blur-[80px]" />
      </div>

      <div className="relative z-10 w-full max-w-[860px] mx-auto px-6 text-center">
        <div className="flex flex-col items-center gap-8">

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-2 text-[0.6875rem] font-bold tracking-[0.1em] uppercase text-growth bg-growth/10 border border-growth/20 px-3.5 py-1.5 rounded-full"
          >
            <span className="w-1.5 h-1.5 bg-growth rounded-full animate-pulse-dot" />
            The path to scale
          </motion.div>

          {/* Headline con palabra rotatoria */}
          <h1 className="text-[clamp(2.2rem,5.5vw,3.75rem)] font-extrabold leading-[1.1] tracking-[-0.03em] text-white">
            <motion.span
              initial={{ opacity: 0, y: 16, filter: 'blur(6px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ delay: 0.1, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              className="block mb-2"
            >
              Automatizamos tu
            </motion.span>
            <AnimatedHeroWord />
            <motion.span
              initial={{ opacity: 0, y: 16, filter: 'blur(6px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ delay: 0.4, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              className="block mt-2"
            >
              con inteligencia artificial.
            </motion.span>
          </h1>

          {/* Subheadline */}
          <BlurFade delay={0.75}>
            <p className="text-[clamp(1rem,2vw,1.2rem)] text-white/60 leading-relaxed max-w-[580px]">
              Agentes de IA para atención al cliente, ventas, reclutamiento y operaciones —
              implementados en <span className="text-white/90 font-semibold">2 a 4 semanas</span>.
            </p>
          </BlurFade>

          {/* CTAs */}
          <BlurFade delay={0.95}>
            <div className="flex flex-wrap gap-3 justify-center">
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
                href="/resultados"
                className="inline-flex items-center gap-2 text-[0.9375rem] font-semibold text-white/75 hover:text-white border border-white/15 hover:border-white/30 hover:bg-white/5 px-6 py-3.5 rounded-xl transition-all duration-200 hover:-translate-y-px"
              >
                Ver resultados
              </a>
            </div>
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
