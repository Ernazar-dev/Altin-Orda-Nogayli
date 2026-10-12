import { Router } from 'express';
import { z } from 'zod';
import { asyncHandler, param, send } from '../../lib/http';
import { authenticate, teacherOnly } from '../../middlewares/auth';
import { parseQuery } from '../../middlewares/validate';
import { studentsService } from './students.service';

const listQuery = z.object({
  q: z.string().max(100).optional(),
  classLevel: z.coerce.number().int().min(1).max(11).optional(),
});

export const studentsRoutes = Router();
studentsRoutes.use(authenticate, teacherOnly);
studentsRoutes.get(
  '/',
  asyncHandler(async (req, res) => {
    const q = parseQuery(listQuery, req);
    send(res, await studentsService.list(q.q, q.classLevel));
  }),
);
studentsRoutes.get(
  '/:id',
  asyncHandler(async (req, res) => send(res, await studentsService.get(param(req, 'id')))),
);
studentsRoutes.get(
  '/:id/results',
  asyncHandler(async (req, res) => send(res, await studentsService.results(param(req, 'id')))),
);
