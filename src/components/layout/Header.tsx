import { GraduationCap, Languages } from 'lucide-react'
import { useLang, bi } from '@/lib/i18n'
import type { LangMode } from '@/types'

const cycle: Record<LangMode, LangMode> = { en: 'hi', hi: 'both', both: 'en' }
const labels: Record<LangMode, string> = { en: 'EN', hi: 'HI', both: 'HI+EN' }

export function Header() {
  const { lang, setLang } = useLang()
  return (
    <header
      className="sticky top-0 z-30 flex h-16 items-center justify-between gap-2 bg-gradient-to-r from-brand-800 to-brand-700 px-4 shadow-md"
      style={{ paddingTop: 'env(safe-area-inset-top)' }}
    >
      <div className="flex min-w-0 items-center gap-2.5">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/15">
          <GraduationCap size={20} className="text-white" />
        </div>
        <div className="min-w-0">
          <p className="truncate text-sm font-bold leading-tight text-white">RVUNL Junior Assistant</p>
          <p className="truncate text-[11px] leading-tight text-white/70">{bi('Exam Prep', 'परीक्षा तैयारी', lang)}</p>
        </div>
      </div>
      <button
        onClick={() => setLang(cycle[lang])}
        aria-label="Toggle language"
        className="flex shrink-0 items-center gap-1 rounded-full bg-white/15 px-2.5 py-1.5 text-[11px] font-semibold text-white hover:bg-white/25"
      >
        <Languages size={13} />
        {labels[lang]}
      </button>
    </header>
  )
}
