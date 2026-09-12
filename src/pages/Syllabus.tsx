import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useSubjects, useChapters, useAllTopics, updateTopic, setTopicStatus, toggleTopicBookmark } from '@/hooks/useSyllabus'
import { Card, CardContent } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { bi, useLang } from '@/lib/i18n'
import { Bookmark, ChevronDown, ChevronUp } from 'lucide-react'
import type { Confidence, Importance, Topic, TopicStatus } from '@/types'

const STATUS_LABEL: Record<TopicStatus, [string, string]> = {
  not_started: ['Not Started', 'शुरू नहीं किया'],
  in_progress: ['In Progress', 'पढ़ाई जारी'],
  completed: ['Completed', 'पूरा हुआ'],
  weak: ['Weak Topic', 'कमजोर विषय'],
  revision_needed: ['Revision Needed', 'पुनरावृत्ति आवश्यक']
}

export function Syllabus() {
  const { lang } = useLang()
  const [params] = useSearchParams()
  const subjects = useSubjects()
  const allTopics = useAllTopics()
  const allChapters = useChapters()

  const [search, setSearch] = useState('')
  const [subjectFilter, setSubjectFilter] = useState(params.get('subject') ?? '')
  const [statusFilter, setStatusFilter] = useState<TopicStatus | ''>('')
  const [confidenceFilter, setConfidenceFilter] = useState<Confidence | ''>('')
  const [importanceFilter, setImportanceFilter] = useState<Importance | ''>('')
  const [weakOnly, setWeakOnly] = useState(false)
  const [sortBy, setSortBy] = useState<'order' | 'completion' | 'priority' | 'lastStudied'>('order')
  const [collapsedChapters, setCollapsedChapters] = useState<Record<string, boolean>>({})
  const [expandAll, setExpandAll] = useState(true)

  const filtered = useMemo(() => {
    let list = allTopics
    if (search.trim()) {
      const q = search.trim().toLowerCase()
      list = list.filter((t) => t.titleEn.toLowerCase().includes(q) || t.titleHi.includes(q))
    }
    if (subjectFilter) list = list.filter((t) => t.subjectId === subjectFilter)
    if (statusFilter) list = list.filter((t) => t.status === statusFilter)
    if (confidenceFilter) list = list.filter((t) => t.confidence === confidenceFilter)
    if (importanceFilter) list = list.filter((t) => t.importance === importanceFilter)
    if (weakOnly) list = list.filter((t) => t.status === 'weak')

    const withOrder = [...list]
    if (sortBy === 'completion') withOrder.sort((a, b) => Number(a.status === 'completed') - Number(b.status === 'completed'))
    else if (sortBy === 'priority') {
      const order: Record<Importance, number> = { high_priority: 0, important: 1, normal: 2 }
      withOrder.sort((a, b) => order[a.importance] - order[b.importance])
    } else if (sortBy === 'lastStudied') {
      withOrder.sort((a, b) => new Date(b.lastStudiedAt ?? 0).getTime() - new Date(a.lastStudiedAt ?? 0).getTime())
    }
    return withOrder
  }, [allTopics, search, subjectFilter, statusFilter, confidenceFilter, importanceFilter, weakOnly, sortBy])

  const chaptersToShow = allChapters.filter((c) => filtered.some((t) => t.chapterId === c.id))

  function clearFilters() {
    setSearch(''); setSubjectFilter(''); setStatusFilter(''); setConfidenceFilter('')
    setImportanceFilter(''); setWeakOnly(false); setSortBy('order')
  }

  const chips: { label: string; onRemove: () => void }[] = []
  if (search) chips.push({ label: `"${search}"`, onRemove: () => setSearch('') })
  if (subjectFilter) chips.push({ label: subjects.find((s) => s.id === subjectFilter)?.titleEn ?? subjectFilter, onRemove: () => setSubjectFilter('') })
  if (statusFilter) chips.push({ label: STATUS_LABEL[statusFilter][0], onRemove: () => setStatusFilter('') })
  if (confidenceFilter) chips.push({ label: confidenceFilter, onRemove: () => setConfidenceFilter('') })
  if (importanceFilter) chips.push({ label: importanceFilter, onRemove: () => setImportanceFilter('') })
  if (weakOnly) chips.push({ label: 'Weak only', onRemove: () => setWeakOnly(false) })

  return (
    <div className="space-y-4 pb-4">
      <h1 className="text-lg font-bold text-white">{bi('Syllabus', 'पाठ्यक्रम', lang)}</h1>

      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder={bi('Search topics...', 'विषय खोजें...', lang)}
        className="w-full rounded-xl border border-white/20 p-3 text-sm"
      />

      <div className="flex flex-wrap gap-2">
        <select className="rounded-lg border border-white/20 p-2 text-xs" value={subjectFilter} onChange={(e) => setSubjectFilter(e.target.value)}>
          <option value="">{bi('All subjects', 'सभी विषय', lang)}</option>
          {subjects.map((s) => <option key={s.id} value={s.id}>{bi(s.titleEn, s.titleHi, lang)}</option>)}
        </select>
        <select className="rounded-lg border border-white/20 p-2 text-xs" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value as TopicStatus | '')}>
          <option value="">{bi('All statuses', 'सभी स्थितियां', lang)}</option>
          {Object.entries(STATUS_LABEL).map(([k, [en, hi]]) => <option key={k} value={k}>{bi(en, hi, lang)}</option>)}
        </select>
        <select className="rounded-lg border border-white/20 p-2 text-xs" value={confidenceFilter} onChange={(e) => setConfidenceFilter(e.target.value as Confidence | '')}>
          <option value="">{bi('All confidence', 'सभी आत्मविश्वास', lang)}</option>
          <option value="low">Low</option><option value="medium">Medium</option><option value="high">High</option>
        </select>
        <select className="rounded-lg border border-white/20 p-2 text-xs" value={importanceFilter} onChange={(e) => setImportanceFilter(e.target.value as Importance | '')}>
          <option value="">{bi('All importance', 'सभी महत्व', lang)}</option>
          <option value="normal">Normal</option><option value="important">Important</option><option value="high_priority">High Priority</option>
        </select>
        <select className="rounded-lg border border-white/20 p-2 text-xs" value={sortBy} onChange={(e) => setSortBy(e.target.value as typeof sortBy)}>
          <option value="order">{bi('Sort: Syllabus order', 'क्रम: पाठ्यक्रम', lang)}</option>
          <option value="completion">{bi('Sort: Completion', 'क्रम: पूर्णता', lang)}</option>
          <option value="priority">{bi('Sort: Priority', 'क्रम: प्राथमिकता', lang)}</option>
          <option value="lastStudied">{bi('Sort: Last studied', 'क्रम: अंतिम अध्ययन', lang)}</option>
        </select>
        <label className="flex items-center gap-1 rounded-lg border border-white/20 p-2 text-xs">
          <input type="checkbox" checked={weakOnly} onChange={(e) => setWeakOnly(e.target.checked)} /> {bi('Weak only', 'केवल कमजोर', lang)}
        </label>
        <Button size="sm" variant="outline" onClick={clearFilters}>{bi('Clear Filters', 'फ़िल्टर हटाएं', lang)}</Button>
        <Button size="sm" variant="outline" onClick={() => { setExpandAll((v) => !v); setCollapsedChapters({}) }}>
          {expandAll ? bi('Collapse All', 'सभी संक्षिप्त करें', lang) : bi('Expand All', 'सभी विस्तृत करें', lang)}
        </Button>
      </div>

      {chips.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {chips.map((c, i) => (
            <button key={i} onClick={c.onRemove} className="rounded-full bg-brand-500/30 px-3 py-1 text-xs text-brand-200">
              {c.label} ✕
            </button>
          ))}
        </div>
      )}

      <div className="space-y-3">
        {chaptersToShow.map((chapter) => {
          const chapterTopics = filtered.filter((t) => t.chapterId === chapter.id)
          const isCollapsed = expandAll ? (collapsedChapters[chapter.id] ?? false) : !(collapsedChapters[chapter.id] ?? false)
          return (
            <Card key={chapter.id}>
              <button
                className="flex w-full items-center justify-between p-3 text-left"
                onClick={() => setCollapsedChapters((c) => ({ ...c, [chapter.id]: !(expandAll ? c[chapter.id] : !c[chapter.id]) }))}
              >
                <span className="text-sm font-semibold text-white">{bi(chapter.titleEn, chapter.titleHi, lang)}</span>
                {isCollapsed ? <ChevronDown size={16} /> : <ChevronUp size={16} />}
              </button>
              {!isCollapsed && (
                <CardContent className="space-y-2 pt-0">
                  {chapterTopics.map((topic) => (
                    <TopicRow key={topic.id} topic={topic} lang={lang} />
                  ))}
                </CardContent>
              )}
            </Card>
          )
        })}
        {chaptersToShow.length === 0 && <p className="text-sm text-gray-400">{bi('No topics match your filters.', 'आपके फ़िल्टर से कोई विषय मेल नहीं खाता।', lang)}</p>}
      </div>
    </div>
  )
}

function TopicRow({ topic, lang }: { topic: Topic; lang: 'en' | 'hi' | 'both' }) {
  const [en, hi] = STATUS_LABEL[topic.status]
  return (
    <div className="rounded-lg border border-white/10 p-2">
      <div className="flex items-center justify-between gap-2">
        <div>
          <p className="text-sm font-medium text-white">{bi(topic.titleEn, topic.titleHi, lang)}</p>
          <div className="mt-1 flex flex-wrap gap-1">
            <Badge tone={topic.status === 'completed' ? 'success' : topic.status === 'weak' ? 'danger' : 'default'}>{bi(en, hi, lang)}</Badge>
            {topic.importance !== 'normal' && <Badge tone="warning">{topic.importance}</Badge>}
          </div>
        </div>
        <button onClick={() => toggleTopicBookmark(topic.id, !topic.bookmarked)}>
          <Bookmark size={18} className={topic.bookmarked ? 'fill-brand-600 text-brand-600' : 'text-gray-300'} />
        </button>
      </div>
      <div className="mt-2 flex flex-wrap gap-2">
        <Button size="sm" variant="secondary" onClick={() => window.location.assign(`#/practice?topic=${topic.id}`)}>Start Practice</Button>
        <Button size="sm" variant="outline" onClick={() => setTopicStatus(topic.id, 'completed')}>Mark Complete</Button>
        <Button size="sm" variant="outline" onClick={() => setTopicStatus(topic.id, 'weak')}>Mark Weak</Button>
        <select
          className="rounded-md border border-white/10 text-xs"
          value={topic.status}
          onChange={(e) => updateTopic(topic.id, { status: e.target.value as TopicStatus })}
        >
          {Object.entries(STATUS_LABEL).map(([k, [en2]]) => <option key={k} value={k}>{en2}</option>)}
        </select>
      </div>
    </div>
  )
}
