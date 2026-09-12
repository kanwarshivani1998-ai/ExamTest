import { useLiveQuery } from 'dexie-react-hooks'
import { db } from '@/db/db'
import type { TestSession, TestAnswer } from '@/types'
import { uid } from '@/lib/utils'

export function useActiveSession() {
  return useLiveQuery(() => db.testSessions.where('status').equals('active').first(), []) ?? null
}

export function useSession(sessionId?: string) {
  return useLiveQuery(() => (sessionId ? db.testSessions.get(sessionId) : undefined), [sessionId])
}

export async function createSession(params: {
  type: TestSession['type']
  subjectId?: string
  questionIds: string[]
  durationSeconds: number
  lang: TestSession['lang']
  negativeMarkingEnabled: boolean
}): Promise<string> {
  const id = uid('session')
  const now = new Date().toISOString()
  const answers: Record<string, TestAnswer> = {}
  params.questionIds.forEach((qid) => {
    answers[qid] = { questionId: qid, selectedIndex: null, markedForReview: false, timeSpentSeconds: 0 }
  })
  const session: TestSession = {
    id,
    type: params.type,
    subjectId: params.subjectId,
    startedAt: now,
    updatedAt: now,
    submittedAt: null,
    durationSeconds: params.durationSeconds,
    remainingSeconds: params.durationSeconds,
    questionIds: params.questionIds,
    answers,
    lang: params.lang,
    negativeMarkingEnabled: params.negativeMarkingEnabled,
    status: 'active'
  }
  await db.testSessions.put(session)
  return id
}

export async function updateAnswer(sessionId: string, questionId: string, patch: Partial<TestAnswer>) {
  const session = await db.testSessions.get(sessionId)
  if (!session) return
  const answers = { ...session.answers, [questionId]: { ...session.answers[questionId], ...patch, questionId } }
  await db.testSessions.update(sessionId, { answers, updatedAt: new Date().toISOString() })
}

export async function tickRemaining(sessionId: string, remainingSeconds: number) {
  await db.testSessions.update(sessionId, { remainingSeconds, updatedAt: new Date().toISOString() })
}

export async function submitSession(sessionId: string) {
  await db.testSessions.update(sessionId, { status: 'submitted', submittedAt: new Date().toISOString() })
}

export async function abandonSession(sessionId: string) {
  await db.testSessions.update(sessionId, { status: 'abandoned' })
}
