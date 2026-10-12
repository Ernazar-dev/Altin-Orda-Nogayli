import { Prisma } from '@prisma/client';
import { prisma } from '../../config/prisma';
import type { ThinkerCreate, ThinkerUpdate, ThinkerValueInput } from './thinkers.schema';

const periodSelect = { select: { id: true, name: true, startYear: true, endYear: true } };

export const thinkersRepository = {
  list: (periodId?: string) =>
    prisma.thinker.findMany({
      where: periodId ? { periodId } : undefined,
      orderBy: { createdAt: 'asc' },
      include: {
        period: periodSelect,
        _count: { select: { values: true, works: true } },
      },
    }),
  get: (id: string) =>
    prisma.thinker.findUnique({
      where: { id },
      include: {
        period: periodSelect,
        values: {
          include: {
            value: true,
            source: { select: { id: true, title: true, reference: true, excerpt: true } },
          },
        },
        works: { orderBy: { createdAt: 'asc' } },
      },
    }),
  create: (data: ThinkerCreate) =>
    prisma.thinker.create({ data: { ...data, birthYear: data.birthYear ?? null, deathYear: data.deathYear ?? null } }),
  update: (id: string, data: ThinkerUpdate) => prisma.thinker.update({ where: { id }, data }),
  remove: (id: string) => prisma.thinker.delete({ where: { id } }),
  linkValue: (thinkerId: string, input: ThinkerValueInput) =>
    prisma.thinkerValue.upsert({
      where: { thinkerId_valueId: { thinkerId, valueId: input.valueId } },
      update: { description: input.description ?? Prisma.DbNull, sourceId: input.sourceId ?? null },
      create: {
        thinkerId,
        valueId: input.valueId,
        description: input.description ?? Prisma.DbNull,
        sourceId: input.sourceId ?? null,
      },
      include: { value: true, source: { select: { id: true, title: true, reference: true } } },
    }),
  unlinkValue: (thinkerId: string, valueId: string) =>
    prisma.thinkerValue.delete({ where: { thinkerId_valueId: { thinkerId, valueId } } }),
};
