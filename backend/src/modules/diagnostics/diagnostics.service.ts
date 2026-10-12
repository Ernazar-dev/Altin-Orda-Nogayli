import type { Prisma } from '@prisma/client';
import { badRequest, notFound } from '../../lib/errors';
import type { CrudService } from '../../lib/crud';
import { answersDto } from '../../lib/resultDto';
import { levelFor, summarize } from '../../lib/scoring';
import { settingsRepository } from '../settings/settings.repository';
import type { SubmitInput } from '../tests/tests.schema';
import { diagnosticsRepository } from './diagnostics.repository';
import type { DiagnosticCreate, DiagnosticUpdate } from './diagnostics.schema';

type DiagRow = NonNullable<Awaited<ReturnType<typeof diagnosticsRepository.get>>>;

const present = (d: DiagRow, role: string) => ({
  ...d,
  questions: d.questions.map((q) => ({
    ...q,
    options: q.options.map((o) => (role === 'TEACHER' ? o : { id: o.id, text: o.text, order: o.order })),
  })),
});

export const diagnosticResultDto = (r: Awaited<ReturnType<typeof diagnosticsRepository.saveResult>>) => {
  const { answers, ...rest } = r;
  return { ...rest, answers: answersDto(answers) };
};

export const diagnosticsService: CrudService & {
  submit(id: string, userId: string, input: SubmitInput): Promise<unknown>;
} = {
  async list(query) {
    const kind = query.kind === 'INITIAL' || query.kind === 'FINAL' ? query.kind : undefined;
    const rows = await diagnosticsRepository.list(kind);
    return rows.map(({ _count, ...d }) => ({ ...d, questionCount: _count.questions }));
  },
  async get(id, _userId, role) {
    const d = await diagnosticsRepository.get(id);
    if (!d) throw notFound('Diagnostika topilmadi');
    return present(d, role);
  },
  create: async (data) => present(await diagnosticsRepository.create(data as DiagnosticCreate), 'TEACHER'),
  async update(id, data) {
    if (!(await diagnosticsRepository.get(id))) throw notFound('Diagnostika topilmadi');
    return present(await diagnosticsRepository.update(id, data as DiagnosticUpdate), 'TEACHER');
  },
  async remove(id) {
    if (!(await diagnosticsRepository.get(id))) throw notFound('Diagnostika topilmadi');
    await diagnosticsRepository.remove(id);
  },
  async submit(id, userId, input) {
    const d = await diagnosticsRepository.get(id);
    if (!d) throw notFound('Diagnostika topilmadi');
    const byQuestion = new Map(d.questions.map((q) => [q.id, q]));
    const seen = new Set<string>();
    const graded: { questionId: string; optionId: string; isCorrect: boolean }[] = [];
    for (const a of input.answers) {
      const q = byQuestion.get(a.questionId);
      if (!q) throw badRequest('Savol bu diagnostikaga tegishli emas');
      if (seen.has(a.questionId)) throw badRequest('Bitta savolga ikki marta javob berilgan');
      const opt = q.options.find((o) => o.id === a.optionId);
      if (!opt) throw badRequest('Variant bu savolga tegishli emas');
      seen.add(a.questionId);
      graded.push({ questionId: a.questionId, optionId: a.optionId, isCorrect: opt.isCorrect });
    }
    const ok = new Set(graded.filter((g) => g.isCorrect).map((g) => g.questionId));
    const summary = summarize(d.questions.map((q) => ({ criterion: q.criterion, isCorrect: ok.has(q.id) })));
    const level = levelFor(summary.percent, await settingsRepository.getLevels());
    const saved = await diagnosticsRepository.saveResult(
      userId,
      id,
      d.kind,
      { correct: summary.correct, total: summary.total, percent: summary.percent, level },
      summary.byCriterion as unknown as Prisma.InputJsonValue,
      graded,
    );
    return diagnosticResultDto(saved);
  },
};
