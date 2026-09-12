import type { Question, TestAnswer, TestResult, TestType } from '@/types'

// wrongPenalty = questionMarks * negativePenaltyRate (question-based percentage penalty)
export function scoreTest(params: {
  sessionId: string
  type: TestType
  subjectId?: string
  questions: Question[]
  answers: Record<string, TestAnswer>
  negativeMarkingEnabled: boolean
  timeTakenSeconds: number
}): TestResult {
  const { sessionId, type, subjectId, questions, answers, negativeMarkingEnabled, timeTakenSeconds } = params

  let correct = 0
  let incorrect = 0
  let skipped = 0
  let marksObtained = 0
  let maxMarks = 0
  const subjectWiseBreakdown: TestResult['subjectWiseBreakdown'] = {}

  for (const q of questions) {
    maxMarks += q.marks
    const bucket = (subjectWiseBreakdown[q.subjectId] ??= { correct: 0, incorrect: 0, skipped: 0, marks: 0 })
    const ans = answers[q.id]
    if (!ans || ans.selectedIndex === null || ans.selectedIndex === undefined) {
      skipped++
      bucket.skipped++
      continue
    }
    if (ans.selectedIndex === q.correctIndex) {
      correct++
      marksObtained += q.marks
      bucket.correct++
      bucket.marks += q.marks
    } else {
      incorrect++
      bucket.incorrect++
      if (negativeMarkingEnabled) {
        const penalty = q.marks * q.negativePenaltyRate
        marksObtained -= penalty
        bucket.marks -= penalty
      }
    }
  }

  const attempted = correct + incorrect
  const accuracyPercent = attempted > 0 ? Math.round((correct / attempted) * 1000) / 10 : 0

  return {
    id: `result_${sessionId}`,
    sessionId,
    type,
    subjectId,
    submittedAt: new Date().toISOString(),
    totalQuestions: questions.length,
    attempted,
    correct,
    incorrect,
    skipped,
    marksObtained: Math.round(marksObtained * 100) / 100,
    maxMarks,
    accuracyPercent,
    timeTakenSeconds: timeTakenSeconds,
    subjectWiseBreakdown
  }
}

export function typingScore(params: {
  totalWordsTyped: number
  correctWords: number
  errorCount: number
  durationSeconds: number
  maxMarks: number
}) {
  const { totalWordsTyped, correctWords, errorCount, durationSeconds, maxMarks } = params
  const minutes = durationSeconds / 60
  const grossWpm = minutes > 0 ? Math.round(totalWordsTyped / minutes) : 0
  const netWpm = minutes > 0 ? Math.max(0, Math.round((correctWords - errorCount) / minutes)) : 0
  const accuracyPercent = totalWordsTyped > 0 ? Math.round((correctWords / totalWordsTyped) * 1000) / 10 : 0
  // Simple proportional scoring against max marks, penalized by error rate.
  const errorPenaltyFactor = Math.max(0, 1 - errorCount * 0.01)
  const marksObtained = Math.round(Math.min(maxMarks, (accuracyPercent / 100) * maxMarks * errorPenaltyFactor) * 100) / 100
  return { grossWpm, netWpm, accuracyPercent, marksObtained }
}
