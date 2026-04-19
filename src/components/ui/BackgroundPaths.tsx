'use client'

import { motion } from 'framer-motion'

function FloatingPath({ d, delay, duration, opacity }: {
  d: string
  delay: number
  duration: number
  opacity: number
}) {
  return (
    <motion.path
      d={d}
      stroke="currentColor"
      strokeWidth="1"
      strokeLinecap="round"
      fill="none"
      initial={{ pathLength: 0, opacity: 0 }}
      animate={{
        pathLength: [0, 1, 1, 0],
        opacity: [0, opacity, opacity, 0],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        repeatDelay: Math.random() * 4 + 2,
        ease: 'easeInOut',
      }}
    />
  )
}

// Generate organic curved paths that flow across the viewport
const PATHS = [
  // Long sweeping arcs
  { d: 'M-80 200 C100 100 300 400 600 150 S900 50 1200 200', delay: 0, duration: 8, opacity: 0.18 },
  { d: 'M-60 500 C150 350 400 600 700 300 S1000 100 1300 400', delay: 1.5, duration: 10, opacity: 0.14 },
  { d: 'M0 700 C200 500 500 750 800 450 S1100 200 1440 550', delay: 3, duration: 12, opacity: 0.1 },
  { d: 'M200 -50 C350 200 500 100 700 350 S950 500 1100 250', delay: 0.8, duration: 9, opacity: 0.16 },
  { d: 'M400 800 C550 600 750 750 950 500 S1200 300 1440 600', delay: 2.2, duration: 11, opacity: 0.12 },
  // Tighter curves
  { d: 'M-100 300 C50 200 150 450 300 280 S500 100 650 320 S850 480 1000 280', delay: 4, duration: 14, opacity: 0.09 },
  { d: 'M500 -80 C600 150 700 50 850 200 S1050 380 1200 180 S1380 50 1500 250', delay: 1, duration: 13, opacity: 0.1 },
  // Diagonal fast paths
  { d: 'M-200 600 C100 400 300 200 600 100 S900 0 1200 -50', delay: 5, duration: 7, opacity: 0.13 },
  { d: 'M1500 700 C1200 500 1000 650 700 400 S400 200 100 350', delay: 2.8, duration: 9, opacity: 0.11 },
  // Subtle micro paths
  { d: 'M100 400 C200 350 350 450 500 380 S650 300 800 380', delay: 0.5, duration: 6, opacity: 0.2 },
  { d: 'M600 200 C700 150 850 250 1000 180 S1150 100 1300 200', delay: 3.5, duration: 7, opacity: 0.18 },
  { d: 'M200 600 C300 550 450 650 600 580 S750 500 900 580', delay: 1.8, duration: 8, opacity: 0.15 },
]

interface BackgroundPathsProps {
  className?: string
}

export function BackgroundPaths({ className }: BackgroundPathsProps) {
  return (
    <div
      className={`pointer-events-none absolute inset-0 overflow-hidden text-growth ${className ?? ''}`}
      aria-hidden="true"
    >
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 1440 800"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        {PATHS.map((path, i) => (
          <FloatingPath key={i} {...path} />
        ))}
      </svg>
    </div>
  )
}
