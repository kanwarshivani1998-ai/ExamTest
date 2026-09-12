import { describe, it, expect } from 'vitest'
import { validateQuestionBatch } from '@/lib/questionSchema'
import { SAMPLE_QUESTIONS } from '@/data/sampleQuestions'

describe('SAMPLE_QUESTIONS', () => {
  it('has at least 140 valid bilingual questions', () => {
    expect(SAMPLE_QUESTIONS.length).toBeGreaterThanOrEqual(140)
  })

  it('all built-in questions pass schema validation', () => {
    const { valid, errors } = validateQuestionBatch(SAMPLE_QUESTIONS)
    expect(errors).toEqual([])
    expect(valid.length).toBe(SAMPLE_QUESTIONS.length)
  })

  it('every question is labelled as a sample, never official', () => {
    const nonSample = SAMPLE_QUESTIONS.filter((q) => q.sourceType !== 'sample')
    expect(nonSample.length).toBe(0)
  })
})
