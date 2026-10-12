import { asyncHandler, param, send } from '../../lib/http';
import { crudController } from '../../lib/crud';
import { thinkersService } from './thinkers.service';

export const thinkersController = {
  ...crudController(thinkersService),
  linkValue: asyncHandler(async (req, res) =>
    send(res, await thinkersService.linkValue(param(req, 'id'), req.body), undefined, 201),
  ),
  unlinkValue: asyncHandler(async (req, res) => {
    await thinkersService.unlinkValue(param(req, 'id'), param(req, 'valueId'));
    send(res, { deleted: true });
  }),
};
