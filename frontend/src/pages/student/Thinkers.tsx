import { useState } from 'react';
import { Segmented } from 'antd';
import { useI18n } from '@/i18n';
import { periodsApi, thinkersApi } from '@/api/resources';
import { useAsync } from '@/hooks/useAsync';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import { Async, CardsSkeleton } from '@/components/Async';
import { PageHeader } from '@/components/PageHeader';
import { ThinkerCard } from '@/components/Cards';
import { EmptyState } from '@/components/EmptyState';
import styles from './Detail.module.scss';

export default function Thinkers() {
  const { t, pick } = useI18n();
  const [periodId, setPeriodId] = useState<string>('ALL');
  useDocumentTitle(t('nav.thinkers'));
  const periods = useAsync(() => periodsApi.list(), []);
  const state = useAsync(() => thinkersApi.list(periodId === 'ALL' ? undefined : { periodId }), [periodId]);
  return (
    <>
      <PageHeader eyebrow={t('nav.learn')} title={t('nav.thinkers')} />
      {periods.data && periods.data.length > 1 && (
        <div className={styles.filters}>
          <Segmented<string>
            aria-label={t('thinker.period')}
            value={periodId}
            onChange={setPeriodId}
            options={[{ label: t('common.all'), value: 'ALL' }, ...periods.data.map((p) => ({ label: pick(p.name), value: p.id }))]}
          />
        </div>
      )}
      <Async state={state} skeleton={<CardsSkeleton count={4} />} isEmpty={(d) => d.length === 0} empty={<EmptyState />}>
        {(items) => (
          <div className="grid-auto" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 340px), 1fr))' }}>
            {items.map((th) => (
              <ThinkerCard key={th.id} thinker={th} to={`/thinkers/${th.id}`} />
            ))}
          </div>
        )}
      </Async>
    </>
  );
}
