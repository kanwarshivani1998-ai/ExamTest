import { describe, it, expect } from 'vitest'
import { SUBJECTS, CHAPTERS, SEED_TOPICS } from '@/data/syllabus'
import { SAMPLE_QUESTIONS } from '@/data/sampleQuestions'

function duplicates(ids: string[]): string[] {
  const seen = new Set<string>()
  const dups = new Set<string>()
  for (const id of ids) {
    if (seen.has(id)) dups.add(id)
    seen.add(id)
  }
  return [...dups]
}

describe('syllabus ID integrity', () => {
  it('has exactly the six expected subject IDs', () => {
    const ids = SUBJECTS.map((s) => s.id).sort()
    expect(ids).toEqual(['english', 'hindi', 'indiaWorldScience', 'mathematics', 'rajasthanGK', 'reasoning'].sort())
  })

  it('has no duplicate subject IDs', () => {
    expect(duplicates(SUBJECTS.map((s) => s.id))).toEqual([])
  })

  it('has no duplicate chapter IDs', () => {
    expect(duplicates(CHAPTERS.map((c) => c.id))).toEqual([])
  })

  it('has no duplicate topic IDs', () => {
    expect(duplicates(SEED_TOPICS.map((t) => t.id))).toEqual([])
  })

  it('every chapter references a valid subject', () => {
    const subjectIds = new Set(SUBJECTS.map((s) => s.id))
    const orphaned = CHAPTERS.filter((c) => !subjectIds.has(c.subjectId))
    expect(orphaned).toEqual([])
  })

  it('every topic references a valid subject and chapter', () => {
    const subjectIds = new Set(SUBJECTS.map((s) => s.id))
    const chapterIds = new Set(CHAPTERS.map((c) => c.id))
    const badSubject = SEED_TOPICS.filter((t) => !subjectIds.has(t.subjectId))
    const badChapter = SEED_TOPICS.filter((t) => !chapterIds.has(t.chapterId))
    expect(badSubject).toEqual([])
    expect(badChapter).toEqual([])
  })

  it('no topic uses a generic placeholder ID', () => {
    const generic = SEED_TOPICS.filter((t) => ['other', 'miscellaneous', 'unknown', 'ai_generated', ''].includes(t.id))
    expect(generic).toEqual([])
  })

  it('every topic has both English and Hindi titles', () => {
    const missing = SEED_TOPICS.filter((t) => !t.titleEn?.trim() || !t.titleHi?.trim())
    expect(missing).toEqual([])
  })
})

describe('question-bank reference integrity', () => {
  const subjectIds = new Set(SUBJECTS.map((s) => s.id))
  const chapterIds = new Set(CHAPTERS.map((c) => c.id))
  const topicIds = new Set(SEED_TOPICS.map((t) => t.id))

  it('has no duplicate question IDs', () => {
    expect(duplicates(SAMPLE_QUESTIONS.map((q) => q.id))).toEqual([])
  })

  it('every question references a valid subject, chapter and topic', () => {
    const badSubject = SAMPLE_QUESTIONS.filter((q) => !subjectIds.has(q.subjectId))
    const badChapter = SAMPLE_QUESTIONS.filter((q) => !chapterIds.has(q.chapterId))
    const badTopic = SAMPLE_QUESTIONS.filter((q) => !topicIds.has(q.topicId))
    expect(badSubject).toEqual([])
    expect(badChapter).toEqual([])
    expect(badTopic).toEqual([])
  })

  it('Rajasthan GK has at least 50 questions', () => {
    const count = SAMPLE_QUESTIONS.filter((q) => q.subjectId === 'rajasthanGK').length
    expect(count).toBeGreaterThanOrEqual(50)
  })

  it('no built-in question claims official/PYQ status', () => {
    const nonSample = SAMPLE_QUESTIONS.filter((q) => q.sourceType !== 'sample')
    expect(nonSample).toEqual([])
  })
})
