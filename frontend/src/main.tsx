import React, { lazy, Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { App as AntApp, ConfigProvider } from 'antd';
import { antdKaa, antdUz } from '@/i18n/antdLocale';
import { I18nProvider, useI18n } from '@/i18n';
import { periodsApi, thinkersApi } from '@/api/resources';
import { AuthProvider } from '@/context/AuthContext';
import { AppRoutes } from '@/routes';
import { theme } from './theme';
import './styles/global.scss';

// AI yordamchi sahifa chizilgandan keyin alohida bo'lak sifatida yuklanadi: asosiy yuklanishni sekinlashtirmaydi.
const AssistantWidget = lazy(() => import('@/components/AssistantWidget').then((m) => ({ default: m.AssistantWidget })));

// Bosh sahifa va ko'p sahifalar ishlatadigan ro'yxatlar dastur ochilishi bilan oldindan so'raladi (javob keshga tushadi).
void periodsApi.list().catch(() => undefined);
void thinkersApi.list().catch(() => undefined);

function Providers() {
  const { lang } = useI18n();
  return (
    <ConfigProvider theme={theme} locale={lang === 'kaa' ? antdKaa : antdUz}>
      <AntApp>
        <AuthProvider>
          <BrowserRouter>
            <AppRoutes />
            <Suspense fallback={null}><AssistantWidget /></Suspense>
          </BrowserRouter>
        </AuthProvider>
      </AntApp>
    </ConfigProvider>
  );
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <I18nProvider>
      <Providers />
    </I18nProvider>
  </React.StrictMode>,
);
