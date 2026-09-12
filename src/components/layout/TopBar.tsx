import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { useT } from '@/lib/i18n'
import { Button } from '@/components/ui/Button'

const moreItems = [
  { to: '/ai-mock', key: 'aiMockTest' as const },
  { to: '/important-questions', key: 'importantQuestions' as const },
  { to: '/typing', key: 'typingPractice' as const },
  { to: '/rajasthan-gk', key: 'rajasthanGK' as const },
  { to: '/current-affairs', key: 'currentAffairs' as const },
  { to: '/bookmarks', key: 'bookmarks' as const },
  { to: '/wrong-questions', key: 'wrongQuestions' as const },
  { to: '/revision', key: 'revision' as const },
  { to: '/planner', key: 'studyPlanner' as const },
  { to: '/notes', key: 'notes' as const },
  { to: '/results', key: 'testHistory' as const },
  { to: '/ai-results', key: 'aiTestHistory' as const },
  { to: '/backup', key: 'dataBackup' as const },
  { to: '/settings', key: 'settings' as const },
  { to: '/about', key: 'about' as const }
]

export function TopBar() {
  const t = useT()
  const [open, setOpen] = useState(false)
  return (
    <header className="sticky top-0 z-30 flex items-center justify-between border-b border-gray-200 bg-white px-4 py-3 sm:hidden">
      <span className="font-bold text-brand-800">RVUNL Prep</span>
      <Button variant="ghost" size="icon" onClick={() => setOpen((o) => !o)} aria-label="more menu">
        {open ? <X size={20} /> : <Menu size={20} />}
      </Button>
      {open && (
        <div className="absolute right-2 top-14 z-40 max-h-[70vh] w-64 overflow-y-auto rounded-xl border border-gray-200 bg-white p-2 shadow-lg">
          {moreItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `block rounded-lg px-3 py-2 text-sm ${isActive ? 'bg-brand-50 text-brand-800' : 'text-gray-700 hover:bg-gray-50'}`
              }
            >
              {t(item.key)}
            </NavLink>
          ))}
        </div>
      )}
    </header>
  )
}
