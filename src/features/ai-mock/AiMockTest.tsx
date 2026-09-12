import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { db } from '@/db/db'
import { useLiveQuery } from 'dexie-react-hooks'
import { useSubjects } from '@/hooks/useSyllabus'
import { QuestionSchema } from '@/lib/questionSchema'
import { validateQuestionBatch } from '@/lib/questionSchema'
import { createSession } from '@/hooks/useTestSession'
import { Card, CardContent, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { bi, useLang } from '@/lib/i18n'
import { uid } from '@/lib/utils'
import type { Question } from '@/types'

// Optional integration point: if VITE_GEMINI_API_KEY is configured, this calls the Gemini API
// to generate a fresh set of bilingual MCQs. Disabled by default (spec requirement #13).
const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY as string | undefined

export function AiMockTest() {
  const { lang } = useLang()
  const navigate = useNavigate()
  const subjects = useSubjects()
  const [subjectId, setSubjectId] = useState('')
  const [count, setCount] = useState(10)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const aiHistory = useLiveQuery(() => db.questions.where('sourceType').equals('ai').toArray(), []) ?? []

  async function generate() {
    setError(null)
    if (!GEMINI_API_KEY) {
      setError('AI generation is not configured. Add VITE_GEMINI_API_KEY in your .env file to enable this feature.')
      return
    }
    setLoading(true)
    try {
      const subjectLabel = subjects.find((s) => s.id === subjectId)?.titleEn ?? 'General'
      const prompt = `Generate ${count} bilingual (English + Hindi) multiple-choice questions for the RVUNL Junior Assistant exam, subject: ${subjectLabel}. Return ONLY a JSON array, each item with: questionEn, questionHi, optionsEn (4), optionsHi (4), correctIndex (0-3), explanationEn, explanationHi, difficulty (easy/medium/hard). No markdown, no extra text.`
      const res = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=' + GEMINI_API_KEY, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
      })
      const data = await res.json()
      const text = data?.candidates?.[0]?.content?.parts?.[0]?.text ?? '[]'
      const cleaned = text.replace(/```json|```/g, '').trim()
      const rawItems: any[] = JSON.parse(cleaned)
      const items: Question[] = rawItems.map((r: any): Question => {
        const parsed = QuestionSchema.parse({
          id: uid('ai_q'),
          examStage: 'both',
          subjectId: subjectId || 'reasoning',
          chapterId: 'ai_generated',
          topicId: 'ai_generated',
          questionEn: r.questionEn,
          questionHi: r.questionHi,
          optionsEn: r.optionsEn,
          optionsHi: r.optionsHi,
          correctIndex: r.correctIndex,
          explanationEn: r.explanationEn,
          explanationHi: r.explanationHi,
          difficulty: r.difficulty ?? 'medium',
          marks: 1,
          negativePenaltyRate: 0.25,
          sourceType: 'ai'
        })
        return parsed as Question
      })
      const { valid } = validateQuestionBatch(items)
      await db.questions.bulkAdd(valid)
      const id = await createSession({
        type: 'ai_mock', subjectId, questionIds: valid.map((q) => q.id),
        durationSeconds: valid.length * 60, lang, negativeMarkingEnabled: true
      })
      navigate(`/mock-tests/run/${id}`)
    } catch (e) {
      setError('AI generation failed. Please try again, or use the built-in sample question bank instead.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-4 pb-4">
      <h1 className="text-lg font-bold text-white">{bi('AI Mock Test', 'एआई मॉक टेस्ट', lang)}</h1>
      <Card><CardContent className="space-y-3">
        <p className="text-xs text-amber-200 bg-amber-900/30 rounded-lg p-2">
          {bi(
            'All AI-generated questions are labelled AI-generated — unverified, and are NOT official previous-year questions.',
            'सभी एआई-जनित प्रश्न "एआई-जनित — असत्यापित" के रूप में चिह्नित हैं, और आधिकारिक पिछले वर्ष के प्रश्न नहीं हैं।', lang
          )}
        </p>
        <select className="w-full rounded-lg border border-white/10 p-2 text-sm" value={subjectId} onChange={(e) => setSubjectId(e.target.value)}>
          <option value="">{bi('Choose subject', 'विषय चुनें', lang)}</option>
          {subjects.map((s) => <option key={s.id} value={s.id}>{bi(s.titleEn, s.titleHi, lang)}</option>)}
        </select>
        <div className="flex gap-2">
          {[5, 10, 20].map((n) => (
            <button key={n} onClick={() => setCount(n)} className={`rounded-lg border px-3 py-1 text-sm ${count === n ? 'border-brand-600 bg-brand-500/20' : 'border-white/10'}`}>{n}</button>
          ))}
        </div>
        <Button disabled={loading} onClick={generate}>{loading ? bi('Generating...', 'बनाया जा रहा है...', lang) : bi('Generate AI Mock', 'एआई मॉक बनाएं', lang)}</Button>
        {error && <p className="text-xs text-red-600">{error}</p>}
        {!GEMINI_API_KEY && (
          <p className="text-xs text-gray-400">
            {bi('Setup needed: add VITE_GEMINI_API_KEY to your .env file to enable AI generation.', 'सेटअप आवश्यक: एआई जनरेशन सक्षम करने हेतु अपनी .env फ़ाइल में VITE_GEMINI_API_KEY जोड़ें।', lang)}
          </p>
        )}
      </CardContent></Card>

      <Card><CardContent>
        <CardTitle>{bi('AI Test History', 'एआई टेस्ट इतिहास', lang)}</CardTitle>
        <p className="mt-2 text-xs text-gray-400">
          {aiHistory.length} {bi('AI-generated questions saved so far.', 'अब तक सहेजे गए एआई-जनित प्रश्न।', lang)}
        </p>
      </CardContent></Card>
    </div>
  )
}
