import type { Criterion, Level } from '@prisma/client';
import { CRITERIA, emptyByCriterion, type ByCriterion, type LevelThresholdDto } from './types';

export interface ScoredItem {
  criterion: Criterion;
  isCorrect: boolean;
}

export interface ScoreSummary {
  correct: number;
  total: number;
  percent: number;
  byCriterion: ByCriterion;
}

export const pct = (correct: number, total: number): number =>
  total === 0 ? 0 : Math.round((correct / total) * 100);

export const summarize = (items: ScoredItem[]): ScoreSummary => {
  const byCriterion = emptyByCriterion();
  let correct = 0;
  for (const c of CRITERIA) {
    const subset = items.filter((i) => i.criterion === c);
    if (subset.length === 0) continue;
    const ok = subset.filter((i) => i.isCorrect).length;
    byCriterion[c] = { correct: ok, total: subset.length, percent: pct(ok, subset.length) };
  }
  correct = items.filter((i) => i.isCorrect).length;
  return { correct, total: items.length, percent: pct(correct, items.length), byCriterion };
};

export const DEFAULT_THRESHOLDS: LevelThresholdDto[] = [
  { level: 'HIGH', minPercent: 80 },
  { level: 'MEDIUM', minPercent: 60 },
  { level: 'LOW', minPercent: 0 },
];

export const levelFor = (percent: number, thresholds: LevelThresholdDto[]): Level => {
  const high = thresholds.find((t) => t.level === 'HIGH')?.minPercent ?? 80;
  const medium = thresholds.find((t) => t.level === 'MEDIUM')?.minPercent ?? 60;
  if (percent >= high) return 'HIGH';
  if (percent >= medium) return 'MEDIUM';
  return 'LOW';
};

export const average = (values: number[]): number =>
  values.length === 0 ? 0 : Math.round(values.reduce((a, b) => a + b, 0) / values.length);

/** Merge several ByCriterion objects into one aggregate (sum correct/total). */
export const mergeByCriterion = (list: ByCriterion[]): ByCriterion => {
  const out = emptyByCriterion();
  for (const c of CRITERIA) {
    let correct = 0;
    let total = 0;
    for (const b of list) {
      const s = b[c];
      if (s) {
        correct += s.correct;
        total += s.total;
      }
    }
    if (total > 0) out[c] = { correct, total, percent: pct(correct, total) };
  }
  return out;
};
