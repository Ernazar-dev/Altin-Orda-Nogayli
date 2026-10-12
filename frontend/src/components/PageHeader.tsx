import type { ReactNode } from 'react';
import styles from './common.module.scss';

interface Props {
  eyebrow?: string;
  title: string;
  lead?: string;
  actions?: ReactNode;
  back?: ReactNode;
}

export function PageHeader({ eyebrow, title, lead, actions, back }: Props) {
  return (
    <header className={styles.pageHeader}>
      {back}
      <div className={styles.pageHeaderRow}>
        <div>
          {eyebrow && <p className="eyebrow">{eyebrow}</p>}
          <h1>{title}</h1>
          {lead && <p className="muted">{lead}</p>}
        </div>
        {actions && <div className={styles.pageActions}>{actions}</div>}
      </div>
    </header>
  );
}
