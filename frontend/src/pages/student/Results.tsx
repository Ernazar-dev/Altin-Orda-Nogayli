import { useI18n } from '@/i18n';
import { resultsApi } from '@/api/resources';
import { useAsync } from '@/hooks/useAsync';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import { Async } from '@/components/Async';
import { PageHeader } from '@/components/PageHeader';
import { ResultsDashboard } from '@/components/ResultsDashboard';

export default function Results() {
  const { t } = useI18n();
  useDocumentTitle(t('nav.results'));
  const state = useAsync(() => resultsApi.me(), []);
  return (
    <>
      <PageHeader eyebrow={t('nav.practice')} title={t('results.title')} />
      <Async state={state}>{(d) => <ResultsDashboard data={d} />}</Async>
    </>
  );
}
