import { describe, it, expect } from 'vitest'
import { MAIN_EXAM_CONFIG, PRE_EXAM_CONFIG } from '@/lib/examConfig'

describe('MAIN_EXAM_CONFIG', () => {
  it('totals 140 questions and 200 marks per the spec', () => {
    const totalQuestions = Object.values(MAIN_EXAM_CONFIG.distribution).reduce((s, d) => s + d.questions, 0)
    const totalMarks = Object.values(MAIN_EXAM_CONFIG.distribution).reduce((s, d) => s + d.questions * d.marksPerQuestion, 0)
    expect(totalQuestions).toBe(MAIN_EXAM_CONFIG.totalQuestions)
    expect(totalMarks).toBe(MAIN_EXAM_CONFIG.totalMarks)
  })

  it('has negative marking enabled with 0.25 penalty rate', () => {
    expect(MAIN_EXAM_CONFIG.negativeMarkingEnabled).toBe(true)
    expect(MAIN_EXAM_CONFIG.negativePenaltyRate).toBe(0.25)
  })
})

describe('PRE_EXAM_CONFIG', () => {
  it('is screening-only with no merit weightage and no negative marking by default', () => {
    expect(PRE_EXAM_CONFIG.isScreeningOnly).toBe(true)
    expect(PRE_EXAM_CONFIG.finalMeritWeightagePercent).toBe(0)
    expect(PRE_EXAM_CONFIG.negativeMarkingEnabled).toBe(false)
  })
})
