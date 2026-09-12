import { useNavigate } from 'react-router-dom'
import { useAllQuestions, useQuestionStats, toggleQuestionImportant } from '@/hooks/useQuestions'
import { Card, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Star } from 'lucide-react'
import { bi, useLang } from '@/lib/i18n'

export function ImportantQuestions() {
  const { lang } = useLang()
  const navigate = useNavigate()
  const allQuestions = useAllQuestions()
  const stats = useQuestionStats()
  const importantIds = new Set(stats.filter((s) => s.markedImportant).map((s) => s.questionId))
  const list = allQuestions.filter((q) => importantIds.has(q.id) || q.important)

  return (
    <div className="space-y-3 pb-4">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-bold text-gray-900">{bi('Important Questions', 'महत्वपूर्ण प्रश्न', lang)}</h1>
        <Button size="sm" onClick={() => navigate('/practice?mode=important')}>{bi('Practice these', 'इनका अभ्यास करें', lang)}</Button>
      </div>
      {list.length === 0 && <p className="text-sm text-gray-500">{bi('Mark questions important during practice to see them here.', 'अभ्यास के दौरान प्रश्नों को महत्वपूर्ण चिह्नित करें ताकि वे यहां दिखें।', lang)}</p>}
      {list.map((q) => (
        <Card key={q.id}>
          <CardContent className="flex items-start justify-between gap-2">
            <p className="text-sm text-gray-800">{bi(q.questionEn, q.questionHi, lang)}</p>
            <button onClick={() => toggleQuestionImportant(q.id, false)}>
              <Star size={18} className="fill-amber-500 text-amber-500" />
            </button>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
