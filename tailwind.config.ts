import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a5f',
          950: '#0f2140'
        },
        surface: {
          DEFAULT: '#132a4a',
          raised: '#16324f',
          border: 'rgba(255,255,255,0.08)'
        },
        success: { DEFAULT: '#22c55e', bg: 'rgba(34,197,94,0.14)', text: '#4ade80' },
        danger: { DEFAULT: '#ef4444', bg: 'rgba(239,68,68,0.14)', text: '#f87171' },
        warning: { DEFAULT: '#f59e0b', bg: 'rgba(245,158,11,0.14)', text: '#fbbf24' },
        ai: { DEFAULT: '#a855f7', bg: 'rgba(168,85,247,0.14)', text: '#c084fc' }
      },
      spacing: {
        'safe-b': 'env(safe-area-inset-bottom)',
        'safe-t': 'env(safe-area-inset-top)',
        'bottom-nav': '70px'
      },
      fontFamily: {
        sans: ['Inter', '"Noto Sans Devanagari"', 'system-ui', 'sans-serif']
      },
      boxShadow: {
        nav: '0 -2px 12px rgba(0,0,0,0.25)',
        card: '0 1px 3px rgba(0,0,0,0.2)'
      }
    }
  },
  plugins: []
} satisfies Config
