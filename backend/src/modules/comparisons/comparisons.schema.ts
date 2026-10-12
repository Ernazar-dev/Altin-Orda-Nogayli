import { z } from 'zod';
import { lText } from '../../lib/types';

export const comparisonCreateSchema = z.object({
  aspect: lText,
  goldenHorde: lText,
  nogai: lText,
  similarity: lText,
  difference: lText,
  sourceRef: z.string().max(300).nullable().optional(),
  order: z.number().int().default(0),
  reviewStatus: z.enum(['DRAFT', 'REVIEWED']).optional(),
});
export const comparisonUpdateSchema = comparisonCreateSchema.partial();
export type ComparisonCreate = z.infer<typeof comparisonCreateSchema>;
export type ComparisonUpdate = z.infer<typeof comparisonUpdateSchema>;
