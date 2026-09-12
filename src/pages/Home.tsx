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
import { EmptyState } from '@/components/ui/EmptyState'
import { bi, useLang } from '@/lib/i18n'
import { formatMinutes } from '@/lib/utils'
import {
  Zap, FileCheck2, FileText, Sparkles, Star, Keyboard, RotateCcw, CalendarClock, ClipboardList
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

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
  const goalPercent = dailyTarget > 0 ? Math.min(100, Math.round((todayMinutes / dailyTarget) * 100)) : 0

  return (
    <div className="space-y-5 pb-4">
      <Card className="overflow-hidden border-0 bg-gradient-to-br from-brand-700 to-brand-900 p-4">
        <p className="text-sm text-white/80">
          {bi('Namaste', 'नमस्ते', lang)}{profile?.name ? `, ${profile.name}` : ' Aspirant'} 👋
        </p>
        <h1 className="mt-0.5 text-xl font-extrabold leading-tight text-white">
          {bi('Start Today\u2019s Prep', 'आज की तैयारी शुरू करें', lang)}
        </h1>
        {(daysRemaining !== null && daysRemaining >= 0) && (
          <p className="mt-1 text-xs text-white/70">{daysRemaining} {bi('days left', 'दिन शेष', lang)}</p>
        )}

        <div className="mt-4 flex items-center gap-4">
          <div className="relative h-20 w-20 shrink-0">
            <svg viewBox="0 0 36 36" className="h-20 w-20 -rotate-90">
              <circle cx="18" cy="18" r="16" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="4" />
              <circle
                cx="18" cy="18" r="16" fill="none" stroke="#60a5fa" strokeWidth="4"
                strokeDasharray={`${overall.percent} 100`} strokeLinecap="round"
              />
            </svg>
            <span className="absolute inset-0 flex items-center justify-center text-lg font-bold text-white">
              {overall.percent}%
            </span>
          </div>
          <div className="grid flex-1 grid-cols-3 gap-1.5">
            <StatCell value={overall.completed} label={bi('Completed', 'पूर्ण', lang)} />
            <StatCell value={inProgressCount} label={bi('Learning', 'सीख रहे', lang)} />
            <StatCell value={weakCount} label={bi('Weak', 'कमजोर', lang)} />
          </div>
        </div>

        <div className="mt-3 flex items-center gap-4 rounded-xl bg-black/15 px-3 py-2 text-xs text-white/85">
          <span>🔥 {profile?.studyStreak ?? 0} {bi('day streak', 'दिन स्ट्रीक', lang)}</span>
          <span className="h-3 w-px bg-white/20" />
          <span>⏳ {formatMinutes(todayMinutes)} / {formatMinutes(dailyTarget)} {bi('today', 'आज', lang)}</span>
        </div>
      </Card>

      <section>
        <h2 className="mb-2 text-base font-bold text-white">{bi('Subject Progress', 'विषय प्रगति', lang)}</h2>
        {subjects.length === 0 ? (
          <EmptyState icon={ClipboardList} title={bi('Syllabus loading…', 'पाठ्यक्रम लोड हो रहा है…', lang)} />
        ) : (
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {subjects.map((s) => {
              const subjectTopics = topics.filter((t) => t.subjectId === s.id)
              const p = computeProgress(subjectTopics)
              const weak = subjectTopics.filter((t) => t.status === 'weak').length
              return (
                <Link key={s.id} to={`/syllabus?subject=${s.id}`}>
                  <Card className="p-4 active:bg-white/[0.08]">
                    <div className="flex items-center justify-between gap-2">
                      <CardTitle className="truncate text-sm">{bi(s.titleEn, s.titleHi, lang)}</CardTitle>
                      <span className="shrink-0 text-sm font-bold text-brand-300">{p.percent}%</span>
                    </div>
                    <Progress value={p.percent} className="my-2" />
                    <p className="text-xs text-gray-400">{p.completed}/{p.total} {bi('topics', 'विषय', lang)} · {weak} {bi('weak', 'कमजोर', lang)}</p>
                  </Card>
                </Link>
              )
            })}
          </div>
        )}
      </section>

      <section>
        <h2 className="mb-2 text-base font-bold text-white">{bi('Quick Actions', 'त्वरित कार्य', lang)}</h2>
        <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
          <QuickAction to="/practice" icon={Zap} title={bi('Quick Test', 'त्वरित टेस्ट', lang)} />
          <QuickAction to="/mock-tests?type=pre" icon={FileCheck2} title={bi('Pre Mock', 'प्री मॉक', lang)} />
          <QuickAction to="/mock-tests?type=main" icon={FileText} title={bi('Main Mock', 'मुख्य मॉक', lang)} />
          <QuickAction to="/ai-mock" icon={Sparkles} title={bi('AI Mock', 'एआई मॉक', lang)} accent="ai" />
          <QuickAction to="/important-questions" icon={Star} title={bi('Important', 'महत्वपूर्ण', lang)} />
          <QuickAction to="/typing" icon={Keyboard} title={bi('Typing', 'टाइपिंग', lang)} />
          <QuickAction to="/revision" icon={RotateCcw} title={bi('Weak Topics', 'कमजोर विषय', lang)} />
          <QuickAction to="/planner" icon={CalendarClock} title={bi("Today's Plan", 'आज की योजना', lang)} />
        </div>
      </section>

      <Card>
        <CardContent>
          <div className="flex items-center justify-between">
            <CardTitle>{bi("Today's Goal", 'आज का लक्ष्य', lang)}</CardTitle>
            <Link to="/settings" className="text-xs font-medium text-brand-300">{bi('Edit', 'संपादित करें', lang)}</Link>
          </div>
          <p className="mt-2 text-xs text-gray-300">
            {formatMinutes(todayMinutes)} / {formatMinutes(dailyTarget)} · {goalPercent}%
          </p>
          <Progress value={goalPercent} className="mt-2" tone={goalPercent >= 100 ? 'success' : 'brand'} />
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <CardTitle className="mb-2">{bi('Recent activity', 'हालिया गतिविधि', lang)}</CardTitle>
          {results.length > 0 ? (
            <p className="text-xs text-gray-300">
              {bi('Latest test', 'नवीनतम टेस्ट', lang)}: {results[0].correct}/{results[0].totalQuestions} {bi('correct', 'सही', lang)} · {results[0].marksObtained}/{results[0].maxMarks} {bi('marks', 'अंक', lang)}
            </p>
          ) : (
            <EmptyState
              icon={FileText}
              title={bi('No test attempted yet', 'अभी तक कोई टेस्ट नहीं दिया', lang)}
              description={bi('Start your first mock to see your activity here.', 'यहां गतिविधि देखने के लिए पहला मॉक शुरू करें।', lang)}
              actionLabel={bi('Start Main Mock', 'मुख्य मॉक शुरू करें', lang)}
              actionHref="/mock-tests"
            />
          )}
        </CardContent>
      </Card>

      {totalAttempts > 0 && (
        <p className="text-center text-[11px] text-gray-500">{bi('Overall accuracy', 'कुल शुद्धता', lang)}: {accuracy}%</p>
      )}
    </div>
  )
}

function StatCell({ value, label }: { value: number; label: string }) {
  return (
    <div className="rounded-xl bg-white/10 p-2 text-center">
      <p className="text-base font-bold text-white">{value}</p>
      <p className="text-[10px] leading-tight text-white/70">{label}</p>
    </div>
  )
}

function QuickAction({
  to, icon: Icon, title, accent
}: { to: string; icon: LucideIcon; title: string; accent?: 'ai' }) {
  return (
    <Link
      to={to}
      className="flex min-h-[48px] flex-col items-center justify-center gap-1.5 rounded-xl border border-white/10 bg-white/[0.06] px-2 py-3 text-center shadow-card active:bg-white/10"
    >
      <span className={`flex h-9 w-9 items-center justify-center rounded-full ${accent === 'ai' ? 'bg-ai/20 text-ai-text' : 'bg-brand-500/20 text-brand-300'}`}>
        <Icon size={18} />
      </span>
      <span className="text-[11px] font-medium leading-tight text-white">{title}</span>
    </Link>
  )
}
