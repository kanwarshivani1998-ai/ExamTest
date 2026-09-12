import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAllTopics, updateTopic } from '@/hooks/useSyllabus'
import { nextRevisionDate, isOverdue, isDueToday, type RevisionGrade } from '@/lib/spacedRepetition'
import { Card, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { bi, useLang } from '@/lib/i18n'

type ViewTab = 'overdue' | 'due_today' | 'upcoming' | 'completed'

export function Revision() {
  const { lang } = useLang()
  const navigate = useNavigate()
  const topics = useAllTopics()
  const [tab, setTab] = useState<ViewTab>('overdue')
  const [stepIndices, setStepIndices] = useState<Record<string, number>>({})

  const withRevision = topics.filter((t) => t.nextRevisionAt || t.status === 'revision_needed' || t.status === 'weak')

  const overdue = withRevision.filter((t) => isOverdue(t.nextRevisionAt))
  const dueToday = withRevision.filter((t) => isDueToday(t.nextRevisionAt))
  const upcoming = withRevision.filter((t) => t.nextRevisionAt && !isOverdue(t.nextRevisionAt) && !isDueToday(t.nextRevisionAt))
  const completed = topics.filter((t) => t.status === 'completed' && t.nextRevisionAt && new Date(t.nextRevisionAt) < new Date())

  const list = { overdue, due_today: dueToday, upcoming, completed }[tab]

  async function grade(topicId: string, g: RevisionGrade) {
    const step = stepIndices[topicId] ?? 0
    const { date, stepIndex } = nextRevisionDate(step, g)
    setStepIndices((s) => ({ ...s, [topicId]: stepIndex }))
    await updateTopic(topicId, { nextRevisionAt: date, status: g === 'again' ? 'weak' : 'revision_needed' })
  }

  return (
    <div className="space-y-3 pb-4">
      <h1 className="text-lg font-bold text-white">{bi('Revision', 'पुनरावृत्ति', lang)}</h1>
      <div className="flex gap-2 overflow-x-auto">
        {(['overdue', 'due_today', 'upcoming', 'completed'] as ViewTab[]).map((t) => (
          <button key={t} onClick={() => setTab(t)} className={`shrink-0 rounded-lg border px-3 py-1.5 text-xs capitalize ${tab === t ? 'border-brand-600 bg-brand-500/20' : 'border-white/10'}`}>
            {t.replace('_', ' ')}
          </button>
        ))}
      </div>
      {list.length === 0 && <p className="text-sm text-gray-400">{bi('Nothing here right now.', 'अभी यहां कुछ नहीं है।', lang)}</p>}
      {list.map((t) => (
        <Card key={t.id}><CardContent>
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium">{bi(t.titleEn, t.titleHi, lang)}</p>
            {t.status === 'weak' && <Badge tone="danger">{bi('Weak', 'कमजोर', lang)}</Badge>}
          </div>
          <div className="mt-2 flex flex-wrap gap-2">
            <Button size="sm" variant="destructive" onClick={() => grade(t.id, 'again')}>Again</Button>
            <Button size="sm" variant="outline" onClick={() => grade(t.id, 'hard')}>Hard</Button>
            <Button size="sm" variant="secondary" onClick={() => grade(t.id, 'good')}>Good</Button>
            <Button size="sm" onClick={() => grade(t.id, 'easy')}>Easy</Button>
            <Button size="sm" variant="ghost" onClick={() => navigate(`/practice?topic=${t.id}`)}>{bi('Start Practice', 'अभ्यास शुरू करें', lang)}</Button>
          </div>
        </CardContent></Card>
      ))}
    </div>
  )
}
