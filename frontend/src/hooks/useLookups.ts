import { useMemo } from 'react';
import { useAsync } from './useAsync';
import { periodsApi, sourcesApi, thinkersApi, valuesApi } from '@/api/resources';
import { useI18n } from '@/i18n';

export interface Option {
  value: string;
  label: string;
}

/** Teacher formalaridagi Select'lar uchun bog'liq ob'ektlar ro'yxati. */
export function useLookups() {
  const { pick } = useI18n();
  const periods = useAsync(() => periodsApi.list(), []);
  const thinkers = useAsync(() => thinkersApi.list(), []);
  const values = useAsync(() => valuesApi.list(), []);
  const sources = useAsync(() => sourcesApi.list(), []);

  return useMemo(
    () => ({
      periods: (periods.data ?? []).map<Option>((p) => ({ value: p.id, label: pick(p.name) })),
      thinkers: (thinkers.data ?? []).map<Option>((x) => ({ value: x.id, label: x.name })),
      values: (values.data ?? []).map<Option>((v) => ({ value: v.id, label: pick(v.name) })),
      sources: (sources.data ?? []).map<Option>((s) => ({ value: s.id, label: pick(s.title) })),
      loading: periods.loading || thinkers.loading || values.loading || sources.loading,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [periods.data, thinkers.data, values.data, sources.data, periods.loading, thinkers.loading, values.loading, sources.loading, pick],
  );
}
