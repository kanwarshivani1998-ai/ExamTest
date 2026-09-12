import { useMemo, useState, type ReactNode } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { useAllQuestions, pickQuestions, recordAttempt, toggleQuestionBookmark, toggleQuestionImportant, setQuestionNote } from '@/hooks/useQuestions'
import { useAllTopics, addStudyMinutes } from '@/hooks/useSyllabus'
import { useQuestionStats } from '@/hooks/useQuestions'
import { Card, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { EmptyState } from '@/components/ui/EmptyState'
import { QuestionOption } from '@/components/ui/QuestionOption'
import { bi, useLang } from '@/lib/i18n'
import { Bookmark, Star, Flag, SearchX, PartyPopper } from 'lucide-react'
import type { Question } from '@/types'

function Chip({ active, onClick, children }: { active: boolean; onClick: () => void; children: ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`min-h-[36px] rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors ${
        active ? 'border-brand-500 bg-brand-500/20 text-brand-200' : 'border-white/10 bg-white/[0.04] text-gray-300'
      }`}
    >
      {children}
    </button>
  )
}

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
        <h1 className="text-lg font-bold text-white">{bi('Practice', 'अभ्यास', lang)}</h1>
        <Card>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between rounded-xl bg-white/[0.05] px-3 py-2.5">
              <span className="text-sm text-gray-300">{bi('Available questions', 'उपलब्ध प्रश्न', lang)}</span>
              <span className="text-lg font-bold text-brand-300">{pool.length}</span>
            </div>
            <div>
              <label className="text-xs font-medium text-gray-400">{bi('Number of questions', 'प्रश्नों की संख्या', lang)}</label>
              <div className="mt-2 flex flex-wrap gap-2">
                {[5, 10, 20, 50].map((n) => (
                  <Chip key={n} active={count === n} onClick={() => setCount(n)}>{n}</Chip>
                ))}
              </div>
            </div>
            <div>
              <label className="text-xs font-medium text-gray-400">{bi('Difficulty', 'कठिनाई', lang)}</label>
              <div className="mt-2 flex flex-wrap gap-2">
                {(['all', 'easy', 'medium', 'hard'] as const).map((d) => (
                  <Chip key={d} active={difficulty === d} onClick={() => setDifficulty(d)}>
                    <span className="capitalize">{d}</span>
                  </Chip>
                ))}
              </div>
            </div>
            <label className="flex min-h-[44px] items-center gap-2.5 text-sm text-gray-200">
              <input type="checkbox" checked={showAnswerImmediately} onChange={(e) => setShowAnswerImmediately(e.target.checked)} />
              {bi('Show answer immediately', 'तुरंत उत्तर दिखाएं', lang)}
            </label>

            {pool.length === 0 ? (
              <EmptyState
                icon={SearchX}
                title={bi('No questions match this selection', 'इस चयन से कोई प्रश्न मेल नहीं खाता', lang)}
                description={bi('Try a different difficulty or clear filters.', 'अलग कठिनाई आज़माएं या फ़िल्टर हटाएं।', lang)}
                actionLabel={bi('Reset Filters', 'फ़िल्टर रीसेट करें', lang)}
                onAction={() => setDifficulty('all')}
              />
            ) : (
              <Button className="w-full" size="lg" onClick={start}>{bi('Start Practice', 'अभ्यास शुरू करें', lang)}</Button>
            )}
          </CardContent>
        </Card>
      </div>
    )
  }

  if (!current) {
    return (
      <div className="space-y-4 pb-4">
        <EmptyState
          icon={PartyPopper}
          title={bi('Session complete!', 'सत्र पूर्ण!', lang)}
          description={`${correctCount}/${sessionQuestions.length} ${bi('correct', 'सही', lang)}`}
          actionLabel={bi('Back to Practice', 'अभ्यास पर वापस', lang)}
          onAction={() => navigate('/practice')}
        />
      </div>
    )
  }

  return (
    <div className="space-y-3 pb-4">
      <div className="flex items-center justify-between text-xs text-gray-400">
        <span className="font-medium">{bi('Question', 'प्रश्न', lang)} {index + 1} {bi('of', 'में से', lang)} {sessionQuestions.length}</span>
        <span>{bi('Score', 'स्कोर', lang)}: {correctCount}</span>
      </div>
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/10">
        <div className="h-1.5 rounded-full bg-brand-500 transition-all" style={{ width: `${((index + 1) / sessionQuestions.length) * 100}%` }} />
      </div>

      <Card>
        <CardContent className="space-y-3">
          <div className="flex items-start justify-between gap-2">
            <p className="text-sm font-medium leading-relaxed text-white">{bi(current.questionEn, current.questionHi, lang)}</p>
            <div className="flex shrink-0 gap-1">
              <button
                aria-label={bi('Bookmark', 'बुकमार्क', lang)}
                onClick={() => toggleQuestionBookmark(current.id, !currentStat?.bookmarked)}
                className="flex h-9 w-9 items-center justify-center rounded-full active:bg-white/10"
              >
                <Bookmark size={18} className={currentStat?.bookmarked ? 'fill-brand-500 text-brand-500' : 'text-gray-400'} />
              </button>
              <button
                aria-label={bi('Mark important', 'महत्वपूर्ण चिह्नित करें', lang)}
                onClick={() => toggleQuestionImportant(current.id, !currentStat?.markedImportant)}
                className="flex h-9 w-9 items-center justify-center rounded-full active:bg-white/10"
              >
                <Star size={18} className={currentStat?.markedImportant ? 'fill-warning text-warning' : 'text-gray-400'} />
              </button>
            </div>
          </div>
          <div className="flex gap-1.5">
            {current.sourceType === 'sample' && <Badge tone="info">{bi('Sample Question', 'अभ्यास प्रश्न', lang)}</Badge>}
            {current.sourceType === 'ai' && <Badge tone="warning">{bi('AI-generated — unverified', 'एआई-जनित — असत्यापित', lang)}</Badge>}
          </div>

          <div className="space-y-2">
            {current.optionsEn.map((optEn, i) => {
              const isCorrectOpt = i === current.correctIndex
              const isSelected = selected === i
              let state: 'default' | 'selected' | 'correct' | 'wrong' = 'default'
              if (revealed && isCorrectOpt) state = 'correct'
              else if (revealed && isSelected && !isCorrectOpt) state = 'wrong'
              else if (isSelected) state = 'selected'
              return (
                <QuestionOption
                  key={i}
                  index={i}
                  label={bi(optEn, current.optionsHi[i], lang)}
                  state={state}
                  disabled={revealed}
                  onClick={() => selectOption(i)}
                />
              )
            })}
          </div>

          {revealed && (
            <div className="rounded-xl bg-white/[0.06] p-3 text-xs text-gray-200">
              <p className="font-semibold text-brand-200">{bi('Explanation', 'व्याख्या', lang)}</p>
              <p className="mt-1 leading-relaxed">{bi(current.explanationEn, current.explanationHi, lang)}</p>
            </div>
          )}

          <textarea
            placeholder={bi('Add a note...', 'नोट जोड़ें...', lang)}
            className="w-full rounded-xl border border-white/10 bg-white/[0.04] p-2.5 text-xs"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            onBlur={() => note && setQuestionNote(current.id, note)}
          />

          <div className="flex items-center justify-between pt-1">
            <button className="flex min-h-[36px] items-center gap-1 text-xs text-gray-400"><Flag size={14} /> {bi('Report', 'रिपोर्ट', lang)}</button>
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
