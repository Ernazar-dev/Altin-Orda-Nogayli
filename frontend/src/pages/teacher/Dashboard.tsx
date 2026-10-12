import { useEffect } from 'react';
import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRightOutlined, BookOutlined, EditOutlined, FileTextOutlined } from '@ant-design/icons';
import { useI18n } from '@/i18n';
import type { I18nKey } from '@/i18n';
import { useAuth } from '@/context/AuthContext';
import { analyticsApi, resultsApi, sourcesApi } from '@/api/resources';
import { useAsync } from '@/hooks/useAsync';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import { Async } from '@/components/Async';
import { EmptyState } from '@/components/EmptyState';
import { PageHeader } from '@/components/PageHeader';
import { FeedList } from '@/components/ResultFeed';
import { ClassChart, CriteriaChart, InitialFinalChart, LevelsChart } from '@/components/Charts';
import styles from './Dashboard.module.scss';

const ACTIONS: { to: string; label: I18nKey; icon: ReactNode }[] = [
  { to: '/teacher/tests?new=1', label: 'dash.addTest', icon: <FileTextOutlined /> },
  { to: '/teacher/activities?new=1', label: 'dash.addActivity', icon: <EditOutlined /> },
  { to: '/teacher/sources?new=1', label: 'dash.addSource', icon: <BookOutlined /> },
];

const MATERIALS: { to: string; label: I18nKey }[] = [
  { to: '/teacher/periods', label: 'crud.periods' },
  { to: '/teacher/thinkers', label: 'crud.thinkers' },
  { to: '/teacher/values', label: 'crud.values' },
  { to: '/teacher/sources', label: 'crud.sources' },
  { to: '/teacher/timeline', label: 'nav.timeline' },
  { to: '/teacher/comparisons', label: 'nav.comparisons' },
  { to: '/teacher/diagnostics', label: 'crud.diagnostics' },
];

const isToday = (iso: string) => new Date(iso).toDateString() === new Date().toDateString();

export default function TeacherDashboard() {
  const { t } = useI18n();
  const { user } = useAuth();
  useDocumentTitle(t('nav.dashboard'));
  const overview = useAsync(() => analyticsApi.overview(), []);
  const byCriterion = useAsync(() => analyticsApi.byCriterion(), []);
  const byClass = useAsync(() => analyticsApi.byClass(), []);
  const sources = useAsync(() => sourcesApi.list(), []);
  const feed = useAsync(() => resultsApi.feed({ limit: 100 }), []);
  const reloadFeed = feed.reload;

  useEffect(() => {
    const id = window.setInterval(reloadFeed, 30_000);
    return () => window.clearInterval(id);
  }, [reloadFeed]);

  const today = feed.data?.items.filter((i) => isToday(i.createdAt)).length ?? 0;

  return (
    <>
      <PageHeader eyebrow={`${t('dash.welcome')}, ${user?.fullName ?? ''}`} title={t('nav.dashboard')} lead={t('study.adminLead')} />
      <div className={styles.layout}>
        <div className={styles.main}>
          <Async state={overview}>
            {(o) => {
              const noScores = o.testsCompleted === 0 && o.diagnosticAvg.initial === null && o.diagnosticAvg.final === null;
              return (
                <dl className={styles.stats}>
                  <div><dt>{t('dash.students')}</dt><dd>{o.students}</dd></div>
                  <div><dt>{t('dash.testsCompleted')}</dt><dd>{o.testsCompleted}</dd></div>
                  <div><dt>{t('dash.average')}</dt><dd>{noScores ? '—' : `${o.averagePercent}%`}</dd></div>
                  <div><dt>{t('dash.submissionsToday')}</dt><dd>{feed.data ? today : '—'}</dd></div>
                </dl>
              );
            }}
          </Async>

          <section className={styles.card} aria-labelledby="recent">
            <header>
              <h2 id="recent">{t('feed.recent')}</h2>
              <Link to="/teacher/results">{t('feed.viewAll')} <ArrowRightOutlined /></Link>
            </header>
            <Async state={feed} isEmpty={(d) => d.items.length === 0} empty={<EmptyState compact title={t('feed.empty')} />}>
              {(d) => <FeedList items={d.items.slice(0, 8)} />}
            </Async>
          </section>

          <Async state={overview}>
            {(o) => (
              <div className={styles.charts}>
                <InitialFinalChart initial={o.diagnosticAvg.initial} final={o.diagnosticAvg.final} />
                <LevelsChart data={o.levelDistribution} />
                <Async state={byCriterion}>{(data) => <CriteriaChart data={data} />}</Async>
                <Async state={byClass}>{(data) => <ClassChart data={data} />}</Async>
              </div>
            )}
          </Async>
        </div>

        <aside className={styles.side}>
          <section className={styles.card} aria-labelledby="quick">
            <header><h2 id="quick">{t('dash.quickTitle')}</h2></header>
            <div className={styles.actions}>
              {ACTIONS.map((a) => (
                <Link key={a.to} to={a.to}>
                  <span aria-hidden="true">{a.icon}</span>
                  {t(a.label)}
                  <ArrowRightOutlined />
                </Link>
              ))}
            </div>
          </section>

          <section className={styles.card} aria-labelledby="audit">
            <header><h2 id="audit">{t('study.audit')}</h2></header>
            <Async state={sources}>
              {(rows) => (
                <ul className={styles.audit}>
                  <li><Link to="/teacher/sources?review=DRAFT"><strong>{rows.filter((s) => s.reviewStatus !== 'REVIEWED').length}</strong><span>{t('study.drafts')}</span></Link></li>
                  <li><Link to="/teacher/sources?issue=reference"><strong>{rows.filter((s) => !s.reference?.trim()).length}</strong><span>{t('study.references')}</span></Link></li>
                  <li><Link to="/teacher/sources?issue=content"><strong>{rows.filter((s) => !s.content?.trim()).length}</strong><span>{t('study.missingOriginal')}</span></Link></li>
                </ul>
              )}
            </Async>
          </section>

          <section className={styles.card} aria-labelledby="mat">
            <header><h2 id="mat">{t('dash.materials')}</h2></header>
            <div className={styles.links}>
              {MATERIALS.map((m) => <Link key={m.to} to={m.to}>{t(m.label)}</Link>)}
            </div>
          </section>
        </aside>
      </div>
    </>
  );
}
