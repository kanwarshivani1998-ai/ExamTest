import { Link } from 'react-router-dom'
import {
  PenLine, Sparkles, Star, Keyboard, MapPin, Newspaper, Bookmark, XCircle,
  RefreshCcw, CalendarDays, NotebookPen, History, DatabaseBackup, Settings, Info,
  type LucideIcon
} from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { bi, useLang, useT } from '@/lib/i18n'

const items: { to: string; icon: LucideIcon; key: Parameters<ReturnType<typeof useT>>[0] }[] = [
  { to: '/practice', icon: PenLine, key: 'practice' },
  { to: '/ai-mock', icon: Sparkles, key: 'aiMockTest' },
  { to: '/important-questions', icon: Star, key: 'importantQuestions' },
  { to: '/typing', icon: Keyboard, key: 'typingPractice' },
  { to: '/rajasthan-gk', icon: MapPin, key: 'rajasthanGK' },
  { to: '/current-affairs', icon: Newspaper, key: 'currentAffairs' },
  { to: '/bookmarks', icon: Bookmark, key: 'bookmarks' },
  { to: '/wrong-questions', icon: XCircle, key: 'wrongQuestions' },
  { to: '/revision', icon: RefreshCcw, key: 'revision' },
  { to: '/planner', icon: CalendarDays, key: 'studyPlanner' },
  { to: '/notes', icon: NotebookPen, key: 'notes' },
  { to: '/results', icon: History, key: 'testHistory' },
  { to: '/ai-results', icon: History, key: 'aiTestHistory' },
  { to: '/backup', icon: DatabaseBackup, key: 'dataBackup' },
  { to: '/settings', icon: Settings, key: 'settings' },
  { to: '/about', icon: Info, key: 'about' }
]

export function More() {
  const { lang } = useLang()
  const t = useT()
  return (
    <div className="space-y-4 pb-4">
      <h1 className="text-lg font-bold text-white">{bi('More', 'अन्य', lang)}</h1>
      <div className="grid grid-cols-2 gap-3">
        {items.map(({ to, icon: Icon, key }) => (
          <Link key={to} to={to}>
            <Card className="flex h-full flex-col gap-2 p-4">
              <Icon size={26} className="text-brand-300" />
              <span className="text-sm font-semibold text-white">{t(key)}</span>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
