import { SPACED_REVISION_INTERVALS_DAYS } from '@/lib/examConfig'

export type RevisionGrade = 'again' | 'hard' | 'good' | 'easy'

// Simple spaced-repetition scheduler using fixed intervals (1,3,7,15,30 days).
// 'again' resets to the first interval; 'hard' stays one step back; 'good' advances one step;
// 'easy' advances two steps (capped at the max interval).
export function nextRevisionDate(currentStepIndex: number, grade: RevisionGrade): { date: string; stepIndex: number } {
  const max = SPACED_REVISION_INTERVALS_DAYS.length - 1
  let step = currentStepIndex

  if (grade === 'again') step = 0
  else if (grade === 'hard') step = Math.max(0, step - 1)
  else if (grade === 'good') step = Math.min(max, step + 1)
  else if (grade === 'easy') step = Math.min(max, step + 2)

  const days = SPACED_REVISION_INTERVALS_DAYS[step]
  const date = new Date()
  date.setDate(date.getDate() + days)
  return { date: date.toISOString(), stepIndex: step }
}

export function isOverdue(nextRevisionAt: string | null): boolean {
  if (!nextRevisionAt) return false
  return new Date(nextRevisionAt).getTime() < Date.now()
}

export function isDueToday(nextRevisionAt: string | null): boolean {
  if (!nextRevisionAt) return false
  const due = new Date(nextRevisionAt)
  const today = new Date()
  return due.toDateString() === today.toDateString()
}
