'use client'

import { useRef } from 'react'
import { motion, useInView, Variants } from 'framer-motion'
import { MotionMode, useMotionProfile } from '@/lib/motion'

interface BlurFadeProps {
  children: React.ReactNode
  className?: string
  variant?: Variants
  duration?: number
  delay?: number
  yOffset?: number
  blur?: string
  inView?: boolean
  inViewMargin?: string
  mode?: MotionMode
}

export function BlurFade({
  children,
  className,
  variant,
  duration = 0.5,
  delay = 0,
  yOffset = 20,
  blur = '8px',
  inView = true,
  inViewMargin = '-40px',
  mode = 'auto',
}: BlurFadeProps) {
  const ref = useRef(null)
  const profile = useMotionProfile(mode)
  const isLite = profile === 'lite'
  const inViewResult = useInView(ref, {
    once: true,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    margin: inViewMargin as any,
  })
  const isVisible = !inView || inViewResult

  const defaultVariant: Variants = {
    hidden: isLite
      ? { y: Math.min(yOffset, 12), opacity: 0 }
      : { y: yOffset, opacity: 0, filter: `blur(${blur})` },
    visible: {
      y: 0,
      opacity: 1,
      ...(isLite ? {} : { filter: 'blur(0px)' }),
      transition: {
        duration: isLite ? Math.min(duration, 0.3) : duration,
        delay,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  }

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isVisible ? 'visible' : 'hidden'}
      variants={variant ?? defaultVariant}
      className={className}
    >
      {children}
    </motion.div>
  )
}
