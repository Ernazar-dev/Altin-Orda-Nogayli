import { Router } from 'express';
import { optionalAuth, teacherOnly } from '../../middlewares/auth';
import { validateBody } from '../../middlewares/validate';
import { periodsController as c } from './periods.controller';
import { periodCreateSchema, periodUpdateSchema } from './periods.schema';

export const periodsRoutes = Router();
periodsRoutes.use(optionalAuth);
periodsRoutes.get('/', c.list);
periodsRoutes.get('/:id', c.get);
periodsRoutes.post('/', teacherOnly, validateBody(periodCreateSchema), c.create);
periodsRoutes.put('/:id', teacherOnly, validateBody(periodUpdateSchema), c.update);
periodsRoutes.delete('/:id', teacherOnly, c.remove);
