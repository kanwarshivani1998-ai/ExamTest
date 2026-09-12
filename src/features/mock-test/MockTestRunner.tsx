import { useEffect, useMemo, useState, useCallback } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { db } from '@/db/db'
import { useLiveQuery } from 'dexie-react-hooks'
import { useSession, updateAnswer, tickRemaining, submitSession } from '@/hooks/useTestSession'
import { scoreTest } from '@/lib/scoring'
import { Button } from '@/components/ui/Button'
import { Dialog } from '@/components/ui/Dialog'
import { QuestionOption } from '@/components/ui/QuestionOption'
import { bi, useLang } from '@/lib/i18n'
import { formatSeconds, cn } from '@/lib/utils'
import { X, Grid3x3 } from 'lucide-react'
import type { Question } from '@/types'

export function MockTestRunner() {
  const { sessionId } = useParams()
  const { lang } = useLang()
  const navigate = useNavigate()
  const session = useSession(sessionId)
  const liveQuestions = useLiveQuery(
    async (): Promise<Question[]> => (session ? db.questions.where('id').anyOf(session.questionIds).toArray() : []),
    [session?.id]
  )
  const questions: Question[] = useMemo(() => liveQuestions ?? [], [liveQuestions])

  const [index, setIndex] = useState(0)
  const [remaining, setRemaining] = useState<number>(session?.remainingSeconds ?? 0)
  const [showExitConfirm, setShowExitConfirm] = useState(false)
  const [showSubmitConfirm, setShowSubmitConfirm] = useState(false)
  const [showPalette, setShowPalette] = useState(false)

  useEffect(() => {
    if (session) setRemaining(session.remainingSeconds)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session?.id])

  const orderedQuestions = useMemo(() => {
    if (!session) return []
    const map = new Map(questions.map((q) => [q.id, q]))
    return session.questionIds.map((id) => map.get(id)).filter(Boolean) as typeof questions
  }, [session, questions])

  const doSubmit = useCallback(async () => {
    if (!session) return
    const timeTaken = session.durationSeconds - remaining
    const result = scoreTest({
      sessionId: session.id, type: session.type, subjectId: session.subjectId,
      questions: orderedQuestions, answers: session.answers,
      negativeMarkingEnabled: session.negativeMarkingEnabled, timeTakenSeconds: Math.max(0, timeTaken)
    })
    await db.testResults.put(result)
    await submitSession(session.id)
    navigate(`/results/${result.id}`)
  }, [session, orderedQuestions, remaining, navigate])

  useEffect(() => {
    if (!session || session.status !== 'active') return
    const interval = setInterval(() => {
      setRemaining((r) => {
        const next = Math.max(0, r - 1)
        if (next % 5 === 0) tickRemaining(session.id, next)
        if (next === 0) {
          clearInterval(interval)
          doSubmit()
        }
        return next
      })
    }, 1000)
    return () => clearInterval(interval)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session?.id, session?.status, doSubmit])

  if (!session) return <p className="p-4 text-sm text-gray-400">Loading session...</p>
  const current = orderedQuestions[index]
  const answer = current ? session.answers[current.id] : undefined

  async function choose(i: number) {
    if (!current) return
    await updateAnswer(session!.id, current.id, { selectedIndex: i })
  }
  async function toggleReview() {
    if (!current) return
    await updateAnswer(session!.id, current.id, { markedForReview: !answer?.markedForReview })
  }
  async function clearResponse() {
    if (!current) return
    await updateAnswer(session!.id, current.id, { selectedIndex: null })
  }

  const answeredCount = Object.values(session.answers).filter((a) => a.selectedIndex !== null).length
  const reviewCount = Object.values(session.answers).filter((a) => a.markedForReview).length
  const unansweredCount = orderedQuestions.length - answeredCount

  const timerTone =
    remaining < 60 ? 'text-danger animate-pulse' :
    remaining < 5 * 60 ? 'text-danger' :
    remaining < 10 * 60 ? 'text-warning' : 'text-white'

  return (
    <div className="fixed inset-0 z-40 flex flex-col bg-[#0f2140]">
      <div
        className="flex items-center justify-between border-b border-white/10 px-3 py-2.5"
        style={{ paddingTop: 'calc(env(safe-area-inset-top) + 10px)' }}
      >
        <button
          onClick={() => setShowExitConfirm(true)}
          aria-label={bi('Exit', 'बाहर निकलें', lang)}
          className="flex h-9 w-9 items-center justify-center rounded-full text-gray-300 active:bg-white/10"
        >
          <X size={20} />
        </button>
        <span className="truncate px-2 text-xs font-medium text-gray-300">
          {bi('Question', 'प्रश्न', lang)} {index + 1}/{orderedQuestions.length}
        </span>
        <span className={cn('shrink-0 text-sm font-bold tabular-nums', timerTone)}>{formatSeconds(remaining)}</span>
      </div>

      <div className="h-1 w-full bg-white/10">
        <div className="h-1 bg-brand-500 transition-all" style={{ width: `${((index + 1) / orderedQuestions.length) * 100}%` }} />
      </div>
      <div className="flex justify-center gap-4 border-b border-white/10 py-1.5 text-[11px] text-gray-400">
        <span>{bi('Answered', 'उत्तरित', lang)}: {answeredCount}</span>
        <span>{bi('Unanswered', 'अनुत्तरित', lang)}: {unansweredCount}</span>
        <span>{bi('Marked', 'चिह्नित', lang)}: {reviewCount}</span>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        {current && (
          <div className="space-y-3">
            <p className="text-sm font-medium leading-relaxed text-white">{bi(current.questionEn, current.questionHi, lang)}</p>
            <div className="space-y-2">
              {current.optionsEn.map((opt, i) => (
                <QuestionOption
                  key={i}
                  index={i}
                  label={bi(opt, current.optionsHi[i], lang)}
                  state={answer?.selectedIndex === i ? 'selected' : 'default'}
                  onClick={() => choose(i)}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="border-t border-white/10 bg-[#0f2140] p-3 sticky-bar-safe-bottom">
        <div className="grid grid-cols-2 gap-2">
          <Button variant="outline" disabled={index === 0} onClick={() => setIndex((i) => i - 1)}>{bi('Previous', 'पिछला', lang)}</Button>
          {index < orderedQuestions.length - 1 ? (
            <Button onClick={() => setIndex((i) => i + 1)}>{bi('Save & Next', 'सहेजें और अगला', lang)}</Button>
          ) : (
            <Button onClick={() => setShowSubmitConfirm(true)}>{bi('Submit Test', 'टेस्ट जमा करें', lang)}</Button>
          )}
        </div>
        <div className="mt-2 grid grid-cols-3 gap-2">
          <Button variant="secondary" size="sm" onClick={toggleReview}>{bi('Mark for Review', 'समीक्षा हेतु', lang)}</Button>
          <Button variant="secondary" size="sm" onClick={clearResponse}>{bi('Clear', 'साफ़ करें', lang)}</Button>
          <Button variant="secondary" size="sm" onClick={() => setShowPalette(true)}>
            <Grid3x3 size={15} /> {bi('Palette', 'पैलेट', lang)}
          </Button>
        </div>
      </div>

      {showPalette && (
        <div
          className="fixed inset-0 z-50 flex items-end bg-black/50"
          role="dialog"
          aria-modal="true"
          onClick={(e) => { if (e.target === e.currentTarget) setShowPalette(false) }}
        >
          <div className="max-h-[70vh] w-full rounded-t-2xl border-t border-white/10 bg-[#12233f] p-4" style={{ paddingBottom: 'calc(env(safe-area-inset-bottom) + 16px)' }}>
            <div className="mb-3 flex items-center justify-between">
              <p className="text-sm font-semibold text-white">{bi('Question Palette', 'प्रश्न पैलेट', lang)}</p>
              <button onClick={() => setShowPalette(false)} aria-label={bi('Close', 'बंद करें', lang)} className="flex h-8 w-8 items-center justify-center rounded-full active:bg-white/10">
                <X size={18} className="text-gray-300" />
              </button>
            </div>
            <div className="mb-3 flex flex-wrap gap-3 text-[11px] text-gray-300">
              <LegendDot color="bg-success" label={bi('Answered', 'उत्तरित', lang)} />
              <LegendDot color="bg-white/15" label={bi('Not answered', 'अनुत्तरित', lang)} />
              <LegendDot color="bg-brand-500" label={bi('Current', 'वर्तमान', lang)} />
              <LegendDot color="bg-ai" label={bi('Marked', 'चिह्नित', lang)} />
            </div>
            <div className="grid grid-cols-6 gap-2 overflow-y-auto pb-2">
              {orderedQuestions.map((q, i) => {
                const a = session.answers[q.id]
                const answeredQ = a?.selectedIndex !== null && a?.selectedIndex !== undefined
                let cls = 'bg-white/10 text-gray-200'
                if (a?.markedForReview) cls = answeredQ ? 'bg-ai text-white ring-2 ring-success' : 'bg-ai text-white'
                else if (answeredQ) cls = 'bg-success text-white'
                return (
                  <button
                    key={q.id}
                    onClick={() => { setIndex(i); setShowPalette(false) }}
                    className={cn('flex h-10 w-10 items-center justify-center rounded-lg text-xs font-medium', cls, i === index && 'ring-2 ring-white')}
                  >
                    {i + 1}
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      )}

      <Dialog open={showExitConfirm} onClose={() => setShowExitConfirm(false)} title={bi('Exit test?', 'टेस्ट से बाहर निकलें?', lang)}
        footer={<>
          <Button variant="outline" onClick={() => setShowExitConfirm(false)}>{bi('Cancel', 'रद्द करें', lang)}</Button>
          <Button variant="destructive" onClick={() => navigate('/mock-tests')}>{bi('Exit (progress saved)', 'बाहर निकलें (प्रगति सहेजी गई)', lang)}</Button>
        </>}>
        {bi('Your progress is auto-saved. You can resume this test later.', 'आपकी प्रगति स्वतः सहेजी जाती है। आप बाद में इस टेस्ट को जारी रख सकते हैं।', lang)}
      </Dialog>

      <Dialog open={showSubmitConfirm} onClose={() => setShowSubmitConfirm(false)} title={bi('Submit test?', 'टेस्ट जमा करें?', lang)}
        footer={<>
          <Button variant="outline" onClick={() => setShowSubmitConfirm(false)}>{bi('Cancel', 'रद्द करें', lang)}</Button>
          <Button onClick={doSubmit}>{bi('Confirm Submit', 'पुष्टि करें एवं जमा करें', lang)}</Button>
        </>}>
        {bi(`Answered ${answeredCount} of ${orderedQuestions.length}. Unanswered: ${unansweredCount}, marked for review: ${reviewCount}. Remaining time: ${formatSeconds(remaining)}. This cannot be undone.`,
          `${orderedQuestions.length} में से ${answeredCount} प्रश्नों के उत्तर दिए गए। अनुत्तरित: ${unansweredCount}, समीक्षा हेतु चिह्नित: ${reviewCount}। शेष समय: ${formatSeconds(remaining)}। यह पूर्ववत नहीं किया जा सकता।`, lang)}
      </Dialog>
    </div>
  )
}

function LegendDot({ color, label }: { color: string; label: string }) {
  return (
    <span className="flex items-center gap-1.5">
      <span className={cn('h-2.5 w-2.5 rounded-full', color)} />
      {label}
    </span>
  )
}
