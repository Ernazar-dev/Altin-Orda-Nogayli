import { Link } from 'react-router-dom';
import { ArrowDownOutlined, ArrowRightOutlined, BookOutlined, BulbOutlined, ExperimentOutlined, ReadOutlined } from '@ant-design/icons';
import { useI18n } from '@/i18n';
import { periodsApi, thinkersApi } from '@/api/resources';
import { useAsync } from '@/hooks/useAsync';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import { Async, CardsSkeleton } from '@/components/Async';
import { EmptyState } from '@/components/EmptyState';
import { PeriodCard, ThinkerCard } from '@/components/Cards';
import { MapScene } from '@/components/MapScene';
import { OrnamentBand } from '@/components/Ornament';
import styles from './Home.module.scss';

const PILLARS = [
  { icon: <BookOutlined />, title: 'study.originalTexts', body: 'landing.readBody', to: '/sources' },
  { icon: <BulbOutlined />, title: 'study.sourceAnalysis', body: 'landing.analyzeBody', to: '/activities' },
  { icon: <ExperimentOutlined />, title: 'study.step4', body: 'landing.assessBody', to: '/diagnostics' },
] as const;

export default function Home() {
  const { t } = useI18n();
  const periods = useAsync(() => periodsApi.list(), []);
  const thinkers = useAsync(() => thinkersApi.list(), []);
  useDocumentTitle(t('nav.home'));
  return <>
    <section className={styles.hero}>
      <div className={styles.frame} aria-hidden="true" />
      <div className={styles.heroInner}>
        <div className={styles.heroText}>
          <p className={styles.kicker}><span />{t('study.sourceBased')}<i />{t('study.platform')}</p>
          <h1>
            <span className={styles.titleStart}>{t('landing.titleStart')}</span>
            <em>{t('landing.titleAccent')}</em>
            <span className={styles.titleEnd}>{t('landing.titleEnd')}</span>
          </h1>
          <div className={styles.cta}><Link to="/periods" className={styles.primary}>{t('study.begin')} <ArrowRightOutlined /></Link><Link to="/sources" className={styles.secondary}><BookOutlined />{t('landing.exploreSources')}</Link></div>
        </div>
        <div className={styles.art}>
          <MapScene />
        </div>
      </div>
      <OrnamentBand color="#e2c788" opacity={0.5} className={styles.edge} />
      <div className={styles.heroBase}>
        <a href="#explore">{t('landing.discover')} <ArrowDownOutlined /></a>
        <span><ReadOutlined />{t('home.audience')}<i />{t('landing.languages')}</span>
      </div>
    </section>

    <div className={styles.pillars}>
      {PILLARS.map(item => <Link key={item.to} to={item.to}><span className={styles.pillarIcon}>{item.icon}</span><div><strong>{t(item.title)}</strong><p>{t(item.body)}</p></div><ArrowRightOutlined /></Link>)}
    </div>

    <section id="explore" className={styles.section}>
      <div className={styles.sectionHead}><div><p className="eyebrow">01 / {t('nav.learn')}</p><h2>{t('home.periodsTitle')}</h2><p>{t('landing.periodsLead')}</p></div><Link to="/timeline">{t('nav.timeline')} <ArrowRightOutlined /></Link></div>
      <Async state={periods} skeleton={<CardsSkeleton count={2} />} isEmpty={d => !d.length} empty={<EmptyState />}>{items => <div className={styles.periods}>{[...items].sort((a,b) => a.order-b.order).map(p => <PeriodCard key={p.id} period={p} to={`/periods/${p.id}`} />)}</div>}</Async>
    </section>

    <section className={styles.thinkersSection}><div className={styles.section}>
      <div className={styles.sectionHead}><div><p className="eyebrow">02 / {t('study.heritage')}</p><h2>{t('home.thinkersTitle')}</h2><p>{t('landing.thinkersLead')}</p></div><Link to="/thinkers">{t('common.all')} <ArrowRightOutlined /></Link></div>
      <Async state={thinkers} skeleton={<CardsSkeleton count={4} />} isEmpty={d => !d.length} empty={<EmptyState />}>{items => <div className={styles.thinkers}>{items.slice(0,4).map(th => <ThinkerCard key={th.id} thinker={th} to={`/thinkers/${th.id}`} />)}</div>}</Async>
    </div></section>

    <section className={styles.section}>
      <div className={styles.sectionHead}><div><p className="eyebrow">03 / {t('study.whereStart')}</p><h2>{t('study.path')}</h2><p>{t('study.note')}</p></div><Link to="/guide">{t('study.fullGuide')} <ArrowRightOutlined /></Link></div>
      <ol className={styles.steps}>{(['study.step1','study.step2','study.step3','study.step4'] as const).map((key,i) => <li key={key}><span>0{i+1}</span><h3>{t(key)}</h3><Link to={['/periods','/sources','/activities','/diagnostics'][i]}>{t('common.open')} <ArrowRightOutlined /></Link></li>)}</ol>
    </section>

    <section className={styles.practice}><div><p className={styles.practiceKicker}>{t('nav.practice')}</p><h2>{t('home.practiceTitle')}</h2><p>{t('study.practiceLead')}</p></div><div className={styles.cta}><Link to="/activities" className={styles.primary}>{t('nav.activities')} <ArrowRightOutlined /></Link><Link to="/diagnostics" className={styles.secondary}>{t('nav.diagnostics')} ↗</Link></div></section>
  </>;
}
