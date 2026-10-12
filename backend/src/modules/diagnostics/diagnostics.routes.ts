import { Router } from 'express';
import { asyncHandler, param, send } from '../../lib/http';
import { crudController } from '../../lib/crud';
import { authenticate, optionalAuth, currentUser, studentOnly, teacherOnly } from '../../middlewares/auth';
import { validateBody } from '../../middlewares/validate';
import { submitSchema } from '../tests/tests.schema';
import { diagnosticCreateSchema, diagnosticUpdateSchema } from './diagnostics.schema';
import { diagnosticsService } from './diagnostics.service';

const c = crudController(diagnosticsService);
export const diagnosticsRoutes = Router();
diagnosticsRoutes.get('/', optionalAuth, c.list);
diagnosticsRoutes.use(authenticate);
diagnosticsRoutes.get('/:id', c.get);
diagnosticsRoutes.post('/', teacherOnly, validateBody(diagnosticCreateSchema), c.create);
diagnosticsRoutes.put('/:id', teacherOnly, validateBody(diagnosticUpdateSchema), c.update);
diagnosticsRoutes.delete('/:id', teacherOnly, c.remove);
diagnosticsRoutes.post(
  '/:id/submit',
  studentOnly,
  validateBody(submitSchema),
  asyncHandler(async (req, res) =>
    send(res, await diagnosticsService.submit(param(req, 'id'), currentUser(req).id, req.body), undefined, 201),
  ),
);
