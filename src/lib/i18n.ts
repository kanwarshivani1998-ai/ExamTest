import { createContext, useContext } from 'react'
import type { LangMode } from '@/types'

export interface TranslationDict {
  [key: string]: { en: string; hi: string }
}

export const STRINGS: TranslationDict = {
  appName: { en: 'RVUNL Junior Assistant Exam Prep', hi: 'RVUNL कनिष्ठ सहायक परीक्षा तैयारी' },
  home: { en: 'Home', hi: 'होम' },
  syllabus: { en: 'Syllabus', hi: 'पाठ्यक्रम' },
  practice: { en: 'Practice', hi: 'अभ्यास' },
  mockTests: { en: 'Mock Tests', hi: 'मॉक टेस्ट' },
  progress: { en: 'Progress', hi: 'प्रगति' },
  more: { en: 'More', hi: 'अधिक' },
  aiMockTest: { en: 'AI Mock Test', hi: 'एआई मॉक टेस्ट' },
  importantQuestions: { en: 'Important Questions', hi: 'महत्वपूर्ण प्रश्न' },
  typingPractice: { en: 'Typing Practice', hi: 'टाइपिंग अभ्यास' },
  rajasthanGK: { en: 'Rajasthan GK', hi: 'राजस्थान सामान्य ज्ञान' },
  currentAffairs: { en: 'Current Affairs', hi: 'समसामयिकी' },
  bookmarks: { en: 'Bookmarks', hi: 'बुकमार्क' },
  wrongQuestions: { en: 'Wrong Questions', hi: 'गलत प्रश्न' },
  revision: { en: 'Revision', hi: 'पुनरावृत्ति' },
  studyPlanner: { en: 'Study Planner', hi: 'अध्ययन योजनाकार' },
  notes: { en: 'Notes', hi: 'नोट्स' },
  testHistory: { en: 'Test History', hi: 'टेस्ट इतिहास' },
  aiTestHistory: { en: 'AI Test History', hi: 'एआई टेस्ट इतिहास' },
  dataBackup: { en: 'Data Backup', hi: 'डेटा बैकअप' },
  settings: { en: 'Settings', hi: 'सेटिंग्स' },
  about: { en: 'About', hi: 'परिचय' },
  save: { en: 'Save', hi: 'सहेजें' },
  cancel: { en: 'Cancel', hi: 'रद्द करें' },
  next: { en: 'Next', hi: 'अगला' },
  back: { en: 'Back', hi: 'पीछे' },
  skip: { en: 'Skip', hi: 'छोड़ें' },
  finish: { en: 'Finish', hi: 'समाप्त करें' },
  delete: { en: 'Delete', hi: 'हटाएं' },
  confirm: { en: 'Confirm', hi: 'पुष्टि करें' },
  areYouSure: { en: 'Are you sure? This cannot be undone.', hi: 'क्या आप सुनिश्चित हैं? यह पूर्ववत नहीं किया जा सकता।' },
  sampleQuestion: { en: 'Sample Question', hi: 'अभ्यास प्रश्न' },
  aiGeneratedUnverified: { en: 'AI-generated — unverified', hi: 'एआई-जनित — असत्यापित' },
  notOfficialPYQ: { en: 'Not an official previous-year question', hi: 'यह आधिकारिक पिछले वर्ष का प्रश्न नहीं है' },
  continueStudy: { en: 'Continue Study', hi: 'अध्ययन जारी रखें' },
  startPractice: { en: 'Start Practice', hi: 'अभ्यास शुरू करें' },
  markComplete: { en: 'Mark Complete', hi: 'पूर्ण चिह्नित करें' },
  markWeak: { en: 'Mark Weak', hi: 'कमजोर चिह्नित करें' },
  resumeTest: { en: 'Resume Active Test', hi: 'सक्रिय टेस्ट जारी रखें' },
  submit: { en: 'Submit', hi: 'जमा करें' },
  correctAnswer: { en: 'Correct answer', hi: 'सही उत्तर' },
  explanation: { en: 'Explanation', hi: 'व्याख्या' },
  verifyNotice: {
    en: 'Exam pattern, syllabus, typing rules and marking scheme should be verified with the latest official RVUNL recruitment notification.',
    hi: 'परीक्षा पैटर्न, पाठ्यक्रम, टाइपिंग नियम और अंक योजना को RVUNL की नवीनतम आधिकारिक भर्ती अधिसूचना से सत्यापित करें।'
  }
}

export function translate(key: keyof typeof STRINGS, lang: LangMode): string {
  const entry = STRINGS[key]
  if (!entry) return String(key)
  if (lang === 'both') return `${entry.en} / ${entry.hi}`
  return entry[lang]
}

export function bi(en: string, hi: string, lang: LangMode): string {
  if (lang === 'en') return en
  if (lang === 'hi') return hi
  return `${en} / ${hi}`
}

export const LangContext = createContext<{ lang: LangMode; setLang: (l: LangMode) => void }>({
  lang: 'both',
  setLang: () => {}
})

export function useLang() {
  return useContext(LangContext)
}

export function useT() {
  const { lang } = useLang()
  return (key: keyof typeof STRINGS) => translate(key, lang)
}
