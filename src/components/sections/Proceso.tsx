'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { BlurFade } from '@/components/ui/BlurFade'

const STEPS = [
  { n: '01', title: 'Diagnóstico gratuito' },
  { n: '02', title: 'Propuesta a medida' },
  { n: '03', title: 'Implementación' },
  { n: '04', title: 'Soporte y escalamiento' },
]

function StepNumber({ n, index }: { n: string; index: number }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.div
      ref={ref}
      initial={{ scale: 0.5, opacity: 0 }}
      animate={inView ? { scale: 1, opacity: 1 } : {}}
      transition={{ delay: 0.15 * index, duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      className="relative z-10 w-14 h-14 rounded-full bg-white border-2 border-growth flex items-center justify-center font-extrabold text-green text-lg mb-5 mx-auto shadow-[0_0_0_6px_rgba(243,250,248,1)]"
    >
      {n}
    </motion.div>
  )
}

export function Proceso() {
  const lineRef = useRef(null)
  const lineInView = useInView(lineRef, { once: true, margin: '-60px' })

  return (
    <section id="proceso" className="py-24 bg-white" aria-labelledby="proceso-title">
      <div className="w-full max-w-[1120px] mx-auto px-6">

        <BlurFade className="text-center max-w-lg mx-auto mb-16">
          <p className="text-xs font-bold tracking-widest uppercase text-growth mb-3">
            El proceso
          </p>
          <h2 id="proceso-title" className="text-[clamp(1.75rem,4vw,2.5rem)] font-extrabold tracking-tight leading-tight text-ink mb-4">
            De diagnóstico a producción en 4 pasos
          </h2>
          <p className="text-base text-ink-60">Sin fricción. Sin interrumpir tu operación.</p>
        </BlurFade>

        <div className="relative mb-10">
          <div ref={lineRef} className="hidden md:block absolute top-7 left-[calc(12.5%+28px)] right-[calc(12.5%+28px)] h-0.5 bg-border">
            <motion.div
              initial={{ scaleX: 0 }}
              animate={lineInView ? { scaleX: 1 } : {}}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
              className="absolute inset-0 origin-left bg-growth/40"
            />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-0">
            {STEPS.map((step, i) => (
              <BlurFade key={step.n} delay={0.1 * i} className="flex flex-col items-center text-center px-4">
                <StepNumber n={step.n} index={i} />
                <h3 className="text-sm font-bold text-ink leading-snug">{step.title}</h3>
              </BlurFade>
            ))}
          </div>
        </div>

        <BlurFade delay={0.5} className="text-center">
          <a
            href="/proceso"
            className="inline-flex items-center gap-2 text-sm font-bold text-green hover:text-growth transition-colors duration-200"
          >
            Ver el proceso completo →
          </a>
        </BlurFade>

      </div>
    </section>
  )
}
