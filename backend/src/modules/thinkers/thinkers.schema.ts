import { z } from 'zod';
import { lText, lTextOpt } from '../../lib/types';

export const thinkerCreateSchema = z.object({
  name: z.string().trim().min(2).max(200),
  periodId: z.string().min(1),
  birthYear: z.number().int().nullable().optional(),
  deathYear: z.number().int().nullable().optional(),
  biography: lText,
  mainIdeas: lText,
  educationalViews: lText,
  modernImportance: lText,
  image: z.string().max(300).regex(/^(\/uploads\/[0-9a-f-]{36}\.(jpg|png|webp)|https:\/\/[^\s<>"']+)$/).nullable().optional(),
  reviewStatus: z.enum(['DRAFT', 'REVIEWED']).optional(),
});
export const thinkerUpdateSchema = thinkerCreateSchema.partial();
export type ThinkerCreate = z.infer<typeof thinkerCreateSchema>;
export type ThinkerUpdate = z.infer<typeof thinkerUpdateSchema>;

export const thinkerValueSchema = z.object({
  valueId: z.string().min(1),
  description: lTextOpt,
  sourceId: z.string().min(1).nullable().optional(),
});
export type ThinkerValueInput = z.infer<typeof thinkerValueSchema>;
