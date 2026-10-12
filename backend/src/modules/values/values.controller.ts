import { crudController } from '../../lib/crud';
import { valuesService } from './values.service';

export const valuesController = crudController(valuesService);
