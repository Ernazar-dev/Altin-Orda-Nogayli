import { notFound } from '../../lib/errors';
import type { CrudService } from '../../lib/crud';
import { thinkersRepository } from './thinkers.repository';
import type { ThinkerCreate, ThinkerUpdate, ThinkerValueInput } from './thinkers.schema';

export const thinkersService: CrudService & {
  linkValue(id: string, input: ThinkerValueInput): Promise<unknown>;
  unlinkValue(id: string, valueId: string): Promise<void>;
} = {
  list: (query) => thinkersRepository.list(query.periodId),
  async get(id) {
    const t = await thinkersRepository.get(id);
    if (!t) throw notFound('Mutafakkir topilmadi');
    return t;
  },
  create: (data) => thinkersRepository.create(data as ThinkerCreate),
  async update(id, data) {
    await thinkersService.get(id, '', '');
    return thinkersRepository.update(id, data as ThinkerUpdate);
  },
  async remove(id) {
    await thinkersService.get(id, '', '');
    await thinkersRepository.remove(id);
  },
  async linkValue(id, input) {
    await thinkersService.get(id, '', '');
    return thinkersRepository.linkValue(id, input);
  },
  async unlinkValue(id, valueId) {
    await thinkersRepository.unlinkValue(id, valueId);
  },
};
