import { NavLink } from 'react-router-dom'
import { Home, BookOpen, PenLine, ListChecks, TrendingUp } from 'lucide-react'
import { useT } from '@/lib/i18n'

const items = [
  { to: '/', icon: Home, key: 'home' as const },
  { to: '/syllabus', icon: BookOpen, key: 'syllabus' as const },
  { to: '/practice', icon: PenLine, key: 'practice' as const },
  { to: '/mock-tests', icon: ListChecks, key: 'mockTests' as const },
  { to: '/progress', icon: TrendingUp, key: 'progress' as const }
]

export function BottomNav() {
  const t = useT()
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 flex border-t border-gray-200 bg-white sm:hidden">
      {items.map(({ to, icon: Icon, key }) => (
        <NavLink
          key={to}
          to={to}
          end={to === '/'}
          className={({ isActive }) =>
            `flex flex-1 flex-col items-center gap-0.5 py-2 text-[11px] ${isActive ? 'text-brand-700' : 'text-gray-500'}`
          }
        >
          <Icon size={20} />
          <span>{t(key)}</span>
        </NavLink>
      ))}
    </nav>
  )
}
