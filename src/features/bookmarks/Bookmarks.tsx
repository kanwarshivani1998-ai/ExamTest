import { useNavigate } from 'react-router-dom'
import { useAllQuestions, useQuestionStats, toggleQuestionBookmark } from '@/hooks/useQuestions'
import { useAllTopics, toggleTopicBookmark } from '@/hooks/useSyllabus'
import { Card, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Bookmark } from 'lucide-react'
import { bi, useLang } from '@/lib/i18n'

export function Bookmarks() {
  const { lang } = useLang()
  const navigate = useNavigate()
  const allQuestions = useAllQuestions()
  const stats = useQuestionStats()
  const topics = useAllTopics()
  const bookmarkedIds = new Set(stats.filter((s) => s.bookmarked).map((s) => s.questionId))
  const questionList = allQuestions.filter((q) => bookmarkedIds.has(q.id))
  const topicList = topics.filter((t) => t.bookmarked)

  return (
    <div className="space-y-4 pb-4">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-bold text-gray-900">{bi('Bookmarks', 'बुकमार्क', lang)}</h1>
        <Button size="sm" onClick={() => navigate('/practice?mode=bookmarked')}>{bi('Practice these', 'इनका अभ्यास करें', lang)}</Button>
      </div>
      <div>
        <h2 className="mb-2 text-sm font-semibold text-gray-700">{bi('Bookmarked Topics', 'बुकमार्क किए गए विषय', lang)}</h2>
        {topicList.length === 0 && <p className="text-xs text-gray-500">{bi('None yet.', 'अभी कोई नहीं।', lang)}</p>}
        {topicList.map((t) => (
          <Card key={t.id} className="mb-2"><CardContent className="flex items-center justify-between">
            <span className="text-sm">{bi(t.titleEn, t.titleHi, lang)}</span>
            <button onClick={() => toggleTopicBookmark(t.id, false)}><Bookmark size={18} className="fill-brand-600 text-brand-600" /></button>
          </CardContent></Card>
        ))}
      </div>
      <div>
        <h2 className="mb-2 text-sm font-semibold text-gray-700">{bi('Bookmarked Questions', 'बुकमार्क किए गए प्रश्न', lang)}</h2>
        {questionList.length === 0 && <p className="text-xs text-gray-500">{bi('None yet.', 'अभी कोई नहीं।', lang)}</p>}
        {questionList.map((q) => (
          <Card key={q.id} className="mb-2"><CardContent className="flex items-center justify-between gap-2">
            <span className="text-sm">{bi(q.questionEn, q.questionHi, lang)}</span>
            <button onClick={() => toggleQuestionBookmark(q.id, false)}><Bookmark size={18} className="fill-brand-600 text-brand-600 shrink-0" /></button>
          </CardContent></Card>
        ))}
      </div>
    </div>
  )
}
