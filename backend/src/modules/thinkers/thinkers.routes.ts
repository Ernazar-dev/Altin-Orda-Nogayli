import { Router } from 'express';
import { optionalAuth, teacherOnly } from '../../middlewares/auth';
import { validateBody } from '../../middlewares/validate';
import { thinkersController as c } from './thinkers.controller';
import { thinkerCreateSchema, thinkerUpdateSchema, thinkerValueSchema } from './thinkers.schema';

export const thinkersRoutes = Router();
thinkersRoutes.use(optionalAuth);
thinkersRoutes.get('/', c.list);
thinkersRoutes.get('/:id', c.get);
thinkersRoutes.post('/', teacherOnly, validateBody(thinkerCreateSchema), c.create);
thinkersRoutes.put('/:id', teacherOnly, validateBody(thinkerUpdateSchema), c.update);
thinkersRoutes.delete('/:id', teacherOnly, c.remove);
thinkersRoutes.post('/:id/values', teacherOnly, validateBody(thinkerValueSchema), c.linkValue);
thinkersRoutes.delete('/:id/values/:valueId', teacherOnly, c.unlinkValue);
