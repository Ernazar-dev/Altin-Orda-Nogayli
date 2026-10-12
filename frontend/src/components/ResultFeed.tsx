import { Link } from 'react-router-dom';
import { Tag } from 'antd';
import { CheckCircleFilled, CloseCircleFilled } from '@ant-design/icons';
import { useI18n } from '@/i18n';
import type { FeedItem, FeedKind } from '@/types';
import { formatDateTime } from '@/utils/format';
import { LevelTag } from './Results';
import styles from './ResultFeed.module.scss';

const KIND_COLOR: Record<FeedKind, string> = { TEST: 'blue', INITIAL: 'purple', FINAL: 'gold', ACTIVITY: 'green' };

export function FeedKindTag({ kind }: { kind: FeedKind }) {
  const { t } = useI18n();
  const label = kind === 'INITIAL' ? t('diag.initial') : kind === 'FINAL' ? t('diag.final') : t(`feed.kind.${kind}` as const);
  return (
    <Tag color={KIND_COLOR[kind]} variant="filled">
      {label}
    </Tag>
  );
}

/** Natija: test/diagnostikada «to'g'ri/jami · foiz · daraja», topshiriqda «to'g'ri» yoki «noto'g'ri». */
export function FeedResult({ item }: { item: FeedItem }) {
  const { t } = useI18n();
  if (item.kind === 'ACTIVITY') {
    return item.correct ? (
      <span className={styles.ok}><CheckCircleFilled /> {t('common.correct')}</span>
    ) : (
      <span className={styles.bad}><CloseCircleFilled /> {t('common.wrong')}</span>
    );
  }
  return (
    <span className={styles.score}>
      <strong>{item.correct}/{item.total}</strong> · {item.percent}% {item.level && <LevelTag level={item.level} />}
    </span>
  );
}

export function StudentLink({ item }: { item: FeedItem }) {
  const { t } = useI18n();
  return (
    <Link to={`/teacher/students/${item.student.id}`} className={styles.student}>
      <span className={styles.avatar} aria-hidden="true">{item.student.fullName.trim().charAt(0).toUpperCase()}</span>
      <span>
        <strong>{item.student.fullName}</strong>
        {item.student.classLevel != null && <small>{t('feed.classShort', { n: item.student.classLevel })}</small>}
      </span>
    </Link>
  );
}

/** Ixcham ro'yxat (boshqaruv paneli uchun): kim, nima ishlagan, natija, qachon. */
export function FeedList({ items }: { items: FeedItem[] }) {
  const { pick, lang } = useI18n();
  return (
    <ul className={styles.list}>
      {items.map((it) => (
        <li key={`${it.kind}-${it.id}`}>
          <StudentLink item={it} />
          <div className={styles.work}>
            <span className={styles.title}>{pick(it.title)}</span>
            <span className={styles.meta}><FeedKindTag kind={it.kind} /><time dateTime={it.createdAt}>{formatDateTime(it.createdAt, lang)}</time></span>
          </div>
          <FeedResult item={it} />
        </li>
      ))}
    </ul>
  );
}
