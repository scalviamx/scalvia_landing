'use client'

import { useEffect, useId, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import clsx from 'clsx'

interface GridSquare {
  id: number
  pos: [number, number]
}

function getPos(rows: number, cols: number): [number, number] {
  return [
    Math.floor((Math.random() * rows) / 2) * 2,
    Math.floor((Math.random() * cols) / 2) * 2,
  ]
}

function getSquares(count: number, rows: number, cols: number): GridSquare[] {
  const squares: GridSquare[] = []
  for (let i = 0; i < count; i++) {
    squares.push({ id: i, pos: getPos(rows, cols) })
  }
  return squares
}

interface AnimatedGridPatternProps {
  width?: number
  height?: number
  x?: number
  y?: number
  strokeDasharray?: string
  numSquares?: number
  className?: string
  maxOpacity?: number
  duration?: number
}

export function AnimatedGridPattern({
  width = 40,
  height = 40,
  x = -1,
  y = -1,
  strokeDasharray = '0',
  numSquares = 50,
  className,
  maxOpacity = 0.5,
  duration = 4,
}: AnimatedGridPatternProps) {
  const id = useId()
  const containerRef = useRef<SVGSVGElement>(null)
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
  const [squares, setSquares] = useState<GridSquare[]>([])

  const cols = Math.ceil(dimensions.width / width) + 1
  const rows = Math.ceil(dimensions.height / height) + 1

  useEffect(() => {
    const obs = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setDimensions({
          width: entry.contentRect.width,
          height: entry.contentRect.height,
        })
      }
    })
    if (containerRef.current) obs.observe(containerRef.current)
    return () => obs.disconnect()
  }, [])

  useEffect(() => {
    if (cols && rows) setSquares(getSquares(numSquares, rows, cols))
  }, [cols, rows, numSquares])

  const updateSquare = (id: number) => {
    setSquares((prev) =>
      prev.map((sq) => (sq.id === id ? { ...sq, pos: getPos(rows, cols) } : sq))
    )
  }

  return (
    <svg
      ref={containerRef}
      aria-hidden="true"
      className={clsx('pointer-events-none absolute inset-0 h-full w-full fill-none stroke-white/10', className)}
    >
      <defs>
        <pattern id={id} width={width} height={height} patternUnits="userSpaceOnUse" x={x} y={y}>
          <path d={`M.5 ${height}V.5H${width}`} fill="none" strokeDasharray={strokeDasharray} />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
      <svg x={x} y={y} className="overflow-visible">
        {squares.map(({ pos: [col, row], id: squareId }) => (
          <motion.rect
            key={`${col}-${row}-${squareId}`}
            width={width - 1}
            height={height - 1}
            x={col * width + 1}
            y={row * height + 1}
            fill="currentColor"
            strokeWidth="0"
            initial={{ opacity: 0 }}
            animate={{ opacity: maxOpacity }}
            transition={{
              duration,
              repeat: Infinity,
              repeatType: 'reverse',
              ease: 'easeInOut',
              delay: Math.random() * duration,
            }}
            onAnimationComplete={() => updateSquare(squareId)}
            className="text-growth/20"
          />
        ))}
      </svg>
    </svg>
  )
}
