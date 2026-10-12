import { Link } from 'react-router-dom';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useI18n } from '@/i18n';

export function BackLink({ to, label }: { to: string; label?: string }) {
  const { t } = useI18n();
  return (
    <Link to={to} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, minHeight: 44, marginBottom: 8 }}>
      <ArrowLeftOutlined aria-hidden /> {label ?? t('common.back')}
    </Link>
  );
}
