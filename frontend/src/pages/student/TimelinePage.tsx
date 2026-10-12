import { useI18n } from '@/i18n';
import { periodsApi, timelineApi } from '@/api/resources';
import { useAsync } from '@/hooks/useAsync';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import { Async } from '@/components/Async';
import { PageHeader } from '@/components/PageHeader';
import { Timeline } from '@/components/Timeline';
import { EmptyState } from '@/components/EmptyState';
import type { TimelineEvent } from '@/types';

export function timelineHref(e: TimelineEvent): string | null {
  if (!e.refId) return e.periodId ? `/periods/${e.periodId}` : null;
  switch (e.refType?.toUpperCase()) {
    case 'PERIOD':
      return `/periods/${e.refId}`;
    case 'THINKER':
      return `/thinkers/${e.refId}`;
    case 'SOURCE':
      return `/sources/${e.refId}`;
    case 'VALUE':
      return `/values/${e.refId}`;
    default:
      return e.periodId ? `/periods/${e.periodId}` : null;
  }
}

export default function TimelinePage() {
  const { t } = useI18n();
  useDocumentTitle(t('nav.timeline'));
  const events = useAsync(() => timelineApi.list(), []);
  const periods = useAsync(() => periodsApi.list(), []);
  return (
    <>
      <PageHeader eyebrow={t('nav.learn')} title={t('nav.timeline')} lead={t('home.timelineLead')} />
      <Async state={events} isEmpty={(d) => d.length === 0} empty={<EmptyState />}>
        {(items) => <Timeline events={items} periods={periods.data ?? []} hrefFor={timelineHref} />}
      </Async>
    </>
  );
}
