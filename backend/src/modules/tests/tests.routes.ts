import { Router } from 'express';
import { asyncHandler, param, send } from '../../lib/http';
import { crudController } from '../../lib/crud';
import { authenticate, optionalAuth, currentUser, studentOnly, teacherOnly } from '../../middlewares/auth';
import { validateBody } from '../../middlewares/validate';
import { submitSchema, testCreateSchema, testUpdateSchema } from './tests.schema';
import { testsService } from './tests.service';

const c = crudController(testsService);
export const testsRoutes = Router();
testsRoutes.get('/', optionalAuth, c.list);
testsRoutes.use(authenticate);
testsRoutes.get('/:id', c.get);
testsRoutes.post('/', teacherOnly, validateBody(testCreateSchema), c.create);
testsRoutes.put('/:id', teacherOnly, validateBody(testUpdateSchema), c.update);
testsRoutes.delete('/:id', teacherOnly, c.remove);
testsRoutes.post(
  '/:id/submit',
  studentOnly,
  validateBody(submitSchema),
  asyncHandler(async (req, res) =>
    send(res, await testsService.submit(param(req, 'id'), currentUser(req).id, req.body), undefined, 201),
  ),
);
