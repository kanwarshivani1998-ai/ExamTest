import Dexie, { type Table } from 'dexie'
import type {
  Subject, Chapter, Topic, Question, QuestionAttemptStat,
  TestSession, TestResult, PlannerTask, TypingResult, UserProfile
} from '@/types'

export class AppDB extends Dexie {
  subjects!: Table<Subject, string>
  chapters!: Table<Chapter, string>
  topics!: Table<Topic, string>
  questions!: Table<Question, string>
  questionStats!: Table<QuestionAttemptStat, string>
  testSessions!: Table<TestSession, string>
  testResults!: Table<TestResult, string>
  plannerTasks!: Table<PlannerTask, string>
  typingResults!: Table<TypingResult, string>
  userProfile!: Table<UserProfile, string>

  constructor() {
    super('rvunl_exam_prep_db')
    this.version(1).stores({
      subjects: 'id',
      chapters: 'id, subjectId',
      topics: 'id, subjectId, chapterId, status, importance, bookmarked',
      questions: 'id, subjectId, chapterId, topicId, examStage, difficulty, sourceType',
      questionStats: 'questionId, bookmarked, markedImportant',
      testSessions: 'id, status, type, startedAt',
      testResults: 'id, type, submittedAt, subjectId',
      plannerTasks: 'id, date, completed, type',
      typingResults: 'id, mode, submittedAt',
      userProfile: 'id'
    })
  }
}

export const db = new AppDB()

export async function isSeeded(): Promise<boolean> {
  const count = await db.subjects.count()
  return count > 0
}
