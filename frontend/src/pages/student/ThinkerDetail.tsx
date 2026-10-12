import { Link, useParams } from 'react-router-dom';
import { useI18n } from '@/i18n';
import { thinkersApi } from '@/api/resources';
import { useAsync } from '@/hooks/useAsync';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import { useTrackView } from '@/hooks/useTrackView';
import { Async } from '@/components/Async';
import { BackLink } from '@/components/BackLink';
import { SourceCard, ThinkerAvatar } from '@/components/Cards';
import { DraftBadge } from '@/components/DraftBadge';
import { EmptyState } from '@/components/EmptyState';
import { OrnamentDivider } from '@/components/Ornament';
import { SourceLayers } from '@/components/SourceLayers';
import { ReadingTools } from '@/components/ReadingTools';
import { usePeriodMap } from '@/hooks/usePeriodMap';
import { toneOf } from '@/utils/tone';
import type { Thinker } from '@/types';
import styles from './Detail.module.scss';

function lifeYears(th: Thinker): string | null {
  if (th.birthYear && th.deathYear) return `${th.birthYear}–${th.deathYear}`;
  if (th.birthYear) return `${th.birthYear}–`;
  if (th.deathYear) return `–${th.deathYear}`;
  return null;
}

export default function ThinkerDetail() {
  const { id = '' } = useParams();
  const { t, pick } = useI18n();
  const state = useAsync(() => thinkersApi.get(id), [id]);
  const periodMap = usePeriodMap();
  useTrackView('THINKER', id);
  useDocumentTitle(state.data?.name ?? t('nav.thinkers'));

  return (
    <Async state={state}>
      {(th) => {
        const sections = [
          { id: 'life', title: t('thinker.life') },
          { id: 'creativity', title: t('thinker.creativity') },
          { id: 'works', title: t('thinker.works') },
          { id: 'views', title: t('thinker.views') },
          { id: 'values', title: t('thinker.values') },
          { id: 'modern', title: t('thinker.modern') },
        ];
        const years = lifeYears(th);
        const tone = toneOf(periodMap.get(th.periodId) ?? th.period);
        return (
          <>
            <BackLink to="/thinkers" label={t('nav.thinkers')} />
            <div className={styles.hero}>
              <ThinkerAvatar thinker={th} size={96} />
              <div>
                <p className="eyebrow" style={{ color: tone === 'teal' ? 'var(--c-teal)' : undefined }}>
                  {th.period ? pick(th.period.name) : t('nav.thinkers')}
                </p>
                <h1>{th.name}</h1>
                <p className="muted">
                  {t('thinker.years')}: {years ?? t('thinker.noYears')} <DraftBadge status={th.reviewStatus} />
                </p>
              </div>
            </div>
            <OrnamentDivider />
            <ReadingTools />
            <div className={styles.layout}>
              <nav className={styles.index} aria-label={th.name}>
                <ol>
                  {sections.map((s, i) => (
                    <li key={s.id}>
                      <a href={`#${s.id}`}>
                        {i + 1}. {s.title}
                      </a>
                    </li>
                  ))}
                </ol>
              </nav>
              <div className={styles.sections}>
                <section id="life" className={styles.section}>
                  <h2>
                    <span>1</span>
                    {t('thinker.life')}
                  </h2>
                  {pick(th.biography) ? <p className="prose">{pick(th.biography)}</p> : <EmptyState compact />}
                </section>
                <section id="creativity" className={styles.section}>
                  <h2>
                    <span>2</span>
                    {t('thinker.creativity')}
                  </h2>
                  {pick(th.mainIdeas) ? <p className="prose">{pick(th.mainIdeas)}</p> : <EmptyState compact />}
                </section>
                <section id="works" className={styles.section}>
                  <h2>
                    <span>3</span>
                    {t('thinker.works')}
                  </h2>
                  {th.works && th.works.length > 0 ? (
                    <div className="grid-auto" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 280px), 1fr))' }}>
                      {th.works.map((s) => (
                        <SourceCard key={s.id} source={s} to={`/sources/${s.id}`} />
                      ))}
                    </div>
                  ) : (
                    <EmptyState compact />
                  )}
                </section>
                <section id="views" className={styles.section}>
                  <h2>
                    <span>4</span>
                    {t('thinker.views')}
                  </h2>
                  {pick(th.educationalViews) ? <p className="prose">{pick(th.educationalViews)}</p> : <EmptyState compact />}
                </section>
                <section id="values" className={styles.section}>
                  <h2>
                    <span>5</span>
                    {t('thinker.values')}
                  </h2>
                  {th.values && th.values.length > 0 ? (
                    <ul className={styles.valueList}>
                      {th.values.map((l) => (
                        <li key={l.value.id}>
                          <Link className="title" to={`/values/${l.value.id}`}>
                            {pick(l.value.name)}
                          </Link>
                          {l.description && pick(l.description) && <p>{pick(l.description)}</p>}
                          {l.source && (
                            <p>
                              {t('thinker.linkSource')}: <Link to={`/sources/${l.source.id}`}>{pick(l.source.title)}</Link>{' '}
                              <small>{l.source.reference}</small>
                            </p>
                          )}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <EmptyState compact />
                  )}
                </section>
                <section id="modern" className={styles.section}>
                  <h2>
                    <span>6</span>
                    {t('thinker.modern')}
                  </h2>
                  {pick(th.modernImportance) ? (
                    <SourceLayers
                      showSource={false}
                      source={{ content: '', reference: '', dissertationNote: null }}
                      modern={th.modernImportance}
                      modernLabel={t('layer.modern')}
                    />
                  ) : (
                    <EmptyState compact />
                  )}
                </section>
              </div>
            </div>
          </>
        );
      }}
    </Async>
  );
}
