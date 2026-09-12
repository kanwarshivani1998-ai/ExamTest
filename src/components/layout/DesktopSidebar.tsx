import { NavLink, useLocation } from 'react-router-dom'
import { GraduationCap } from 'lucide-react'
import { NAV_ITEMS } from '@/components/navigation/navigationConfig'
import { bi, useLang } from '@/lib/i18n'

export function DesktopSidebar() {
  const { lang } = useLang()
  const location = useLocation()

  return (
    <aside className="fixed inset-y-0 left-0 z-30 hidden w-60 flex-col border-r border-white/10 bg-[#0f2140] md:flex">
      <div className="flex items-center gap-3 border-b border-white/10 px-5 py-4">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/15">
          <GraduationCap size={20} className="text-white" />
        </div>
        <div>
          <p className="text-sm font-bold leading-tight text-white">RVUNL JA</p>
          <p className="text-[11px] leading-tight text-white/60">{bi('Exam Prep', 'परीक्षा तैयारी', lang)}</p>
        </div>
      </div>
      <nav className="flex-1 space-y-1 p-3">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon
          const isActive = item.to === '/' ? location.pathname === '/' : location.pathname.startsWith(item.to)
          return (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              aria-current={isActive ? 'page' : undefined}
              className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${
                isActive ? 'bg-brand-500/20 text-brand-200' : 'text-gray-300 hover:bg-white/5'
              }`}
            >
              <Icon size={19} />
              {bi(item.labelEn, item.labelHi, lang)}
            </NavLink>
          )
        })}
      </nav>
    </aside>
  )
}
