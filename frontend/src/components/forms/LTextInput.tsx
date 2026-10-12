import { Form, Input } from 'antd';
import type { Rule } from 'antd/es/form';
import { useI18n } from '@/i18n';
import type { LText } from '@/types';
import { useLangMode } from './Builder';
import styles from './forms.module.scss';

interface InputProps {
  value?: LText;
  onChange?: (v: LText) => void;
  rows?: number;
  multiline?: boolean;
  /** Ixcham: sarlavhasiz, til nomi placeholder'da. */
  compact?: boolean;
}

/** Ikki tilli (uz / kaa) kiritish: tanlangan rejimga qarab ikkala yoki bitta til ko'rsatiladi. */
export function LTextInput({ value, onChange, rows = 4, multiline = true, compact = false }: InputProps) {
  const { t } = useI18n();
  const mode = useLangMode();
  const set = (k: 'uz' | 'kaa', v: string) => onChange?.({ ...value, [k]: v });
  const langs = (['uz', 'kaa'] as const).filter((k) => mode === 'both' || mode === k);
  return (
    <div className={`${styles.ltext} ${langs.length === 1 ? styles.single : ''} ${compact ? styles.compact : ''}`}>
      {langs.map((k) => {
        const label = t(k === 'uz' ? 'crud.langUz' : 'crud.langKaa');
        const tag = k === 'uz' ? 'UZ' : 'QQ';
        const inline = compact && !multiline;
        return (
          <label key={k}>
            {!inline && <span>{label}</span>}
            {multiline ? (
              <Input.TextArea
                rows={rows}
                autoSize={{ minRows: rows, maxRows: 14 }}
                lang={k === 'uz' ? 'uz' : 'kk-Latn'}
                aria-label={label}
                value={value?.[k] ?? ''}
                onChange={(e) => set(k, e.target.value)}
              />
            ) : (
              <Input
                prefix={inline ? <span className={styles.tag}>{tag}</span> : undefined}
                lang={k === 'uz' ? 'uz' : 'kk-Latn'}
                placeholder={inline ? label : undefined}
                aria-label={label}
                value={value?.[k] ?? ''}
                onChange={(e) => set(k, e.target.value)}
              />
            )}
          </label>
        );
      })}
    </div>
  );
}

interface ItemProps {
  name: string | (string | number)[];
  label?: string;
  rows?: number;
  multiline?: boolean;
  required?: boolean;
  compact?: boolean;
}

export function LTextField({ name, label, rows, multiline, required = true, compact = false }: ItemProps) {
  const { t } = useI18n();
  const rules: Rule[] = required
    ? [
        {
          validator: (_, v: LText | undefined) =>
            v?.uz?.trim() || v?.kaa?.trim() ? Promise.resolve() : Promise.reject(new Error(t('common.required'))),
        },
      ]
    : [];
  return (
    <Form.Item name={name} label={label} rules={rules} required={required} className={compact ? styles.compactItem : undefined}>
      <LTextInput rows={rows} multiline={multiline} compact={compact} />
    </Form.Item>
  );
}
