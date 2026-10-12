import type { ReactNode } from 'react';
import { useI18n } from '@/i18n';
import { ornamentUrl } from '@/utils/ornament';
import styles from './common.module.scss';

interface Props {
  title?: string;
  description?: string;
  action?: ReactNode;
  compact?: boolean;
}

export function EmptyState({ title, description, action, compact }: Props) {
  const { t } = useI18n();
  return (
    <div className={`${styles.empty} ${compact ? styles.emptyCompact : ''}`} role="status">
      <i aria-hidden="true" style={{ backgroundImage: ornamentUrl('horn', '#8a6414') }} />
      <h3>{title ?? t('empty.title')}</h3>
      <p>{description ?? t('empty.desc')}</p>
      {action}
    </div>
  );
}
