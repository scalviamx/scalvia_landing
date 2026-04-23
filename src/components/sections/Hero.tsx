'use client'

import { useRef } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { BackgroundPaths } from '@/components/ui/BackgroundPaths'
import { AnimatedHeroWord } from '@/components/ui/AnimatedHero'
import { ShimmerButton } from '@/components/ui/ShimmerButton'
import { BlurFade } from '@/components/ui/BlurFade'
import { gsap, SplitText, useGSAP } from '@/lib/gsap'
import { useMotionProfile } from '@/lib/motion'

export function Hero() {
  const isLite = useMotionProfile('auto') === 'lite'
  const headlineRef = useRef<HTMLHeadingElement>(null)
  const line1Ref = useRef<HTMLSpanElement>(null)
  const line2Ref = useRef<HTMLSpanElement>(null)

  // Full profile: SplitText reveal. Lite profile: simple headline fade-up.
  useGSAP(() => {
    if (!headlineRef.current) return

    if (isLite) {
      gsap.fromTo(
        headlineRef.current,
        { autoAlpha: 0, y: 14 },
        { autoAlpha: 1, y: 0, duration: 0.35, ease: 'power2.out', delay: 0.05 }
      )
      return
    }

    const split1 = SplitText.create(line1Ref.current!, { type: 'words, chars' })
    const split2 = SplitText.create(line2Ref.current!, { type: 'words, chars' })

    gsap.set(headlineRef.current, { autoAlpha: 1 })
    gsap.from([...split1.chars, ...split2.chars], {
      autoAlpha: 0,
      y: 20,
      stagger: 0.03,
      duration: 0.4,
      ease: 'power2.out',
      delay: 0.15,
    })

    return () => {
      split1.revert()
      split2.revert()
    }
  }, { dependencies: [isLite], revertOnUpdate: true })

  return (
    <section
      id="inicio"
      className="relative bg-forest min-h-dvh flex flex-col justify-center pt-20 pb-20 overflow-hidden"
    >
      {!isLite && <BackgroundPaths />}

      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse 70% 60% at 50% 50%, transparent 20%, rgba(15,61,46,0.55) 65%, rgba(15,61,46,0.95) 100%)',
        }}
        aria-hidden="true"
      />

      {!isLite && (
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-growth/8 rounded-full blur-[120px]" />
          <div className="absolute bottom-1/4 right-1/3 w-80 h-80 bg-green/10 rounded-full blur-[80px]" />
        </div>
      )}

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

          {/* Headline — static lines use GSAP SplitText; rotating word stays Framer Motion */}
          <h1
            ref={headlineRef}
            className="text-[clamp(2.2rem,5.5vw,3.75rem)] font-extrabold leading-[1.1] tracking-[-0.03em] text-white opacity-0"
          >
            <span ref={line1Ref} className="block mb-2">
              Automatizamos tu
            </span>
            <AnimatedHeroWord />
            <span ref={line2Ref} className="block mt-2">
              con inteligencia artificial.
            </span>
          </h1>

          {/* Subheadline */}
          <BlurFade delay={0.75}>
            <p className="text-[clamp(1rem,2vw,1.2rem)] text-white leading-relaxed max-w-[580px]">
              <span className="block">Agentes de IA</span>
              <span className="block">Para atención al cliente, ventas, reclutamiento y operaciones.</span>
            </p>
          </BlurFade>

          {/* CTAs */}
          <BlurFade delay={0.95}>
            <div className="flex flex-wrap gap-3 justify-center">
              <ShimmerButton
                as="a"
                href="/contacto"
                className="rounded-xl text-[0.9375rem]"
              >
                Agendar diagnóstico gratuito
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </ShimmerButton>

              <Link
                href="/resultados"
                className="inline-flex items-center gap-2 text-[0.9375rem] font-semibold text-white/75 hover:text-white border border-white/15 hover:border-white/30 hover:bg-white/5 px-6 py-3.5 rounded-xl transition-all duration-200 hover:-translate-y-px"
              >
                Ver resultados
              </Link>
            </div>
          </BlurFade>

        </div>
      </div>

      <noscript>
        <style>{`#inicio h1 { opacity: 1 !important; }`}</style>
      </noscript>
    </section>
  )
}
