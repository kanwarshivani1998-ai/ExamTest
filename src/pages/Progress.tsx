import { useAllTopics, useSubjects, computeProgress } from '@/hooks/useSyllabus'
import { useQuestionStats } from '@/hooks/useQuestions'
import { Card, CardContent, CardTitle } from '@/components/ui/Card'
import { Progress as ProgressBar } from '@/components/ui/Progress'
import { bi, useLang } from '@/lib/i18n'

export function ProgressPage() {
  const { lang } = useLang()
  const topics = useAllTopics()
  const subjects = useSubjects()
  const stats = useQuestionStats()

  const overall = computeProgress(topics)
  const totalAttempts = stats.reduce((s, x) => s + x.attemptCount, 0)
  const totalCorrect = stats.reduce((s, x) => s + x.correctCount, 0)
  const accuracy = totalAttempts > 0 ? Math.round((totalCorrect / totalAttempts) * 100) : 0

  return (
    <div className="space-y-4 pb-4">
      <h1 className="text-lg font-bold text-white">{bi('Progress', 'प्रगति', lang)}</h1>
      <Card><CardContent>
        <CardTitle>{bi('Overall Syllabus', 'समग्र पाठ्यक्रम', lang)}</CardTitle>
        <ProgressBar value={overall.percent} className="my-2" />
        <p className="text-xs text-gray-400">{overall.completed}/{overall.total} {bi('topics completed', 'विषय पूर्ण', lang)} · {accuracy}% {bi('practice accuracy', 'अभ्यास शुद्धता', lang)}</p>
      </CardContent></Card>
      {subjects.map((s) => {
        const subjectTopics = topics.filter((t) => t.subjectId === s.id)
        const p = computeProgress(subjectTopics)
        return (
          <Card key={s.id}><CardContent>
            <div className="flex items-center justify-between">
              <CardTitle>{bi(s.titleEn, s.titleHi, lang)}</CardTitle>
              <span className="text-sm font-semibold text-brand-300">{p.percent}%</span>
            </div>
            <ProgressBar value={p.percent} className="my-2" />
            <p className="text-xs text-gray-400">{p.completed}/{p.total}</p>
          </CardContent></Card>
        )
      })}
    </div>
  )
}
