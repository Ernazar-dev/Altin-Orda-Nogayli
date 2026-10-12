import { Router } from 'express';
import { optionalAuth, teacherOnly } from '../../middlewares/auth';
import { validateBody } from '../../middlewares/validate';
import { valuesController as c } from './values.controller';
import { valueCreateSchema, valueUpdateSchema } from './values.schema';

export const valuesRoutes = Router();
valuesRoutes.use(optionalAuth);
valuesRoutes.get('/', c.list);
valuesRoutes.get('/:id', c.get);
valuesRoutes.post('/', teacherOnly, validateBody(valueCreateSchema), c.create);
valuesRoutes.put('/:id', teacherOnly, validateBody(valueUpdateSchema), c.update);
valuesRoutes.delete('/:id', teacherOnly, c.remove);
