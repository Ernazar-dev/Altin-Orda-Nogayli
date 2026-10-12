import type { Prisma } from '@prisma/client';
import { prisma } from '../../config/prisma';
import { answersDto } from '../../lib/resultDto';
import { average, levelFor, mergeByCriterion } from '../../lib/scoring';
import type { ByCriterion } from '../../lib/types';
import { settingsRepository } from '../settings/settings.repository';

const asByCriterion = (v: unknown): ByCriterion => v as ByCriterion;

export interface FeedQuery {
  kind?: 'TEST' | 'DIAGNOSTIC' | 'ACTIVITY';
  classLevel?: number;
  q?: string;
  limit: number;
}

const feedStudent = { select: { id: true, fullName: true, username: true, classLevel: true } } as const;

export const resultsService = {
  /** Ustoz uchun: kim qaysi test, diagnostika yoki topshiriqni ishlagani — eng yangisidan boshlab. */
  async feed(query: FeedQuery) {
    const user: Prisma.UserWhereInput = { role: 'STUDENT' };
    if (query.classLevel) user.classLevel = query.classLevel;
    if (query.q) {
      user.OR = [
        { fullName: { contains: query.q, mode: 'insensitive' } },
        { username: { contains: query.q, mode: 'insensitive' } },
      ];
    }
    const take = query.limit;
    const want = (k: NonNullable<FeedQuery['kind']>) => !query.kind || query.kind === k;
    const [tests, diagnostics, attempts, counts] = await Promise.all([
      want('TEST')
        ? prisma.testResult.findMany({
            where: { user },
            orderBy: { createdAt: 'desc' },
            take,
            include: { user: feedStudent, test: { select: { id: true, title: true } } },
          })
        : [],
      want('DIAGNOSTIC')
        ? prisma.diagnosticResult.findMany({
            where: { user },
            orderBy: { createdAt: 'desc' },
            take,
            include: { user: feedStudent, diagnostic: { select: { id: true, title: true } } },
          })
        : [],
      want('ACTIVITY')
        ? prisma.activityAttempt.findMany({
            where: { user },
            orderBy: { createdAt: 'desc' },
            take,
            include: { user: feedStudent, activity: { select: { id: true, title: true } } },
          })
        : [],
      Promise.all([
        prisma.testResult.count({ where: { user } }),
        prisma.diagnosticResult.count({ where: { user } }),
        prisma.activityAttempt.count({ where: { user } }),
      ]),
    ]);

    const items = [
      ...tests.map((r) => ({
        id: r.id,
        kind: 'TEST' as const,
        student: r.user,
        title: r.test.title,
        refId: r.test.id,
        correct: r.correct,
        total: r.total,
        percent: r.percent,
        level: r.level,
        createdAt: r.createdAt,
      })),
      ...diagnostics.map((r) => ({
        id: r.id,
        kind: r.kind,
        student: r.user,
        title: r.diagnostic.title,
        refId: r.diagnostic.id,
        correct: r.correct,
        total: r.total,
        percent: r.percent,
        level: r.level,
        createdAt: r.createdAt,
      })),
      ...attempts.map((r) => ({
        id: r.id,
        kind: 'ACTIVITY' as const,
        student: r.user,
        title: r.activity.title,
        refId: r.activity.id,
        correct: r.isCorrect ? 1 : 0,
        total: 1,
        percent: r.isCorrect ? 100 : 0,
        level: null,
        createdAt: r.createdAt,
      })),
    ]
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .slice(0, take);

    return { items, totals: { tests: counts[0], diagnostics: counts[1], activities: counts[2] } };
  },

  async forStudent(userId: string) {
    const [tests, diagnostics, attempts, viewed, totals, levels] = await Promise.all([
      prisma.testResult.findMany({
        where: { userId },
        orderBy: { createdAt: 'desc' },
        include: {
          test: { select: { id: true, title: true } },
          answers: { include: { question: { include: { options: true } } } },
        },
      }),
      prisma.diagnosticResult.findMany({
        where: { userId },
        orderBy: { createdAt: 'desc' },
        include: {
          diagnostic: { select: { id: true, title: true, kind: true } },
          answers: { include: { question: { include: { options: true } } } },
        },
      }),
      prisma.activityAttempt.findMany({ where: { userId }, orderBy: { createdAt: 'desc' } }),
      prisma.studentProgress.groupBy({ by: ['entityType'], where: { userId }, _count: { _all: true } }),
      Promise.all([prisma.period.count(), prisma.thinker.count(), prisma.educationalValue.count()]),
      settingsRepository.getLevels(),
    ]);

    const testDtos = tests.map(({ answers, ...r }) => ({ ...r, answers: answersDto(answers) }));
    const diagDtos = diagnostics.map(({ answers, ...r }) => ({ ...r, answers: answersDto(answers) }));

    const latestByActivity = new Map<string, boolean>();
    for (const a of attempts) if (!latestByActivity.has(a.activityId)) latestByActivity.set(a.activityId, a.isCorrect);
    const activities = {
      total: latestByActivity.size,
      correct: [...latestByActivity.values()].filter(Boolean).length,
    };

    const initial = diagnostics.find((d) => d.kind === 'INITIAL');
    const final = diagnostics.find((d) => d.kind === 'FINAL');
    const growth =
      initial && final
        ? { initial: initial.percent, final: final.percent, delta: final.percent - initial.percent }
        : null;
    const criterionGrowth =
      initial && final
        ? { initial: asByCriterion(initial.byCriterion), final: asByCriterion(final.byCriterion) }
        : null;

    const allPercents = [...tests.map((t) => t.percent), ...diagnostics.map((d) => d.percent)];
    const averagePercent = average(allPercents);
    const count = (t: string) => viewed.find((v) => v.entityType === t)?._count._all ?? 0;

    return {
      tests: testDtos,
      diagnostics: diagDtos,
      activities,
      growth,
      criterionGrowth,
      byCriterion: mergeByCriterion([
        ...tests.map((t) => asByCriterion(t.byCriterion)),
        ...diagnostics.map((d) => asByCriterion(d.byCriterion)),
      ]),
      average: averagePercent,
      level: allPercents.length ? levelFor(averagePercent, levels) : null,
      progress: {
        periodsViewed: count('PERIOD'),
        periodsTotal: totals[0],
        thinkersViewed: count('THINKER'),
        thinkersTotal: totals[1],
        valuesViewed: count('VALUE'),
        valuesTotal: totals[2],
      },
    };
  },

  async markViewed(userId: string, entityType: 'PERIOD' | 'THINKER' | 'VALUE' | 'SOURCE', entityId: string) {
    await prisma.studentProgress.upsert({
      where: { userId_entityType_entityId: { userId, entityType, entityId } },
      update: { viewedAt: new Date() },
      create: { userId, entityType, entityId },
    });
  },
};
