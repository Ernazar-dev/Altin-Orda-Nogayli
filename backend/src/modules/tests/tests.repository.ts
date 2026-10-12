import { Prisma } from '@prisma/client';
import { prisma } from '../../config/prisma';
import type { QuestionInput, TestCreate, TestUpdate } from './tests.schema';

const include = {
  questions: {
    orderBy: { order: 'asc' as const },
    include: { options: { orderBy: { order: 'asc' as const } } },
  },
} satisfies Prisma.TestInclude;

const questionCreate = (questions: QuestionInput[]) =>
  questions.map((q, order) => ({
    question: q.question,
    criterion: q.criterion,
    order,
    options: { create: q.options.map((o, i) => ({ text: o.text, isCorrect: o.isCorrect, order: i })) },
  }));

export const testsRepository = {
  list: (f: { periodId?: string; thinkerId?: string }) =>
    prisma.test.findMany({
      where: { periodId: f.periodId, thinkerId: f.thinkerId },
      orderBy: { createdAt: 'asc' },
      include: { _count: { select: { questions: true } } },
    }),
  get: (id: string) => prisma.test.findUnique({ where: { id }, include }),
  create: (data: TestCreate, createdById: string) =>
    prisma.test.create({
      data: {
        title: data.title,
        description: data.description,
        periodId: data.periodId ?? null,
        thinkerId: data.thinkerId ?? null,
        createdById,
        questions: { create: questionCreate(data.questions) },
      },
      include,
    }),
  update: (id: string, data: TestUpdate) =>
    prisma.$transaction(async (tx) => {
      if (data.questions) {
        await tx.testQuestion.deleteMany({ where: { testId: id } });
        for (const q of questionCreate(data.questions)) {
          await tx.testQuestion.create({ data: { ...q, testId: id } });
        }
      }
      return tx.test.update({
        where: { id },
        data: {
          title: data.title,
          description: data.description,
          periodId: data.periodId,
          thinkerId: data.thinkerId,
        },
        include,
      });
    }),
  remove: (id: string) => prisma.test.delete({ where: { id } }),
  lastResults: (userId: string) =>
    prisma.testResult.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      select: { testId: true, percent: true },
    }),
  saveResult: (
    userId: string,
    testId: string,
    summary: { correct: number; total: number; percent: number; level: 'HIGH' | 'MEDIUM' | 'LOW' },
    byCriterion: Prisma.InputJsonValue,
    answers: { questionId: string; optionId: string; isCorrect: boolean }[],
  ) =>
    prisma.testResult.create({
      data: {
        userId,
        testId,
        correct: summary.correct,
        total: summary.total,
        percent: summary.percent,
        level: summary.level,
        byCriterion,
        answers: { create: answers },
      },
      include: resultInclude(),
    }),
};

export function resultInclude() {
  return {
    test: { select: { id: true, title: true } },
    answers: { include: { question: { include: { options: true } } } },
  } satisfies Prisma.TestResultInclude;
}
