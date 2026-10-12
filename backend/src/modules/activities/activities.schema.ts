import { z } from 'zod';
import { lText, lTextOpt } from '../../lib/types';

const optionSchema = z.object({
  text: lText,
  isCorrect: z.boolean(),
  explanation: lTextOpt,
});

const oneCorrect = (opts: { isCorrect: boolean }[] | undefined): boolean =>
  !opts || opts.filter((o) => o.isCorrect).length === 1;

export const activityCreateSchema = z.object({
  type: z.enum(['SOURCE_ANALYSIS', 'THOUGHT_ANALYSIS', 'MODERN_LINK']),
  title: lText,
  prompt: lText,
  modernExample: lTextOpt,
  criterion: z.enum(['AXIOLOGICAL', 'COGNITIVE', 'ACTIVITY', 'REFLECTIVE']),
  sourceId: z.string().nullable().optional(),
  periodId: z.string().nullable().optional(),
  thinkerId: z.string().nullable().optional(),
  reviewStatus: z.enum(['DRAFT', 'REVIEWED']).optional(),
  options: z
    .array(optionSchema)
    .min(2)
    .max(6)
    .refine(oneCorrect, 'Aynan bitta to\'g\'ri variant bo\'lishi kerak'),
});
export const activityUpdateSchema = activityCreateSchema.partial().refine(
  (v) => oneCorrect(v.options),
  'Aynan bitta to\'g\'ri variant bo\'lishi kerak',
);
export const attemptSchema = z.object({ optionId: z.string().min(1) });

export type ActivityCreate = z.infer<typeof activityCreateSchema>;
export type ActivityUpdate = z.infer<typeof activityUpdateSchema>;
