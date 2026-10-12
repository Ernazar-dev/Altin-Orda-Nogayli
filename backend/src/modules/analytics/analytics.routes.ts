import { Router } from 'express';
import { z } from 'zod';
import { asyncHandler, send } from '../../lib/http';
import { authenticate, teacherOnly } from '../../middlewares/auth';
import { parseQuery } from '../../middlewares/validate';
import { analyticsService, type AnalyticsQuery } from './analytics.service';

const querySchema = z.object({
  classLevel: z.coerce.number().int().min(1).max(11).optional(),
  studentId: z.string().min(1).optional(),
  testId: z.string().min(1).optional(),
  criterion: z.enum(['AXIOLOGICAL', 'COGNITIVE', 'ACTIVITY', 'REFLECTIVE']).optional(),
  kind: z.enum(['TEST', 'INITIAL', 'FINAL']).optional(),
});

export const analyticsRoutes = Router();
analyticsRoutes.use(authenticate, teacherOnly);

const handler = (fn: (q: AnalyticsQuery) => Promise<unknown>) =>
  asyncHandler(async (req, res) => send(res, await fn(parseQuery(querySchema, req))));

analyticsRoutes.get('/overview', handler((q) => analyticsService.overview(q)));
analyticsRoutes.get('/by-class', handler((q) => analyticsService.byClass(q)));
analyticsRoutes.get('/by-criterion', handler((q) => analyticsService.byCriterion(q)));
analyticsRoutes.get('/by-test', handler((q) => analyticsService.byTest(q)));
analyticsRoutes.get('/diagnostic-growth', handler((q) => analyticsService.diagnosticGrowth(q)));
analyticsRoutes.get('/levels', handler((q) => analyticsService.levels(q)));
analyticsRoutes.get(
  '/export.csv',
  asyncHandler(async (req, res) => {
    const csv = await analyticsService.exportCsv(parseQuery(querySchema, req));
    res.setHeader('Content-Type', 'text/csv; charset=utf-8');
    res.setHeader('Content-Disposition', 'attachment; filename="natijalar.csv"');
    res.send(csv);
  }),
);
