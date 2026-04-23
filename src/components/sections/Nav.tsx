'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { usePathname } from 'next/navigation'

const ScalviaLogo = () => (
  <svg width="28" height="28" viewBox="0 0 56 56" fill="none" aria-hidden="true">
    <rect width="56" height="56" rx="12" fill="rgba(255,255,255,0.08)" />
    <rect x="12" y="38" width="10" height="6" rx="3" fill="#7AC4A0" />
    <rect x="24" y="28" width="10" height="6" rx="3" fill="#3DBB7A" />
    <rect x="36" y="18" width="10" height="6" rx="3" fill="#FFFFFF" />
    <path d="M22 41 L26 31 L38 21" stroke="white" strokeWidth="1.5" strokeOpacity="0.3" strokeDasharray="3 3" fill="none" />
  </svg>
)

const NAV_LINKS = [
  { href: '/problema', label: 'El problema' },
  { href: '/soluciones', label: 'Soluciones' },
  { href: '/proceso', label: 'Proceso' },
  { href: '/marketing', label: 'Marketing' },
  { href: '/resultados', label: 'Resultados' },
]

export function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const closeMenu = () => setMenuOpen(false)

  return (
    <>
      <motion.nav
        initial={{ y: -64, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 h-16 flex items-center transition-all duration-300 ${
          scrolled ? 'bg-forest/95 backdrop-blur-md shadow-[0_1px_0_rgba(255,255,255,0.06)]' : ''
        }`}
      >
        <div className="w-full max-w-[1120px] mx-auto px-6 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2.5 no-underline" aria-label="Scalvia inicio">
            <ScalviaLogo />
            <span className="text-white font-extrabold text-lg tracking-tight">Scalvia</span>
          </a>

          {/* Desktop links */}
          <ul className="hidden md:flex items-center gap-1 list-none" role="list">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href
              return (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className={`text-sm font-semibold px-3 py-1.5 rounded-lg transition-all duration-200 ${
                      isActive
                        ? 'text-white bg-white/10'
                        : 'text-white/70 hover:text-white hover:bg-white/8'
                    }`}
                  >
                    {link.label}
                  </a>
                </li>
              )
            })}
          </ul>

          <a
            href="/contacto"
            className="hidden md:inline-flex items-center text-sm font-bold text-ink bg-growth px-4 py-2 rounded-lg hover:bg-[#2ea865] transition-all duration-200 hover:-translate-y-px"
          >
            Diagnóstico gratuito
          </a>

          {/* Hamburger */}
          <button
            className="md:hidden flex flex-col gap-[5px] p-2 cursor-pointer"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={menuOpen}
          >
            <motion.span
              animate={menuOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
              className="block w-5.5 h-0.5 bg-white rounded-sm"
            />
            <motion.span
              animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
              className="block w-5.5 h-0.5 bg-white rounded-sm"
            />
            <motion.span
              animate={menuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
              className="block w-5.5 h-0.5 bg-white rounded-sm"
            />
          </button>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="fixed top-16 left-0 right-0 z-40 bg-forest/98 backdrop-blur-xl border-b border-white/8 px-6 py-5 flex flex-col gap-2 md:hidden"
          >
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={closeMenu}
                className={`font-semibold text-base py-2 px-3 rounded-lg transition-all ${
                  pathname === link.href
                    ? 'text-white bg-white/10'
                    : 'text-white/80 hover:text-white hover:bg-white/8'
                }`}
              >
                {link.label}
              </a>
            ))}
            <a
              href="/contacto"
              onClick={closeMenu}
              className="mt-2 text-center font-bold text-ink bg-growth py-3 rounded-lg hover:bg-[#2ea865] transition-all"
            >
              Diagnóstico gratuito
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
