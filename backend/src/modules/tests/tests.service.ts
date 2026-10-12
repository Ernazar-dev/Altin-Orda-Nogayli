import type { Prisma } from '@prisma/client';
import { badRequest, notFound } from '../../lib/errors';
import type { CrudService } from '../../lib/crud';
import { answersDto } from '../../lib/resultDto';
import { levelFor, summarize } from '../../lib/scoring';
import { settingsRepository } from '../settings/settings.repository';
import { testsRepository } from './tests.repository';
import type { SubmitInput, TestCreate, TestUpdate } from './tests.schema';

type TestRow = NonNullable<Awaited<ReturnType<typeof testsRepository.get>>>;

const present = (t: TestRow, role: string) => {
  const { questions, ...rest } = t;
  return {
    ...rest,
    questionCount: questions.length,
    questions: questions.map((q) => ({
      ...q,
      options: q.options.map((o) => (role === 'TEACHER' ? o : { id: o.id, text: o.text, order: o.order })),
    })),
  };
};

export const testResultDto = (r: Awaited<ReturnType<typeof testsRepository.saveResult>>) => {
  const { answers, ...rest } = r;
  return { ...rest, answers: answersDto(answers) };
};

export const testsService: CrudService & {
  submit(testId: string, userId: string, input: SubmitInput): Promise<unknown>;
} = {
  async list(query, userId) {
    const [rows, last] = await Promise.all([testsRepository.list(query), testsRepository.lastResults(userId)]);
    const lastBy = new Map<string, number>();
    for (const r of last) if (!lastBy.has(r.testId)) lastBy.set(r.testId, r.percent);
    return rows.map(({ _count, ...t }) => ({
      ...t,
      questionCount: _count.questions,
      lastPercent: lastBy.get(t.id) ?? null,
    }));
  },
  async get(id, _userId, role) {
    const t = await testsRepository.get(id);
    if (!t) throw notFound('Test topilmadi');
    return present(t, role);
  },
  create: async (data, userId) => present(await testsRepository.create(data as TestCreate, userId), 'TEACHER'),
  async update(id, data) {
    if (!(await testsRepository.get(id))) throw notFound('Test topilmadi');
    return present(await testsRepository.update(id, data as TestUpdate), 'TEACHER');
  },
  async remove(id) {
    if (!(await testsRepository.get(id))) throw notFound('Test topilmadi');
    await testsRepository.remove(id);
  },
  async submit(testId, userId, input) {
    const test = await testsRepository.get(testId);
    if (!test) throw notFound('Test topilmadi');
    const byQuestion = new Map(test.questions.map((q) => [q.id, q]));
    const seen = new Set<string>();
    const graded: { questionId: string; optionId: string; isCorrect: boolean }[] = [];
    for (const a of input.answers) {
      const q = byQuestion.get(a.questionId);
      if (!q) throw badRequest('Savol bu testga tegishli emas');
      if (seen.has(a.questionId)) throw badRequest('Bitta savolga ikki marta javob berilgan');
      const opt = q.options.find((o) => o.id === a.optionId);
      if (!opt) throw badRequest('Variant bu savolga tegishli emas');
      seen.add(a.questionId);
      graded.push({ questionId: a.questionId, optionId: a.optionId, isCorrect: opt.isCorrect });
    }
    const correctSet = new Set(graded.filter((g) => g.isCorrect).map((g) => g.questionId));
    const items = test.questions.map((q) => ({ criterion: q.criterion, isCorrect: correctSet.has(q.id) }));
    const summary = summarize(items);
    const level = levelFor(summary.percent, await settingsRepository.getLevels());
    const saved = await testsRepository.saveResult(
      userId,
      testId,
      { correct: summary.correct, total: summary.total, percent: summary.percent, level },
      summary.byCriterion as unknown as Prisma.InputJsonValue,
      graded,
    );
    return testResultDto(saved);
  },
};
