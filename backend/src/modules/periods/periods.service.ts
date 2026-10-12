import { notFound } from '../../lib/errors';
import type { CrudService } from '../../lib/crud';
import { periodsRepository } from './periods.repository';
import type { PeriodCreate, PeriodUpdate } from './periods.schema';

export const periodsService: CrudService = {
  list: () => periodsRepository.list(),
  async get(id) {
    const p = await periodsRepository.get(id);
    if (!p) throw notFound('Davr topilmadi');
    return p;
  },
  create: (data) => periodsRepository.create(data as PeriodCreate),
  async update(id, data) {
    await periodsService.get(id, '', '');
    return periodsRepository.update(id, data as PeriodUpdate);
  },
  async remove(id) {
    await periodsService.get(id, '', '');
    await periodsRepository.remove(id);
  },
};
