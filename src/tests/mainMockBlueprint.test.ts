import { describe, it, expect } from 'vitest'
import { SAMPLE_QUESTIONS } from '@/data/sampleQuestions'
import { MAIN_EXAM_CONFIG } from '@/lib/examConfig'
import { selectQuestionsByBlueprint } from '@/lib/questionSelection'

describe('selectQuestionsByBlueprint (Main Mock)', () => {
  it('selects exactly 140 questions and 200 marks with the exact per-subject distribution', () => {
    const result = selectQuestionsByBlueprint(SAMPLE_QUESTIONS, MAIN_EXAM_CONFIG)
    expect(result.ok).toBe(true)
    expect(result.questions.length).toBe(140)
    expect(result.totalMarks).toBe(200)

    const counts: Record<string, number> = {}
    for (const q of result.questions) counts[q.subjectId] = (counts[q.subjectId] ?? 0) + 1

    expect(counts.reasoning).toBe(20)
    expect(counts.rajasthanGK).toBe(45)
    expect(counts.indiaWorldScience).toBe(15)
    expect(counts.hindi).toBe(20)
    expect(counts.english).toBe(20)
    expect(counts.mathematics).toBe(20)
  })

  it('never selects a duplicate question ID', () => {
    const result = selectQuestionsByBlueprint(SAMPLE_QUESTIONS, MAIN_EXAM_CONFIG)
    const ids = result.questions.map((q) => q.id)
    expect(new Set(ids).size).toBe(ids.length)
  })

  it('refuses (does not silently substitute) when a subject has too few questions', () => {
    const thin = SAMPLE_QUESTIONS.filter((q) => q.subjectId !== 'rajasthanGK' || q.id === 'q_rajasthanGK_001')
    const result = selectQuestionsByBlueprint(thin, MAIN_EXAM_CONFIG)
    expect(result.ok).toBe(false)
    expect(result.questions.length).toBe(0)
    expect(result.shortfalls?.[0].subjectId).toBe('rajasthanGK')
  })
})
