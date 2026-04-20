import clsx from 'clsx'

interface MarqueeProps {
  children: React.ReactNode
  className?: string
  reverse?: boolean
  pauseOnHover?: boolean
}

export function Marquee({ children, className, reverse, pauseOnHover }: MarqueeProps) {
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
