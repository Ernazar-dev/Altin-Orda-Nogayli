import { useState } from 'react';
import { Select } from 'antd';
import { useI18n } from '@/i18n';
import { valuesApi } from '@/api/resources';
import { VALUE_CATEGORIES } from '@/types';
import type { ValueCategory } from '@/types';
import { useAsync } from '@/hooks/useAsync';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import { Async, CardsSkeleton } from '@/components/Async';
import { PageHeader } from '@/components/PageHeader';
import { ValueCard } from '@/components/Cards';
import { EmptyState } from '@/components/EmptyState';
import styles from './Detail.module.scss';

export default function Values() {
  const { t } = useI18n();
  const [cat, setCat] = useState<ValueCategory | 'ALL'>('ALL');
  useDocumentTitle(t('nav.values'));
  const state = useAsync(() => valuesApi.list(), []);
  return (
    <>
      <PageHeader eyebrow={t('nav.learn')} title={t('nav.values')} />
      <div className={styles.filters}>
        <Select<ValueCategory | 'ALL'>
          value={cat}
          onChange={setCat}
          aria-label={t('value.category')}
          options={[
            { value: 'ALL', label: t('common.all') },
            ...VALUE_CATEGORIES.map((c) => ({ value: c, label: t(`value.cat.${c}` as const) })),
          ]}
        />
      </div>
      <Async state={state} skeleton={<CardsSkeleton />} isEmpty={(d) => d.length === 0} empty={<EmptyState />}>
        {(items) => {
          const shown = items.filter((v) => cat === 'ALL' || v.category === cat);
          return shown.length === 0 ? (
            <EmptyState />
          ) : (
            <div className="grid-auto">
              {shown.map((v) => (
                <ValueCard key={v.id} value={v} to={`/values/${v.id}`} />
              ))}
            </div>
          );
        }}
      </Async>
    </>
  );
}
