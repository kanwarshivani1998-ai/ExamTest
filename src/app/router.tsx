import { Routes, Route, Navigate } from 'react-router-dom'
import { useProfile } from '@/hooks/useProfile'
import { Onboarding } from '@/features/onboarding/Onboarding'
import { AppShell } from '@/components/layout/AppShell'
import { Home } from '@/pages/Home'
import { Syllabus } from '@/pages/Syllabus'
import { PracticeSession } from '@/features/practice/PracticeSession'
import { MockTestSetup } from '@/features/mock-test/MockTestSetup'
import { MockTestRunner } from '@/features/mock-test/MockTestRunner'
import { ResultDetail, ResultsHistory } from '@/pages/Results'
import { AiMockTest } from '@/features/ai-mock/AiMockTest'
import { ImportantQuestions } from '@/features/important-questions/ImportantQuestions'
import { TypingTest } from '@/features/typing/TypingTest'
import { Bookmarks } from '@/features/bookmarks/Bookmarks'
import { WrongQuestions } from '@/features/wrong-questions/WrongQuestions'
import { Revision } from '@/features/revision/Revision'
import { Planner } from '@/features/planner/Planner'
import { Notes } from '@/features/notes/Notes'
import { Backup } from '@/features/backup/Backup'
import { Settings } from '@/features/settings/Settings'
import { About } from '@/pages/About'
import { ProgressPage } from '@/pages/Progress'

export function AppRouter() {
  const profile = useProfile()

  if (profile === undefined) {
    return <div className="flex h-screen items-center justify-center text-sm text-gray-400">…</div>
  }
  if (!profile?.onboardingCompleted) {
    return <Onboarding />
  }

  return (
    <Routes>
      <Route path="/mock-tests/run/:sessionId" element={<MockTestRunner />} />
      <Route
        path="*"
        element={
          <AppShell>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/syllabus" element={<Syllabus />} />
              <Route path="/practice" element={<PracticeSession />} />
              <Route path="/mock-tests" element={<MockTestSetup />} />
              <Route path="/progress" element={<ProgressPage />} />
              <Route path="/ai-mock" element={<AiMockTest />} />
              <Route path="/important-questions" element={<ImportantQuestions />} />
              <Route path="/typing" element={<TypingTest />} />
              <Route path="/rajasthan-gk" element={<Navigate to="/syllabus?subject=rajasthanGK" replace />} />
              <Route path="/current-affairs" element={<Navigate to="/syllabus?subject=indiaWorldScience" replace />} />
              <Route path="/bookmarks" element={<Bookmarks />} />
              <Route path="/wrong-questions" element={<WrongQuestions />} />
              <Route path="/revision" element={<Revision />} />
              <Route path="/planner" element={<Planner />} />
              <Route path="/notes" element={<Notes />} />
              <Route path="/results" element={<ResultsHistory />} />
              <Route path="/results/:resultId" element={<ResultDetail />} />
              <Route path="/ai-results" element={<ResultsHistory />} />
              <Route path="/backup" element={<Backup />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/about" element={<About />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </AppShell>
        }
      />
    </Routes>
  )
}
