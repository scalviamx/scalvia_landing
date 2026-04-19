'use client'

import { motion } from 'framer-motion'

interface AnimatedWordsProps {
  text: string
  className?: string
  delay?: number
  highlightWords?: string[]
  highlightClassName?: string
}

export function AnimatedWords({
  text,
  className,
  delay = 0,
  highlightWords = [],
  highlightClassName = 'text-growth',
}: AnimatedWordsProps) {
  const words = text.split(' ')

  return (
    <span className={className}>
      {words.map((word, i) => {
        const isHighlight = highlightWords.includes(word)
        return (
          <motion.span
            key={`${word}-${i}`}
            initial={{ opacity: 0, y: 16, filter: 'blur(6px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{
              delay: delay + i * 0.07,
              duration: 0.5,
              ease: [0.16, 1, 0.3, 1],
            }}
            className={`inline-block mr-[0.25em] ${isHighlight ? highlightClassName : ''}`}
          >
            {word}
          </motion.span>
        )
      })}
    </span>
  )
}
