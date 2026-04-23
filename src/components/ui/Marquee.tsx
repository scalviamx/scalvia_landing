'use client'

import clsx from 'clsx'
import { useMotionProfile } from '@/lib/motion'

interface MarqueeProps {
  children: React.ReactNode
  className?: string
  reverse?: boolean
  pauseOnHover?: boolean
}

export function Marquee({ children, className, reverse, pauseOnHover }: MarqueeProps) {
  const isLite = useMotionProfile('auto') === 'lite'

  if (isLite) {
    return (
      <div className={clsx('overflow-x-auto [--gap:2rem]', className)}>
        <div className="flex min-w-max gap-[--gap] pr-6">{children}</div>
      </div>
    )
  }

  return (
    <div
      className={clsx('group flex overflow-hidden [--duration:30s] [--gap:2rem]', className)}
    >
      <div
        className={clsx(
          'flex min-w-full shrink-0 gap-[--gap] animate-marquee',
          reverse && '[animation-direction:reverse]',
          pauseOnHover && 'group-hover:[animation-play-state:paused]'
        )}
        style={{ animationDuration: 'var(--duration)' }}
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
        style={{ animationDuration: 'var(--duration)' }}
      >
        {children}
      </div>
    </div>
  )
}
