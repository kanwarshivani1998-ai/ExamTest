import { useEffect, useState } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { HashRouter } from 'react-router-dom'
import { LangContext } from '@/lib/i18n'
import type { LangMode } from '@/types'
import { seedDatabaseIfNeeded } from '@/db/seed'
import { useProfile, recordDailyActivity } from '@/hooks/useProfile'
import { AppRouter } from '@/app/router'

const queryClient = new QueryClient()

export default function App() {
  const [ready, setReady] = useState(false)
  const [lang, setLang] = useState<LangMode>('both')
  const profile = useProfile()

  useEffect(() => {
    seedDatabaseIfNeeded()
      .catch((err) => {
        console.error('Database seeding failed:', err)
      })
      .finally(() => setReady(true))
  }, [])

  useEffect(() => {
    if (profile?.lang) setLang(profile.lang)
  }, [profile?.lang])

  useEffect(() => {
    if (profile?.onboardingCompleted) recordDailyActivity()
  }, [profile?.onboardingCompleted])

  if (!ready) {
    return (
      <div className="flex h-screen items-center justify-center bg-brand-50 text-brand-800">
        <p className="text-sm">Loading… / लोड हो रहा है…</p>
      </div>
    )
  }

  return (
    <QueryClientProvider client={queryClient}>
      <LangContext.Provider value={{ lang, setLang }}>
        <HashRouter>
          <AppRouter />
        </HashRouter>
      </LangContext.Provider>
    </QueryClientProvider>
  )
}
