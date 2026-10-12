import { Prisma } from '@prisma/client';
import { prisma } from '../../config/prisma';
import type { QuestionInput } from '../tests/tests.schema';
import type { DiagnosticCreate, DiagnosticUpdate } from './diagnostics.schema';

const include = {
  questions: {
    orderBy: { order: 'asc' as const },
    include: { options: { orderBy: { order: 'asc' as const } } },
  },
} satisfies Prisma.DiagnosticInclude;

export const resultInclude = {
  diagnostic: { select: { id: true, title: true, kind: true } },
  answers: { include: { question: { include: { options: true } } } },
} satisfies Prisma.DiagnosticResultInclude;

const questionCreate = (questions: QuestionInput[]) =>
  questions.map((q, order) => ({
    question: q.question,
    criterion: q.criterion,
    order,
    options: { create: q.options.map((o, i) => ({ text: o.text, isCorrect: o.isCorrect, order: i })) },
  }));

export const diagnosticsRepository = {
  list: (kind?: 'INITIAL' | 'FINAL') =>
    prisma.diagnostic.findMany({
      where: { kind },
      orderBy: { createdAt: 'asc' },
      include: { _count: { select: { questions: true } } },
    }),
  get: (id: string) => prisma.diagnostic.findUnique({ where: { id }, include }),
  create: (data: DiagnosticCreate) =>
    prisma.diagnostic.create({
      data: { kind: data.kind, title: data.title, questions: { create: questionCreate(data.questions) } },
      include,
    }),
  update: (id: string, data: DiagnosticUpdate) =>
    prisma.$transaction(async (tx) => {
      if (data.questions) {
        await tx.diagnosticQuestion.deleteMany({ where: { diagnosticId: id } });
        for (const q of questionCreate(data.questions)) {
          await tx.diagnosticQuestion.create({ data: { ...q, diagnosticId: id } });
        }
      }
      return tx.diagnostic.update({ where: { id }, data: { kind: data.kind, title: data.title }, include });
    }),
  remove: (id: string) => prisma.diagnostic.delete({ where: { id } }),
  saveResult: (
    userId: string,
    diagnosticId: string,
    kind: 'INITIAL' | 'FINAL',
    s: { correct: number; total: number; percent: number; level: 'HIGH' | 'MEDIUM' | 'LOW' },
    byCriterion: Prisma.InputJsonValue,
    answers: { questionId: string; optionId: string; isCorrect: boolean }[],
  ) =>
    prisma.diagnosticResult.create({
      data: {
        userId,
        diagnosticId,
        kind,
        correct: s.correct,
        total: s.total,
        percent: s.percent,
        level: s.level,
        byCriterion,
        answers: { create: answers },
      },
      include: resultInclude,
    }),
};
