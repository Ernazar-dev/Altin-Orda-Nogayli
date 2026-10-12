import { Link, useParams } from 'react-router-dom';
import { Tag } from 'antd';
import { useI18n } from '@/i18n';
import { valuesApi } from '@/api/resources';
import { useAsync } from '@/hooks/useAsync';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import { useTrackView } from '@/hooks/useTrackView';
import { Async } from '@/components/Async';
import { BackLink } from '@/components/BackLink';
import { PageHeader } from '@/components/PageHeader';
import { ReadingTools } from '@/components/ReadingTools';
import { SourceCard, ThinkerAvatar } from '@/components/Cards';
import { EmptyState } from '@/components/EmptyState';
import { SourceLayers } from '@/components/SourceLayers';
import styles from './Detail.module.scss';

export default function ValueDetail() {
  const { id = '' } = useParams();
  const { t, pick } = useI18n();
  const state = useAsync(() => valuesApi.get(id), [id]);
  useTrackView('VALUE', id);
  useDocumentTitle(state.data ? pick(state.data.name) : t('nav.values'));

  return (
    <Async state={state}>
      {(v) => {
        const example = v.sources?.[0];
        return (
          <>
            <PageHeader
              back={<BackLink to="/values" label={t('nav.values')} />}
              eyebrow={t(`value.cat.${v.category}` as const)}
              title={pick(v.name)}
            />
            <ReadingTools />
            <section className={styles.block} aria-labelledby="def">
              <h2 id="def">{t('value.definition')}</h2>
              {pick(v.description) ? <p className="prose">{pick(v.description)}</p> : <EmptyState compact />}
            </section>

            <section className={styles.block} aria-labelledby="who">
              <h2 id="who">{t('value.thinkers')}</h2>
              {v.thinkers && v.thinkers.length > 0 ? (
                <ul className={styles.valueList}>
                  {v.thinkers.map((l) => (
                    <li key={l.thinker.id} style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                      <ThinkerAvatar thinker={l.thinker} size={48} />
                      <div>
                        <Link className="title" to={`/thinkers/${l.thinker.id}`}>
                          {l.thinker.name}
                        </Link>
                        {l.description && pick(l.description) && <p>{pick(l.description)}</p>}
                        {l.source && (
                          <p>
                            <Tag variant="filled">{t('layer.reference')}</Tag>
                            <Link to={`/sources/${l.source.id}`}>{pick(l.source.title)}</Link>
                          </p>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <EmptyState compact />
              )}
            </section>

            <section className={styles.block} aria-labelledby="ex">
              <h2 id="ex">{t('value.example')}</h2>
              {example ? (
                <>
                  <p className="muted">
                    <Link to={`/sources/${example.id}`}>{pick(example.title)}</Link>
                  </p>
                  <SourceLayers source={example} />
                </>
              ) : (
                <EmptyState compact />
              )}
            </section>

            <section className={styles.block} aria-labelledby="srcs">
              <h2 id="srcs">{t('value.sources')}</h2>
              {v.sources && v.sources.length > 0 ? (
                <div className="grid-auto" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 300px), 1fr))' }}>
                  {v.sources.map((s) => (
                    <SourceCard key={s.id} source={s} to={`/sources/${s.id}`} />
                  ))}
                </div>
              ) : (
                <EmptyState compact />
              )}
            </section>

            <section className={styles.block} aria-labelledby="mod">
              <h2 id="mod">{t('value.modern')}</h2>
              {pick(v.modernInterpretation) ? (
                <SourceLayers
                  showSource={false}
                  source={{ content: '', reference: '', dissertationNote: null }}
                  modern={v.modernInterpretation}
                />
              ) : (
                <EmptyState compact />
              )}
            </section>
          </>
        );
      }}
    </Async>
  );
}
