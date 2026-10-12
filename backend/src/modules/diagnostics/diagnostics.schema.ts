import { z } from 'zod';
import { lText } from '../../lib/types';
import { questionSchema } from '../tests/tests.schema';

export const diagnosticCreateSchema = z.object({
  kind: z.enum(['INITIAL', 'FINAL']),
  title: lText,
  questions: z.array(questionSchema).min(1),
});
export const diagnosticUpdateSchema = diagnosticCreateSchema.partial();
export type DiagnosticCreate = z.infer<typeof diagnosticCreateSchema>;
export type DiagnosticUpdate = z.infer<typeof diagnosticUpdateSchema>;
