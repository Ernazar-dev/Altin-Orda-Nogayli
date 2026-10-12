import { z } from 'zod';
import { lText } from '../../lib/types';

const optionSchema = z.object({ text: lText, isCorrect: z.boolean() });

export const questionSchema = z.object({
  question: lText,
  criterion: z.enum(['AXIOLOGICAL', 'COGNITIVE', 'ACTIVITY', 'REFLECTIVE']),
  options: z
    .array(optionSchema)
    .min(2)
    .max(6)
    .refine((o) => o.filter((x) => x.isCorrect).length === 1, 'Aynan bitta to\'g\'ri variant bo\'lishi kerak'),
});

export const testCreateSchema = z.object({
  title: lText,
  description: lText,
  periodId: z.string().nullable().optional(),
  thinkerId: z.string().nullable().optional(),
  questions: z.array(questionSchema).min(1),
});
export const testUpdateSchema = testCreateSchema.partial();

export const submitSchema = z.object({
  answers: z.array(z.object({ questionId: z.string().min(1), optionId: z.string().min(1) })),
});

export type TestCreate = z.infer<typeof testCreateSchema>;
export type TestUpdate = z.infer<typeof testUpdateSchema>;
export type SubmitInput = z.infer<typeof submitSchema>;
export type QuestionInput = z.infer<typeof questionSchema>;
