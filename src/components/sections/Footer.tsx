const ScalviaLogo = () => (
  <svg width="28" height="28" viewBox="0 0 56 56" fill="none" aria-hidden="true">
    <rect width="56" height="56" rx="12" fill="rgba(255,255,255,0.06)" />
    <rect x="12" y="38" width="10" height="6" rx="3" fill="#7AC4A0" />
    <rect x="24" y="28" width="10" height="6" rx="3" fill="#3DBB7A" />
    <rect x="36" y="18" width="10" height="6" rx="3" fill="#FFFFFF" />
    <path d="M22 41 L26 31 L38 21" stroke="white" strokeWidth="1.5" strokeOpacity="0.3" strokeDasharray="3 3" fill="none" />
  </svg>
)

const COLS = [
  {
    title: 'Soluciones IA',
    links: [
      { label: 'Atención a clientes', href: '#soluciones' },
      { label: 'Agente de ventas', href: '#soluciones' },
      { label: 'Reclutamiento IA', href: '#soluciones' },
      { label: 'Automatización de ops', href: '#soluciones' },
    ],
  },
  {
    title: 'Marketing digital',
    links: [
      { label: 'Google Maps', href: '#marketing' },
      { label: 'Sitio web', href: '#marketing' },
      { label: 'Redes sociales', href: '#marketing' },
      { label: 'Publicidad pagada', href: '#marketing' },
    ],
  },
  {
    title: 'Empresa',
    links: [
      { label: 'Cómo trabajamos', href: '#proceso' },
      { label: 'Contacto', href: '#contacto' },
      { label: 'hola@scalvia.mx', href: 'mailto:hola@scalvia.mx' },
      { label: '@scalviamx', href: 'https://instagram.com/scalviamx' },
    ],
  },
]

export function Footer() {
  return (
    <footer className="bg-[#0a2a1f] border-t border-white/6 pt-16 pb-8" aria-label="Pie de página">
      <div className="w-full max-w-[1120px] mx-auto px-6">

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="flex flex-col gap-4 lg:col-span-1">
            <div className="flex items-center gap-2.5">
              <ScalviaLogo />
              <div>
                <div className="text-white font-extrabold text-lg tracking-tight leading-none">Scalvia</div>
                <div className="text-white/40 text-xs">The path to scale.</div>
              </div>
            </div>
            <p className="text-sm text-white/45 leading-relaxed max-w-[220px]">
              Agencia de inteligencia artificial para empresas que quieren escalar sin contratar más.
            </p>
          </div>

          {COLS.map((col) => (
            <div key={col.title}>
              <p className="text-[0.6875rem] font-bold tracking-widest uppercase text-white/40 mb-4">
                {col.title}
              </p>
              <ul className="flex flex-col gap-2.5 list-none">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-white/55 hover:text-white transition-colors duration-200"
                      {...(link.href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="pt-6 border-t border-white/6 flex items-center justify-between flex-wrap gap-4">
          <p className="text-[0.8125rem] text-white/30">
            © 2025 Scalvia. Todos los derechos reservados. ·{' '}
            <a href="#" className="underline opacity-60 hover:opacity-100 transition-opacity">
              Aviso de privacidad
            </a>
          </p>
          <div className="flex items-center gap-2" aria-label="Redes sociales">
            {[
              { href: 'https://instagram.com/scalviamx', label: 'Instagram', icon: (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <rect x="2" y="2" width="20" height="20" rx="5" stroke="rgba(255,255,255,0.55)" strokeWidth="1.8"/>
                  <circle cx="12" cy="12" r="4.5" stroke="rgba(255,255,255,0.55)" strokeWidth="1.8"/>
                  <circle cx="17.5" cy="6.5" r="1" fill="rgba(255,255,255,0.55)"/>
                </svg>
              )},
              { href: 'https://facebook.com/scalviamx', label: 'Facebook', icon: (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" stroke="rgba(255,255,255,0.55)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              )},
              { href: 'https://tiktok.com/@scalviamx', label: 'TikTok', icon: (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" stroke="rgba(255,255,255,0.55)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              )},
            ].map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${s.label} de Scalvia`}
                className="w-8 h-8 flex items-center justify-center rounded-lg border border-white/12 hover:border-white/25 hover:bg-white/6 transition-all duration-200"
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>

      </div>
    </footer>
  )
}
