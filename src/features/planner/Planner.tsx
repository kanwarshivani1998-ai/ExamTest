import { useMemo, useState } from 'react'
import { useLiveQuery } from 'dexie-react-hooks'
import { db } from '@/db/db'
import { useAllTopics } from '@/hooks/useSyllabus'
import { Card, CardContent, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Dialog } from '@/components/ui/Dialog'
import { bi, useLang } from '@/lib/i18n'
import { uid, todayISODate } from '@/lib/utils'
import { isOverdue, isDueToday } from '@/lib/spacedRepetition'
import type { PlannerTask } from '@/types'

export function Planner() {
  const { lang } = useLang()
  const [date, setDate] = useState(todayISODate())
  const [showAdd, setShowAdd] = useState(false)
  const [newTitle, setNewTitle] = useState('')
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null)
  const tasks = useLiveQuery(() => db.plannerTasks.where('date').equals(date).toArray(), [date]) ?? []
  const topics = useAllTopics()

  const recommendations = useMemo(() => {
    const incomplete = topics.find((t) => t.status === 'in_progress' || t.status === 'not_started')
    const weak = topics.find((t) => t.status === 'weak')
    const revisionDue = topics.find((t) => isOverdue(t.nextRevisionAt) || isDueToday(t.nextRevisionAt))
    return [
      incomplete && { label: bi('Continue: ', 'जारी रखें: ', lang) + bi(incomplete.titleEn, incomplete.titleHi, lang), refId: incomplete.id, type: 'topic' as const },
      weak && { label: bi('Revise weak: ', 'कमजोर दोहराएं: ', lang) + bi(weak.titleEn, weak.titleHi, lang), refId: weak.id, type: 'revision' as const },
      revisionDue && { label: bi('Revision due: ', 'पुनरावृत्ति देय: ', lang) + bi(revisionDue.titleEn, revisionDue.titleHi, lang), refId: revisionDue.id, type: 'revision' as const },
      { label: bi('Short practice test (10 Qs)', 'लघु अभ्यास टेस्ट (10 प्रश्न)', lang), type: 'practice' as const },
      { label: bi('Typing session (10 min)', 'टाइपिंग सत्र (10 मिनट)', lang), type: 'typing' as const }
    ].filter(Boolean) as { label: string; refId?: string; type: PlannerTask['type'] }[]
  }, [topics, lang])

  async function addTask(title: string, type: PlannerTask['type'] = 'manual', refId?: string) {
    const task: PlannerTask = { id: uid('task'), date, type, title, refId, completed: false }
    await db.plannerTasks.put(task)
    setNewTitle('')
    setShowAdd(false)
  }
  async function toggleComplete(task: PlannerTask) {
    await db.plannerTasks.update(task.id, { completed: !task.completed })
  }
  async function deleteTask(id: string) {
    await db.plannerTasks.delete(id)
    setConfirmDeleteId(null)
  }

  const completedCount = tasks.filter((t) => t.completed).length

  return (
    <div className="space-y-4 pb-4">
      <h1 className="text-lg font-bold text-white">{bi('Study Planner', 'अध्ययन योजनाकार', lang)}</h1>
      <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="rounded-lg border border-white/20 p-2 text-sm" />

      <Card><CardContent>
        <CardTitle>{bi('Recommended for today', 'आज के लिए अनुशंसित', lang)}</CardTitle>
        <div className="mt-2 flex flex-col gap-2">
          {recommendations.map((r, i) => (
            <div key={i} className="flex items-center justify-between rounded-lg bg-white/10 p-2 text-xs">
              <span>{r.label}</span>
              <Button size="sm" variant="outline" onClick={() => addTask(r.label, r.type, r.refId)}>{bi('Add', 'जोड़ें', lang)}</Button>
            </div>
          ))}
        </div>
      </CardContent></Card>

      <Card><CardContent>
        <div className="mb-2 flex items-center justify-between">
          <CardTitle>{bi('Daily Summary', 'दैनिक सारांश', lang)}</CardTitle>
          <Button size="sm" onClick={() => setShowAdd(true)}>{bi('+ Add Task', '+ कार्य जोड़ें', lang)}</Button>
        </div>
        <p className="text-xs text-gray-400 mb-2">{completedCount}/{tasks.length} {bi('completed', 'पूर्ण', lang)}</p>
        <div className="space-y-2">
          {tasks.length === 0 && <p className="text-xs text-gray-400">{bi('No tasks for this day.', 'इस दिन के लिए कोई कार्य नहीं।', lang)}</p>}
          {tasks.map((t) => (
            <div key={t.id} className="flex items-center justify-between rounded-lg border border-white/10 p-2">
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" checked={t.completed} onChange={() => toggleComplete(t)} />
                <span className={t.completed ? 'line-through text-gray-400' : ''}>{t.title}</span>
              </label>
              <button className="text-xs text-red-500" onClick={() => setConfirmDeleteId(t.id)}>{bi('Delete', 'हटाएं', lang)}</button>
            </div>
          ))}
        </div>
      </CardContent></Card>

      <Dialog open={showAdd} onClose={() => setShowAdd(false)} title={bi('Add Task', 'कार्य जोड़ें', lang)}
        footer={<>
          <Button variant="outline" onClick={() => setShowAdd(false)}>{bi('Cancel', 'रद्द करें', lang)}</Button>
          <Button onClick={() => newTitle && addTask(newTitle)}>{bi('Save', 'सहेजें', lang)}</Button>
        </>}>
        <input autoFocus value={newTitle} onChange={(e) => setNewTitle(e.target.value)} placeholder={bi('Task title...', 'कार्य शीर्षक...', lang)} className="w-full rounded-lg border border-white/20 p-2 text-sm" />
      </Dialog>

      <Dialog open={!!confirmDeleteId} onClose={() => setConfirmDeleteId(null)} title={bi('Delete task?', 'कार्य हटाएं?', lang)}
        footer={<>
          <Button variant="outline" onClick={() => setConfirmDeleteId(null)}>{bi('Cancel', 'रद्द करें', lang)}</Button>
          <Button variant="destructive" onClick={() => confirmDeleteId && deleteTask(confirmDeleteId)}>{bi('Delete', 'हटाएं', lang)}</Button>
        </>}>
        {bi('This cannot be undone.', 'यह पूर्ववत नहीं किया जा सकता।', lang)}
      </Dialog>
    </div>
  )
}
