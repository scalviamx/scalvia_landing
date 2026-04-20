'use client'

import { motion } from 'framer-motion'

function FloatingPaths({ position, color }: { position: number; color: string }) {
  const paths = Array.from({ length: 36 }, (_, i) => ({
    id: i,
    d: `M-${380 - i * 5 * position} -${189 + i * 6}C-${
      380 - i * 5 * position
    } -${189 + i * 6} -${312 - i * 5 * position} ${216 - i * 6} ${
      152 - i * 5 * position
    } ${343 - i * 6}C${616 - i * 5 * position} ${470 - i * 6} ${
      684 - i * 5 * position
    } ${875 - i * 6} ${684 - i * 5 * position} ${875 - i * 6}`,
    width: 0.4 + i * 0.025,
    opacity: 0.06 + i * 0.018,
  }))

  return (
    <div className="absolute inset-0 pointer-events-none">
      <svg
        className="w-full h-full"
        viewBox="0 0 696 316"
        fill="none"
        aria-hidden="true"
      >
        {paths.map((path) => (
          <motion.path
            key={path.id}
            d={path.d}
            stroke={color}
            strokeWidth={path.width}
            strokeOpacity={path.opacity}
            initial={{ pathLength: 0.3, opacity: 0.4 }}
            animate={{
              pathLength: 1,
              opacity: [0.2, path.opacity, 0.2],
              pathOffset: [0, 1, 0],
            }}
            transition={{
              duration: 22 + (path.id % 7) * 3,
              repeat: Number.POSITIVE_INFINITY,
              ease: 'linear',
            }}
          />
        ))}
      </svg>
    </div>
  )
}

interface BackgroundPathsProps {
  className?: string
}

export function BackgroundPaths({ className }: BackgroundPathsProps) {
  return (
    <div
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className ?? ''}`}
      aria-hidden="true"
    >
      {/* Green paths — growth accent */}
      <FloatingPaths position={1} color="#3DBB7A" />
      {/* White paths — subtle depth */}
      <FloatingPaths position={-1} color="rgba(255,255,255,0.6)" />
    </div>
  )
}
