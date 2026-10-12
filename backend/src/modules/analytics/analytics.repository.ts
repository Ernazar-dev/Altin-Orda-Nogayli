import type { Level, Prisma } from '@prisma/client';
import { prisma } from '../../config/prisma';
import type { ByCriterion } from '../../lib/types';

export type RecordSource = 'TEST' | 'INITIAL' | 'FINAL';

export interface AnalyticsRecord {
  source: RecordSource;
  studentId: string;
  studentName: string;
  classLevel: number | null;
  testId: string | null;
  title: string;
  percent: number;
  level: Level;
  byCriterion: ByCriterion;
  createdAt: Date;
}

export interface AnalyticsFilter {
  classLevel?: number;
  studentId?: string;
  testId?: string;
  kind?: RecordSource;
}

const userWhere = (f: AnalyticsFilter): Prisma.UserWhereInput => ({
  role: 'STUDENT',
  classLevel: f.classLevel,
  id: f.studentId,
});

const titleOf = (t: unknown): string => {
  const o = t as { uz?: string; kaa?: string } | null;
  return o?.uz || o?.kaa || '';
};

export const analyticsRepository = {
  async records(f: AnalyticsFilter): Promise<AnalyticsRecord[]> {
    const out: AnalyticsRecord[] = [];
    if (!f.kind || f.kind === 'TEST') {
      const rows = await prisma.testResult.findMany({
        where: { user: userWhere(f), testId: f.testId },
        include: { user: true, test: { select: { title: true } } },
        orderBy: { createdAt: 'asc' },
      });
      for (const r of rows) {
        out.push({
          source: 'TEST',
          studentId: r.userId,
          studentName: r.user.fullName,
          classLevel: r.user.classLevel,
          testId: r.testId,
          title: titleOf(r.test.title),
          percent: r.percent,
          level: r.level,
          byCriterion: r.byCriterion as unknown as ByCriterion,
          createdAt: r.createdAt,
        });
      }
    }
    if (!f.testId && (!f.kind || f.kind === 'INITIAL' || f.kind === 'FINAL')) {
      const rows = await prisma.diagnosticResult.findMany({
        where: { user: userWhere(f), kind: f.kind === 'INITIAL' || f.kind === 'FINAL' ? f.kind : undefined },
        include: { user: true, diagnostic: { select: { title: true } } },
        orderBy: { createdAt: 'asc' },
      });
      for (const r of rows) {
        out.push({
          source: r.kind,
          studentId: r.userId,
          studentName: r.user.fullName,
          classLevel: r.user.classLevel,
          testId: null,
          title: titleOf(r.diagnostic.title),
          percent: r.percent,
          level: r.level,
          byCriterion: r.byCriterion as unknown as ByCriterion,
          createdAt: r.createdAt,
        });
      }
    }
    return out;
  },

  async counts() {
    const [students, periods, thinkers, values, sources, tests] = await Promise.all([
      prisma.user.count({ where: { role: 'STUDENT' } }),
      prisma.period.count(),
      prisma.thinker.count(),
      prisma.educationalValue.count(),
      prisma.source.count(),
      prisma.test.count(),
    ]);
    return { students, periods, thinkers, values, sources, tests };
  },
};
