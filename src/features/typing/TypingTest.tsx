import { useEffect, useRef, useState } from 'react'
import { db } from '@/db/db'
import { useLiveQuery } from 'dexie-react-hooks'
import { TYPING_MODES } from '@/lib/examConfig'
import { getPassageFor } from '@/data/typingPassages'
import { typingScore } from '@/lib/scoring'
import { Card, CardContent, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { bi, useLang } from '@/lib/i18n'
import { formatSeconds, uid } from '@/lib/utils'
import type { TypingResult } from '@/types'

export function TypingTest() {
  const { lang } = useLang()
  const [modeId, setModeId] = useState<TypingResult['mode']>('en_speed')
  const modeConfig = TYPING_MODES.find((m) => m.id === modeId)!
  const [passage, setPassage] = useState(() => getPassageFor(modeConfig.lang, modeId.includes('speed') ? 'speed' : 'efficiency'))
  const [input, setInput] = useState('')
  const [started, setStarted] = useState(false)
  const [remaining, setRemaining] = useState(modeConfig.durationMinutes * 60)
  const [result, setResult] = useState<{ grossWpm: number; netWpm: number; accuracyPercent: number; marksObtained: number } | null>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const history = useLiveQuery(() => db.typingResults.orderBy('submittedAt').reverse().limit(10).toArray(), []) ?? []

  useEffect(() => {
    setPassage(getPassageFor(modeConfig.lang, modeId.includes('speed') ? 'speed' : 'efficiency'))
    setRemaining(modeConfig.durationMinutes * 60)
    setInput('')
    setStarted(false)
    setResult(null)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modeId])

  useEffect(() => {
    if (!started) return
    if (remaining <= 0) {
      finish()
      return
    }
    const t = setTimeout(() => setRemaining((r) => r - 1), 1000)
    return () => clearTimeout(t)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [started, remaining])

  function start() {
    setStarted(true)
    setResult(null)
    setInput('')
    setRemaining(modeConfig.durationMinutes * 60)
    setTimeout(() => textareaRef.current?.focus(), 50)
  }

  async function finish() {
    setStarted(false)
    const totalWordsTyped = input.trim().split(/\s+/).filter(Boolean).length
    const targetWords = passage.text.trim().split(/\s+/)
    let correctWords = 0
    const typedWords = input.trim().split(/\s+/)
    typedWords.forEach((w, i) => { if (w === targetWords[i]) correctWords++ })
    const errorCount = Math.max(0, typedWords.length - correctWords)
    const durationSeconds = modeConfig.durationMinutes * 60 - remaining
    const score = typingScore({ totalWordsTyped, correctWords, errorCount, durationSeconds: Math.max(1, durationSeconds), maxMarks: modeConfig.marks })
    setResult(score)
    const record: TypingResult = {
      id: uid('typing'), mode: modeId, submittedAt: new Date().toISOString(),
      grossWpm: score.grossWpm, netWpm: score.netWpm, accuracyPercent: score.accuracyPercent,
      errorCount, marksObtained: score.marksObtained, durationSeconds: Math.max(1, durationSeconds)
    }
    await db.typingResults.put(record)
  }

  return (
    <div className="space-y-4 pb-4">
      <h1 className="text-lg font-bold text-white">{bi('Typing Practice', 'टाइपिंग अभ्यास', lang)}</h1>
      <div className="flex flex-wrap gap-2">
        {TYPING_MODES.map((m) => (
          <button key={m.id} onClick={() => setModeId(m.id)} className={`rounded-lg border px-3 py-1.5 text-xs ${modeId === m.id ? 'border-brand-600 bg-brand-500/20' : 'border-white/10'}`}>
            {bi(m.labelEn, m.labelHi, lang)}
          </button>
        ))}
      </div>
      <Card><CardContent className="space-y-3">
        <p className="text-xs text-gray-400">{modeConfig.durationMinutes} {bi('min', 'मिनट', lang)} · {modeConfig.marks} {bi('marks', 'अंक', lang)}</p>
        <div className="rounded-lg bg-white/10 p-3 text-sm leading-relaxed text-gray-200" dir={modeConfig.lang === 'hi' ? 'ltr' : 'ltr'}>
          {passage.text}
        </div>
        <textarea
          ref={textareaRef}
          disabled={!started}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          rows={6}
          placeholder={started ? '' : bi('Click Start to begin typing...', 'टाइप करना शुरू करने हेतु Start दबाएं...', lang)}
          className="w-full rounded-lg border border-white/10 p-3 text-sm"
        />
        <div className="flex items-center justify-between">
          <span className="font-mono text-sm text-brand-300">{formatSeconds(remaining)}</span>
          {!started ? (
            <Button onClick={start}>{bi('Start', 'शुरू करें', lang)}</Button>
          ) : (
            <Button variant="destructive" onClick={finish}>{bi('Submit', 'जमा करें', lang)}</Button>
          )}
        </div>
        {result && (
          <div className="grid grid-cols-2 gap-2 rounded-lg bg-emerald-900/30 p-3 text-xs text-emerald-800 sm:grid-cols-4">
            <span>{bi('Gross WPM', 'सकल WPM', lang)}: {result.grossWpm}</span>
            <span>{bi('Net WPM', 'शुद्ध WPM', lang)}: {result.netWpm}</span>
            <span>{bi('Accuracy', 'शुद्धता', lang)}: {result.accuracyPercent}%</span>
            <span>{bi('Marks', 'अंक', lang)}: {result.marksObtained}/{modeConfig.marks}</span>
          </div>
        )}
      </CardContent></Card>

      <Card><CardContent>
        <CardTitle>{bi('Recent typing results', 'हालिया टाइपिंग परिणाम', lang)}</CardTitle>
        <div className="mt-2 space-y-1 text-xs text-gray-300">
          {history.length === 0 && <p>{bi('No typing tests yet.', 'अभी तक कोई टाइपिंग टेस्ट नहीं।', lang)}</p>}
          {history.map((h) => (
            <div key={h.id} className="flex justify-between">
              <span>{h.mode} · {new Date(h.submittedAt).toLocaleDateString()}</span>
              <span>{h.netWpm} WPM · {h.accuracyPercent}%</span>
            </div>
          ))}
        </div>
      </CardContent></Card>
    </div>
  )
}
