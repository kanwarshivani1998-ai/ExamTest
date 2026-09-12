import { useEffect, useMemo, useState, useCallback } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { db } from '@/db/db'
import { useLiveQuery } from 'dexie-react-hooks'
import { useSession, updateAnswer, tickRemaining, submitSession } from '@/hooks/useTestSession'
import { scoreTest } from '@/lib/scoring'
import { Button } from '@/components/ui/Button'
import { Dialog } from '@/components/ui/Dialog'
import { bi, useLang } from '@/lib/i18n'
import { formatSeconds } from '@/lib/utils'

export function MockTestRunner() {
  const { sessionId } = useParams()
  const { lang, setLang } = useLang()
  const navigate = useNavigate()
  const session = useSession(sessionId)
  const questions = useLiveQuery(
    () => (session ? db.questions.where('id').anyOf(session.questionIds).toArray() : Promise.resolve([])),
    [session?.id]
  ) ?? []

  const [index, setIndex] = useState(0)
  const [remaining, setRemaining] = useState<number>(session?.remainingSeconds ?? 0)
  const [showExitConfirm, setShowExitConfirm] = useState(false)
  const [showSubmitConfirm, setShowSubmitConfirm] = useState(false)

  useEffect(() => {
    if (session) setRemaining(session.remainingSeconds)
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
  }, [session?.id, session?.status, doSubmit])

  if (!session) return <p className="p-4 text-sm text-gray-500">Loading session...</p>
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

  return (
    <div className="fixed inset-0 z-40 flex flex-col bg-white">
      <div className="flex items-center justify-between border-b border-gray-200 p-3 text-sm">
        <span className="font-semibold text-brand-800">{formatSeconds(remaining)}</span>
        <span className="text-gray-500">{current?.subjectId}</span>
        <div className="flex gap-2">
          <select className="rounded border border-gray-200 text-xs" value={lang} onChange={(e) => setLang(e.target.value as any)}>
            <option value="en">EN</option><option value="hi">HI</option><option value="both">EN/HI</option>
          </select>
          <Button size="sm" variant="destructive" onClick={() => setShowExitConfirm(true)}>{bi('Exit', 'बाहर निकलें', lang)}</Button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        {current && (
          <div className="space-y-3">
            <p className="text-xs text-gray-500">Q{index + 1} / {orderedQuestions.length}</p>
            <p className="text-sm font-medium text-gray-900">{bi(current.questionEn, current.questionHi, lang)}</p>
            <div className="space-y-2">
              {current.optionsEn.map((opt, i) => (
                <button
                  key={i}
                  onClick={() => choose(i)}
                  className={`w-full rounded-lg border p-3 text-left text-sm ${answer?.selectedIndex === i ? 'border-brand-600 bg-brand-50' : 'border-gray-200'}`}
                >
                  {bi(opt, current.optionsHi[i], lang)}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="border-t border-gray-200 p-3">
        <div className="mb-2 flex gap-1 overflow-x-auto">
          {orderedQuestions.map((q, i) => {
            const a = session.answers[q.id]
            let cls = 'bg-gray-200 text-gray-700'
            if (a?.markedForReview) cls = 'bg-purple-500 text-white'
            else if (a?.selectedIndex !== null && a?.selectedIndex !== undefined) cls = 'bg-emerald-500 text-white'
            return (
              <button key={q.id} onClick={() => setIndex(i)} className={`h-8 w-8 shrink-0 rounded text-xs ${cls} ${i === index ? 'ring-2 ring-brand-600' : ''}`}>
                {i + 1}
              </button>
            )
          })}
        </div>
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex gap-2">
            <Button size="sm" variant="outline" disabled={index === 0} onClick={() => setIndex((i) => i - 1)}>{bi('Previous', 'पिछला', lang)}</Button>
            <Button size="sm" variant="outline" onClick={clearResponse}>{bi('Clear Response', 'उत्तर साफ़ करें', lang)}</Button>
            <Button size="sm" variant="secondary" onClick={toggleReview}>{bi('Mark for Review', 'समीक्षा हेतु चिह्नित करें', lang)}</Button>
          </div>
          <div className="flex gap-2">
            {index < orderedQuestions.length - 1 ? (
              <Button size="sm" onClick={() => setIndex((i) => i + 1)}>{bi('Save and Next', 'सहेजें और अगला', lang)}</Button>
            ) : (
              <Button size="sm" onClick={() => setShowSubmitConfirm(true)}>{bi('Submit', 'जमा करें', lang)}</Button>
            )}
          </div>
        </div>
        <p className="mt-1 text-center text-[11px] text-gray-400">
          {bi('Answered', 'उत्तरित', lang)}: {answeredCount} · {bi('For review', 'समीक्षा हेतु', lang)}: {reviewCount}
        </p>
      </div>

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
        {bi(`Answered ${answeredCount} of ${orderedQuestions.length} questions. This cannot be undone.`,
          `${orderedQuestions.length} में से ${answeredCount} प्रश्नों के उत्तर दिए गए। यह पूर्ववत नहीं किया जा सकता।`, lang)}
      </Dialog>
    </div>
  )
}
