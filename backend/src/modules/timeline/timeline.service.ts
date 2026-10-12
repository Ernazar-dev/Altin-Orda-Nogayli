import { prisma } from '../../config/prisma';
import { notFound } from '../../lib/errors';
import type { CrudService } from '../../lib/crud';
import type { TimelineCreate, TimelineUpdate } from './timeline.schema';

export const timelineService: CrudService = {
  list: (query) =>
    prisma.timelineEvent.findMany({
      where: query.periodId ? { periodId: query.periodId } : undefined,
      orderBy: [{ order: 'asc' }, { year: 'asc' }],
    }),
  async get(id) {
    const e = await prisma.timelineEvent.findUnique({ where: { id } });
    if (!e) throw notFound('Timeline yozuvi topilmadi');
    return e;
  },
  create: (data) => prisma.timelineEvent.create({ data: data as TimelineCreate }),
  async update(id, data) {
    await timelineService.get(id, '', '');
    return prisma.timelineEvent.update({ where: { id }, data: data as TimelineUpdate });
  },
  async remove(id) {
    await timelineService.get(id, '', '');
    await prisma.timelineEvent.delete({ where: { id } });
  },
};
