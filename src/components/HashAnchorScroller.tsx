'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

const NAV_OFFSET_PX = 80
const SCROLL_RETRY_DELAYS_MS = [0, 80, 180, 320, 500, 800]

function scrollToHashTarget() {
  const { hash } = window.location
  if (!hash || hash.length <= 1) return

  const id = decodeURIComponent(hash.slice(1))
  const target = document.getElementById(id)
  if (!target) return

  const top = target.getBoundingClientRect().top + window.scrollY - NAV_OFFSET_PX
  window.scrollTo({
    top: Math.max(0, top),
    behavior: 'smooth',
  })
}

export function HashAnchorScroller() {
  const pathname = usePathname()

  useEffect(() => {
    const runWithRetry = () => {
      SCROLL_RETRY_DELAYS_MS.forEach((delay) => {
        window.setTimeout(() => {
          scrollToHashTarget()
        }, delay)
      })
    }

    runWithRetry()
    window.addEventListener('hashchange', runWithRetry)

    return () => {
      window.removeEventListener('hashchange', runWithRetry)
    }
  }, [pathname])

  return null
}
