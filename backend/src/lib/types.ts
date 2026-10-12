import { z } from 'zod';
import type { Criterion, Level, Role } from '@prisma/client';

export const CRITERIA: Criterion[] = ['AXIOLOGICAL', 'COGNITIVE', 'ACTIVITY', 'REFLECTIVE'];

export type LText = { uz: string; kaa: string };

export const lText = z.object({
  uz: z.string().default(''),
  kaa: z.string().default(''),
});
export const lTextOpt = lText.optional().nullable();

export interface AuthUser {
  id: string;
  role: Role;
}

export interface CriterionStat {
  correct: number;
  total: number;
  percent: number;
}
export type ByCriterion = Record<Criterion, CriterionStat | null>;

export interface LevelThresholdDto {
  level: Level;
  minPercent: number;
}

export const emptyByCriterion = (): ByCriterion => ({
  AXIOLOGICAL: null,
  COGNITIVE: null,
  ACTIVITY: null,
  REFLECTIVE: null,
});
