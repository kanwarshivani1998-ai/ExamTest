import { describe, it, expect } from 'vitest'
import { scoreTest, typingScore } from '@/lib/scoring'
import type { Question, TestAnswer } from '@/types'

function makeQuestion(overrides: Partial<Question> = {}): Question {
  return {
    id: 'q1', examStage: 'main', subjectId: 'reasoning', chapterId: 'c1', topicId: 't1',
    questionEn: 'Q', questionHi: 'प्र', optionsEn: ['A', 'B', 'C', 'D'], optionsHi: ['अ', 'ब', 'स', 'द'],
    correctIndex: 0, explanationEn: 'E', explanationHi: 'व्या',
    difficulty: 'easy', marks: 2, negativePenaltyRate: 0.25, sourceType: 'sample',
    ...overrides
  }
}

describe('scoreTest', () => {
  it('awards full marks for a correct answer', () => {
    const q = makeQuestion()
    const answers: Record<string, TestAnswer> = { q1: { questionId: 'q1', selectedIndex: 0, markedForReview: false, timeSpentSeconds: 10 } }
    const result = scoreTest({ sessionId: 's1', type: 'practice', questions: [q], answers, negativeMarkingEnabled: true, timeTakenSeconds: 10 })
    expect(result.marksObtained).toBe(2)
    expect(result.correct).toBe(1)
  })

  it('applies question-based negative penalty for a wrong answer', () => {
    const q = makeQuestion({ marks: 2, negativePenaltyRate: 0.25 })
    const answers: Record<string, TestAnswer> = { q1: { questionId: 'q1', selectedIndex: 1, markedForReview: false, timeSpentSeconds: 10 } }
    const result = scoreTest({ sessionId: 's1', type: 'practice', questions: [q], answers, negativeMarkingEnabled: true, timeTakenSeconds: 10 })
    // wrong 2-mark question deducts 2*0.25 = 0.5
    expect(result.marksObtained).toBe(-0.5)
    expect(result.incorrect).toBe(1)
  })

  it('does not penalize skipped questions', () => {
    const q = makeQuestion()
    const answers: Record<string, TestAnswer> = { q1: { questionId: 'q1', selectedIndex: null, markedForReview: false, timeSpentSeconds: 0 } }
    const result = scoreTest({ sessionId: 's1', type: 'practice', questions: [q], answers, negativeMarkingEnabled: true, timeTakenSeconds: 5 })
    expect(result.marksObtained).toBe(0)
    expect(result.skipped).toBe(1)
  })

  it('skips negative marking when disabled', () => {
    const q = makeQuestion({ marks: 1, negativePenaltyRate: 0.25 })
    const answers: Record<string, TestAnswer> = { q1: { questionId: 'q1', selectedIndex: 1, markedForReview: false, timeSpentSeconds: 5 } }
    const result = scoreTest({ sessionId: 's1', type: 'pre_mock', questions: [q], answers, negativeMarkingEnabled: false, timeTakenSeconds: 5 })
    expect(result.marksObtained).toBe(0)
  })
})

describe('typingScore', () => {
  it('computes wpm and accuracy reasonably', () => {
    const result = typingScore({ totalWordsTyped: 50, correctWords: 45, errorCount: 5, durationSeconds: 60, maxMarks: 25 })
    expect(result.grossWpm).toBe(50)
    expect(result.accuracyPercent).toBe(90)
    expect(result.marksObtained).toBeGreaterThan(0)
    expect(result.marksObtained).toBeLessThanOrEqual(25)
  })
})
