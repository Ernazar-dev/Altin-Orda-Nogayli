import { useEffect, useState } from 'react';
import { Button, Form, Popconfirm, Select, Tooltip } from 'antd';
import type { FormInstance } from 'antd';
import {
  ArrowDownOutlined,
  ArrowUpOutlined,
  CheckCircleFilled,
  CheckOutlined,
  CopyOutlined,
  DeleteOutlined,
  ExclamationCircleFilled,
  PlusOutlined,
} from '@ant-design/icons';
import { useI18n } from '@/i18n';
import { CRITERIA } from '@/types';
import type { LText } from '@/types';
import { LTextField } from './LTextInput';
import styles from './forms.module.scss';

type Path = (string | number)[];

interface OptValue {
  text?: LText;
  isCorrect?: boolean;
  explanation?: LText;
}
interface QValue {
  question?: LText;
  criterion?: string;
  options?: OptValue[];
}

const filled = (l?: LText | null) => Boolean(l?.uz?.trim() || l?.kaa?.trim());

type Issue = 'noQuestion' | 'fewOptions' | 'emptyOption' | 'noCorrect';

/** Savol to'liq to'ldirilganini tekshiradi (forma saqlashdan oldin ham ko'rsatib turadi). */
function issuesOf(q?: QValue): Issue[] {
  const out: Issue[] = [];
  const opts = q?.options ?? [];
  if (!filled(q?.question)) out.push('noQuestion');
  if (opts.length < 2) out.push('fewOptions');
  if (opts.some((o) => !filled(o?.text))) out.push('emptyOption');
  if (opts.filter((o) => o?.isCorrect).length !== 1) out.push('noCorrect');
  return out;
}

const blankOption = (): OptValue => ({ isCorrect: false, text: {} });
const blankQuestion = (): QValue => ({ criterion: 'COGNITIVE', options: [blankOption(), blankOption(), blankOption(), blankOption()] });

/** Harf nishoni: bosilsa shu variant to'g'ri javob bo'ladi. */
function CorrectPick({ checked, onChange, letter, label, onPick }: { checked?: boolean; onChange?: (v: boolean) => void; letter: string; label: string; onPick: () => void }) {
  return (
    <Tooltip title={label}>
      <button
        type="button"
        role="radio"
        aria-checked={Boolean(checked)}
        aria-label={`${letter}: ${label}`}
        className={`${styles.pick} ${checked ? styles.pickOn : ''}`}
        onClick={() => {
          onChange?.(true);
          onPick();
        }}
      >
        {checked ? <CheckOutlined /> : letter}
      </button>
    </Tooltip>
  );
}

interface OptionsProps {
  /** Variantlar ro'yxatining to'liq yo'li (Form.List ichida nisbiy nom ham mumkin). */
  listName: Path | string;
  absolute: Path;
  form: FormInstance;
  withExplanation?: boolean;
}

/** Variantlar: harf nishonini bosib to'g'ri javob belgilanadi (aynan bitta). */
export function OptionsEditor({ listName, absolute, form, withExplanation }: OptionsProps) {
  const { t } = useI18n();
  const [openExplain, setOpenExplain] = useState<Record<string, boolean>>({});
  return (
    <Form.List
      name={listName}
      rules={[
        {
          validator: async (_, opts: { isCorrect?: boolean }[] | undefined) => {
            if (!opts || opts.length < 2) throw new Error(t('activity.minOptions'));
            if (opts.filter((o) => o?.isCorrect).length !== 1) throw new Error(t('activity.oneCorrect'));
          },
        },
      ]}
    >
      {(fields, { add, remove }, { errors }) => (
        <div className={styles.opts}>
          <p className={styles.optsHint}>{t('b.markCorrect')}</p>
          {fields.map((f, i) => {
            const letter = String.fromCharCode(65 + i);
            const ex = form.getFieldValue([...absolute, i, 'explanation']) as LText | undefined;
            const explainOpen = openExplain[f.key] ?? Boolean(ex?.uz || ex?.kaa);
            return (
              <div key={f.key} className={styles.optItem}>
                <Form.Item name={[f.name, 'isCorrect']} valuePropName="checked" noStyle>
                  <CorrectPick
                    letter={letter}
                    label={t('b.markCorrect')}
                    onPick={() => {
                      fields.forEach((_, j) => {
                        if (j !== i) form.setFieldValue([...absolute, j, 'isCorrect'], false);
                      });
                    }}
                  />
                </Form.Item>
                <div className={styles.optBody}>
                  <LTextField name={[f.name, 'text']} compact multiline={false} />
                  {withExplanation && (
                    <>
                      {explainOpen ? (
                        <div className={styles.explain}>
                          <span>{t('b.explainLabel')}</span>
                          <LTextField name={[f.name, 'explanation']} compact rows={2} required={false} />
                        </div>
                      ) : null}
                      <Button type="link" size="small" className={styles.explainBtn} onClick={() => setOpenExplain((m) => ({ ...m, [f.key]: !explainOpen }))}>
                        {explainOpen ? t('b.explainHide') : t('b.explain')}
                      </Button>
                    </>
                  )}
                </div>
                <Button type="text" danger icon={<DeleteOutlined />} disabled={fields.length <= 2} onClick={() => remove(f.name)} aria-label={t('common.delete')} />
              </div>
            );
          })}
          <Form.ErrorList errors={errors} />
          <Button type="dashed" icon={<PlusOutlined />} onClick={() => add(blankOption())}>
            {t('test.addOption')}
          </Button>
        </div>
      )}
    </Form.List>
  );
}

interface QuestionsProps {
  form: FormInstance;
  name?: string;
}

/**
 * Test va diagnostika savollari muharriri: chapda savollar ro'yxati (holati bilan), o'ngda tanlangan savol.
 * Har savolga 4 ta variant avtomatik qo'shiladi; to'g'ri javob harfni bosib belgilanadi.
 */
export function QuestionsEditor({ form, name = 'questions' }: QuestionsProps) {
  const { t, pick } = useI18n();
  const [active, setActive] = useState(0);
  const watched = Form.useWatch(name, form) as QValue[] | undefined;
  const list = watched ?? [];

  useEffect(() => {
    const onInvalid = (e: Event) => {
      const errs = (e as CustomEvent<{ name: Path }[]>).detail ?? [];
      const hit = errs.find((x) => x.name[0] === name && typeof x.name[1] === 'number');
      if (hit) setActive(hit.name[1] as number);
    };
    window.addEventListener('crud-invalid', onInvalid);
    return () => window.removeEventListener('crud-invalid', onInvalid);
  }, [name]);

  return (
    <Form.List
      name={name}
      rules={[
        {
          validator: async (_, v: unknown[] | undefined) => {
            if (!v || v.length === 0) throw new Error(t('test.noQuestions'));
          },
        },
      ]}
    >
      {(fields, { add, remove, move }, { errors }) => {
        const current = Math.min(active, Math.max(fields.length - 1, 0));
        const problems = list.filter((q) => issuesOf(q).length > 0).length;
        const addAt = (value?: QValue, at?: number) => {
          add(value ?? blankQuestion(), at);
          setActive(at ?? fields.length);
        };
        return (
          <div className={styles.qb}>
            <aside className={styles.qList} aria-label={t('test.questionsEditor')}>
              <div className={styles.qListHead}>
                <strong>{t('b.questionsCount', { count: fields.length })}</strong>
              </div>
              <ol>
                {fields.map((f, i) => {
                  const q = list[i];
                  const issues = issuesOf(q);
                  const text = pick(q?.question);
                  return (
                    <li key={f.key}>
                      <button type="button" className={`${styles.qItem} ${i === current ? styles.qActive : ''}`} onClick={() => setActive(i)} aria-current={i === current}>
                        <span className={styles.qNo}>{i + 1}</span>
                        <span className={styles.qExcerpt}>{text ? text.slice(0, 80) : <em>{t('b.status.noQuestion')}</em>}</span>
                        {issues.length ? (
                          <Tooltip title={issues.map((k) => t(`b.status.${k}` as const)).join(', ')}>
                            <ExclamationCircleFilled className={styles.bad} />
                          </Tooltip>
                        ) : (
                          <CheckCircleFilled className={styles.good} />
                        )}
                      </button>
                    </li>
                  );
                })}
              </ol>
              <Button block type="dashed" icon={<PlusOutlined />} onClick={() => addAt()}>
                {t('test.addQuestion')}
              </Button>
              {fields.length > 0 && <p className={problems ? styles.qBad : styles.qGood}>{problems ? t('b.problems', { count: problems }) : t('b.allGood')}</p>}
            </aside>

            <div className={styles.qEditor}>
              {fields.length === 0 && (
                <div className={styles.qEmpty}>
                  <p>{t('b.empty')}</p>
                  <Button type="primary" icon={<PlusOutlined />} onClick={() => addAt()}>
                    {t('test.addQuestion')}
                  </Button>
                </div>
              )}
              {fields.map((f, i) => (
                <div key={f.key} className={`${styles.qBlock} ${i === current ? '' : styles.qHidden}`}>
                  <div className={styles.qHead}>
                    <span>
                      {t('common.question')} {i + 1}
                    </span>
                    <span className={styles.qTools}>
                      <Tooltip title={t('b.moveUp')}>
                        <Button type="text" icon={<ArrowUpOutlined />} disabled={i === 0} onClick={() => { move(i, i - 1); setActive(i - 1); }} aria-label={t('b.moveUp')} />
                      </Tooltip>
                      <Tooltip title={t('b.moveDown')}>
                        <Button type="text" icon={<ArrowDownOutlined />} disabled={i === fields.length - 1} onClick={() => { move(i, i + 1); setActive(i + 1); }} aria-label={t('b.moveDown')} />
                      </Tooltip>
                      <Tooltip title={t('b.duplicate')}>
                        <Button type="text" icon={<CopyOutlined />} onClick={() => addAt(structuredClone(form.getFieldValue([name, i]) as QValue), i + 1)} aria-label={t('b.duplicate')} />
                      </Tooltip>
                      <Popconfirm title={t('common.confirmDelete')} okText={t('common.yes')} cancelText={t('common.no')} onConfirm={() => { remove(f.name); setActive(Math.max(0, i - 1)); }}>
                        <Button type="text" danger icon={<DeleteOutlined />} aria-label={t('b.deleteQuestion')} />
                      </Popconfirm>
                    </span>
                  </div>
                  <LTextField name={[f.name, 'question']} label={t('b.questionText')} rows={3} />
                  <OptionsEditor listName={[f.name, 'options']} absolute={[name, f.name, 'options']} form={form} />
                  <Form.Item name={[f.name, 'criterion']} label={t('test.criterion')} rules={[{ required: true, message: t('common.required') }]} className={styles.criterion}>
                    <Select options={CRITERIA.map((c) => ({ value: c, label: t(`criterion.${c}` as const) }))} />
                  </Form.Item>
                </div>
              ))}
              <Form.ErrorList errors={errors} />
            </div>
          </div>
        );
      }}
    </Form.List>
  );
}
