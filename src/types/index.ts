export type Lang = 'en' | 'hi'
export type LangMode = 'en' | 'hi' | 'both'

export type ExamStage = 'pre' | 'main' | 'both'
export type Difficulty = 'easy' | 'medium' | 'hard'
export type SourceType = 'sample' | 'ai' | 'official'

export type TopicStatus = 'not_started' | 'in_progress' | 'completed' | 'weak' | 'revision_needed'
export type Confidence = 'low' | 'medium' | 'high'
export type Importance = 'normal' | 'important' | 'high_priority'

export interface Topic {
  id: string
  chapterId: string
  subjectId: string
  titleEn: string
  titleHi: string
  descriptionEn: string
  descriptionHi: string
  status: TopicStatus
  confidence: Confidence
  importance: Importance
  lastStudiedAt: string | null
  nextRevisionAt: string | null
  studyMinutes: number
  bookmarked: boolean
  note: string
}

export interface Chapter {
  id: string
  subjectId: string
  titleEn: string
  titleHi: string
}

export interface Subject {
  id: string
  titleEn: string
  titleHi: string
  icon: string
}

export interface Question {
  id: string
  examStage: ExamStage
  subjectId: string
  chapterId: string
  topicId: string
  questionEn: string
  questionHi: string
  optionsEn: [string, string, string, string]
  optionsHi: [string, string, string, string]
  correctIndex: 0 | 1 | 2 | 3
  explanationEn: string
  explanationHi: string
  difficulty: Difficulty
  marks: number
  negativePenaltyRate: number
  sourceType: SourceType
  sourceTitle?: string
  sourceUrl?: string
  year?: number
  tags?: string[]
  currentAffairsMonth?: number
  currentAffairsYear?: number
  important?: boolean
}

export interface QuestionAttemptStat {
  questionId: string
  attemptCount: number
  correctCount: number
  incorrectCount: number
  lastAttemptedAt: string | null
  bookmarked: boolean
  markedImportant: boolean
  note: string
  wrongStreak: number
}

export type TestType = 'pre_mock' | 'main_mock' | 'subject_mock' | 'custom_mock' | 'ai_mock' | 'important_mock' | 'practice'

export interface TestAnswer {
  questionId: string
  selectedIndex: number | null
  markedForReview: boolean
  timeSpentSeconds: number
}

export interface TestSession {
  id: string
  type: TestType
  subjectId?: string
  startedAt: string
  updatedAt: string
  submittedAt: string | null
  durationSeconds: number
  remainingSeconds: number
  questionIds: string[]
  answers: Record<string, TestAnswer>
  lang: LangMode
  negativeMarkingEnabled: boolean
  status: 'active' | 'submitted' | 'abandoned'
}

export interface TestResult {
  id: string
  sessionId: string
  type: TestType
  subjectId?: string
  submittedAt: string
  totalQuestions: number
  attempted: number
  correct: number
  incorrect: number
  skipped: number
  marksObtained: number
  maxMarks: number
  accuracyPercent: number
  timeTakenSeconds: number
  subjectWiseBreakdown: Record<string, { correct: number; incorrect: number; skipped: number; marks: number }>
}

export interface PlannerTask {
  id: string
  date: string
  type: 'topic' | 'revision' | 'practice' | 'typing' | 'manual'
  title: string
  refId?: string
  targetMinutes?: number
  targetQuestions?: number
  completed: boolean
}

export interface TypingResult {
  id: string
  mode: 'hi_speed' | 'hi_efficiency' | 'en_speed' | 'en_efficiency'
  submittedAt: string
  grossWpm: number
  netWpm: number
  accuracyPercent: number
  errorCount: number
  marksObtained: number
  durationSeconds: number
}

export interface UserProfile {
  id: 'local-user'
  name: string
  targetPost: 'junior_assistant' | 'commercial_assistant_2' | 'both'
  stage: 'starting' | 'studying' | 'revision'
  focus: 'pre' | 'main' | 'typing' | 'complete'
  examDate: string | null
  dailyStudyTargetMinutes: number
  lang: LangMode
  onboardingCompleted: boolean
  studyStreak: number
  lastActiveDate: string | null
}
