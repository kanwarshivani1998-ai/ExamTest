import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { Progress } from '@/components/ui/Progress'
import { saveProfile } from '@/hooks/useProfile'
import type { LangMode, UserProfile } from '@/types'

const STEPS = ['lang', 'target', 'stage', 'focus', 'examDate', 'dailyTarget'] as const
type Step = (typeof STEPS)[number]

export function Onboarding() {
  const [stepIndex, setStepIndex] = useState(0)
  const [data, setData] = useState<Partial<UserProfile>>({
    lang: 'both',
    targetPost: 'both',
    stage: 'starting',
    focus: 'complete',
    examDate: null,
    dailyStudyTargetMinutes: 60,
    name: ''
  })
  const [customMinutes, setCustomMinutes] = useState('')

  const step: Step = STEPS[stepIndex]

  function next() {
    setStepIndex((i) => Math.min(STEPS.length - 1, i + 1))
  }
  function back() {
    setStepIndex((i) => Math.max(0, i - 1))
  }
  async function finish() {
    await saveProfile({ ...data, onboardingCompleted: true })
  }
  async function skipAll() {
    await saveProfile({ onboardingCompleted: true, lang: 'both' })
  }

  return (
    <div className="mx-auto flex min-h-screen max-w-md flex-col justify-center gap-6 p-6">
      <Progress value={((stepIndex + 1) / STEPS.length) * 100} />

      {step === 'lang' && (
        <div className="space-y-4">
          <h1 className="text-xl font-bold text-white">Choose your language / अपनी भाषा चुनें</h1>
          <div className="grid grid-cols-1 gap-3">
            {(['en', 'hi', 'both'] as LangMode[]).map((l) => (
              <button
                key={l}
                onClick={() => setData((d) => ({ ...d, lang: l }))}
                className={`rounded-xl border p-4 text-left ${data.lang === l ? 'border-brand-600 bg-brand-500/20' : 'border-white/10'}`}
              >
                {l === 'en' ? 'English' : l === 'hi' ? 'हिंदी' : 'English + हिंदी'}
              </button>
            ))}
          </div>
        </div>
      )}

      {step === 'target' && (
        <div className="space-y-4">
          <h1 className="text-xl font-bold text-white">Select your target post / लक्ष्य पद चुनें</h1>
          <div className="grid grid-cols-1 gap-3">
            {([
              ['junior_assistant', 'Junior Assistant'],
              ['commercial_assistant_2', 'Commercial Assistant-II'],
              ['both', 'Both / दोनों']
            ] as const).map(([val, label]) => (
              <button
                key={val}
                onClick={() => setData((d) => ({ ...d, targetPost: val }))}
                className={`rounded-xl border p-4 text-left ${data.targetPost === val ? 'border-brand-600 bg-brand-500/20' : 'border-white/10'}`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      )}

      {step === 'stage' && (
        <div className="space-y-4">
          <h1 className="text-xl font-bold text-white">Preparation stage / तैयारी की स्थिति</h1>
          <div className="grid grid-cols-1 gap-3">
            {([
              ['starting', 'Starting preparation / तैयारी शुरू कर रहे हैं'],
              ['studying', 'Already studying / पहले से पढ़ाई कर रहे हैं'],
              ['revision', 'Revision stage / पुनरावृत्ति चरण']
            ] as const).map(([val, label]) => (
              <button
                key={val}
                onClick={() => setData((d) => ({ ...d, stage: val }))}
                className={`rounded-xl border p-4 text-left ${data.stage === val ? 'border-brand-600 bg-brand-500/20' : 'border-white/10'}`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      )}

      {step === 'focus' && (
        <div className="space-y-4">
          <h1 className="text-xl font-bold text-white">Current target exam / वर्तमान लक्ष्य परीक्षा</h1>
          <div className="grid grid-cols-1 gap-3">
            {([
              ['pre', 'Pre-Examination'],
              ['main', 'Main Examination'],
              ['typing', 'Typing Test'],
              ['complete', 'Complete preparation / पूर्ण तैयारी']
            ] as const).map(([val, label]) => (
              <button
                key={val}
                onClick={() => setData((d) => ({ ...d, focus: val }))}
                className={`rounded-xl border p-4 text-left ${data.focus === val ? 'border-brand-600 bg-brand-500/20' : 'border-white/10'}`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      )}

      {step === 'examDate' && (
        <div className="space-y-4">
          <h1 className="text-xl font-bold text-white">Exam date (optional) / परीक्षा तिथि (वैकल्पिक)</h1>
          <input
            type="date"
            className="w-full rounded-xl border border-white/20 p-3"
            value={data.examDate ?? ''}
            onChange={(e) => setData((d) => ({ ...d, examDate: e.target.value || null }))}
          />
        </div>
      )}

      {step === 'dailyTarget' && (
        <div className="space-y-4">
          <h1 className="text-xl font-bold text-white">Daily study target / दैनिक अध्ययन लक्ष्य</h1>
          <div className="grid grid-cols-2 gap-3">
            {[30, 60, 120, 180].map((m) => (
              <button
                key={m}
                onClick={() => setData((d) => ({ ...d, dailyStudyTargetMinutes: m }))}
                className={`rounded-xl border p-4 ${data.dailyStudyTargetMinutes === m ? 'border-brand-600 bg-brand-500/20' : 'border-white/10'}`}
              >
                {m} min
              </button>
            ))}
          </div>
          <input
            type="number"
            min={1}
            placeholder="Custom minutes / अन्य मिनट"
            className="w-full rounded-xl border border-white/20 p-3"
            value={customMinutes}
            onChange={(e) => {
              setCustomMinutes(e.target.value)
              const n = parseInt(e.target.value, 10)
              if (!isNaN(n) && n > 0) setData((d) => ({ ...d, dailyStudyTargetMinutes: n }))
            }}
          />
        </div>
      )}

      <div className="flex items-center justify-between pt-4">
        <Button variant="ghost" onClick={skipAll}>Skip</Button>
        <div className="flex gap-2">
          {stepIndex > 0 && <Button variant="outline" onClick={back}>Back</Button>}
          {stepIndex < STEPS.length - 1 ? (
            <Button onClick={next}>Next</Button>
          ) : (
            <Button onClick={finish}>Finish</Button>
          )}
        </div>
      </div>
    </div>
  )
}
