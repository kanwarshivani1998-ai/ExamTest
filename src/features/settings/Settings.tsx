import { useState } from 'react'
import { useProfile, saveProfile } from '@/hooks/useProfile'
import { Card, CardContent, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Dialog } from '@/components/ui/Dialog'
import { bi, useLang } from '@/lib/i18n'
import type { LangMode } from '@/types'
import { db } from '@/db/db'

export function Settings() {
  const { lang, setLang } = useLang()
  const profile = useProfile()
  const [name, setName] = useState(profile?.name ?? '')
  const [confirmResetOnboarding, setConfirmResetOnboarding] = useState(false)

  async function changeLang(l: LangMode) {
    setLang(l)
    await saveProfile({ lang: l })
  }
  async function saveName() {
    await saveProfile({ name })
  }
  async function resetOnboarding() {
    await saveProfile({ onboardingCompleted: false })
    setConfirmResetOnboarding(false)
  }

  return (
    <div className="space-y-4 pb-4">
      <h1 className="text-lg font-bold text-white">{bi('Settings', 'सेटिंग्स', lang)}</h1>

      <Card><CardContent className="space-y-3">
        <CardTitle>{bi('Profile', 'प्रोफ़ाइल', lang)}</CardTitle>
        <input value={name} onChange={(e) => setName(e.target.value)} onBlur={saveName} placeholder={bi('Your name', 'आपका नाम', lang)} className="w-full rounded-lg border border-white/20 p-2 text-sm" />
      </CardContent></Card>

      <Card><CardContent className="space-y-3">
        <CardTitle>{bi('Language', 'भाषा', lang)}</CardTitle>
        <div className="flex gap-2">
          {(['en', 'hi', 'both'] as LangMode[]).map((l) => (
            <button key={l} onClick={() => changeLang(l)} className={`rounded-lg border px-3 py-1.5 text-sm ${lang === l ? 'border-brand-600 bg-brand-500/20' : 'border-white/10'}`}>
              {l === 'en' ? 'English' : l === 'hi' ? 'हिंदी' : 'EN + HI'}
            </button>
          ))}
        </div>
      </CardContent></Card>

      <Card><CardContent className="space-y-3">
        <CardTitle>{bi('Daily Study Target', 'दैनिक अध्ययन लक्ष्य', lang)}</CardTitle>
        <div className="flex gap-2">
          {[30, 60, 120, 180].map((m) => (
            <button key={m} onClick={() => saveProfile({ dailyStudyTargetMinutes: m })} className={`rounded-lg border px-3 py-1.5 text-sm ${profile?.dailyStudyTargetMinutes === m ? 'border-brand-600 bg-brand-500/20' : 'border-white/10'}`}>
              {m}m
            </button>
          ))}
        </div>
      </CardContent></Card>

      <Card><CardContent className="space-y-3">
        <CardTitle>{bi('Exam Date', 'परीक्षा तिथि', lang)}</CardTitle>
        <input type="date" value={profile?.examDate ?? ''} onChange={(e) => saveProfile({ examDate: e.target.value || null })} className="w-full rounded-lg border border-white/20 p-2 text-sm" />
      </CardContent></Card>

      <Card><CardContent className="space-y-3">
        <CardTitle>{bi('Onboarding', 'ऑनबोर्डिंग', lang)}</CardTitle>
        <Button variant="outline" onClick={() => setConfirmResetOnboarding(true)}>{bi('Reset Onboarding', 'ऑनबोर्डिंग रीसेट करें', lang)}</Button>
      </CardContent></Card>

      <p className="text-center text-xs text-gray-400">DB: {db.name} v{db.verno}</p>

      <Dialog open={confirmResetOnboarding} onClose={() => setConfirmResetOnboarding(false)} title={bi('Reset onboarding?', 'ऑनबोर्डिंग रीसेट करें?', lang)}
        footer={<>
          <Button variant="outline" onClick={() => setConfirmResetOnboarding(false)}>{bi('Cancel', 'रद्द करें', lang)}</Button>
          <Button onClick={resetOnboarding}>{bi('Reset', 'रीसेट करें', lang)}</Button>
        </>}>
        {bi("You'll see the first-launch setup screens again. Your study data is not deleted.", 'आपको फिर से पहली बार सेटअप स्क्रीन दिखेंगी। आपका अध्ययन डेटा हटाया नहीं जाएगा।', lang)}
      </Dialog>
    </div>
  )
}
