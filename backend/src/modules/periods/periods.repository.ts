import { prisma } from '../../config/prisma';
import type { PeriodCreate, PeriodUpdate } from './periods.schema';

const detailInclude = {
  thinkers: {
    select: { id: true, name: true, birthYear: true, deathYear: true, image: true, mainIdeas: true },
    orderBy: { createdAt: 'asc' as const },
  },
  sources: {
    select: { id: true, title: true, type: true, excerpt: true, reference: true, thinkerId: true, image: true },
    orderBy: { createdAt: 'asc' as const },
  },
  _count: { select: { thinkers: true, sources: true } },
};

export const periodsRepository = {
  list: () =>
    prisma.period.findMany({
      orderBy: { order: 'asc' },
      include: { _count: { select: { thinkers: true, sources: true } } },
    }),
  get: (id: string) => prisma.period.findUnique({ where: { id }, include: detailInclude }),
  create: (data: PeriodCreate) =>
    prisma.period.create({ data: { ...data, startYear: data.startYear ?? null, endYear: data.endYear ?? null } }),
  update: (id: string, data: PeriodUpdate) => prisma.period.update({ where: { id }, data }),
  remove: (id: string) => prisma.period.delete({ where: { id } }),
};
