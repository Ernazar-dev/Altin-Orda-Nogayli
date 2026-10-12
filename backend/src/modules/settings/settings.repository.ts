import { prisma } from '../../config/prisma';
import type { LevelThresholdDto } from '../../lib/types';
import { DEFAULT_THRESHOLDS } from '../../lib/scoring';

export const settingsRepository = {
  async getLevels(): Promise<LevelThresholdDto[]> {
    const rows = await prisma.levelThreshold.findMany();
    if (rows.length === 0) return DEFAULT_THRESHOLDS;
    const order = { HIGH: 0, MEDIUM: 1, LOW: 2 } as const;
    return rows
      .map((r) => ({ level: r.level, minPercent: r.minPercent }))
      .sort((a, b) => order[a.level] - order[b.level]);
  },
  async saveLevels(levels: LevelThresholdDto[]): Promise<void> {
    await prisma.$transaction(
      levels.map((l) =>
        prisma.levelThreshold.upsert({
          where: { level: l.level },
          update: { minPercent: l.minPercent },
          create: { level: l.level, minPercent: l.minPercent },
        }),
      ),
    );
  },
};
