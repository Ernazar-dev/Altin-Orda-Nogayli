import { useI18n } from '@/i18n';
import { periodsApi } from '@/api/resources';
import { useAsync } from '@/hooks/useAsync';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import { Async, CardsSkeleton } from '@/components/Async';
import { PageHeader } from '@/components/PageHeader';
import { PeriodCard } from '@/components/Cards';
import { EmptyState } from '@/components/EmptyState';

export default function Periods() {
  const { t } = useI18n();
  useDocumentTitle(t('nav.periods'));
  const state = useAsync(() => periodsApi.list(), []);
  return (
    <>
      <PageHeader eyebrow={t('nav.learn')} title={t('nav.periods')} />
      <Async state={state} skeleton={<CardsSkeleton count={2} />} isEmpty={(d) => d.length === 0} empty={<EmptyState />}>
        {(periods) => (
          <div className="grid-auto" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 340px), 1fr))' }}>
            {[...periods]
              .sort((a, b) => a.order - b.order)
              .map((p) => (
                <PeriodCard key={p.id} period={p} to={`/periods/${p.id}`} />
              ))}
          </div>
        )}
      </Async>
    </>
  );
}
