import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Alert, Button, Form, Input, InputNumber } from 'antd';
import { useI18n } from '@/i18n';
import { useAuth } from '@/context/AuthContext';
import { errorMessage } from '@/api/client';
import { OrnamentTexture } from '@/components/Ornament';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import { homeFor } from '@/routes/guards';
import styles from './Auth.module.scss';

interface Values {
  fullName: string;
  username: string;
  password: string;
  classLevel?: number;
}

/** Login qoidasi backend bilan bir xil: a–z, 0–9, nuqta, pastki chiziq, chiziqcha; 3–32 belgi. */
const USERNAME_RE = /^[a-z0-9._-]{3,32}$/i;

export default function Register() {
  const { t } = useI18n();
  const { register } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  useDocumentTitle(t('auth.register'));

  async function onFinish(v: Values) {
    setBusy(true);
    setError(null);
    try {
      const u = await register({
        fullName: v.fullName.trim(),
        username: v.username.trim().toLowerCase(),
        password: v.password,
        classLevel: v.classLevel,
      });
      const from = (location.state as { from?: string } | null)?.from;
      const back = from && from.startsWith('/') && !['/login', '/register'].includes(from);
      navigate(back && u.role === 'STUDENT' ? from : homeFor(u.role), { replace: true });
    } catch (e) {
      setError(errorMessage(e, t('common.error')));
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className={styles.wrap}>
      <OrnamentTexture color="#b99b5d" opacity={0.14} />
      <div className={styles.card}>
        <p className="eyebrow">{t('app.name')}</p>
        <h1>{t('auth.registerTitle')}</h1>
        {error && <Alert type="error" showIcon title={error} style={{ marginBottom: 16 }} />}
        <Form<Values> layout="vertical" onFinish={onFinish} requiredMark={false} initialValues={{ classLevel: 6 }}>
          <Form.Item name="fullName" label={t('auth.fullName')} rules={[{ required: true, min: 3, message: t('common.required') }]}>
            <Input autoComplete="name" size="large" />
          </Form.Item>
          <Form.Item
            name="username"
            label={t('auth.username')}
            extra={t('auth.usernameHint')}
            rules={[
              { required: true, message: t('common.required') },
              { pattern: USERNAME_RE, message: t('auth.usernameInvalid') },
            ]}
          >
            <Input autoComplete="username" autoCapitalize="none" spellCheck={false} size="large" />
          </Form.Item>
          <Form.Item name="password" label={t('auth.password')} rules={[{ required: true, min: 8, message: t('auth.minPassword') }]}>
            <Input.Password autoComplete="new-password" size="large" />
          </Form.Item>
          <Form.Item name="classLevel" label={t('auth.classLevel')}>
            <InputNumber min={1} max={11} size="large" style={{ width: '100%' }} inputMode="numeric" />
          </Form.Item>
          <Button type="primary" htmlType="submit" size="large" block loading={busy}>
            {t('auth.register')}
          </Button>
        </Form>
        <p className={styles.switch}>
          {t('auth.haveAccount')} <Link to="/login">{t('auth.login')}</Link>
        </p>
      </div>
    </div>
  );
}
