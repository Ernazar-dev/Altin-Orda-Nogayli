import { useAsync } from './useAsync';
import { settingsApi } from '@/api/resources';
import type { LevelThreshold } from '@/types';

/** Daraja chegaralari (o'qituvchi sozlaydi; dissertatsiyada ko'rsatilmagan). */
export function useLevels() {
  const s = useAsync<LevelThreshold[]>(() => settingsApi.levels(), []);
  return s;
}
