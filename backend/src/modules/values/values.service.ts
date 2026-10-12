import { notFound } from '../../lib/errors';
import type { CrudService } from '../../lib/crud';
import { valuesRepository } from './values.repository';
import type { ValueCreate, ValueUpdate } from './values.schema';

export const valuesService: CrudService = {
  list: () => valuesRepository.list(),
  async get(id) {
    const v = await valuesRepository.get(id);
    if (!v) throw notFound('Qadriyat topilmadi');
    return {
      ...v,
      thinkers: v.thinkers.map((t) => ({ thinker: t.thinker, description: t.description, source: t.source })),
      sources: v.sources.map((s) => s.source),
    };
  },
  create: (data) => valuesRepository.create(data as ValueCreate),
  async update(id, data) {
    await valuesService.get(id, '', '');
    return valuesRepository.update(id, data as ValueUpdate);
  },
  async remove(id) {
    await valuesService.get(id, '', '');
    await valuesRepository.remove(id);
  },
};
