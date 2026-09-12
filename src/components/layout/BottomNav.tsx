import { NavLink, useLocation } from 'react-router-dom'
import { NAV_ITEMS, navLabel } from '@/components/navigation/navigationConfig'
import { useLang } from '@/lib/i18n'

export function BottomNav() {
  const { lang } = useLang()
  const location = useLocation()

  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-40 flex border-t border-white/10 bg-[#0f2140]/95 shadow-nav backdrop-blur md:hidden"
      aria-label="Primary"
    >
      <div className="mx-auto flex w-full max-w-5xl" style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}>
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon
          const isActive = item.to === '/' ? location.pathname === '/' : location.pathname.startsWith(item.to)
          return (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              aria-current={isActive ? 'page' : undefined}
              className="flex h-[68px] flex-1 flex-col items-center justify-center gap-0.5 px-1"
            >
              <span
                className={`flex h-8 w-11 items-center justify-center rounded-full transition-colors ${
                  isActive ? 'bg-brand-500/25 text-brand-300' : 'text-gray-400'
                }`}
              >
                <Icon size={20} />
              </span>
              <span
                className={`w-full truncate whitespace-nowrap text-center text-[10px] leading-none ${
                  isActive ? 'font-semibold text-brand-200' : 'text-gray-400'
                }`}
              >
                {navLabel(item, lang)}
              </span>
              <span className={`mt-0.5 h-1 w-1 rounded-full ${isActive ? 'bg-brand-400' : 'bg-transparent'}`} />
            </NavLink>
          )
        })}
      </div>
    </nav>
  )
}
