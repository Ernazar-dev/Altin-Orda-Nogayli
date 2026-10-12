import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Drawer, Segmented } from 'antd';
import { useI18n } from '@/i18n';
import { TIMELINE_KINDS } from '@/types';
import type { Period, TimelineEvent, TimelineKind } from '@/types';
import { TONE_VARS, toneOf } from '@/utils/tone';
import { EmptyState } from './EmptyState';
import styles from './Timeline.module.scss';

interface Props {
  events: TimelineEvent[];
  periods: Period[];
  /** Hodisa ob'ektiga o'tish manzili (rol bo'yicha). */
  hrefFor: (e: TimelineEvent) => string | null;
  limit?: number;
}

function yearOf(e: TimelineEvent, fallback: string): string {
  return e.yearLabel || (e.year ? String(e.year) : fallback);
}

export function Timeline({ events, periods, hrefFor, limit }: Props) {
  const { t, pick } = useI18n();
  const [kind, setKind] = useState<TimelineKind | 'ALL'>('ALL');
  const [active, setActive] = useState<TimelineEvent | null>(null);

  const sorted = useMemo(
    () => [...events].sort((a, b) => a.order - b.order).filter((e) => kind === 'ALL' || e.kind === kind),
    [events, kind],
  );
  const shown = limit ? sorted.slice(0, limit) : sorted;
  const periodOf = (id?: string | null) => periods.find((p) => p.id === id);
  const href = active ? hrefFor(active) : null;

  return (
    <div className={styles.wrap}>
      {!limit && (
        <div className={styles.filters}>
          <Segmented<TimelineKind | 'ALL'>
            aria-label={t('timeline.filter')}
            value={kind}
            onChange={setKind}
            options={[
              { label: t('common.all'), value: 'ALL' },
              ...TIMELINE_KINDS.map((k) => ({ label: t(`timeline.kind.${k}` as const), value: k })),
            ]}
          />
          <p className="muted">{t('timeline.hint')}</p>
        </div>
      )}
      {shown.length === 0 ? (
        <EmptyState />
      ) : (
        <ol className={styles.spine}>
          {shown.map((e) => {
            const tone = TONE_VARS[toneOf(periodOf(e.periodId))];
            const p = periodOf(e.periodId);
            return (
              <li key={e.id} style={{ ['--tone' as string]: tone.fg, ['--tone-soft' as string]: tone.soft }}>
                <span className={styles.year}>{yearOf(e, t('timeline.noYear'))}</span>
                <span className={`${styles.dot} ${styles[`k_${e.kind}`] ?? ''}`} aria-hidden="true" />
                <button type="button" className={styles.item} onClick={() => setActive(e)} aria-haspopup="dialog">
                  <span className={styles.kind}>{t(`timeline.kind.${e.kind}` as const)}</span>
                  <strong>{pick(e.title)}</strong>
                  {p && <small>{pick(p.name)}</small>}
                </button>
              </li>
            );
          })}
        </ol>
      )}
      <Drawer
        open={Boolean(active)}
        onClose={() => setActive(null)}
        title={active ? pick(active.title) : ''}
        size="min(440px, 100vw)"
        destroyOnHidden
      >
        {active && (
          <div>
            <p className="eyebrow">
              {t(`timeline.kind.${active.kind}` as const)} · {yearOf(active, t('timeline.noYear'))}
            </p>
            {periodOf(active.periodId) && <p className="muted">{pick(periodOf(active.periodId)?.name)}</p>}
            <p className="prose">{pick(active.description)}</p>
            {active.sourceRef && (
              <p className="muted">
                {t('layer.reference')}: <strong>{active.sourceRef}</strong>
              </p>
            )}
            {href && (
              <Link to={href}>
                <Button type="primary">{t('timeline.open')}</Button>
              </Link>
            )}
          </div>
        )}
      </Drawer>
    </div>
  );
}
