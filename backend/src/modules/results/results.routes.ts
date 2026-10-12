import { Router } from 'express';
import { z } from 'zod';
import { asyncHandler, send } from '../../lib/http';
import { authenticate, currentUser, studentOnly, teacherOnly } from '../../middlewares/auth';
import { parseQuery, validateBody } from '../../middlewares/validate';
import { resultsService } from './results.service';

const viewSchema = z.object({
  entityType: z.enum(['PERIOD', 'THINKER', 'VALUE', 'SOURCE']),
  entityId: z.string().min(1),
});

const feedQuery = z.object({
  kind: z.enum(['TEST', 'DIAGNOSTIC', 'ACTIVITY']).optional(),
  classLevel: z.coerce.number().int().min(1).max(11).optional(),
  q: z.string().trim().max(100).optional(),
  limit: z.coerce.number().int().min(1).max(500).default(100),
});

export const resultsRoutes = Router();
resultsRoutes.use(authenticate);
resultsRoutes.get(
  '/feed',
  teacherOnly,
  asyncHandler(async (req, res) => send(res, await resultsService.feed(parseQuery(feedQuery, req)))),
);
resultsRoutes.get(
  '/me',
  studentOnly,
  asyncHandler(async (req, res) => send(res, await resultsService.forStudent(currentUser(req).id))),
);

export const progressRoutes = Router();
progressRoutes.use(authenticate, studentOnly);
progressRoutes.post(
  '/view',
  validateBody(viewSchema),
  asyncHandler(async (req, res) => {
    await resultsService.markViewed(currentUser(req).id, req.body.entityType, req.body.entityId);
    send(res, { ok: true });
  }),
);
