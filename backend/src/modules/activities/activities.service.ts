import { badRequest, notFound } from '../../lib/errors';
import type { CrudService } from '../../lib/crud';
import { activitiesRepository } from './activities.repository';
import type { ActivityCreate, ActivityUpdate } from './activities.schema';

type ActivityRow = NonNullable<Awaited<ReturnType<typeof activitiesRepository.get>>>;

const present = (a: ActivityRow, role: string, attempted: Set<string>) => ({
  ...a,
  options: a.options.map((o) =>
    role === 'TEACHER'
      ? o
      : { id: o.id, text: o.text, order: o.order },
  ),
  modernExample: role === 'TEACHER' ? a.modernExample : undefined,
  attempted: attempted.has(a.id),
});

export const activitiesService: CrudService & {
  attempt(activityId: string, optionId: string, userId: string): Promise<unknown>;
} = {
  async list(query, userId, role) {
    // Ikki so'rov bir vaqtda (har biri uzoq bazaga alohida aylanish); mehmon uchun urinishlar so'rovi umuman kerak emas.
    const [rows, attempts] = await Promise.all([
      activitiesRepository.list(query),
      userId ? activitiesRepository.latestAttempts(userId) : Promise.resolve([]),
    ]);
    const attempted = new Set(attempts.map((a) => a.activityId));
    return rows.map((a) => present(a, role, attempted));
  },
  async get(id, userId, role) {
    const a = await activitiesRepository.get(id);
    if (!a) throw notFound('Topshiriq topilmadi');
    const attempted = new Set((await activitiesRepository.latestAttempts(userId)).map((x) => x.activityId));
    return present(a, role, attempted);
  },
  create: (data, userId) => activitiesRepository.create(data as ActivityCreate, userId),
  async update(id, data) {
    const existing = await activitiesRepository.get(id);
    if (!existing) throw notFound('Topshiriq topilmadi');
    return activitiesRepository.update(id, data as ActivityUpdate);
  },
  async remove(id) {
    const existing = await activitiesRepository.get(id);
    if (!existing) throw notFound('Topshiriq topilmadi');
    await activitiesRepository.remove(id);
  },
  async attempt(activityId, optionId, userId) {
    const a = await activitiesRepository.get(activityId);
    if (!a) throw notFound('Topshiriq topilmadi');
    const chosen = a.options.find((o) => o.id === optionId);
    if (!chosen) throw badRequest('Variant bu topshiriqqa tegishli emas');
    const correct = a.options.find((o) => o.isCorrect);
    if (!correct) throw badRequest('Topshiriqda to\'g\'ri variant belgilanmagan');
    await activitiesRepository.createAttempt(userId, activityId, optionId, chosen.isCorrect);
    return {
      isCorrect: chosen.isCorrect,
      correctOptionId: correct.id,
      explanation: correct.explanation,
      chosenExplanation: chosen.explanation,
      modernExample: a.modernExample,
    };
  },
};
