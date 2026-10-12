import { Prisma } from '@prisma/client';
import { prisma } from '../../config/prisma';
import type { SourceCreate, SourceUpdate } from './sources.schema';

export interface SourceFilter {
  periodId?: string;
  thinkerId?: string;
  type?: string;
  valueId?: string;
}

const include = { values: { select: { valueId: true } } } satisfies Prisma.SourceInclude;

export const sourcesRepository = {
  list: (f: SourceFilter) => {
    const where: Prisma.SourceWhereInput = {};
    if (f.periodId) where.periodId = f.periodId;
    if (f.thinkerId) where.thinkerId = f.thinkerId;
    if (f.type) where.type = f.type as Prisma.SourceWhereInput['type'];
    if (f.valueId) where.values = { some: { valueId: f.valueId } };
    return prisma.source.findMany({ where, orderBy: { createdAt: 'asc' }, include });
  },
  get: (id: string) => prisma.source.findUnique({ where: { id }, include }),
  create: (data: SourceCreate) => {
    const { valueIds, dissertationNote, thinkerId, ...rest } = data;
    return prisma.source.create({
      data: {
        ...rest,
        thinkerId: thinkerId ?? null,
        dissertationNote: dissertationNote ?? Prisma.DbNull,
        values: valueIds ? { create: valueIds.map((valueId) => ({ valueId })) } : undefined,
      },
      include,
    });
  },
  update: (id: string, data: SourceUpdate) => {
    const { valueIds, dissertationNote, ...rest } = data;
    return prisma.$transaction(async (tx) => {
      if (valueIds) {
        await tx.sourceValue.deleteMany({ where: { sourceId: id } });
        await tx.sourceValue.createMany({ data: valueIds.map((valueId) => ({ sourceId: id, valueId })) });
      }
      return tx.source.update({
        where: { id },
        data: {
          ...rest,
          ...(dissertationNote === undefined ? {} : { dissertationNote: dissertationNote ?? Prisma.DbNull }),
        },
        include,
      });
    });
  },
  remove: (id: string) => prisma.source.delete({ where: { id } }),
};
