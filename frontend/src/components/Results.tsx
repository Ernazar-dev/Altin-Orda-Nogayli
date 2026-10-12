import { Progress, Tag } from 'antd';
import { useI18n } from '@/i18n';
import { CRITERIA } from '@/types';
import type { ByCriterion, Level } from '@/types';
import { LEVEL_COLOR } from '@/utils/format';
import styles from './Results.module.scss';

export function LevelTag({ level }: { level: Level }) {
  const { t } = useI18n();
  const color = level === 'HIGH' ? 'success' : level === 'MEDIUM' ? 'warning' : 'error';
  return <Tag color={color}>{t(`level.${level}` as const)}</Tag>;
}

export function CriterionBars({ data }: { data: ByCriterion | null | undefined }) {
  const { t } = useI18n();
  return (
    <ul className={styles.bars}>
      {CRITERIA.map((c) => {
        const item = data?.[c] ?? null;
        return (
          <li key={c}>
            <div className={styles.barHead}>
              <span>{t(`criterion.${c}` as const)}</span>
              <strong>{item ? `${item.percent}%` : '–'}</strong>
            </div>
            <Progress
              percent={item?.percent ?? 0}
              showInfo={false}
              strokeColor={item ? 'var(--c-indigo)' : 'var(--c-line)'}
              railColor="var(--c-paper-2)"
              aria-label={`${t(`criterion.${c}` as const)}: ${item ? item.percent : 0}%`}
            />
            <small>{t(`criterion.desc.${c}` as const)}</small>
          </li>
        );
      })}
    </ul>
  );
}

export function ScoreRing({ correct, total, percent, level }: { correct: number; total: number; percent: number; level?: Level }) {
  const { t } = useI18n();
  return (
    <div className={styles.ring}>
      <Progress
        type="circle"
        percent={percent}
        size={132}
        strokeColor={level ? LEVEL_COLOR[level] : 'var(--c-indigo)'}
        railColor="var(--c-paper-2)"
        format={() => <span className={styles.ringNum}>{percent}%</span>}
      />
      <div>
        <p className={styles.fraction}>
          {correct} / {total}
        </p>
        <p className="muted">{t('test.score')}</p>
        {level && <LevelTag level={level} />}
      </div>
    </div>
  );
}
