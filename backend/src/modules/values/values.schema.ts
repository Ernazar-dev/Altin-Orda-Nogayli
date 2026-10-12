import { z } from 'zod';
import { lText } from '../../lib/types';

export const valueCreateSchema = z.object({
  name: lText,
  description: lText,
  modernInterpretation: lText,
  category: z.enum([
    'AXIOLOGICAL',
    'INTELLECTUAL',
    'PATRIOTIC',
    'FAMILY',
    'LABOR',
    'COMMUNICATIVE',
    'AESTHETIC',
    'REFLECTIVE',
    'SOCIAL',
  ]),
  reviewStatus: z.enum(['DRAFT', 'REVIEWED']).optional(),
});
export const valueUpdateSchema = valueCreateSchema.partial();
export type ValueCreate = z.infer<typeof valueCreateSchema>;
export type ValueUpdate = z.infer<typeof valueUpdateSchema>;
