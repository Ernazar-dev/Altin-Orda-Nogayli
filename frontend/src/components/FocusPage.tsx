import type { ReactNode } from 'react';
import styles from './FocusPage.module.scss';

/** Test, diagnostika va topshiriq sahifalari uchun: tarkib sahifa o'rtasida, kengaytirilgan ustunda turadi. */
export function FocusPage({ children, wide = false }: { children: ReactNode; wide?: boolean }) {
  return <div className={`${styles.focus} ${wide ? styles.wide : ''}`}>{children}</div>;
}
