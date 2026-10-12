import { useState } from 'react';
import type { MouseEvent, ReactNode } from 'react';
import { Link, Navigate, Outlet, useLocation } from 'react-router-dom';
import { Button, Modal, Spin } from 'antd';
import type { ButtonProps } from 'antd';
import { LockOutlined } from '@ant-design/icons';
import { useI18n } from '@/i18n';
import { useAuth } from '@/context/AuthContext';
import { OrnamentBand } from './Ornament';
import styles from './AuthGate.module.scss';

/** Mehmonga "kiring yoki ro'yxatdan o'ting" deyuvchi blok. `from` — kirgach qaytadigan manzil. */
export function AuthPrompt({ from }: { from?: string }) {
  const { t } = useI18n();
  const state = from ? { from } : undefined;
  return (
    <div className={styles.prompt}>
      <span className={styles.seal} aria-hidden="true">
        <LockOutlined />
      </span>
      <p className={styles.badge}>{t('gate.badge')}</p>
      <h2>{t('gate.title')}</h2>
      <p className={styles.lead}>{t('gate.lead')}</p>
      <div className={styles.actions}>
        <Link to="/register" state={state}>
          <Button type="primary" size="large">
            {t('auth.register')}
          </Button>
        </Link>
        <Link to="/login" state={state}>
          <Button size="large">{t('auth.login')}</Button>
        </Link>
      </div>
      <OrnamentBand variant="horn" opacity={0.5} className={styles.band} />
    </div>
  );
}

function usePrompt(to: string) {
  const [open, setOpen] = useState(false);
  const { t } = useI18n();
  const modal = (
    <Modal open={open} onCancel={() => setOpen(false)} footer={null} centered width={520} closable aria-label={t('gate.title')}>
      <AuthPrompt from={to} />
    </Modal>
  );
  return { show: () => setOpen(true), modal };
}

/** Kirgan foydalanuvchiga oddiy tugma-havola, mehmonga qulf va kirish oynasi. */
export function GateButton({ to, children, ...rest }: { to: string; children: ReactNode } & ButtonProps) {
  const { user } = useAuth();
  const { show, modal } = usePrompt(to);
  if (user) {
    return (
      <Link to={to}>
        <Button {...rest}>{children}</Button>
      </Link>
    );
  }
  return (
    <>
      <Button {...rest} icon={<LockOutlined />} onClick={show}>
        {children}
      </Button>
      {modal}
    </>
  );
}

/** Ro'yxat elementi uchun havola: mehmon bossa kirish oynasi ochiladi. */
export function GateLink({ to, className, children }: { to: string; className?: string; children: ReactNode }) {
  const { user } = useAuth();
  const { show, modal } = usePrompt(to);
  if (user) {
    return (
      <Link to={to} className={className}>
        {children}
      </Link>
    );
  }
  const onClick = (e: MouseEvent) => {
    e.preventDefault();
    show();
  };
  return (
    <>
      <a href={to} className={className} onClick={onClick} aria-haspopup="dialog">
        {children}
      </a>
      {modal}
    </>
  );
}

/** Marshrut darajasidagi himoya: mehmonga yo'naltirish o'rniga chiroyli "kiring" sahifasi. */
export function AuthWallRoute({ studentOnly = false }: { studentOnly?: boolean }) {
  const { user, loading } = useAuth();
  const { pathname } = useLocation();
  if (loading) {
    return (
      <div className={styles.center}>
        <Spin size="large" />
      </div>
    );
  }
  if (!user) {
    return (
      <div className={styles.wall}>
        <AuthPrompt from={pathname} />
      </div>
    );
  }
  if (studentOnly && user.role === 'TEACHER') return <Navigate to="/teacher" replace />;
  return <Outlet />;
}
