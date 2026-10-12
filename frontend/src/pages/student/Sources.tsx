import { useState } from 'react';
import { Button, Input, Select } from 'antd';
import { useI18n } from '@/i18n';
import { periodsApi, sourcesApi, thinkersApi } from '@/api/resources';
import { SOURCE_TYPES } from '@/types';
import type { SourceType } from '@/types';
import { useAsync } from '@/hooks/useAsync';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import { Async, CardsSkeleton } from '@/components/Async';
import { PageHeader } from '@/components/PageHeader';
import { SourceCard } from '@/components/Cards';
import { EmptyState } from '@/components/EmptyState';
import styles from './Detail.module.scss';

export default function Sources() {
  const { t, pick } = useI18n();
  useDocumentTitle(t('nav.sources'));
  const [type, setType] = useState<SourceType | undefined>();
  const [periodId, setPeriodId] = useState<string | undefined>();
  const [thinkerId, setThinkerId] = useState<string | undefined>();
  const [q, setQ] = useState('');
  const periods = useAsync(() => periodsApi.list(), []);
  const thinkers = useAsync(() => thinkersApi.list(), []);
  const state = useAsync(() => sourcesApi.list({ type, periodId, thinkerId }), [type, periodId, thinkerId]);

  return (
    <>
      <PageHeader eyebrow={t('nav.learn')} title={t('nav.sources')} lead={t('study.originalTexts')} />
      <div className={styles.filters}>
        <Input.Search value={q} onChange={e => setQ(e.target.value)} allowClear placeholder={t('study.searchSources')} aria-label={t('study.searchSources')} style={{ flex: '1 1 100%' }} />
        <Select<SourceType>
          allowClear
          aria-label={t('source.type')}
          placeholder={t('source.type')}
          value={type}
          onChange={setType}
          options={SOURCE_TYPES.map((s) => ({ value: s, label: t(`source.type.${s}` as const) }))}
        />
        <Select<string>
          allowClear
          aria-label={t('thinker.period')}
          placeholder={t('thinker.period')}
          value={periodId}
          onChange={setPeriodId}
          options={(periods.data ?? []).map((p) => ({ value: p.id, label: pick(p.name) }))}
        />
        <Select<string>
          allowClear
          aria-label={t('source.thinker')}
          placeholder={t('source.thinker')}
          value={thinkerId}
          onChange={setThinkerId}
          options={(thinkers.data ?? []).map((p) => ({ value: p.id, label: p.name }))}
        />
        {(q || type || periodId || thinkerId) && <Button onClick={() => { setQ(''); setType(undefined); setPeriodId(undefined); setThinkerId(undefined); }}>{t('common.reset')}</Button>}
      </div>
      <Async state={state} skeleton={<CardsSkeleton />} isEmpty={(d) => d.length === 0} empty={<EmptyState />}>
        {(items) => {
          const query = q.trim().toLocaleLowerCase();
          const filtered = items.filter(s => `${s.title.uz ?? ''} ${s.title.kaa ?? ''} ${s.content} ${s.reference}`.toLocaleLowerCase().includes(query));
          return <><p className="muted" aria-live="polite">{t('study.records', { count: filtered.length })}</p>{filtered.length === 0 ? <EmptyState description={t('empty.title')} /> : (
          <div className="grid-auto" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 320px), 1fr))' }}>
            {filtered.map((s) => (
              <SourceCard key={s.id} source={s} to={`/sources/${s.id}`} />
            ))}
          </div>
        )}</>;
        }}
      </Async>
    </>
  );
}
