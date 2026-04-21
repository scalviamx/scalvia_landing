import { BlurFade } from '@/components/ui/BlurFade'

type SectionTextCtaTheme = 'light' | 'dark'

interface SectionTextCtaProps {
  href: string
  label: string
  theme?: SectionTextCtaTheme
  delay?: number
  className?: string
}

export function SectionTextCta({
  href,
  label,
  theme = 'light',
  delay = 0.2,
  className = 'text-center mt-10',
}: SectionTextCtaProps) {
  const themeClasses = theme === 'dark'
    ? 'text-growth hover:text-white'
    : 'text-green hover:text-growth'

  return (
    <BlurFade delay={delay} className={className}>
      <a
        href={href}
        className={`inline-flex items-center gap-2 text-sm font-bold transition-colors duration-200 ${themeClasses}`}
      >
        {label}
      </a>
    </BlurFade>
  )
}
