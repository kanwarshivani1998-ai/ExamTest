import { NavLink } from 'react-router-dom'
import { Home, BookOpen, ListChecks, TrendingUp, Menu } from 'lucide-react'
import { useT } from '@/lib/i18n'

const items = [
  { to: '/', icon: Home, key: 'home' as const },
  { to: '/syllabus', icon: BookOpen, key: 'syllabus' as const },
  { to: '/mock-tests', icon: ListChecks, key: 'mockTests' as const },
  { to: '/progress', icon: TrendingUp, key: 'progress' as const },
  { to: '/more', icon: Menu, key: 'more' as const }
]

export function BottomNav() {
  const t = useT()
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 flex border-t border-white/10 bg-[#0f2140]/95 backdrop-blur">
      {items.map(({ to, icon: Icon, key }) => (
        <NavLink
          key={to}
          to={to}
          end={to === '/'}
          className={({ isActive }) =>
            `flex flex-1 flex-col items-center gap-0.5 py-2 text-[11px] ${isActive ? 'text-brand-300' : 'text-gray-400'}`
          }
        >
          <Icon size={20} />
          <span>{t(key)}</span>
        </NavLink>
      ))}
    </nav>
  )
}
