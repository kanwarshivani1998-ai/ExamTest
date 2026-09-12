import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { db } from '@/db/db'
import { useLiveQuery } from 'dexie-react-hooks'
import { useSubjects } from '@/hooks/useSyllabus'
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
const GEMINI_MODEL = (import.meta.env.VITE_GEMINI_MODEL as string | undefined) || 'gemini-3.6-flash'

function normalizeOptions(raw: unknown, fallback: string): [string, string, string, string] {
  const arr = Array.isArray(raw) ? raw.map((x) => String(x ?? '').trim()).filter(Boolean) : []
  while (arr.length < 4) arr.push(`${fallback} ${arr.length + 1}`)
  return [arr[0], arr[1], arr[2], arr[3]]
}

function clampIndex(raw: unknown): 0 | 1 | 2 | 3 {
  const n = Number(raw)
  return n === 0 || n === 1 || n === 2 || n === 3 ? n : 0
}

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
      const resolvedSubjectId = subjectId || subjects[0]?.id || 'reasoning'
      const subjectLabel = subjects.find((s) => s.id === resolvedSubjectId)?.titleEn ?? 'General'
      const topics = await db.topics.where('subjectId').equals(resolvedSubjectId).toArray()
      const topicLine = topics.length ? ` Cover a spread across these topics: ${topics.map((t) => t.titleEn).join(', ')}.` : ''

      const prompt = `Generate exactly ${count} bilingual (English + Hindi) multiple-choice questions for the RVUNL Junior Assistant exam, subject: ${subjectLabel}.${topicLine}
Return ONLY a raw JSON array (no markdown fences, no commentary) of exactly ${count} objects, each with this exact shape:
{"questionEn": string, "questionHi": string, "optionsEn": [string,string,string,string], "optionsHi": [string,string,string,string], "correctIndex": 0-3, "explanationEn": string, "explanationHi": string, "difficulty": "easy"|"medium"|"hard"}
Make sure correctIndex points to exactly one correct option, options are plausible and distinct, and Hindi text is natural and accurate.`

      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'x-goog-api-key': GEMINI_API_KEY },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
            generationConfig: { temperature: 0.9, maxOutputTokens: 8192, responseMimeType: 'application/json' }
          })
        }
      )

      if (!res.ok) {
        let detail = ''
        try {
          const errJson = await res.json()
          detail = errJson?.error?.message ?? ''
        } catch {
          // ignore
        }
        throw new Error(`Gemini API error (${res.status}). ${detail}`.trim())
      }

      const data = await res.json()
      const text: string = data?.candidates?.[0]?.content?.parts?.map((p: { text?: string }) => p.text ?? '').join('') ?? ''
      if (!text.trim()) {
        const finishReason = data?.candidates?.[0]?.finishReason
        throw new Error(`Gemini returned an empty response${finishReason ? ` (${finishReason})` : ''}.`)
      }

      let cleaned = text.trim().replace(/^```(json)?/i, '').replace(/```$/i, '').trim()
      const start = cleaned.indexOf('[')
      const end = cleaned.lastIndexOf(']')
      if (start === -1 || end === -1 || end < start) throw new Error('Could not find a JSON array in the Gemini response.')
      const rawItems: any[] = JSON.parse(cleaned.slice(start, end + 1))
      if (!Array.isArray(rawItems) || rawItems.length === 0) throw new Error('Gemini did not return any questions.')

      const candidates = rawItems.map((r: any) => ({
        id: uid('ai_q'),
        examStage: 'both' as const,
        subjectId: resolvedSubjectId,
        chapterId: 'ai_generated',
        topicId: 'ai_generated',
        questionEn: String(r?.questionEn ?? '').trim() || 'Question text unavailable.',
        questionHi: String(r?.questionHi ?? '').trim() || 'प्रश्न उपलब्ध नहीं है।',
        optionsEn: normalizeOptions(r?.optionsEn, 'Option'),
        optionsHi: normalizeOptions(r?.optionsHi, 'विकल्प'),
        correctIndex: clampIndex(r?.correctIndex),
        explanationEn: String(r?.explanationEn ?? '').trim() || 'Explanation not available.',
        explanationHi: String(r?.explanationHi ?? '').trim() || 'व्याख्या उपलब्ध नहीं है।',
        difficulty: r?.difficulty === 'easy' || r?.difficulty === 'medium' || r?.difficulty === 'hard' ? r.difficulty : 'medium',
        marks: 1,
        negativePenaltyRate: 0.25,
        sourceType: 'ai' as const
      }))

      const { valid, errors } = validateQuestionBatch(candidates)
      if (valid.length === 0) {
        throw new Error(
          `Gemini's response could not be turned into valid questions${errors[0] ? `: ${errors[0].message}` : ''}. Please try again.`
        )
      }

      await db.questions.bulkAdd(valid as Question[])
      const id = await createSession({
        type: 'ai_mock',
        subjectId: resolvedSubjectId,
        questionIds: valid.map((q) => q.id),
        durationSeconds: Math.max(valid.length, 1) * 60,
        lang,
        negativeMarkingEnabled: true
      })
      navigate(`/mock-tests/run/${id}`)
    } catch (e) {
      const msg = e instanceof Error ? e.message : 'AI generation failed. Please try again, or use the built-in sample question bank instead.'
      setError(msg)
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
        <Button disabled={loading || !GEMINI_API_KEY} onClick={generate}>{loading ? bi('Generating...', 'बनाया जा रहा है...', lang) : bi('Generate AI Mock', 'एआई मॉक बनाएं', lang)}</Button>
        {error && <p className="text-xs text-danger-text">{error}</p>}
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
