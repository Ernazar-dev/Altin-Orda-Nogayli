import { z } from 'zod';
import { lText } from '../../lib/types';

export const periodCreateSchema = z.object({
  name: lText,
  startYear: z.number().int().nullable().optional(),
  endYear: z.number().int().nullable().optional(),
  shortDescription: lText,
  content: lText,
  image: z.string().max(300).regex(/^(\/uploads\/[0-9a-f-]{36}\.(jpg|png|webp)|https:\/\/[^\s<>"']+)$/).nullable().optional(),
  order: z.number().int().default(0),
  reviewStatus: z.enum(['DRAFT', 'REVIEWED']).optional(),
});
export const periodUpdateSchema = periodCreateSchema.partial();
export type PeriodCreate = z.infer<typeof periodCreateSchema>;
export type PeriodUpdate = z.infer<typeof periodUpdateSchema>;
