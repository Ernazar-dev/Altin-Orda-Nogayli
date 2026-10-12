import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Tag } from 'antd';
import { assetUrl } from '@/api/client';
import { useI18n } from '@/i18n';
import type { EducationalValue, Period, Source, Thinker } from '@/types';
import { initials, yearsLabel } from '@/utils/format';
import { TONE_VARS, toneOf } from '@/utils/tone';
import { usePeriodMap } from '@/hooks/usePeriodMap';
import { OrnamentBand } from './Ornament';
import { DraftBadge } from './DraftBadge';
import styles from './Cards.module.scss';

export function PeriodCard({ period, to }: { period: Period; to: string }) {
  const { pick, t } = useI18n();
  const tone = TONE_VARS[toneOf(period)];
  const years = yearsLabel(period.startYear, period.endYear);
  return (
    <Link to={to} className={styles.card} style={{ ['--tone' as string]: tone.fg, ['--tone-soft' as string]: tone.soft }}>
      {period.image ? (
        <img className={styles.cover} src={assetUrl(period.image)} alt="" loading="lazy" />
      ) : (
        <OrnamentBand variant="horn" color={tone.hex} opacity={0.7} className={styles.coverBand} />
      )}
      <div className={styles.body}>
        <p className="eyebrow" style={{ color: tone.fg }}>
          {years ?? t('nav.periods')}
        </p>
        <h3>{pick(period.name)}</h3>
        <p className={styles.clamp}>{pick(period.shortDescription)}</p>
      </div>
    </Link>
  );
}

export function ThinkerAvatar({ thinker, size = 56 }: { thinker: Pick<Thinker, 'name' | 'image'>; size?: number }) {
  const [failed, setFailed] = useState(false);
  if (thinker.image && !failed) {
    return (
      <img
        className={styles.avatar}
        src={assetUrl(thinker.image)}
        alt=""
        width={size}
        height={size}
        loading="lazy"
        decoding="async"
        onError={() => setFailed(true)}
      />
    );
  }
  return (
    <span className={styles.monogram} style={{ width: size, height: size, fontSize: size * 0.38 }} aria-hidden="true">
      {initials(thinker.name)}
    </span>
  );
}

export function ThinkerCard({ thinker, to }: { thinker: Thinker; to: string }) {
  const { pick } = useI18n();
  const periods = usePeriodMap();
  const periodFull = periods.get(thinker.periodId) ?? thinker.period;
  const tone = TONE_VARS[toneOf(periodFull)];
  return (
    <Link to={to} className={`${styles.card} ${styles.row}`} style={{ ['--tone' as string]: tone.fg, ['--tone-soft' as string]: tone.soft }}>
      <ThinkerAvatar thinker={thinker} />
      <div className={styles.body}>
        <h3>{thinker.name}</h3>
        {thinker.period && (
          <span className={styles.chip}>{pick(thinker.period.name)}</span>
        )}
        <p className={styles.clamp}>{pick(thinker.mainIdeas)}</p>
        <DraftBadge status={thinker.reviewStatus} />
      </div>
    </Link>
  );
}

export function ValueCard({ value, to }: { value: EducationalValue; to: string }) {
  const { pick, t } = useI18n();
  return (
    <Link to={to} className={`${styles.card} ${styles.valueCard}`}>
      <div className={styles.body}>
        <Tag variant="filled" color="gold">
          {t(`value.cat.${value.category}` as const)}
        </Tag>
        <h3>{pick(value.name)}</h3>
        <p className={styles.clamp}>{pick(value.description)}</p>
      </div>
    </Link>
  );
}

export function SourceCard({ source, to }: { source: Source; to: string }) {
  const { pick, t } = useI18n();
  return (
    <Link to={to} className={`${styles.card} ${styles.sourceCard}`}>
      <div className={styles.body}>
        <Tag variant="filled" color="blue">
          {t(`source.type.${source.type}` as const)}
        </Tag>
        <h3>{pick(source.title)}</h3>
        <blockquote className={styles.quote} lang="uz-Cyrl">
          {source.excerpt || source.content}
        </blockquote>
        <p className={styles.ref}>{source.reference}</p>
        <DraftBadge status={source.reviewStatus} />
      </div>
    </Link>
  );
}
