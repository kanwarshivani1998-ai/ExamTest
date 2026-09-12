import { useAllTopics } from '@/hooks/useSyllabus'
import { useAllQuestions, useQuestionStats, setQuestionNote } from '@/hooks/useQuestions'
import { updateTopic } from '@/hooks/useSyllabus'
import { Card, CardContent } from '@/components/ui/Card'
import { bi, useLang } from '@/lib/i18n'

export function Notes() {
  const { lang } = useLang()
  const topics = useAllTopics().filter((t) => t.note && t.note.trim().length > 0)
  const questions = useAllQuestions()
  const stats = useQuestionStats().filter((s) => s.note && s.note.trim().length > 0)

  return (
    <div className="space-y-4 pb-4">
      <h1 className="text-lg font-bold text-gray-900">{bi('Notes', 'नोट्स', lang)}</h1>

      <div>
        <h2 className="mb-2 text-sm font-semibold text-gray-700">{bi('Topic Notes', 'विषय नोट्स', lang)}</h2>
        {topics.length === 0 && <p className="text-xs text-gray-500">{bi('No topic notes yet.', 'अभी तक कोई विषय नोट नहीं।', lang)}</p>}
        {topics.map((t) => (
          <Card key={t.id} className="mb-2"><CardContent>
            <p className="text-sm font-medium">{bi(t.titleEn, t.titleHi, lang)}</p>
            <textarea
              defaultValue={t.note}
              onBlur={(e) => updateTopic(t.id, { note: e.target.value })}
              className="mt-2 w-full rounded-lg border border-gray-200 p-2 text-xs"
              rows={2}
            />
          </CardContent></Card>
        ))}
      </div>

      <div>
        <h2 className="mb-2 text-sm font-semibold text-gray-700">{bi('Question Notes', 'प्रश्न नोट्स', lang)}</h2>
        {stats.length === 0 && <p className="text-xs text-gray-500">{bi('No question notes yet.', 'अभी तक कोई प्रश्न नोट नहीं।', lang)}</p>}
        {stats.map((s) => {
          const q = questions.find((x) => x.id === s.questionId)
          if (!q) return null
          return (
            <Card key={s.questionId} className="mb-2"><CardContent>
              <p className="text-sm">{bi(q.questionEn, q.questionHi, lang)}</p>
              <textarea
                defaultValue={s.note}
                onBlur={(e) => setQuestionNote(s.questionId, e.target.value)}
                className="mt-2 w-full rounded-lg border border-gray-200 p-2 text-xs"
                rows={2}
              />
            </CardContent></Card>
          )
        })}
      </div>
    </div>
  )
}
