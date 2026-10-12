import { Tag } from 'antd';
import { useI18n } from '@/i18n';
import { useAuth } from '@/context/AuthContext';
import { resultsApi, testsApi } from '@/api/resources';
import { GateButton } from '@/components/AuthGate';
import { useAsync } from '@/hooks/useAsync';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import { Async, CardsSkeleton } from '@/components/Async';
import { PageHeader } from '@/components/PageHeader';
import { EmptyState } from '@/components/EmptyState';
import { LevelTag } from '@/components/Results';
import styles from './Tests.module.scss';

export default function Tests() {
  const { t, pick } = useI18n();
  useDocumentTitle(t('nav.tests'));
  const state = useAsync(() => testsApi.list(), []);
  const { user } = useAuth();
  const mine = useAsync(() => (user?.role === 'STUDENT' ? resultsApi.me() : Promise.resolve(null)), [user?.id]);
  return (
    <>
      <PageHeader eyebrow={t('nav.practice')} title={t('nav.tests')} />
      <Async state={state} skeleton={<CardsSkeleton count={3} />} isEmpty={(d) => d.length === 0} empty={<EmptyState />}>
        {(tests) => (
          <ul className={styles.list}>
            {tests.map((test, i) => {
              const last = [...(mine.data?.tests ?? [])].reverse().find((r) => r.testId === test.id);
              return (
                <li key={test.id} className={styles.card}>
                  <span className={styles.no} aria-hidden="true">{i + 1}</span>
                  <h2>{pick(test.title)}</h2>
                  {pick(test.description) && <p className={styles.desc}>{pick(test.description)}</p>}
                  <div className={styles.meta}>
                    <Tag variant="filled">
                      {test.questionCount} {t('test.questions')}
                    </Tag>
                    {last && (
                      <span className={styles.last}>
                        {t('test.lastResult')}: <strong>{last.correct}/{last.total} · {last.percent}%</strong> <LevelTag level={last.level} />
                      </span>
                    )}
                  </div>
                  <GateButton to={`/tests/${test.id}`} type="primary" size="large" block>
                    {last ? t('test.retake') : t('test.start')}
                  </GateButton>
                </li>
              );
            })}
          </ul>
        )}
      </Async>
    </>
  );
}
