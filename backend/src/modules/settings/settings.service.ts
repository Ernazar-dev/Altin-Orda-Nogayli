import { badRequest } from '../../lib/errors';
import type { LevelThresholdDto } from '../../lib/types';
import { settingsRepository } from './settings.repository';

export const settingsService = {
  getLevels: (): Promise<LevelThresholdDto[]> => settingsRepository.getLevels(),

  async saveLevels(levels: LevelThresholdDto[]): Promise<LevelThresholdDto[]> {
    const high = levels.find((l) => l.level === 'HIGH');
    const medium = levels.find((l) => l.level === 'MEDIUM');
    if (!high || !medium) throw badRequest('HIGH va MEDIUM chegaralari kerak');
    if (!(high.minPercent > medium.minPercent)) {
      throw badRequest('Yuqori chegara o\'rta chegaradan katta bo\'lishi kerak');
    }
    if (medium.minPercent <= 0) throw badRequest('O\'rta chegara 0 dan katta bo\'lishi kerak');
    await settingsRepository.saveLevels([
      { level: 'HIGH', minPercent: high.minPercent },
      { level: 'MEDIUM', minPercent: medium.minPercent },
      { level: 'LOW', minPercent: 0 },
    ]);
    return settingsRepository.getLevels();
  },
};
