import { createContext, useContext, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import { Segmented } from 'antd';
import { BulbOutlined } from '@ant-design/icons';
import { useI18n } from '@/i18n';
import styles from './forms.module.scss';

export type LangMode = 'both' | 'uz' | 'kaa';

interface LangModeValue {
  mode: LangMode;
  setMode: (m: LangMode) => void;
}

const LangModeContext = createContext<LangModeValue>({ mode: 'both', setMode: () => undefined });

/** Muharrir ichidagi barcha ikki tilli maydonlar qaysi tilda ko'rsatilishini boshqaradi. */
export function useLangMode(): LangMode {
  return useContext(LangModeContext).mode;
}

export function LangModeProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<LangMode>('both');
  const value = useMemo(() => ({ mode, setMode }), [mode]);
  return <LangModeContext.Provider value={value}>{children}</LangModeContext.Provider>;
}

/** «Ikkala til / O'zbekcha / Qoraqalpoqcha» almashtirgichi. */
export function LangModeBar() {
  const { t } = useI18n();
  const { mode, setMode } = useContext(LangModeContext);
  return (
    <div className={styles.langBar}>
      <Segmented<LangMode>
        value={mode}
        onChange={setMode}
        options={[
          { value: 'both', label: t('b.langBoth') },
          { value: 'uz', label: t('crud.langUz') },
          { value: 'kaa', label: t('crud.langKaa') },
        ]}
      />
      <span className={styles.langHint}>{t('b.langHint')}</span>
    </div>
  );
}

/** Qisqa «qanday to'ldiriladi» yo'riqnomasi: raqamlangan 3 qadam. */
export function BuilderHint({ steps }: { steps: string[] }) {
  const { t } = useI18n();
  return (
    <div className={styles.hint}>
      <strong>
        <BulbOutlined /> {t('b.hintTitle')}
      </strong>
      <ol>
        {steps.map((s, i) => (
          <li key={s}>
            <span>{i + 1}</span>
            {s}
          </li>
        ))}
      </ol>
    </div>
  );
}

interface CardPickerProps<T extends string> {
  value?: T;
  onChange?: (v: T) => void;
  items: { value: T; title: string; desc: string }[];
}

/** Select o'rniga: har variant sarlavha va izoh bilan alohida kartada (Form.Item ichida ishlatiladi). */
export function CardPicker<T extends string>({ value, onChange, items }: CardPickerProps<T>) {
  return (
    <div className={styles.typeGrid} role="radiogroup">
      {items.map((it) => (
        <button
          key={it.value}
          type="button"
          role="radio"
          aria-checked={value === it.value}
          className={`${styles.typeCard} ${value === it.value ? styles.typeOn : ''}`}
          onClick={() => onChange?.(it.value)}
        >
          <strong>{it.title}</strong>
          <small>{it.desc}</small>
        </button>
      ))}
    </div>
  );
}

/** Forma bo'limi: sarlavhali karta. */
export function BuilderSection({ title, extra, children }: { title: string; extra?: ReactNode; children: ReactNode }) {
  return (
    <section className={styles.sec}>
      <header>
        <h3>{title}</h3>
        {extra}
      </header>
      {children}
    </section>
  );
}
