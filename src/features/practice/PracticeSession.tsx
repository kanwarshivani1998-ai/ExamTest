import { useMemo, useState } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { useAllQuestions, pickQuestions, recordAttempt, toggleQuestionBookmark, toggleQuestionImportant, setQuestionNote } from '@/hooks/useQuestions'
import { useAllTopics, addStudyMinutes } from '@/hooks/useSyllabus'
import { useQuestionStats } from '@/hooks/useQuestions'
import { Card, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { bi, useLang } from '@/lib/i18n'
import { Bookmark, Star, Flag } from 'lucide-react'
import type { Question } from '@/types'

export function PracticeSession() {
  const { lang } = useLang()
  const [params] = useSearchParams()
  const navigate = useNavigate()
  const allQuestions = useAllQuestions()
  const allTopics = useAllTopics()
  const stats = useQuestionStats()

  const topicId = params.get('topic') ?? ''
  const subjectId = params.get('subject') ?? ''
  const mode = params.get('mode') ?? '' // weak | wrong | bookmarked | important | random

  const [count, setCount] = useState(10)
  const [difficulty, setDifficulty] = useState<'all' | 'easy' | 'medium' | 'hard'>('all')
  const [showAnswerImmediately, setShowAnswerImmediately] = useState(true)
  const [started, setStarted] = useState(false)
  const [sessionQuestions, setSessionQuestions] = useState<Question[]>([])
  const [index, setIndex] = useState(0)
  const [selected, setSelected] = useState<number | null>(null)
  const [revealed, setRevealed] = useState(false)
  const [correctCount, setCorrectCount] = useState(0)
  const [note, setNote] = useState('')

  const pool = useMemo(() => {
    let list = allQuestions
    if (topicId) list = list.filter((q) => q.topicId === topicId)
    else if (subjectId) list = list.filter((q) => q.subjectId === subjectId)
    if (difficulty !== 'all') list = list.filter((q) => q.difficulty === difficulty)
    if (mode === 'weak') {
      const weakTopicIds = new Set(allTopics.filter((t) => t.status === 'weak').map((t) => t.id))
      list = list.filter((q) => weakTopicIds.has(q.topicId))
    } else if (mode === 'bookmarked') {
      const bookmarkedIds = new Set(stats.filter((s) => s.bookmarked).map((s) => s.questionId))
      list = list.filter((q) => bookmarkedIds.has(q.id))
    } else if (mode === 'important') {
      const importantIds = new Set(stats.filter((s) => s.markedImportant).map((s) => s.questionId))
      list = list.filter((q) => importantIds.has(q.id))
    } else if (mode === 'wrong') {
      const wrongIds = new Set(stats.filter((s) => s.wrongStreak > 0).map((s) => s.questionId))
      list = list.filter((q) => wrongIds.has(q.id))
    }
    return list
  }, [allQuestions, topicId, subjectId, difficulty, mode, allTopics, stats])

  function start() {
    const qs = pickQuestions(pool, count)
    setSessionQuestions(qs)
    setIndex(0)
    setSelected(null)
    setRevealed(false)
    setCorrectCount(0)
    setStarted(true)
  }

  const current = sessionQuestions[index]
  const currentStat = current ? stats.find((s) => s.questionId === current.id) : undefined

  async function selectOption(i: number) {
    if (revealed) return
    setSelected(i)
    if (current) {
      const isCorrect = i === current.correctIndex
      await recordAttempt(current.id, isCorrect)
      if (isCorrect) setCorrectCount((c) => c + 1)
    }
    if (showAnswerImmediately) setRevealed(true)
  }

  function nextQuestion() {
    if (index < sessionQuestions.length - 1) {
      setIndex((i) => i + 1)
      setSelected(null)
      setRevealed(false)
      setNote('')
    } else {
      finish()
    }
  }

  async function finish() {
    if (current?.topicId) await addStudyMinutes(current.topicId, Math.max(1, sessionQuestions.length))
    setStarted(false)
  }

  if (!started) {
    return (
      <div className="space-y-4 pb-4">
        <h1 className="text-lg font-bold text-gray-900">{bi('Practice', 'अभ्यास', lang)}</h1>
        <Card>
          <CardContent className="space-y-3">
            <p className="text-sm text-gray-600">
              {bi('Available questions', 'उपलब्ध प्रश्न', lang)}: {pool.length}
            </p>
            <div>
              <label className="text-xs text-gray-600">{bi('Number of questions', 'प्रश्नों की संख्या', lang)}</label>
              <div className="mt-1 flex flex-wrap gap-2">
                {[5, 10, 20, 50].map((n) => (
                  <button key={n} onClick={() => setCount(n)} className={`rounded-lg border px-3 py-1 text-sm ${count === n ? 'border-brand-600 bg-brand-50' : 'border-gray-200'}`}>{n}</button>
                ))}
                <input type="number" className="w-20 rounded-lg border border-gray-200 px-2 text-sm" value={count} onChange={(e) => setCount(parseInt(e.target.value, 10) || 1)} />
              </div>
            </div>
            <div>
              <label className="text-xs text-gray-600">{bi('Difficulty', 'कठिनाई', lang)}</label>
              <div className="mt-1 flex gap-2">
                {(['all', 'easy', 'medium', 'hard'] as const).map((d) => (
                  <button key={d} onClick={() => setDifficulty(d)} className={`rounded-lg border px-3 py-1 text-sm capitalize ${difficulty === d ? 'border-brand-600 bg-brand-50' : 'border-gray-200'}`}>{d}</button>
                ))}
              </div>
            </div>
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" checked={showAnswerImmediately} onChange={(e) => setShowAnswerImmediately(e.target.checked)} />
              {bi('Show answer immediately', 'तुरंत उत्तर दिखाएं', lang)}
            </label>
            <Button disabled={pool.length === 0} onClick={start}>{bi('Start Practice', 'अभ्यास शुरू करें', lang)}</Button>
            {pool.length === 0 && <p className="text-xs text-red-600">{bi('No questions match this selection.', 'इस चयन से कोई प्रश्न मेल नहीं खाता।', lang)}</p>}
          </CardContent>
        </Card>
      </div>
    )
  }

  if (!current) {
    return (
      <div className="space-y-4 pb-4">
        <Card><CardContent>
          <p className="text-lg font-semibold">{bi('Session complete!', 'सत्र पूर्ण!', lang)}</p>
          <p className="mt-2 text-sm text-gray-600">{correctCount}/{sessionQuestions.length} {bi('correct', 'सही', lang)}</p>
          <Button className="mt-3" onClick={() => navigate('/practice')}>{bi('Back', 'वापस', lang)}</Button>
        </CardContent></Card>
      </div>
    )
  }

  return (
    <div className="space-y-4 pb-4">
      <div className="flex items-center justify-between text-sm text-gray-600">
        <span>{index + 1} / {sessionQuestions.length}</span>
        <span>{bi('Score', 'स्कोर', lang)}: {correctCount}</span>
      </div>
      <Card>
        <CardContent className="space-y-3">
          <div className="flex items-start justify-between gap-2">
            <p className="text-sm font-medium text-gray-900">{bi(current.questionEn, current.questionHi, lang)}</p>
            <div className="flex shrink-0 gap-2">
              <button onClick={() => toggleQuestionBookmark(current.id, !currentStat?.bookmarked)}>
                <Bookmark size={18} className={currentStat?.bookmarked ? 'fill-brand-600 text-brand-600' : 'text-gray-300'} />
              </button>
              <button onClick={() => toggleQuestionImportant(current.id, !currentStat?.markedImportant)}>
                <Star size={18} className={currentStat?.markedImportant ? 'fill-amber-500 text-amber-500' : 'text-gray-300'} />
              </button>
            </div>
          </div>
          {current.sourceType === 'sample' && <Badge tone="info">{bi('Sample Question', 'अभ्यास प्रश्न', lang)}</Badge>}
          {current.sourceType === 'ai' && <Badge tone="warning">{bi('AI-generated — unverified', 'एआई-जनित — असत्यापित', lang)}</Badge>}

          <div className="space-y-2">
            {current.optionsEn.map((optEn, i) => {
              const isCorrectOpt = i === current.correctIndex
              const isSelected = selected === i
              let cls = 'border-gray-200'
              if (revealed && isCorrectOpt) cls = 'border-emerald-500 bg-emerald-50'
              else if (revealed && isSelected && !isCorrectOpt) cls = 'border-red-500 bg-red-50'
              else if (isSelected) cls = 'border-brand-500 bg-brand-50'
              return (
                <button key={i} onClick={() => selectOption(i)} className={`w-full rounded-lg border p-3 text-left text-sm ${cls}`}>
                  {bi(optEn, current.optionsHi[i], lang)}
                </button>
              )
            })}
          </div>

          {revealed && (
            <div className="rounded-lg bg-gray-50 p-3 text-xs text-gray-700">
              <p className="font-semibold">{bi('Explanation', 'व्याख्या', lang)}</p>
              <p>{bi(current.explanationEn, current.explanationHi, lang)}</p>
            </div>
          )}

          <textarea
            placeholder={bi('Add a note...', 'नोट जोड़ें...', lang)}
            className="w-full rounded-lg border border-gray-200 p-2 text-xs"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            onBlur={() => note && setQuestionNote(current.id, note)}
          />

          <div className="flex items-center justify-between">
            <button className="flex items-center gap-1 text-xs text-gray-500"><Flag size={14} /> {bi('Report question', 'प्रश्न रिपोर्ट करें', lang)}</button>
            <div className="flex gap-2">
              {!revealed && <Button variant="outline" size="sm" onClick={() => setRevealed(true)}>{bi('Show Answer', 'उत्तर दिखाएं', lang)}</Button>}
              <Button size="sm" onClick={nextQuestion}>
                {index < sessionQuestions.length - 1 ? bi('Next', 'अगला', lang) : bi('Finish', 'समाप्त करें', lang)}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
