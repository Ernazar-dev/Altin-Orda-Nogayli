import { Link, useParams } from 'react-router-dom';
import { Button, Space, Tag } from 'antd';
import { useI18n } from '@/i18n';
import { activitiesApi, periodsApi, sourcesApi, thinkersApi, valuesApi } from '@/api/resources';
import { useAsync } from '@/hooks/useAsync';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import { useTrackView } from '@/hooks/useTrackView';
import { Async } from '@/components/Async';
import { BackLink } from '@/components/BackLink';
import { PageHeader } from '@/components/PageHeader';
import { ReadingTools } from '@/components/ReadingTools';
import { SourceLayers } from '@/components/SourceLayers';
import { DraftBadge } from '@/components/DraftBadge';
import styles from './Detail.module.scss';

export default function SourceDetail() {
  const { id = '' } = useParams();
  const { t, pick } = useI18n();
  const state = useAsync(() => sourcesApi.get(id), [id]);
  const values = useAsync(() => valuesApi.list(), []);
  const activities = useAsync(() => activitiesApi.list(), []);
  const thinkers = useAsync(() => thinkersApi.list(), []);
  const periods = useAsync(() => periodsApi.list(), []);
  useTrackView('SOURCE', id);
  useDocumentTitle(state.data ? pick(state.data.title) : t('nav.sources'));

  return (
    <Async state={state}>
      {(s) => {
        const related = (values.data ?? []).filter((v) => s.valueIds?.includes(v.id));
        const tasks = (activities.data ?? []).filter((a) => a.sourceId === s.id);
        const thinker = s.thinker ?? (thinkers.data ?? []).find((x) => x.id === s.thinkerId) ?? null;
        const period = s.period ?? (periods.data ?? []).find((x) => x.id === s.periodId) ?? null;
        return (
          <>
            <PageHeader
              back={<BackLink to="/sources" label={t('nav.sources')} />}
              eyebrow={t(`source.type.${s.type}` as const)}
              title={pick(s.title)}
              lead={pick(s.description)}
            />
            <Space wrap style={{ marginBottom: 16 }}>
              {thinker && (
                <Link to={`/thinkers/${thinker.id}`}>
                  <Tag variant="filled">
                    {t('source.thinker')}: {thinker.name}
                  </Tag>
                </Link>
              )}
              {period && (
                <Link to={`/periods/${period.id}`}>
                  <Tag variant="filled">{pick(period.name)}</Tag>
                </Link>
              )}
              <DraftBadge status={s.reviewStatus} />
            </Space>
            <ReadingTools />
            <SourceLayers source={s} modern={s.educationalMeaning} modernLabel={t('source.educationalMeaning')} />
            {related.length > 0 && (
              <section className={styles.block}>
                <h2>{t('source.values')}</h2>
                <Space wrap>
                  {related.map((v) => (
                    <Link key={v.id} to={`/values/${v.id}`}>
                      <Tag color="gold" variant="filled" style={{ fontSize: 14, padding: '4px 12px' }}>
                        {pick(v.name)}
                      </Tag>
                    </Link>
                  ))}
                </Space>
              </section>
            )}
            {tasks.length > 0 && (
              <section className={styles.block}>
                <h2>{t('source.analyze')}</h2>
                <Space wrap>
                  {tasks.map((a) => (
                    <Link key={a.id} to={`/activities/${a.id}`}>
                      <Button type="primary">{pick(a.title)}</Button>
                    </Link>
                  ))}
                </Space>
              </section>
            )}
          </>
        );
      }}
    </Async>
  );
}
