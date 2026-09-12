import { useParams, Link } from 'react-router-dom'
import { useLiveQuery } from 'dexie-react-hooks'
import { db } from '@/db/db'
import { Card, CardContent, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { bi, useLang } from '@/lib/i18n'
import { formatSeconds } from '@/lib/utils'

export function ResultDetail() {
  const { resultId } = useParams()
  const { lang } = useLang()
  const result = useLiveQuery(() => (resultId ? db.testResults.get(resultId) : undefined), [resultId])

  if (!result) return <p className="p-4 text-sm text-gray-500">{bi('Loading...', 'लोड हो रहा है...', lang)}</p>

  return (
    <div className="space-y-4 pb-4">
      <h1 className="text-lg font-bold text-gray-900">{bi('Result', 'परिणाम', lang)}</h1>
      <Card>
        <CardContent className="grid grid-cols-2 gap-3 text-sm">
          <Stat label={bi('Marks Obtained', 'प्राप्त अंक', lang)} value={`${result.marksObtained} / ${result.maxMarks}`} />
          <Stat label={bi('Accuracy', 'शुद्धता', lang)} value={`${result.accuracyPercent}%`} />
          <Stat label={bi('Correct', 'सही', lang)} value={String(result.correct)} />
          <Stat label={bi('Incorrect', 'गलत', lang)} value={String(result.incorrect)} />
          <Stat label={bi('Skipped', 'छोड़ा गया', lang)} value={String(result.skipped)} />
          <Stat label={bi('Time Taken', 'लिया गया समय', lang)} value={formatSeconds(result.timeTakenSeconds)} />
        </CardContent>
      </Card>
      <Card>
        <CardContent>
          <CardTitle>{bi('Subject-wise breakdown', 'विषयवार विवरण', lang)}</CardTitle>
          <div className="mt-2 space-y-2">
            {Object.entries(result.subjectWiseBreakdown).map(([sid, b]) => (
              <div key={sid} className="flex items-center justify-between text-xs text-gray-600">
                <span>{sid}</span>
                <span>{b.correct}✓ {b.incorrect}✗ {b.skipped}– · {Math.round(b.marks * 100) / 100} {bi('marks', 'अंक', lang)}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      <Link to="/mock-tests"><Button>{bi('Back to Mock Tests', 'मॉक टेस्ट पर वापस जाएं', lang)}</Button></Link>
    </div>
  )
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg bg-gray-50 p-3">
      <p className="text-[11px] text-gray-500">{label}</p>
      <p className="text-lg font-bold text-gray-900">{value}</p>
    </div>
  )
}

export function ResultsHistory() {
  const { lang } = useLang()
  const results = useLiveQuery(() => db.testResults.orderBy('submittedAt').reverse().toArray(), []) ?? []
  return (
    <div className="space-y-3 pb-4">
      <h1 className="text-lg font-bold text-gray-900">{bi('Test History', 'टेस्ट इतिहास', lang)}</h1>
      {results.length === 0 && <p className="text-sm text-gray-500">{bi('No tests taken yet.', 'अभी तक कोई टेस्ट नहीं दिया गया।', lang)}</p>}
      {results.map((r) => (
        <Link key={r.id} to={`/results/${r.id}`}>
          <Card><CardContent className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">{r.type}</p>
              <p className="text-xs text-gray-500">{new Date(r.submittedAt).toLocaleString()}</p>
            </div>
            <p className="text-sm font-semibold text-brand-700">{r.marksObtained}/{r.maxMarks}</p>
          </CardContent></Card>
        </Link>
      ))}
    </div>
  )
}
