import { Router } from 'express';
import { asyncHandler, param, send } from '../../lib/http';
import { crudController } from '../../lib/crud';
import { authenticate, optionalAuth, currentUser, studentOnly, teacherOnly } from '../../middlewares/auth';
import { validateBody } from '../../middlewares/validate';
import { activityCreateSchema, activityUpdateSchema, attemptSchema } from './activities.schema';
import { activitiesService } from './activities.service';

const c = crudController(activitiesService);
export const activitiesRoutes = Router();
activitiesRoutes.get('/', optionalAuth, c.list);
activitiesRoutes.use(authenticate);
activitiesRoutes.get('/:id', c.get);
activitiesRoutes.post('/', teacherOnly, validateBody(activityCreateSchema), c.create);
activitiesRoutes.put('/:id', teacherOnly, validateBody(activityUpdateSchema), c.update);
activitiesRoutes.delete('/:id', teacherOnly, c.remove);
activitiesRoutes.post(
  '/:id/attempt',
  studentOnly,
  validateBody(attemptSchema),
  asyncHandler(async (req, res) =>
    send(res, await activitiesService.attempt(param(req, 'id'), req.body.optionId, currentUser(req).id)),
  ),
);
