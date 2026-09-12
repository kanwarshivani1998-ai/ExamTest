import { useLiveQuery } from 'dexie-react-hooks'
import { db } from '@/db/db'
import type { UserProfile } from '@/types'

export const DEFAULT_PROFILE: UserProfile = {
  id: 'local-user',
  name: '',
  targetPost: 'both',
  stage: 'starting',
  focus: 'complete',
  examDate: null,
  dailyStudyTargetMinutes: 60,
  lang: 'both',
  onboardingCompleted: false,
  studyStreak: 0,
  lastActiveDate: null
}

export function useProfile() {
  const profile = useLiveQuery(() => db.userProfile.get('local-user'), [])
  return profile
}

export async function saveProfile(patch: Partial<UserProfile>): Promise<void> {
  const existing = await db.userProfile.get('local-user')
  const merged: UserProfile = { ...DEFAULT_PROFILE, ...existing, ...patch, id: 'local-user' }
  await db.userProfile.put(merged)
}

export async function recordDailyActivity(): Promise<void> {
  const existing = await db.userProfile.get('local-user')
  if (!existing) return
  const today = new Date().toDateString()
  if (existing.lastActiveDate === today) return
  const yesterday = new Date()
  yesterday.setDate(yesterday.getDate() - 1)
  const wasYesterday = existing.lastActiveDate === yesterday.toDateString()
  await db.userProfile.put({
    ...existing,
    lastActiveDate: today,
    studyStreak: wasYesterday ? existing.studyStreak + 1 : 1
  })
}
