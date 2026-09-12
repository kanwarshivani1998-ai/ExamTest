import { NavLink } from 'react-router-dom'
import {
  Home, BookOpen, PenLine, ListChecks, TrendingUp, Sparkles, Star, Keyboard,
  Bookmark, XCircle, RefreshCcw, CalendarDays, NotebookPen, History, DatabaseBackup, Settings, Info
} from 'lucide-react'
import { useT } from '@/lib/i18n'

const primary = [
  { to: '/', icon: Home, key: 'home' as const },
  { to: '/syllabus', icon: BookOpen, key: 'syllabus' as const },
  { to: '/practice', icon: PenLine, key: 'practice' as const },
  { to: '/mock-tests', icon: ListChecks, key: 'mockTests' as const },
  { to: '/progress', icon: TrendingUp, key: 'progress' as const }
]

const secondary = [
  { to: '/ai-mock', icon: Sparkles, key: 'aiMockTest' as const },
  { to: '/important-questions', icon: Star, key: 'importantQuestions' as const },
  { to: '/typing', icon: Keyboard, key: 'typingPractice' as const },
  { to: '/bookmarks', icon: Bookmark, key: 'bookmarks' as const },
  { to: '/wrong-questions', icon: XCircle, key: 'wrongQuestions' as const },
  { to: '/revision', icon: RefreshCcw, key: 'revision' as const },
  { to: '/planner', icon: CalendarDays, key: 'studyPlanner' as const },
  { to: '/notes', icon: NotebookPen, key: 'notes' as const },
  { to: '/results', icon: History, key: 'testHistory' as const },
  { to: '/backup', icon: DatabaseBackup, key: 'dataBackup' as const },
  { to: '/settings', icon: Settings, key: 'settings' as const },
  { to: '/about', icon: Info, key: 'about' as const }
]

export function Sidebar() {
  const t = useT()
  return (
    <aside className="hidden sm:flex sm:w-60 sm:flex-col sm:border-r sm:border-gray-200 sm:bg-white sm:h-screen sm:sticky sm:top-0 sm:overflow-y-auto">
      <div className="p-4 font-bold text-brand-800 text-lg">RVUNL Prep</div>
      <nav className="flex flex-col gap-0.5 px-2">
        {[...primary, ...secondary].map(({ to, icon: Icon, key }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-lg px-3 py-2 text-sm ${
                isActive ? 'bg-brand-50 text-brand-800 font-medium' : 'text-gray-600 hover:bg-gray-50'
              }`
            }
          >
            <Icon size={18} />
            {t(key)}
          </NavLink>
        ))}
      </nav>
    </aside>
  )
}
