'use client'

import clsx from 'clsx'
import { useReducedMotion } from 'framer-motion'
import { useMotionProfile } from '@/lib/motion'

interface MarqueeProps {
  children: React.ReactNode
  className?: string
  reverse?: boolean
  pauseOnHover?: boolean
}

export function Marquee({ children, className, reverse, pauseOnHover }: MarqueeProps) {
  const isLite = useMotionProfile('auto') === 'lite'
  const prefersReducedMotion = useReducedMotion()

  if (prefersReducedMotion) {
    return (
      <div className={clsx('overflow-x-auto [--gap:2rem]', className)}>
        <div className="flex min-w-max gap-[--gap] pr-6">{children}</div>
      </div>
    )
  }

  const animationDuration = isLite ? '42s' : '30s'

  return (
    <div
      className={clsx('group flex overflow-hidden [--gap:2rem]', className)}
    >
      <div
        className={clsx(
          'flex min-w-full shrink-0 gap-[--gap] animate-marquee',
          reverse && '[animation-direction:reverse]',
          pauseOnHover && 'group-hover:[animation-play-state:paused]'
        )}
        style={{ animationDuration }}
      >
        {children}
      </div>
      <div
        className={clsx(
          'flex min-w-full shrink-0 gap-[--gap] animate-marquee',
          reverse && '[animation-direction:reverse]',
          pauseOnHover && 'group-hover:[animation-play-state:paused]'
        )}
        aria-hidden="true"
        style={{ animationDuration }}
      >
        {children}
      </div>
    </div>
  )
}
