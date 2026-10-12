import { Link } from 'react-router-dom';
import { Button, Result } from 'antd';
import { useI18n } from '@/i18n';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';

export default function NotFound() {
  const { t } = useI18n();
  useDocumentTitle('404');
  return (
    <div className="container" style={{ paddingTop: 64 }}>
      <Result
        status="404"
        title={t('error.notFound')}
        subTitle={t('error.notFoundDesc')}
        extra={
          <Link to="/">
            <Button type="primary">{t('nav.home')}</Button>
          </Link>
        }
      />
    </div>
  );
}
