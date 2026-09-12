import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { useLiveQuery } from 'dexie-react-hooks'
import { db } from '@/db/db'
import { useProfile } from '@/hooks/useProfile'
import { useAllTopics, computeProgress } from '@/hooks/useSyllabus'
import { useSubjects } from '@/hooks/useSyllabus'
import { useQuestionStats } from '@/hooks/useQuestions'
import { Card, CardContent, CardTitle } from '@/components/ui/Card'
import { Progress } from '@/components/ui/Progress'
import { bi, useLang } from '@/lib/i18n'
import { formatMinutes } from '@/lib/utils'

export function Home() {
  const { lang } = useLang()
  const profile = useProfile()
  const subjects = useSubjects()
  const topics = useAllTopics()
  const stats = useQuestionStats()
  const results = useLiveQuery(() => db.testResults.orderBy('submittedAt').reverse().limit(1).toArray(), []) ?? []
  const overall = computeProgress(topics)

  const weakCount = topics.filter((t) => t.status === 'weak').length
  const inProgressCount = topics.filter((t) => t.status === 'in_progress').length

  const daysRemaining = useMemo(() => {
    if (!profile?.examDate) return null
    const diff = Math.ceil((new Date(profile.examDate).getTime() - Date.now()) / 86400000)
    return diff
  }, [profile?.examDate])

  const totalAttempts = stats.reduce((s, x) => s + x.attemptCount, 0)
  const totalCorrect = stats.reduce((s, x) => s + x.correctCount, 0)
  const accuracy = totalAttempts > 0 ? Math.round((totalCorrect / totalAttempts) * 100) : 0
  const todayMinutes = topics
    .filter((t) => t.lastStudiedAt && new Date(t.lastStudiedAt).toDateString() === new Date().toDateString())
    .reduce((s, t) => s + t.studyMinutes, 0)
  const dailyTarget = profile?.dailyStudyTargetMinutes ?? 60

  return (
    <div className="space-y-5 pb-4">
      <Card className="overflow-hidden bg-gradient-to-br from-brand-700 to-brand-900 p-5">
        <p className="text-sm text-white/80">
          {bi('Namaste', 'नमस्ते', lang)}{profile?.name ? `, ${profile.name}` : ' Aspirant'} 👋
        </p>
        <h1 className="mt-1 text-2xl font-extrabold leading-tight text-white">
          {bi('Start Today\u2019s Prep', 'आज की तैयारी शुरू करें', lang)}
        </h1>
        {(daysRemaining !== null && daysRemaining >= 0) && (
          <p className="mt-1 text-xs text-white/70">{daysRemaining} {bi('days left', 'दिन शेष', lang)}</p>
        )}

        <div className="mt-5 flex items-center gap-4">
          <div className="relative h-24 w-24 shrink-0">
            <svg viewBox="0 0 36 36" className="h-24 w-24 -rotate-90">
              <circle cx="18" cy="18" r="16" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="4" />
              <circle
                cx="18" cy="18" r="16" fill="none" stroke="#60a5fa" strokeWidth="4"
                strokeDasharray={`${overall.percent} 100`} strokeLinecap="round"
              />
            </svg>
            <span className="absolute inset-0 flex items-center justify-center text-xl font-bold text-white">
              {overall.percent}%
            </span>
          </div>
          <div className="grid flex-1 grid-cols-3 gap-2">
            <div className="rounded-xl bg-white/10 p-2 text-center">
              <p className="text-lg font-bold text-white">{overall.completed}</p>
              <p className="text-[11px] text-white/70">{bi('Completed', 'पूर्ण', lang)}</p>
            </div>
            <div className="rounded-xl bg-white/10 p-2 text-center">
              <p className="text-lg font-bold text-white">{inProgressCount}</p>
              <p className="text-[11px] text-white/70">{bi('Learning', 'सीख रहे', lang)}</p>
            </div>
            <div className="rounded-xl bg-white/10 p-2 text-center">
              <p className="text-lg font-bold text-white">{weakCount}</p>
              <p className="text-[11px] text-white/70">{bi('Weak', 'कमजोर', lang)}</p>
            </div>
          </div>
        </div>

        <div className="mt-4 flex items-center gap-4 text-xs text-white/80">
          <span>🔥 {profile?.studyStreak ?? 0} {bi('day streak', 'दिन स्ट्रीक', lang)}</span>
          <span>⏳ {todayMinutes}/{dailyTarget} {bi('min today', 'मिनट आज', lang)}</span>
        </div>
      </Card>

      <div>
        <h2 className="mb-2 text-base font-bold text-white">{bi('Subject Progress', 'विषय प्रगति', lang)}</h2>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {subjects.map((s) => {
            const subjectTopics = topics.filter((t) => t.subjectId === s.id)
            const p = computeProgress(subjectTopics)
            const weak = subjectTopics.filter((t) => t.status === 'weak').length
            return (
              <Link key={s.id} to={`/syllabus?subject=${s.id}`}>
                <Card className="p-4">
                  <div className="flex items-center justify-between">
                    <CardTitle>{bi(s.titleEn, s.titleHi, lang)}</CardTitle>
                    <span className="text-sm font-bold text-brand-300">{p.percent}%</span>
                  </div>
                  <Progress value={p.percent} className="my-2" />
                  <p className="text-xs text-gray-400">{p.completed}/{p.total} {bi('topics', 'विषय', lang)} · {weak} {bi('weak', 'कमजोर', lang)}</p>
                </Card>
              </Link>
            )
          })}
        </div>
      </div>

      <div>
        <h2 className="mb-2 text-base font-bold text-white">{bi('Quick Actions', 'त्वरित कार्य', lang)}</h2>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
          <QuickAction to="/practice" label={bi('Quick Test', 'त्वरित टेस्ट', lang)} />
          <QuickAction to="/mock-tests?type=pre" label={bi('Start Pre Mock', 'प्री मॉक शुरू करें', lang)} />
          <QuickAction to="/mock-tests?type=main" label={bi('Start Main Mock', 'मुख्य मॉक शुरू करें', lang)} />
          <QuickAction to="/ai-mock" label={bi('Generate AI Mock', 'एआई मॉक बनाएं', lang)} />
          <QuickAction to="/important-questions" label={bi('Important Qs', 'महत्वपूर्ण प्रश्न', lang)} />
          <QuickAction to="/typing" label={bi('Typing Practice', 'टाइपिंग अभ्यास', lang)} />
          <QuickAction to="/revision" label={bi('Revise Weak Topics', 'कमजोर विषय दोहराएं', lang)} />
          <QuickAction to="/planner" label={bi("Today's Plan", 'आज की योजना', lang)} />
        </div>
      </div>

      <Card>
        <CardContent>
          <CardTitle>{bi("Today's Goal", 'आज का लक्ष्य', lang)}</CardTitle>
          <p className="mt-2 text-xs text-gray-300">
            {formatMinutes(todayMinutes)} / {formatMinutes(dailyTarget)} {bi('studied today', 'आज पढ़ाई की', lang)}
          </p>
          <Progress value={(todayMinutes / dailyTarget) * 100} className="mt-2" />
        </CardContent>
      </Card>

      {results.length > 0 && (
        <Card>
          <CardContent>
            <CardTitle>{bi('Recent activity', 'हालिया गतिविधि', lang)}</CardTitle>
            <p className="mt-2 text-xs text-gray-300">
              {bi('Latest test', 'नवीनतम टेस्ट', lang)}: {results[0].correct}/{results[0].totalQuestions} {bi('correct', 'सही', lang)} · {results[0].marksObtained}/{results[0].maxMarks} {bi('marks', 'अंक', lang)}
            </p>
          </CardContent>
        </Card>
      )}

      <p className="text-center text-[11px] text-gray-500">{bi('Accuracy', 'शुद्धता', lang)}: {accuracy}%</p>
    </div>
  )
}

function QuickAction({ to, label }: { to: string; label: string }) {
  return (
    <Link to={to} className="rounded-xl border border-white/10 bg-white/[0.06] p-3 text-center text-xs font-medium text-white shadow-sm hover:bg-white/10">
      {label}
    </Link>
  )
}
