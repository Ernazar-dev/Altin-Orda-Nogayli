import { useParams } from 'react-router-dom';
import { useI18n } from '@/i18n';
import { periodsApi } from '@/api/resources';
import { useAsync } from '@/hooks/useAsync';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import { useTrackView } from '@/hooks/useTrackView';
import { Async } from '@/components/Async';
import { BackLink } from '@/components/BackLink';
import { PageHeader } from '@/components/PageHeader';
import { ReadingTools } from '@/components/ReadingTools';
import { SourceCard, ThinkerCard } from '@/components/Cards';
import { EmptyState } from '@/components/EmptyState';
import { yearsLabel } from '@/utils/format';
import styles from './Detail.module.scss';

export default function PeriodDetail() {
  const { id = '' } = useParams();
  const { t, pick } = useI18n();
  const state = useAsync(() => periodsApi.get(id), [id]);
  useTrackView('PERIOD', id);
  useDocumentTitle(state.data ? pick(state.data.name) : t('nav.periods'));

  return (
    <Async state={state}>
      {(p) => (
        <>
          <PageHeader
            back={<BackLink to="/periods" label={t('nav.periods')} />}
            eyebrow={yearsLabel(p.startYear, p.endYear) ?? t('nav.periods')}
            title={pick(p.name)}
            lead={pick(p.shortDescription)}
          />
          <ReadingTools />
          <section className={styles.block} aria-labelledby="ctx">
            <h2 id="ctx">{t('period.context')}</h2>
            {pick(p.content) ? <p className="prose">{pick(p.content)}</p> : <EmptyState compact />}
          </section>
          <section className={styles.block} aria-labelledby="th">
            <h2 id="th">{t('period.thinkers')}</h2>
            {p.thinkers && p.thinkers.length > 0 ? (
              <div className="grid-auto">
                {p.thinkers.map((th) => (
                  <ThinkerCard key={th.id} thinker={{ ...th, period: p }} to={`/thinkers/${th.id}`} />
                ))}
              </div>
            ) : (
              <EmptyState compact />
            )}
          </section>
          <section className={styles.block} aria-labelledby="src">
            <h2 id="src">{t('period.sources')}</h2>
            {p.sources && p.sources.length > 0 ? (
              <div className="grid-auto" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 300px), 1fr))' }}>
                {p.sources.map((s) => (
                  <SourceCard key={s.id} source={s} to={`/sources/${s.id}`} />
                ))}
              </div>
            ) : (
              <EmptyState compact />
            )}
          </section>
        </>
      )}
    </Async>
  );
}
