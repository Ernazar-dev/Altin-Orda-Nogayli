import { crudController } from '../../lib/crud';
import { sourcesService } from './sources.service';

export const sourcesController = crudController(sourcesService);
