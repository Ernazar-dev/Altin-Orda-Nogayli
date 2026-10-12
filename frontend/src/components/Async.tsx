import type { ReactNode } from 'react';
import { Button, Result, Skeleton } from 'antd';
import { useI18n } from '@/i18n';
import type { AsyncState } from '@/hooks/useAsync';
import styles from './common.module.scss';

interface Props<T> {
  state: AsyncState<T>;
  children: (data: T) => ReactNode;
  skeleton?: ReactNode;
  isEmpty?: (data: T) => boolean;
  empty?: ReactNode;
}

export function CardsSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid-auto" aria-busy="true">
      {Array.from({ length: count }, (_, i) => (
        <div key={i} className={styles.skelCard}>
          <Skeleton active avatar paragraph={{ rows: 3 }} />
        </div>
      ))}
    </div>
  );
}

export function PageSkeleton() {
  return (
    <div aria-busy="true">
      <Skeleton active title={{ width: '40%' }} paragraph={{ rows: 1 }} />
      <Skeleton active paragraph={{ rows: 6 }} />
    </div>
  );
}

/** Yuklanish / xato / bo'sh holatlarni bir joyda hal qiladi. */
export function Async<T>({ state, children, skeleton, isEmpty, empty }: Props<T>) {
  const { t } = useI18n();
  if (state.loading && state.data === null) return <>{skeleton ?? <PageSkeleton />}</>;
  if (state.error) {
    return (
      <Result
        status="warning"
        title={t('error.load')}
        extra={
          <Button type="primary" onClick={state.reload}>
            {t('common.retry')}
          </Button>
        }
      />
    );
  }
  if (state.data === null) return null;
  if (isEmpty?.(state.data)) return <>{empty}</>;
  return <>{children(state.data)}</>;
}
