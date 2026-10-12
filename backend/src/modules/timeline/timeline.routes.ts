import { Router } from 'express';
import { crudController } from '../../lib/crud';
import { optionalAuth, teacherOnly } from '../../middlewares/auth';
import { validateBody } from '../../middlewares/validate';
import { timelineCreateSchema, timelineUpdateSchema } from './timeline.schema';
import { timelineService } from './timeline.service';

const c = crudController(timelineService);
export const timelineRoutes = Router();
timelineRoutes.use(optionalAuth);
timelineRoutes.get('/', c.list);
timelineRoutes.get('/:id', c.get);
timelineRoutes.post('/', teacherOnly, validateBody(timelineCreateSchema), c.create);
timelineRoutes.put('/:id', teacherOnly, validateBody(timelineUpdateSchema), c.update);
timelineRoutes.delete('/:id', teacherOnly, c.remove);
