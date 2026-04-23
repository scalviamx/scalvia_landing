'use client'

import clsx from 'clsx'
import Link from 'next/link'
import { useMotionProfile } from '@/lib/motion'

interface ShimmerButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  className?: string
  shimmerColor?: string
  background?: string
  borderRadius?: string
  as?: 'button' | 'a'
  href?: string
}

export function ShimmerButton({
  children,
  className,
  shimmerColor = 'rgba(255,255,255,0.3)',
  background = '#3DBB7A',
  borderRadius = '10px',
  as: Tag = 'button',
  href,
  ...props
}: ShimmerButtonProps) {
  const isLite = useMotionProfile('auto') === 'lite'
  const isInternalHref = typeof href === 'string' && href.startsWith('/')
  const Comp = Tag as React.ElementType

  const animationClasses = isLite
    ? 'transition-colors duration-200'
    : 'transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_32px_rgba(61,187,122,0.35)] active:translate-y-0'

  const shimmerClasses = isLite
    ? 'absolute inset-0 opacity-0'
    : 'absolute inset-0 -translate-x-full animate-[shimmer-slide_2s_ease-in-out_infinite] group-hover:animate-[shimmer-slide_1.2s_ease-in-out_infinite]'

  if (Tag === 'a' && isInternalHref) {
    return (
      <Link
        href={href}
        className={clsx(
          'group relative z-0 flex cursor-pointer items-center justify-center gap-2 overflow-hidden whitespace-nowrap px-7 py-3.5 text-sm font-bold text-ink',
          animationClasses,
          className
        )}
        style={{ background, borderRadius }}
      >
        <span
          className={shimmerClasses}
          style={{
            background: `linear-gradient(90deg, transparent 0%, ${shimmerColor} 50%, transparent 100%)`,
          }}
        />
        <span className="relative z-10 flex items-center gap-2">{children}</span>
      </Link>
    )
  }

  return (
    <Comp
      href={href}
      className={clsx(
        'group relative z-0 flex cursor-pointer items-center justify-center gap-2 overflow-hidden whitespace-nowrap px-7 py-3.5 text-sm font-bold text-ink',
        animationClasses,
        className
      )}
      style={{ background, borderRadius }}
      {...props}
    >
      {/* Shimmer sweep */}
      <span
        className={shimmerClasses}
        style={{
          background: `linear-gradient(90deg, transparent 0%, ${shimmerColor} 50%, transparent 100%)`,
        }}
      />
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </Comp>
  )
}
