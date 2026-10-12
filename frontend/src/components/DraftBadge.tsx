import { Tooltip } from 'antd';
import { useI18n } from '@/i18n';
import type { ReviewStatus } from '@/types';
import styles from './common.module.scss';

export function DraftBadge({ status }: { status?: ReviewStatus }) {
  const { t, lang } = useI18n();
  if (status !== 'DRAFT' || lang !== 'kaa') return null;
  return (
    <Tooltip title={t('common.draftHint')}>
      <span className={styles.draft} tabIndex={0}>
        {t('common.draftTranslation')}
      </span>
    </Tooltip>
  );
}
