import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Alert, Button, Form, Input } from 'antd';
import { useI18n } from '@/i18n';
import { useAuth } from '@/context/AuthContext';
import { errorMessage } from '@/api/client';
import { OrnamentTexture } from '@/components/Ornament';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import { homeFor } from '@/routes/guards';
import styles from './Auth.module.scss';

interface Values {
  username: string;
  password: string;
}

export default function Login() {
  const { t } = useI18n();
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [form] = Form.useForm<Values>();
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  useDocumentTitle(t('auth.login'));

  async function onFinish(v: Values) {
    setBusy(true);
    setError(null);
    try {
      const u = await login(v.username.trim(), v.password);
      const from = (location.state as { from?: string } | null)?.from;
      const back = from && from.startsWith('/') && !['/login', '/register'].includes(from);
      navigate(back && (u.role === 'STUDENT' || !from.startsWith('/dashboard')) ? from : homeFor(u.role), { replace: true });
    } catch (e) {
      setError(errorMessage(e, t('auth.invalid')));
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className={styles.wrap}>
      <OrnamentTexture color="#b99b5d" opacity={0.14} />
      <div className={styles.card}>
        <p className="eyebrow">{t('app.name')}</p>
        <h1>{t('auth.loginTitle')}</h1>
        {error && <Alert type="error" showIcon title={error} style={{ marginBottom: 16 }} />}
        <Form form={form} layout="vertical" onFinish={onFinish} requiredMark={false} autoComplete="on">
          <Form.Item name="username" label={t('auth.username')} rules={[{ required: true, message: t('common.required') }]}>
            <Input autoComplete="username" autoCapitalize="none" spellCheck={false} size="large" />
          </Form.Item>
          <Form.Item name="password" label={t('auth.password')} rules={[{ required: true, message: t('common.required') }]}>
            <Input.Password autoComplete="current-password" size="large" />
          </Form.Item>
          <Button type="primary" htmlType="submit" size="large" block loading={busy}>
            {t('auth.login')}
          </Button>
        </Form>
        <p className={styles.switch}>
          {t('auth.noAccount')} <Link to="/register">{t('auth.register')}</Link>
        </p>
      </div>
    </div>
  );
}
