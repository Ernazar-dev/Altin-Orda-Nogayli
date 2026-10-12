import { z } from 'zod';
import { lText } from '../../lib/types';

export const timelineCreateSchema = z.object({
  kind: z.enum(['DAVR', 'VOQEA', 'MUTAFAKKIR', 'ASAR', 'GOYA']),
  year: z.number().int().nullable().optional(),
  yearLabel: z.string().max(80).nullable().optional(),
  title: lText,
  description: lText,
  periodId: z.string().nullable().optional(),
  refType: z.string().max(40).nullable().optional(),
  refId: z.string().nullable().optional(),
  sourceRef: z.string().max(300).nullable().optional(),
  order: z.number().int().default(0),
  reviewStatus: z.enum(['DRAFT', 'REVIEWED']).optional(),
});
export const timelineUpdateSchema = timelineCreateSchema.partial();
export type TimelineCreate = z.infer<typeof timelineCreateSchema>;
export type TimelineUpdate = z.infer<typeof timelineUpdateSchema>;
