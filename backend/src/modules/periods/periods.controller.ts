import { crudController } from '../../lib/crud';
import { periodsService } from './periods.service';

export const periodsController = crudController(periodsService);
