'use client'

import { useRef, useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import clsx from 'clsx'

interface MagicCardProps {
  children: React.ReactNode
  className?: string
  gradientSize?: number
  gradientColor?: string
  gradientOpacity?: number
}

export function MagicCard({
  children,
  className,
  gradientSize = 220,
  gradientColor = '#3DBB7A',
  gradientOpacity = 0.12,
}: MagicCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [gradientPos, setGradientPos] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    setGradientPos({ x: e.clientX - rect.left, y: e.clientY - rect.top })
  }, [])

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ y: -4, transition: { duration: 0.25, ease: [0.16, 1, 0.3, 1] } }}
      className={clsx('relative overflow-hidden rounded-2xl', className)}
      style={{
        background: isHovered
          ? `radial-gradient(${gradientSize}px circle at ${gradientPos.x}px ${gradientPos.y}px, ${gradientColor}${Math.round(gradientOpacity * 255).toString(16).padStart(2, '0')}, transparent 80%)`
          : undefined,
      }}
    >
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl transition-opacity duration-300"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(${gradientSize}px circle at ${gradientPos.x}px ${gradientPos.y}px, ${gradientColor}20, transparent 80%)`,
        }}
      />
      {children}
    </motion.div>
  )
}
