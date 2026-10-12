import { Router } from 'express';
import { optionalAuth, teacherOnly } from '../../middlewares/auth';
import { validateBody } from '../../middlewares/validate';
import { sourcesController as c } from './sources.controller';
import { sourceCreateSchema, sourceUpdateSchema } from './sources.schema';

export const sourcesRoutes = Router();
sourcesRoutes.use(optionalAuth);
sourcesRoutes.get('/', c.list);
sourcesRoutes.get('/:id', c.get);
sourcesRoutes.post('/', teacherOnly, validateBody(sourceCreateSchema), c.create);
sourcesRoutes.put('/:id', teacherOnly, validateBody(sourceUpdateSchema), c.update);
sourcesRoutes.delete('/:id', teacherOnly, c.remove);
