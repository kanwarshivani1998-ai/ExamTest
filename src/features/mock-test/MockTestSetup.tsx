import { useNavigate } from 'react-router-dom'
import { useAllQuestions, pickQuestions } from '@/hooks/useQuestions'
import { useSubjects } from '@/hooks/useSyllabus'
import { useQuestionStats } from '@/hooks/useQuestions'
import { createSession, useActiveSession } from '@/hooks/useTestSession'
import { PRE_EXAM_CONFIG, MAIN_EXAM_CONFIG, DISCLAIMER } from '@/lib/examConfig'
import { Card, CardContent, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { bi, useLang } from '@/lib/i18n'

export function MockTestSetup() {
  const { lang } = useLang()
  const navigate = useNavigate()
  const allQuestions = useAllQuestions()
  const subjects = useSubjects()
  const stats = useQuestionStats()
  const activeSession = useActiveSession()

  const options = [
    { id: 'pre', titleEn: 'Pre-Examination Mock', titleHi: 'प्री-परीक्षा मॉक', desc: `${PRE_EXAM_CONFIG.totalQuestions}Q · ${PRE_EXAM_CONFIG.durationMinutes}min` },
    { id: 'main', titleEn: 'Main Full Mock', titleHi: 'मुख्य पूर्ण मॉक', desc: `${MAIN_EXAM_CONFIG.totalQuestions}Q · ${MAIN_EXAM_CONFIG.durationMinutes}min` },
    { id: 'subject', titleEn: 'Subject Mock', titleHi: 'विषय मॉक', desc: bi('Pick one subject', 'एक विषय चुनें', lang) },
    { id: 'custom', titleEn: 'Custom Mock', titleHi: 'कस्टम मॉक', desc: bi('Choose count & time', 'संख्या व समय चुनें', lang) },
    { id: 'important', titleEn: 'Important Questions Mock', titleHi: 'महत्वपूर्ण प्रश्न मॉक', desc: bi('Marked important only', 'केवल चिह्नित महत्वपूर्ण', lang) }
  ]

  async function startPreMock() {
    const qs = pickQuestions(allQuestions, PRE_EXAM_CONFIG.totalQuestions)
    const id = await createSession({
      type: 'pre_mock', questionIds: qs.map((q) => q.id),
      durationSeconds: PRE_EXAM_CONFIG.durationMinutes * 60, lang, negativeMarkingEnabled: PRE_EXAM_CONFIG.negativeMarkingEnabled
    })
    navigate(`/mock-tests/run/${id}`)
  }
  async function startMainMock() {
    const qs = pickQuestions(allQuestions, MAIN_EXAM_CONFIG.totalQuestions)
    const id = await createSession({
      type: 'main_mock', questionIds: qs.map((q) => q.id),
      durationSeconds: MAIN_EXAM_CONFIG.durationMinutes * 60, lang, negativeMarkingEnabled: MAIN_EXAM_CONFIG.negativeMarkingEnabled
    })
    navigate(`/mock-tests/run/${id}`)
  }
  async function startSubjectMock(sid: string) {
    const pool = allQuestions.filter((q) => q.subjectId === sid)
    const qs = pickQuestions(pool, Math.min(20, pool.length))
    const id = await createSession({
      type: 'subject_mock', subjectId: sid, questionIds: qs.map((q) => q.id),
      durationSeconds: 20 * 60, lang, negativeMarkingEnabled: true
    })
    navigate(`/mock-tests/run/${id}`)
  }
  async function startImportantMock() {
    const importantIds = new Set(stats.filter((s) => s.markedImportant).map((s) => s.questionId))
    const pool = allQuestions.filter((q) => importantIds.has(q.id))
    const qs = pickQuestions(pool, Math.min(30, pool.length))
    const id = await createSession({
      type: 'important_mock', questionIds: qs.map((q) => q.id),
      durationSeconds: 30 * 60, lang, negativeMarkingEnabled: true
    })
    navigate(`/mock-tests/run/${id}`)
  }

  return (
    <div className="space-y-4 pb-4">
      <h1 className="text-lg font-bold text-white">{bi('Mock Tests', 'मॉक टेस्ट', lang)}</h1>

      {activeSession && (
        <Card className="border-amber-300 bg-amber-900/30">
          <CardContent className="flex items-center justify-between">
            <p className="text-sm text-amber-800">{bi('You have an active test in progress.', 'आपका एक टेस्ट सक्रिय है।', lang)}</p>
            <Button size="sm" onClick={() => navigate(`/mock-tests/run/${activeSession.id}`)}>{bi('Resume Active Test', 'सक्रिय टेस्ट जारी रखें', lang)}</Button>
          </CardContent>
        </Card>
      )}

      <p className="rounded-lg bg-white/10 p-3 text-xs text-gray-300">{bi(DISCLAIMER.en, DISCLAIMER.hi, lang)}</p>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {options.map((o) => (
          <Card key={o.id}>
            <CardContent>
              <CardTitle>{bi(o.titleEn, o.titleHi, lang)}</CardTitle>
              <p className="mt-1 text-xs text-gray-400">{o.desc}</p>
              {o.id === 'subject' ? (
                <select
                  className="mt-2 w-full rounded-lg border border-white/10 p-2 text-sm"
                  defaultValue=""
                  onChange={(e) => e.target.value && startSubjectMock(e.target.value)}
                >
                  <option value="" disabled>{bi('Choose subject', 'विषय चुनें', lang)}</option>
                  {subjects.map((s) => <option key={s.id} value={s.id}>{bi(s.titleEn, s.titleHi, lang)}</option>)}
                </select>
              ) : (
                <Button
                  className="mt-2"
                  size="sm"
                  onClick={
                    o.id === 'pre' ? startPreMock :
                    o.id === 'main' ? startMainMock :
                    o.id === 'important' ? startImportantMock :
                    () => navigate('/practice')
                  }
                >
                  {bi('Start', 'शुरू करें', lang)}
                </Button>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
