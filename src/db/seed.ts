import { db, isSeeded } from '@/db/db'
import { SUBJECTS, CHAPTERS, SEED_TOPICS } from '@/data/syllabus'
import { SAMPLE_QUESTIONS } from '@/data/sampleQuestions'

export async function seedDatabaseIfNeeded(): Promise<void> {
  if (await isSeeded()) return
  await db.transaction('rw', db.subjects, db.chapters, db.topics, db.questions, db.questionStats, async () => {
    await db.subjects.bulkAdd(SUBJECTS)
    await db.chapters.bulkAdd(CHAPTERS)
    await db.topics.bulkAdd(SEED_TOPICS)
    await db.questions.bulkAdd(SAMPLE_QUESTIONS)
    await db.questionStats.bulkAdd(
      SAMPLE_QUESTIONS.map((q) => ({
        questionId: q.id,
        attemptCount: 0,
        correctCount: 0,
        incorrectCount: 0,
        lastAttemptedAt: null,
        bookmarked: false,
        markedImportant: false,
        note: '',
        wrongStreak: 0
      }))
    )
  })
}
