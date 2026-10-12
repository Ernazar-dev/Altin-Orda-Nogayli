import type { Criterion } from '@prisma/client';
import { average, mergeByCriterion } from '../../lib/scoring';
import { CRITERIA } from '../../lib/types';
import {
  analyticsRepository,
  type AnalyticsFilter,
  type AnalyticsRecord,
} from './analytics.repository';

export interface AnalyticsQuery extends AnalyticsFilter {
  criterion?: Criterion;
}

const effective = (r: AnalyticsRecord, c?: Criterion): number | null => {
  if (!c) return r.percent;
  return r.byCriterion[c]?.percent ?? null;
};

const avgOf = (records: AnalyticsRecord[], c?: Criterion): number | null => {
  const vals = records.map((r) => effective(r, c)).filter((v): v is number => v !== null);
  return vals.length ? average(vals) : null;
};

const groupBy = <T>(items: T[], key: (i: T) => string): Map<string, T[]> => {
  const m = new Map<string, T[]>();
  for (const i of items) {
    const k = key(i);
    const arr = m.get(k);
    if (arr) arr.push(i);
    else m.set(k, [i]);
  }
  return m;
};

const latestPerStudent = (records: AnalyticsRecord[]): Map<string, AnalyticsRecord> => {
  const m = new Map<string, AnalyticsRecord>();
  for (const r of records) {
    const prev = m.get(r.studentId);
    if (!prev || prev.createdAt <= r.createdAt) m.set(r.studentId, r);
  }
  return m;
};

const distribution = (records: AnalyticsRecord[]) => ({
  HIGH: records.filter((r) => r.level === 'HIGH').length,
  MEDIUM: records.filter((r) => r.level === 'MEDIUM').length,
  LOW: records.filter((r) => r.level === 'LOW').length,
});

const only = (records: AnalyticsRecord[], source: AnalyticsRecord['source']) =>
  records.filter((r) => r.source === source);

export const analyticsService = {
  async overview(q: AnalyticsQuery) {
    const [records, counts] = await Promise.all([analyticsRepository.records(q), analyticsRepository.counts()]);
    return {
      ...counts,
      testsCompleted: only(records, 'TEST').length,
      averagePercent: avgOf(records, q.criterion) ?? 0,
      diagnosticAvg: {
        initial: avgOf(only(records, 'INITIAL'), q.criterion),
        final: avgOf(only(records, 'FINAL'), q.criterion),
      },
      levelDistribution: distribution(records),
    };
  },

  async byClass(q: AnalyticsQuery) {
    const records = await analyticsRepository.records(q);
    return [...groupBy(records, (r) => String(r.classLevel ?? 0)).entries()]
      .map(([k, list]) => ({
        classLevel: Number(k) || null,
        students: new Set(list.map((r) => r.studentId)).size,
        results: list.length,
        averagePercent: avgOf(list, q.criterion),
        testAverage: avgOf(only(list, 'TEST'), q.criterion),
        initialAverage: avgOf(only(list, 'INITIAL'), q.criterion),
        finalAverage: avgOf(only(list, 'FINAL'), q.criterion),
      }))
      .sort((a, b) => (a.classLevel ?? 0) - (b.classLevel ?? 0));
  },

  async byCriterion(q: AnalyticsQuery) {
    const records = await analyticsRepository.records(q);
    const crit = q.criterion ? [q.criterion] : CRITERIA;
    const merged = (list: AnalyticsRecord[]) => mergeByCriterion(list.map((r) => r.byCriterion));
    const all = merged(records);
    const initial = merged(only(records, 'INITIAL'));
    const final = merged(only(records, 'FINAL'));
    const tests = merged(only(records, 'TEST'));
    return crit.map((c) => ({
      criterion: c,
      overall: all[c]?.percent ?? null,
      tests: tests[c]?.percent ?? null,
      initial: initial[c]?.percent ?? null,
      final: final[c]?.percent ?? null,
      delta: initial[c] && final[c] ? (final[c]?.percent ?? 0) - (initial[c]?.percent ?? 0) : null,
    }));
  },

  async byTest(q: AnalyticsQuery) {
    const records = (await analyticsRepository.records({ ...q, kind: 'TEST' })).filter((r) => r.testId);
    return [...groupBy(records, (r) => r.testId ?? '').entries()].map(([testId, list]) => ({
      testId,
      title: list[0]?.title ?? '',
      attempts: list.length,
      students: new Set(list.map((r) => r.studentId)).size,
      averagePercent: avgOf(list, q.criterion),
      levelDistribution: distribution(list),
    }));
  },

  async diagnosticGrowth(q: AnalyticsQuery) {
    const records = await analyticsRepository.records({ ...q, kind: undefined, testId: undefined });
    const initial = latestPerStudent(only(records, 'INITIAL'));
    const final = latestPerStudent(only(records, 'FINAL'));
    const ids = new Set([...initial.keys(), ...final.keys()]);
    const students = [...ids].map((id) => {
      const i = initial.get(id);
      const f = final.get(id);
      const ip = i ? effective(i, q.criterion) : null;
      const fp = f ? effective(f, q.criterion) : null;
      return {
        studentId: id,
        fullName: (i ?? f)?.studentName ?? '',
        classLevel: (i ?? f)?.classLevel ?? null,
        initial: ip,
        final: fp,
        delta: ip !== null && fp !== null ? fp - ip : null,
        initialLevel: i?.level ?? null,
        finalLevel: f?.level ?? null,
      };
    });
    const both = students.filter((s) => s.delta !== null);
    return {
      students,
      summary: {
        paired: both.length,
        initialAverage: both.length ? average(both.map((s) => s.initial ?? 0)) : null,
        finalAverage: both.length ? average(both.map((s) => s.final ?? 0)) : null,
        deltaAverage: both.length ? average(both.map((s) => s.delta ?? 0)) : null,
      },
    };
  },

  async levels(q: AnalyticsQuery) {
    const records = await analyticsRepository.records(q);
    return {
      overall: distribution(records),
      tests: distribution(only(records, 'TEST')),
      initial: distribution(only(records, 'INITIAL')),
      final: distribution(only(records, 'FINAL')),
    };
  },

  async exportCsv(q: AnalyticsQuery): Promise<string> {
    const records = await analyticsRepository.records(q);
    const esc = (v: string | number | null): string => {
      let s = v === null ? '' : String(v);
      // CSV formula in'ektsiyasiga qarshi: matn =, +, -, @ yoki tab bilan boshlansa, Excel uni formula deb o'ylamasin.
      if (typeof v === 'string' && /^[=+\-@\t\r]/.test(s)) s = `'${s}`;
      return /[",\n;]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
    };
    const kindLabel = { TEST: 'Test', INITIAL: 'Boshlang\'ich diagnostika', FINAL: 'Yakuniy diagnostika' } as const;
    const header = [
      'Student', 'Sinf', 'Nomi', 'Turi', 'Foiz', 'Daraja',
      'Aksiologik %', 'Kognitiv %', 'Faoliyatli %', 'Refleksiv %', 'Sana',
    ];
    const rows = records.map((r) => [
      r.studentName,
      r.classLevel,
      r.title,
      kindLabel[r.source],
      r.percent,
      r.level,
      r.byCriterion.AXIOLOGICAL?.percent ?? null,
      r.byCriterion.COGNITIVE?.percent ?? null,
      r.byCriterion.ACTIVITY?.percent ?? null,
      r.byCriterion.REFLECTIVE?.percent ?? null,
      r.createdAt.toISOString(),
    ]);
    return '\uFEFF' + [header, ...rows].map((row) => row.map(esc).join(',')).join('\r\n') + '\r\n';
  },
};
