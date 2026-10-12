import {
  BookOutlined,
  BulbOutlined,
  CompassOutlined,
  EditOutlined,
  ExperimentOutlined,
  SafetyCertificateOutlined,
  LineChartOutlined,
} from '@ant-design/icons';
import type { ReactElement } from 'react';
import { useI18n } from '@/i18n';
import type { I18nKey } from '@/i18n';
import styles from './Chain.module.scss';

const STEPS: { key: I18nKey; icon: ReactElement }[] = [
  { key: 'chain.source', icon: <BookOutlined /> },
  { key: 'chain.idea', icon: <BulbOutlined /> },
  { key: 'chain.value', icon: <SafetyCertificateOutlined /> },
  { key: 'chain.analysis', icon: <ExperimentOutlined /> },
  { key: 'chain.life', icon: <CompassOutlined /> },
  { key: 'chain.task', icon: <EditOutlined /> },
  { key: 'chain.assess', icon: <LineChartOutlined /> },
];

/** Dissertatsiya pedagogik zanjiri: Manba → Fikr → Qadriyat → Tahlil → Hayot → Topshiriq → Baholash. */
export function PedagogicalChain() {
  const { t } = useI18n();
  return (
    <ol className={styles.chain}>
      {STEPS.map((s, i) => (
        <li key={s.key}>
          <span className={styles.node} aria-hidden="true">
            {s.icon}
          </span>
          <span className={styles.num}>{i + 1}</span>
          <span className={styles.label}>{t(s.key)}</span>
        </li>
      ))}
    </ol>
  );
}
