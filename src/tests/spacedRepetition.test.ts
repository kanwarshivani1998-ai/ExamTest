import { describe, it, expect } from 'vitest'
import { nextRevisionDate } from '@/lib/spacedRepetition'

describe('nextRevisionDate', () => {
  it('resets to the first interval on "again"', () => {
    const { stepIndex } = nextRevisionDate(3, 'again')
    expect(stepIndex).toBe(0)
  })
  it('advances one step on "good"', () => {
    const { stepIndex } = nextRevisionDate(0, 'good')
    expect(stepIndex).toBe(1)
  })
  it('does not exceed the max interval step', () => {
    const { stepIndex } = nextRevisionDate(4, 'easy')
    expect(stepIndex).toBe(4)
  })
})
