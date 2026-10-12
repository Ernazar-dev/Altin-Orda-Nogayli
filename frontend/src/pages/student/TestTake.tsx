import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button } from 'antd';
import { useI18n } from '@/i18n';
import { testsApi } from '@/api/resources';
import { errorMessage } from '@/api/client';
import type { AnswerSubmission, TestResult } from '@/types';
import { useAsync } from '@/hooks/useAsync';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import { Async } from '@/components/Async';
import { BackLink } from '@/components/BackLink';
import { PageHeader } from '@/components/PageHeader';
import { EmptyState } from '@/components/EmptyState';
import { FocusPage } from '@/components/FocusPage';
import { QuestionRunner, ResultView } from '@/components/QuestionRunner';

export default function TestTake() {
  const { id = '' } = useParams();
  const { t, pick } = useI18n();
  const state = useAsync(() => testsApi.get(id), [id]);
  const [result, setResult] = useState<TestResult | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [run, setRun] = useState(0);
  useDocumentTitle(state.data ? pick(state.data.title) : t('nav.tests'));

  async function submit(answers: AnswerSubmission[]) {
    setBusy(true);
    setError(null);
    try {
      setResult(await testsApi.submit(id, answers));
    } catch (e) {
      setError(errorMessage(e, t('common.error')));
    } finally {
      setBusy(false);
    }
  }

  return (
    <Async state={state}>
      {(test) => (
        <FocusPage>
          <PageHeader
            back={<BackLink to="/tests" label={t('nav.tests')} />}
            eyebrow={t('nav.tests')}
            title={pick(test.title)}
            lead={pick(test.description) || undefined}
          />
          {!test.questions || test.questions.length === 0 ? (
            <EmptyState />
          ) : result ? (
            <ResultView
              result={result}
              questions={test.questions}
              title={t('test.result')}
              actions={
                <>
                  <Link to="/results">
                    <Button type="primary" size="large" block>{t('nav.results')}</Button>
                  </Link>
                  <Button
                    size="large"
                    onClick={() => {
                      setResult(null);
                      setRun((n) => n + 1);
                    }}
                  >
                    {t('test.retake')}
                  </Button>
                </>
              }
            />
          ) : (
            <QuestionRunner key={run} questions={test.questions} submitting={busy} error={error} onSubmit={submit} />
          )}
        </FocusPage>
      )}
    </Async>
  );
}
