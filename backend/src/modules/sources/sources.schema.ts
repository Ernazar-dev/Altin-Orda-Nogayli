import { z } from 'zod';
import { lText, lTextOpt } from '../../lib/types';

export const sourceCreateSchema = z.object({
  title: lText,
  type: z.enum(['DOSTON', 'TOLGOV', 'RIVOYAT', 'TARIXIY_ASAR', 'OGZAKI_IJOD', 'ADABIY_ASAR', 'BOSHQA']),
  periodId: z.string().min(1),
  thinkerId: z.string().min(1).nullable().optional(),
  content: z.string().min(1),
  excerpt: z.string().min(1),
  description: lText,
  educationalMeaning: lText,
  dissertationNote: lTextOpt,
  reference: z.string().min(1).max(500),
  image: z.string().max(300).regex(/^(\/uploads\/[0-9a-f-]{36}\.(jpg|png|webp)|https:\/\/[^\s<>"']+)$/).nullable().optional(),
  valueIds: z.array(z.string()).optional(),
  reviewStatus: z.enum(['DRAFT', 'REVIEWED']).optional(),
});
export const sourceUpdateSchema = sourceCreateSchema.partial();
export type SourceCreate = z.infer<typeof sourceCreateSchema>;
export type SourceUpdate = z.infer<typeof sourceUpdateSchema>;
