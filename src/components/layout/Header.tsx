import { GraduationCap } from 'lucide-react'
import { useLang, bi } from '@/lib/i18n'
import type { LangMode } from '@/types'

const cycle: Record<LangMode, LangMode> = { en: 'hi', hi: 'both', both: 'en' }
const labels: Record<LangMode, string> = { en: 'EN', hi: 'HI', both: 'HI + EN' }

export function Header() {
  const { lang, setLang } = useLang()
  return (
    <header className="sticky top-0 z-30 flex items-center justify-between bg-gradient-to-r from-brand-800 to-brand-700 px-4 py-3 shadow-md">
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/15">
          <GraduationCap size={24} className="text-white" />
        </div>
        <div>
          <p className="text-sm font-bold leading-tight text-white">{bi('RVUNL Junior Assistant', 'RVUNL कनिष्ठ सहायक', lang)}</p>
          <p className="text-xs leading-tight text-white/70">{bi('Exam Prep', 'परीक्षा तैयारी', lang)}</p>
        </div>
      </div>
      <button
        onClick={() => setLang(cycle[lang])}
        className="rounded-full bg-white/15 px-3 py-1.5 text-xs font-semibold text-white hover:bg-white/25"
      >
        {labels[lang]}
      </button>
    </header>
  )
}
