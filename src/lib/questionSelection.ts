import type { Question } from '@/types'
import type { ExamConfig } from '@/lib/examConfig'
import { shuffle } from '@/hooks/useQuestions'

export interface BlueprintSelectionResult {
  ok: boolean
  questions: Question[]
  totalMarks: number
  errorEn?: string
  errorHi?: string
  shortfalls?: { subjectId: string; required: number; available: number }[]
}

/**
 * Selects questions for a mock test according to an exam blueprint's exact
 * per-subject distribution (see ExamConfig.distribution). Unlike a plain
 * shuffle-and-slice over the whole pool, this groups questions by subject,
 * verifies each subject has enough questions, and pulls the exact required
 * count from each subject's shuffled pool. It never borrows questions from
 * another subject to silently fill a short section.
 */
export function selectQuestionsByBlueprint(questions: Question[], config: ExamConfig): BlueprintSelectionResult {
  const bySubject = new Map<string, Question[]>()
  for (const q of questions) {
    const list = bySubject.get(q.subjectId)
    if (list) list.push(q)
    else bySubject.set(q.subjectId, [q])
  }

  const shortfalls: { subjectId: string; required: number; available: number }[] = []
  for (const [subjectId, section] of Object.entries(config.distribution)) {
    const available = bySubject.get(subjectId)?.length ?? 0
    if (available < section.questions) {
      shortfalls.push({ subjectId, required: section.questions, available })
    }
  }

  if (shortfalls.length > 0) {
    const detail = shortfalls.map((s) => `${s.subjectId}: need ${s.required}, have ${s.available}`).join('; ')
    return {
      ok: false,
      questions: [],
      totalMarks: 0,
      shortfalls,
      errorEn: `Not enough questions to build this mock exactly as specified (${detail}). Add more questions to the affected subject(s) before starting.`,
      errorHi: `इस मॉक को निर्दिष्ट पैटर्न के अनुसार बनाने हेतु पर्याप्त प्रश्न उपलब्ध नहीं हैं (${detail}). शुरू करने से पहले संबंधित विषय(यों) में और प्रश्न जोड़ें।`
    }
  }

  const selected: Question[] = []
  let totalMarks = 0
  const usedIds = new Set<string>()

  for (const [subjectId, section] of Object.entries(config.distribution)) {
    const pool = shuffle(bySubject.get(subjectId) ?? [])
    const picked = pool.slice(0, section.questions)
    for (const q of picked) {
      if (usedIds.has(q.id)) continue // defensive: never allow a duplicate question id in the final set
      usedIds.add(q.id)
      selected.push(q)
      totalMarks += section.marksPerQuestion
    }
  }

  const expectedTotalQuestions = Object.values(config.distribution).reduce((s, d) => s + d.questions, 0)
  const expectedTotalMarks = Object.values(config.distribution).reduce((s, d) => s + d.questions * d.marksPerQuestion, 0)

  if (selected.length !== expectedTotalQuestions || totalMarks !== expectedTotalMarks) {
    // Should not happen given the shortfall check above, but refuse rather than
    // silently return a session that doesn't match the official blueprint.
    return {
      ok: false,
      questions: [],
      totalMarks: 0,
      errorEn: 'Question selection did not match the exact required distribution. Please try again.',
      errorHi: 'प्रश्न चयन आवश्यक वितरण से मेल नहीं खाया। कृपया पुनः प्रयास करें।'
    }
  }

  return { ok: true, questions: shuffle(selected), totalMarks }
}
