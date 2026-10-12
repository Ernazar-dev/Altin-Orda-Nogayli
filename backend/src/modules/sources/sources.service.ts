import { notFound } from '../../lib/errors';
import type { CrudService } from '../../lib/crud';
import { sourcesRepository } from './sources.repository';
import type { SourceCreate, SourceUpdate } from './sources.schema';

const dto = <T extends { values: { valueId: string }[] }>(s: T) => {
  const { values, ...rest } = s;
  return { ...rest, valueIds: values.map((v) => v.valueId) };
};

export const sourcesService: CrudService = {
  async list(query) {
    const rows = await sourcesRepository.list(query);
    return rows.map(dto);
  },
  async get(id) {
    const s = await sourcesRepository.get(id);
    if (!s) throw notFound('Manba topilmadi');
    return dto(s);
  },
  async create(data) {
    return dto(await sourcesRepository.create(data as SourceCreate));
  },
  async update(id, data) {
    await sourcesService.get(id, '', '');
    return dto(await sourcesRepository.update(id, data as SourceUpdate));
  },
  async remove(id) {
    await sourcesService.get(id, '', '');
    await sourcesRepository.remove(id);
  },
};
