import { useEffect, useState } from 'react';
import { Button } from 'antd';
import { MinusOutlined, PlusOutlined, PrinterOutlined, ReadOutlined } from '@ant-design/icons';
import { useI18n } from '@/i18n';
import styles from './ReadingTools.module.scss';

export function ReadingTools() {
  const { t } = useI18n();
  const [size, setSize] = useState(() => {
    try { const n = Number(localStorage.getItem('ao.readingSize')); return n >= 17 && n <= 25 ? n : 19; } catch { return 19; }
  });
  useEffect(() => {
    document.documentElement.style.setProperty('--reading-size', `${size}px`);
    try { localStorage.setItem('ao.readingSize', String(size)); } catch { /* optional preference */ }
  }, [size]);
  return <div className={styles.tools} role="group" aria-label={t('study.reading')}>
    <span><ReadOutlined /> {t('study.reading')}</span>
    <div><Button icon={<MinusOutlined />} aria-label={t('study.smaller')} disabled={size <= 17} onClick={() => setSize(n => n - 2)} /><output aria-live="polite">{size}px</output><Button icon={<PlusOutlined />} aria-label={t('study.larger')} disabled={size >= 25} onClick={() => setSize(n => n + 2)} /><Button icon={<PrinterOutlined />} onClick={() => window.print()}>{t('study.print')}</Button></div>
  </div>;
}
