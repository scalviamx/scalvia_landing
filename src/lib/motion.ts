'use client'

import { useEffect, useState } from 'react'
import { useReducedMotion } from 'framer-motion'

export type MotionMode = 'auto' | 'full' | 'lite'
export type MotionProfile = 'full' | 'lite'

const MOBILE_QUERY = '(max-width: 767px)'
const TOUCH_QUERY = '(hover: none), (pointer: coarse)'

function watchMediaQuery(query: string, onChange: (matches: boolean) => void) {
  const mediaQuery = window.matchMedia(query)
  const update = () => onChange(mediaQuery.matches)

  update()

  if (typeof mediaQuery.addEventListener === 'function') {
    mediaQuery.addEventListener('change', update)
    return () => mediaQuery.removeEventListener('change', update)
  }

  mediaQuery.addListener(update)
  return () => mediaQuery.removeListener(update)
}

export function useMotionProfile(mode: MotionMode = 'auto'): MotionProfile {
  const prefersReducedMotion = useReducedMotion()
  const [isMobile, setIsMobile] = useState(false)
  const [isTouch, setIsTouch] = useState(false)
  const [resolved, setResolved] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return

    const stopMobile = watchMediaQuery(MOBILE_QUERY, setIsMobile)
    const stopTouch = watchMediaQuery(TOUCH_QUERY, setIsTouch)
    setResolved(true)

    return () => {
      stopMobile()
      stopTouch()
    }
  }, [])

  if (mode === 'full') return 'full'
  if (mode === 'lite') return 'lite'
  if (!resolved) return 'lite'
  if (prefersReducedMotion) return 'lite'
  if (isMobile || isTouch) return 'lite'
  return 'full'
}
