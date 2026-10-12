import { Router } from 'express';
import { crudController } from '../../lib/crud';
import { optionalAuth, teacherOnly } from '../../middlewares/auth';
import { validateBody } from '../../middlewares/validate';
import { comparisonCreateSchema, comparisonUpdateSchema } from './comparisons.schema';
import { comparisonsService } from './comparisons.service';

const c = crudController(comparisonsService);
export const comparisonsRoutes = Router();
comparisonsRoutes.use(optionalAuth);
comparisonsRoutes.get('/', c.list);
comparisonsRoutes.get('/:id', c.get);
comparisonsRoutes.post('/', teacherOnly, validateBody(comparisonCreateSchema), c.create);
comparisonsRoutes.put('/:id', teacherOnly, validateBody(comparisonUpdateSchema), c.update);
comparisonsRoutes.delete('/:id', teacherOnly, c.remove);
