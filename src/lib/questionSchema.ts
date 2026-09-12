import { z } from 'zod'

// Runtime validator for the Question data model (built-in bank, AI-generated, and imports).
export const QuestionSchema = z.object({
  id: z.string().min(1),
  examStage: z.enum(['pre', 'main', 'both']),
  subjectId: z.string().min(1),
  chapterId: z.string().min(1),
  topicId: z.string().min(1),
  questionEn: z.string().min(1),
  questionHi: z.string().min(1),
  optionsEn: z.array(z.string().min(1)).length(4),
  optionsHi: z.array(z.string().min(1)).length(4),
  correctIndex: z.union([z.literal(0), z.literal(1), z.literal(2), z.literal(3)]),
  explanationEn: z.string().min(1),
  explanationHi: z.string().min(1),
  difficulty: z.enum(['easy', 'medium', 'hard']),
  marks: z.number().positive(),
  negativePenaltyRate: z.number().min(0).max(1),
  sourceType: z.enum(['sample', 'ai', 'official']),
  sourceTitle: z.string().optional(),
  sourceUrl: z.string().url().optional().or(z.literal('')),
  year: z.number().optional(),
  tags: z.array(z.string()).optional(),
  currentAffairsMonth: z.number().min(1).max(12).optional(),
  currentAffairsYear: z.number().optional(),
  important: z.boolean().optional()
})

export type ValidatedQuestion = z.infer<typeof QuestionSchema>

export function validateQuestionBatch(items: unknown[]): { valid: ValidatedQuestion[]; errors: { index: number; message: string }[] } {
  const valid: ValidatedQuestion[] = []
  const errors: { index: number; message: string }[] = []
  items.forEach((item, index) => {
    const result = QuestionSchema.safeParse(item)
    if (result.success) valid.push(result.data)
    else errors.push({ index, message: result.error.issues.map((i) => i.message).join('; ') })
  })
  return { valid, errors }
}
