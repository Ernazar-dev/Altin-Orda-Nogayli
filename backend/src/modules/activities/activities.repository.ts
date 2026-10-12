import { Prisma } from '@prisma/client';
import { prisma } from '../../config/prisma';
import type { ActivityCreate, ActivityUpdate } from './activities.schema';

export interface ActivityFilter {
  type?: string;
  periodId?: string;
  thinkerId?: string;
}

const include = {
  options: { orderBy: { order: 'asc' as const } },
  source: {
    select: { id: true, title: true, type: true, excerpt: true, content: true, reference: true, thinkerId: true },
  },
} satisfies Prisma.ActivityInclude;

const optionRows = (options: NonNullable<ActivityCreate['options']>) =>
  options.map((o, order) => ({
    text: o.text,
    isCorrect: o.isCorrect,
    explanation: o.explanation ?? Prisma.DbNull,
    order,
  }));

export const activitiesRepository = {
  list: (f: ActivityFilter) => {
    const where: Prisma.ActivityWhereInput = {};
    if (f.type) where.type = f.type as Prisma.ActivityWhereInput['type'];
    if (f.periodId) where.periodId = f.periodId;
    if (f.thinkerId) where.thinkerId = f.thinkerId;
    return prisma.activity.findMany({ where, orderBy: { createdAt: 'asc' }, include });
  },
  get: (id: string) => prisma.activity.findUnique({ where: { id }, include }),
  create: (data: ActivityCreate, createdById: string) => {
    const { options, modernExample, sourceId, periodId, thinkerId, ...rest } = data;
    return prisma.activity.create({
      data: {
        ...rest,
        modernExample: modernExample ?? Prisma.DbNull,
        sourceId: sourceId ?? null,
        periodId: periodId ?? null,
        thinkerId: thinkerId ?? null,
        createdById,
        options: { create: optionRows(options) },
      },
      include,
    });
  },
  update: (id: string, data: ActivityUpdate) => {
    const { options, modernExample, ...rest } = data;
    return prisma.$transaction(async (tx) => {
      if (options) {
        await tx.activityOption.deleteMany({ where: { activityId: id } });
        await tx.activityOption.createMany({ data: optionRows(options).map((o) => ({ ...o, activityId: id })) });
      }
      return tx.activity.update({
        where: { id },
        data: {
          ...rest,
          ...(modernExample === undefined ? {} : { modernExample: modernExample ?? Prisma.DbNull }),
        },
        include,
      });
    });
  },
  remove: (id: string) => prisma.activity.delete({ where: { id } }),
  latestAttempts: (userId: string) =>
    prisma.activityAttempt.findMany({ where: { userId }, select: { activityId: true } }),
  createAttempt: (userId: string, activityId: string, optionId: string, isCorrect: boolean) =>
    prisma.activityAttempt.create({ data: { userId, activityId, optionId, isCorrect } }),
};
