import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { App as AntApp, ConfigProvider } from 'antd';
import { antdKaa, antdUz } from '@/i18n/antdLocale';
import { I18nProvider, useI18n } from '@/i18n';
import { AuthProvider } from '@/context/AuthContext';
import { AppRoutes } from '@/routes';
import { theme } from './theme';
import './styles/global.scss';

function Providers() {
  const { lang } = useI18n();
  return (
    <ConfigProvider theme={theme} locale={lang === 'kaa' ? antdKaa : antdUz}>
      <AntApp>
        <AuthProvider>
          <BrowserRouter>
            <AppRoutes />
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
