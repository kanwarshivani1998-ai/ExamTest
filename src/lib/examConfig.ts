// Centralized exam configuration. Do not scatter exam numbers across the app.
// IMPORTANT: verify against the latest official RVUNL notification before relying on these values.

export interface SectionConfig {
  questions: number
  marksPerQuestion: number
}

export interface ExamConfig {
  id: 'pre' | 'main'
  totalQuestions: number
  totalMarks: number
  durationMinutes: number
  finalMeritWeightagePercent: number
  negativeMarkingEnabled: boolean
  negativePenaltyRate: number
  distribution: Record<string, SectionConfig>
  isScreeningOnly: boolean
}

export const MAIN_EXAM_CONFIG: ExamConfig = {
  id: 'main',
  totalQuestions: 140,
  totalMarks: 200,
  durationMinutes: 120,
  finalMeritWeightagePercent: 40,
  negativeMarkingEnabled: true,
  negativePenaltyRate: 0.25,
  isScreeningOnly: false,
  distribution: {
    reasoning: { questions: 20, marksPerQuestion: 1 },
    rajasthanGK: { questions: 45, marksPerQuestion: 2 },
    indiaWorldScience: { questions: 15, marksPerQuestion: 2 },
    hindi: { questions: 20, marksPerQuestion: 1 },
    english: { questions: 20, marksPerQuestion: 1 },
    mathematics: { questions: 20, marksPerQuestion: 1 }
  }
}

// Pre-exam pattern is NOT officially fixed here. These are editable defaults for
// screening-only practice; negative marking is off by default per spec.
export const PRE_EXAM_CONFIG: ExamConfig = {
  id: 'pre',
  totalQuestions: 100,
  totalMarks: 100,
  durationMinutes: 90,
  finalMeritWeightagePercent: 0,
  negativeMarkingEnabled: false,
  negativePenaltyRate: 0,
  isScreeningOnly: true,
  distribution: {
    reasoning: { questions: 20, marksPerQuestion: 1 },
    rajasthanGK: { questions: 30, marksPerQuestion: 1 },
    indiaWorldScience: { questions: 15, marksPerQuestion: 1 },
    hindi: { questions: 15, marksPerQuestion: 1 },
    english: { questions: 10, marksPerQuestion: 1 },
    mathematics: { questions: 10, marksPerQuestion: 1 }
  }
}

export interface TypingModeConfig {
  id: 'hi_speed' | 'hi_efficiency' | 'en_speed' | 'en_efficiency'
  labelEn: string
  labelHi: string
  durationMinutes: number
  marks: number
  lang: 'hi' | 'en'
}

export const TYPING_MODES: TypingModeConfig[] = [
  { id: 'hi_speed', labelEn: 'Hindi Speed Test', labelHi: 'हिंदी स्पीड टेस्ट', durationMinutes: 10, marks: 25, lang: 'hi' },
  { id: 'hi_efficiency', labelEn: 'Hindi Efficiency Test', labelHi: 'हिंदी दक्षता टेस्ट', durationMinutes: 10, marks: 25, lang: 'hi' },
  { id: 'en_speed', labelEn: 'English Speed Test', labelHi: 'अंग्रेजी स्पीड टेस्ट', durationMinutes: 10, marks: 25, lang: 'en' },
  { id: 'en_efficiency', labelEn: 'English Efficiency Test', labelHi: 'अंग्रेजी दक्षता टेस्ट', durationMinutes: 10, marks: 25, lang: 'en' }
]

export const TYPING_TOTAL_CONFIG = {
  totalDurationMinutes: 40,
  totalMarks: 100,
  finalMeritWeightagePercent: 60
}

export const DISCLAIMER = {
  en: 'Exam pattern, syllabus, typing rules and marking scheme should be verified with the latest official RVUNL recruitment notification.',
  hi: 'परीक्षा पैटर्न, पाठ्यक्रम, टाइपिंग नियम और अंक योजना को RVUNL की नवीनतम आधिकारिक भर्ती अधिसूचना से सत्यापित करें।'
}

export const SPACED_REVISION_INTERVALS_DAYS = [1, 3, 7, 15, 30]
