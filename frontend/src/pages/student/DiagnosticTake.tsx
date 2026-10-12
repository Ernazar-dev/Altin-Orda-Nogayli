import { useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { Button } from 'antd';
import { useI18n } from '@/i18n';
import { diagnosticsApi } from '@/api/resources';
import { errorMessage } from '@/api/client';
import type { AnswerSubmission, DiagnosticKind, DiagnosticResult } from '@/types';
import { useAsync } from '@/hooks/useAsync';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import { Async } from '@/components/Async';
import { BackLink } from '@/components/BackLink';
import { PageHeader } from '@/components/PageHeader';
import { EmptyState } from '@/components/EmptyState';
import { FocusPage } from '@/components/FocusPage';
import { QuestionRunner, ResultView } from '@/components/QuestionRunner';

export default function DiagnosticTake() {
  const { kind: slug = '' } = useParams();
  const { t } = useI18n();
  const kind: DiagnosticKind | null = slug === 'initial' ? 'INITIAL' : slug === 'final' ? 'FINAL' : null;
  const state = useAsync(async () => {
    if (!kind) return { diag: null };
    const list = await diagnosticsApi.byKind(kind);
    const first = list[0];
    return { diag: first ? await diagnosticsApi.get(first.id) : null };
  }, [kind]);
  const [result, setResult] = useState<DiagnosticResult | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  useDocumentTitle(kind === 'FINAL' ? t('diag.final') : t('diag.initial'));

  if (!kind) return <Navigate to="/diagnostics" replace />;

  async function submit(answers: AnswerSubmission[]) {
    const diag = state.data?.diag;
    if (!diag) return;
    setBusy(true);
    setError(null);
    try {
      setResult(await diagnosticsApi.submit(diag.id, answers));
    } catch (e) {
      setError(errorMessage(e, t('common.error')));
    } finally {
      setBusy(false);
    }
  }

  const title = kind === 'FINAL' ? t('diag.final') : t('diag.initial');
  return (
    <FocusPage>
      <PageHeader back={<BackLink to="/diagnostics" label={t('nav.diagnostics')} />} eyebrow={t('nav.diagnostics')} title={title} />
      <Async state={state}>
        {({ diag: d }) =>
          !d || !d.questions || d.questions.length === 0 ? (
            <EmptyState />
          ) : result ? (
            <ResultView
              result={result}
              questions={d.questions}
              actions={
                <Link to="/diagnostics">
                  <Button type="primary" size="large" block>{t('diag.growth')}</Button>
                </Link>
              }
            />
          ) : (
            <QuestionRunner questions={d.questions} submitting={busy} error={error} onSubmit={submit} />
          )
        }
      </Async>
    </FocusPage>
  );
}
