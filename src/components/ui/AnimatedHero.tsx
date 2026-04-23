'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useMotionProfile } from '@/lib/motion'

const WORDS = [
  'atención al cliente',
  'proceso de ventas',
  'reclutamiento',
  'operaciones',
]

export function AnimatedHeroWord() {
  const isLite = useMotionProfile('auto') === 'lite'
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (isLite) return
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % WORDS.length)
    }, 2500)
    return () => clearInterval(interval)
  }, [isLite])

  if (isLite) {
    return (
      <span className="relative inline-flex items-center justify-start">
        <span className="text-growth italic">{WORDS[0]}</span>
      </span>
    )
  }

  return (
    <span className="relative inline-flex items-center justify-start">
      <AnimatePresence mode="wait">
        <motion.span
          key={index}
          initial={{ y: 20, opacity: 0, filter: 'blur(6px)' }}
          animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
          exit={{ y: -20, opacity: 0, filter: 'blur(4px)' }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="text-growth italic"
        >
          {WORDS[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}
