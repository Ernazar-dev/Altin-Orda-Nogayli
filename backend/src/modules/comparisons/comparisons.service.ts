import { prisma } from '../../config/prisma';
import { notFound } from '../../lib/errors';
import type { CrudService } from '../../lib/crud';
import type { ComparisonCreate, ComparisonUpdate } from './comparisons.schema';

export const comparisonsService: CrudService = {
  list: () => prisma.comparisonEntry.findMany({ orderBy: { order: 'asc' } }),
  async get(id) {
    const e = await prisma.comparisonEntry.findUnique({ where: { id } });
    if (!e) throw notFound('Taqqoslash yozuvi topilmadi');
    return e;
  },
  create: (data) => prisma.comparisonEntry.create({ data: data as ComparisonCreate }),
  async update(id, data) {
    await comparisonsService.get(id, '', '');
    return prisma.comparisonEntry.update({ where: { id }, data: data as ComparisonUpdate });
  },
  async remove(id) {
    await comparisonsService.get(id, '', '');
    await prisma.comparisonEntry.delete({ where: { id } });
  },
};
