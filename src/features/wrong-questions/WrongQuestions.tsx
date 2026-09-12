import { useNavigate } from 'react-router-dom'
import { useAllQuestions, useQuestionStats } from '@/hooks/useQuestions'
import { Card, CardContent } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { bi, useLang } from '@/lib/i18n'

export function WrongQuestions() {
  const { lang } = useLang()
  const navigate = useNavigate()
  const allQuestions = useAllQuestions()
  const stats = useQuestionStats()
  const wrongIds = new Set(stats.filter((s) => s.incorrectCount > 0).map((s) => s.questionId))
  const list = allQuestions.filter((q) => wrongIds.has(q.id))

  return (
    <div className="space-y-3 pb-4">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-bold text-gray-900">{bi('Wrong Questions', 'गलत प्रश्न', lang)}</h1>
        <Button size="sm" onClick={() => navigate('/practice?mode=wrong')}>{bi('Practice these', 'इनका अभ्यास करें', lang)}</Button>
      </div>
      {list.length === 0 && <p className="text-sm text-gray-500">{bi('No wrong attempts yet — good job!', 'अभी तक कोई गलत उत्तर नहीं — बढ़िया!', lang)}</p>}
      {list.map((q) => {
        const s = stats.find((x) => x.questionId === q.id)
        return (
          <Card key={q.id}><CardContent>
            <p className="text-sm text-gray-800">{bi(q.questionEn, q.questionHi, lang)}</p>
            <Badge tone="danger" className="mt-2">{s?.incorrectCount} {bi('wrong attempts', 'गलत प्रयास', lang)}</Badge>
          </CardContent></Card>
        )
      })}
    </div>
  )
}
