import { useLiveQuery } from 'dexie-react-hooks'
import { db } from '@/db/db'
import type { Topic, TopicStatus, Confidence, Importance } from '@/types'

export function useSubjects() {
  return useLiveQuery(() => db.subjects.toArray(), []) ?? []
}

export function useChapters(subjectId?: string) {
  return useLiveQuery(
    () => (subjectId ? db.chapters.where('subjectId').equals(subjectId).toArray() : db.chapters.toArray()),
    [subjectId]
  ) ?? []
}

export function useTopics(subjectId?: string) {
  return useLiveQuery(
    () => (subjectId ? db.topics.where('subjectId').equals(subjectId).toArray() : db.topics.toArray()),
    [subjectId]
  ) ?? []
}

export function useAllTopics() {
  return useLiveQuery(() => db.topics.toArray(), []) ?? []
}

export async function updateTopic(id: string, patch: Partial<Topic>) {
  await db.topics.update(id, patch)
}

export async function setTopicStatus(id: string, status: TopicStatus) {
  await db.topics.update(id, { status, lastStudiedAt: new Date().toISOString() })
}

export async function setTopicConfidence(id: string, confidence: Confidence) {
  await db.topics.update(id, { confidence })
}

export async function setTopicImportance(id: string, importance: Importance) {
  await db.topics.update(id, { importance })
}

export async function toggleTopicBookmark(id: string, bookmarked: boolean) {
  await db.topics.update(id, { bookmarked })
}

export async function addStudyMinutes(id: string, minutes: number) {
  const topic = await db.topics.get(id)
  if (!topic) return
  await db.topics.update(id, { studyMinutes: topic.studyMinutes + minutes, lastStudiedAt: new Date().toISOString() })
}

export function computeProgress(topics: Topic[]): { percent: number; completed: number; total: number } {
  const total = topics.length
  const completed = topics.filter((t) => t.status === 'completed').length
  const percent = total > 0 ? Math.round((completed / total) * 100) : 0
  return { percent, completed, total }
}
