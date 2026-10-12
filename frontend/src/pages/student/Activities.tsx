import { Tag } from 'antd';
import { GateLink } from '@/components/AuthGate';
import { BulbOutlined, CheckCircleFilled, CompassOutlined, ExperimentOutlined } from '@ant-design/icons';
import type { ReactElement } from 'react';
import { useI18n } from '@/i18n';
import { activitiesApi } from '@/api/resources';
import { ACTIVITY_TYPES } from '@/types';
import type { ActivityType } from '@/types';
import { useAsync } from '@/hooks/useAsync';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import { Async, CardsSkeleton } from '@/components/Async';
import { PageHeader } from '@/components/PageHeader';
import { EmptyState } from '@/components/EmptyState';
import styles from './Activities.module.scss';

const ICONS: Record<ActivityType, ReactElement> = {
  SOURCE_ANALYSIS: <ExperimentOutlined />,
  THOUGHT_ANALYSIS: <BulbOutlined />,
  MODERN_LINK: <CompassOutlined />,
};

export default function Activities() {
  const { t, pick } = useI18n();
  useDocumentTitle(t('nav.activities'));
  const state = useAsync(() => activitiesApi.list(), []);
  return (
    <>
      <PageHeader eyebrow={t('nav.practice')} title={t('nav.activities')} lead={t('activity.noScore')} />
      <Async state={state} skeleton={<CardsSkeleton count={3} />} isEmpty={(d) => d.length === 0} empty={<EmptyState />}>
        {(items) => (
          <div className={styles.groups}>
            {ACTIVITY_TYPES.map((type) => {
              const list = items.filter((a) => a.type === type);
              return (
                <section key={type} aria-labelledby={`g-${type}`}>
                  <div className={styles.groupHead}>
                    <span className={styles.icon} aria-hidden="true">
                      {ICONS[type]}
                    </span>
                    <div>
                      <h2 id={`g-${type}`}>{t(`activity.type.${type}` as const)}</h2>
                      <p className="muted">{t(`activity.type.desc.${type}` as const)}</p>
                    </div>
                  </div>
                  {list.length === 0 ? (
                    <EmptyState compact />
                  ) : (
                    <ul className={styles.list}>
                      {list.map((a) => (
                        <li key={a.id}>
                          <GateLink to={`/activities/${a.id}`} className={styles.item}>
                            <span>
                              <strong>{pick(a.title)}</strong>
                              <small>{t(`criterion.${a.criterion}` as const)}</small>
                            </span>
                            {a.attempted && (
                              <Tag color="success" icon={<CheckCircleFilled />} variant="filled">
                                {t('activity.done')}
                              </Tag>
                            )}
                          </GateLink>
                        </li>
                      ))}
                    </ul>
                  )}
                </section>
              );
            })}
          </div>
        )}
      </Async>
    </>
  );
}
