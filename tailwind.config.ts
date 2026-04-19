import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        forest:     '#0F3D2E',
        'forest-mid': '#163626',
        'forest-dark': '#0a2a1f',
        green:      '#1A6B45',
        growth:     '#3DBB7A',
        mint:       '#A8DFC4',
        'mint-light': '#EAF5EE',
        ink:        '#1A1A1A',
        'ink-60':   '#555555',
        'ink-40':   '#888888',
        surface:    '#F7FAF8',
        border:     '#E2EDE8',
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'system-ui', 'sans-serif'],
      },
      animation: {
        'pulse-dot': 'pulse-dot 2s cubic-bezier(0.4,0,0.6,1) infinite',
        'grid-fade': 'grid-fade 8s ease infinite',
        marquee: 'marquee 30s linear infinite',
        'shimmer-slide': 'shimmer-slide 2s ease-in-out infinite',
        'spin-around': 'spin-around 3s linear infinite',
      },
      keyframes: {
        'pulse-dot': {
          '0%,100%': { opacity: '1', transform: 'scale(1)' },
          '50%':     { opacity: '0.4', transform: 'scale(0.8)' },
        },
        'grid-fade': {
          '0%,100%': { opacity: '0.15' },
          '50%':     { opacity: '0.3' },
        },
        marquee: {
          '0%':   { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'shimmer-slide': {
          '0%':   { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(200%)' },
        },
        'spin-around': {
          '0%':   { transform: 'translateZ(0) rotate(0)' },
          '100%': { transform: 'translateZ(0) rotate(360deg)' },
        },
      },
    },
  },
  plugins: [],
}

export default config
