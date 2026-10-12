import { Link } from 'react-router-dom';
import { Button } from 'antd';
import { ArrowRightOutlined } from '@ant-design/icons';
import { useI18n } from '@/i18n';
import { useAuth } from '@/context/AuthContext';
import { resultsApi } from '@/api/resources';
import { useAsync } from '@/hooks/useAsync';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import { Async } from '@/components/Async';
import { PageHeader } from '@/components/PageHeader';
import { PedagogicalChain } from '@/components/Chain';
import { ResultsDashboard } from '@/components/ResultsDashboard';
import styles from './Dashboard.module.scss';

export default function StudentDashboard() {
  const { t } = useI18n();
  const { user } = useAuth();
  useDocumentTitle(t('nav.dashboard'));
  const state = useAsync(() => resultsApi.me(), []);

  return (
    <>
      <PageHeader eyebrow={t('dash.welcome')} title={user?.fullName ?? ''} lead={t('dash.studentLead')} />
      <Async state={state}>
        {(me) => {
          const hasInitial = me.diagnostics.some((d) => (d.kind ?? d.diagnostic?.kind) === 'INITIAL');
          return (
            <>
              <section className={styles.next} aria-label={t('results.nextStep')}>
                <div>
                  <p className="eyebrow">{t('results.nextStep')}</p>
                  <h2>{hasInitial ? t('results.continue') : t('diag.initial')}</h2>
                  <p>{hasInitial ? t('home.chainLead') : t('diag.initialDesc')}</p>
                </div>
                <Link to={hasInitial ? '/periods' : '/diagnostics/initial'}>
                  <Button type="primary" size="large" icon={<ArrowRightOutlined />} iconPlacement="end">
                    {hasInitial ? t('nav.periods') : t('common.start')}
                  </Button>
                </Link>
              </section>
              <section className={styles.chain}>
                <PedagogicalChain />
              </section>
              <ResultsDashboard data={me} />
            </>
          );
        }}
      </Async>
    </>
  );
}
