import { useLiveQuery } from 'dexie-react-hooks'
import { db } from '@/db/db'
import type { Question, QuestionAttemptStat } from '@/types'

export function useQuestionsBySubject(subjectId?: string) {
  return useLiveQuery(
    () => (subjectId ? db.questions.where('subjectId').equals(subjectId).toArray() : db.questions.toArray()),
    [subjectId]
  ) ?? []
}

export function useQuestionsByTopic(topicId: string) {
  return useLiveQuery(() => db.questions.where('topicId').equals(topicId).toArray(), [topicId]) ?? []
}

export function useAllQuestions() {
  return useLiveQuery(() => db.questions.toArray(), []) ?? []
}

export function useQuestionStats() {
  return useLiveQuery(() => db.questionStats.toArray(), []) ?? []
}

export async function recordAttempt(questionId: string, wasCorrect: boolean) {
  const existing = await db.questionStats.get(questionId)
  const base: QuestionAttemptStat = existing ?? {
    questionId,
    attemptCount: 0,
    correctCount: 0,
    incorrectCount: 0,
    lastAttemptedAt: null,
    bookmarked: false,
    markedImportant: false,
    note: '',
    wrongStreak: 0
  }
  await db.questionStats.put({
    ...base,
    attemptCount: base.attemptCount + 1,
    correctCount: base.correctCount + (wasCorrect ? 1 : 0),
    incorrectCount: base.incorrectCount + (wasCorrect ? 0 : 1),
    wrongStreak: wasCorrect ? 0 : base.wrongStreak + 1,
    lastAttemptedAt: new Date().toISOString()
  })
}

export async function toggleQuestionBookmark(questionId: string, bookmarked: boolean) {
  const existing = await db.questionStats.get(questionId)
  if (!existing) return
  await db.questionStats.update(questionId, { bookmarked })
}

export async function toggleQuestionImportant(questionId: string, markedImportant: boolean) {
  const existing = await db.questionStats.get(questionId)
  if (!existing) return
  await db.questionStats.update(questionId, { markedImportant })
}

export async function setQuestionNote(questionId: string, note: string) {
  const existing = await db.questionStats.get(questionId)
  if (!existing) return
  await db.questionStats.update(questionId, { note })
}

export function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export function pickQuestions(all: Question[], count: number, shuffleOrder = true): Question[] {
  const pool = shuffleOrder ? shuffle(all) : all
  return pool.slice(0, Math.min(count, pool.length))
}
