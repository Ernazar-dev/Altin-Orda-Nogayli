import { prisma } from '../../config/prisma';
import type { ValueCreate, ValueUpdate } from './values.schema';

export const valuesRepository = {
  list: () =>
    prisma.educationalValue.findMany({
      orderBy: { createdAt: 'asc' },
      include: { _count: { select: { thinkers: true, sources: true } } },
    }),
  get: (id: string) =>
    prisma.educationalValue.findUnique({
      where: { id },
      include: {
        thinkers: {
          include: {
            thinker: {
              select: { id: true, name: true, image: true, periodId: true, birthYear: true, deathYear: true },
            },
            source: { select: { id: true, title: true, reference: true } },
          },
        },
        sources: {
          include: {
            source: {
              select: {
                id: true,
                title: true,
                type: true,
                excerpt: true,
                reference: true,
                thinkerId: true,
                periodId: true,
              },
            },
          },
        },
      },
    }),
  create: (data: ValueCreate) => prisma.educationalValue.create({ data }),
  update: (id: string, data: ValueUpdate) => prisma.educationalValue.update({ where: { id }, data }),
  remove: (id: string) => prisma.educationalValue.delete({ where: { id } }),
};
