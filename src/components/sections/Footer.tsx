const ScalviaLogo = () => (
  <svg width="28" height="28" viewBox="0 0 56 56" fill="none" aria-hidden="true">
    <rect width="56" height="56" rx="12" fill="rgba(255,255,255,0.06)" />
    <rect x="12" y="38" width="10" height="6" rx="3" fill="#7AC4A0" />
    <rect x="24" y="28" width="10" height="6" rx="3" fill="#3DBB7A" />
    <rect x="36" y="18" width="10" height="6" rx="3" fill="#FFFFFF" />
    <path d="M22 41 L26 31 L38 21" stroke="white" strokeWidth="1.5" strokeOpacity="0.3" strokeDasharray="3 3" fill="none" />
  </svg>
)

export function Footer() {
  const socialLinks = [
    {
      href: 'https://instagram.com/scalviamx',
      label: 'Instagram',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <rect x="2" y="2" width="20" height="20" rx="5" stroke="rgba(255,255,255,0.55)" strokeWidth="1.8" />
          <circle cx="12" cy="12" r="4.5" stroke="rgba(255,255,255,0.55)" strokeWidth="1.8" />
          <circle cx="17.5" cy="6.5" r="1" fill="rgba(255,255,255,0.55)" />
        </svg>
      ),
    },
    {
      href: 'https://facebook.com/scalviamx',
      label: 'Facebook',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"
            stroke="rgba(255,255,255,0.55)"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
    {
      href: 'https://tiktok.com/@scalviamx',
      label: 'TikTok',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"
            stroke="rgba(255,255,255,0.55)"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
  ]

  return (
    <footer className="bg-[#052d22] border-t border-white/6 pt-14 pb-10" aria-label="Pie de página">
      <div className="w-full max-w-[1120px] mx-auto px-6">
        <div className="flex flex-col items-center text-center gap-7">
          <div className="flex flex-col items-center gap-2.5">
            <div className="flex items-center gap-2.5">
              <ScalviaLogo />
              <div className="text-white font-extrabold text-3xl sm:text-[2rem] tracking-tight leading-none">Scalvia</div>
            </div>
            <p className="text-white/70 text-lg sm:text-xl leading-none">The path to scale.</p>
          </div>

          <div className="flex items-center justify-center gap-4" aria-label="Redes sociales">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${social.label} de Scalvia`}
                className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-white/20 text-white/60 transition-colors duration-200 hover:bg-white/5 hover:border-white/35 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30 focus-visible:ring-offset-2 focus-visible:ring-offset-[#052d22]"
              >
                {social.icon}
              </a>
            ))}
          </div>

          <p className="text-base text-white/70">© 2025 Scalvia. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  )
}
