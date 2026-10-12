import { Router } from 'express';
import { z } from 'zod';
import { asyncHandler, send } from '../../lib/http';
import { authenticate, teacherOnly } from '../../middlewares/auth';
import { validateBody } from '../../middlewares/validate';
import { settingsService } from './settings.service';

const levelsSchema = z
  .array(
    z.object({
      level: z.enum(['HIGH', 'MEDIUM', 'LOW']),
      minPercent: z.number().int().min(0).max(100),
    }),
  )
  .min(2);

export const settingsRoutes = Router();
settingsRoutes.use(authenticate);
settingsRoutes.get(
  '/levels',
  asyncHandler(async (_req, res) => send(res, await settingsService.getLevels())),
);
settingsRoutes.put(
  '/levels',
  teacherOnly,
  validateBody(levelsSchema),
  asyncHandler(async (req, res) => send(res, await settingsService.saveLevels(req.body))),
);
