import { Prisma } from '@prisma/client';
import { prisma } from '../../config/prisma';
import { notFound } from '../../lib/errors';
import { average } from '../../lib/scoring';
import { resultsService } from '../results/results.service';

export const studentsService = {
  async list(q?: string, classLevel?: number) {
    const where: Prisma.UserWhereInput = { role: 'STUDENT' };
    if (classLevel) where.classLevel = classLevel;
    if (q) {
      where.OR = [
        { fullName: { contains: q, mode: 'insensitive' } },
        { username: { contains: q, mode: 'insensitive' } },
      ];
    }
    const users = await prisma.user.findMany({
      where,
      orderBy: { fullName: 'asc' },
      select: {
        id: true,
        fullName: true,
        username: true,
        classLevel: true,
        createdAt: true,
        testResults: { select: { percent: true } },
        diagnosticResults: { select: { kind: true, percent: true, createdAt: true }, orderBy: { createdAt: 'desc' } },
      },
    });
    return users.map(({ testResults, diagnosticResults, ...u }) => {
      const initial = diagnosticResults.find((d) => d.kind === 'INITIAL')?.percent ?? null;
      const final = diagnosticResults.find((d) => d.kind === 'FINAL')?.percent ?? null;
      return {
        ...u,
        testsCompleted: testResults.length,
        averagePercent: average(testResults.map((t) => t.percent)),
        initialPercent: initial,
        finalPercent: final,
        delta: initial !== null && final !== null ? final - initial : null,
      };
    });
  },

  async get(id: string) {
    const u = await prisma.user.findFirst({
      where: { id, role: 'STUDENT' },
      select: { id: true, fullName: true, username: true, role: true, classLevel: true, createdAt: true },
    });
    if (!u) throw notFound('Student topilmadi');
    return u;
  },

  async results(id: string) {
    await studentsService.get(id);
    return resultsService.forStudent(id);
  },
};
