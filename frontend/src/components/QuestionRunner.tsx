import { useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import { Alert, Button, Progress, Radio } from 'antd';
import { ArrowLeftOutlined, ArrowRightOutlined, CheckCircleFilled, CloseCircleFilled } from '@ant-design/icons';
import { useI18n } from '@/i18n';
import type { AnswerSubmission, AttemptResult, LText, Criterion } from '@/types';
import { CriterionBars, ScoreRing } from './Results';
import styles from './QuestionRunner.module.scss';

export interface RunnerQuestion {
  id: string;
  order: number;
  criterion: Criterion;
  question: LText;
  options: { id: string; text: LText }[];
}

interface RunnerProps {
  questions: RunnerQuestion[];
  submitting: boolean;
  error?: string | null;
  onSubmit: (answers: AnswerSubmission[]) => void;
}

/** Bir vaqtda bitta savol; o'ngda jarayon paneli. Klaviatura: 1–4 yoki A–D — tanlash, Enter — keyingisi. */
export function QuestionRunner({ questions, submitting, error, onSubmit }: RunnerProps) {
  const { t, pick } = useI18n();
  const ordered = useMemo(() => [...questions].sort((a, b) => a.order - b.order), [questions]);
  const [idx, setIdx] = useState(0);
  const [picked, setPicked] = useState<Record<string, string>>({});
  const q = ordered[idx];
  const answered = Object.keys(picked).length;
  const allDone = answered === ordered.length;
  const last = idx === ordered.length - 1;

  useEffect(() => {
    if (!q || submitting) return;
    const onKey = (e: KeyboardEvent) => {
      const el = e.target as HTMLElement | null;
      if (el && /^(input|textarea|select)$/i.test(el.tagName) && (el as HTMLInputElement).type !== 'radio') return;
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const n = /^[1-9]$/.test(e.key) ? Number(e.key) - 1 : /^[a-dA-D]$/.test(e.key) ? e.key.toLowerCase().charCodeAt(0) - 97 : -1;
      if (n >= 0 && n < q.options.length) {
        setPicked((p) => ({ ...p, [q.id]: q.options[n].id }));
      } else if (e.key === 'Enter' && picked[q.id] && !last) {
        e.preventDefault();
        setIdx((i) => i + 1);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [q, picked, last, submitting]);

  if (!q) return null;
  const percent = Math.round((answered / ordered.length) * 100);
  return (
    <div className={styles.runner}>
      <section className={styles.main}>
        <div className={styles.qcard}>
          <p className={styles.qmeta}>
            {t('common.question')} {idx + 1} / {ordered.length}
          </p>
          <fieldset className={styles.fieldset}>
            <legend>
              <span className={styles.qnum}>{idx + 1}</span>
              <span className={styles.qtext}>{pick(q.question)}</span>
            </legend>
            <Radio.Group
              disabled={submitting}
              className={styles.options}
              value={picked[q.id]}
              onChange={(e) => setPicked((p) => ({ ...p, [q.id]: e.target.value as string }))}
            >
              {q.options.map((o, i) => (
                <Radio key={o.id} value={o.id} className={`${styles.option} ${picked[q.id] === o.id ? styles.selected : ''}`}>
                  <span className={styles.letter}>{String.fromCharCode(65 + i)}</span>
                  <span className={styles.optText}>{pick(o.text)}</span>
                </Radio>
              ))}
            </Radio.Group>
          </fieldset>
          {error && <Alert type="error" showIcon title={error} style={{ marginTop: 16 }} />}
          <div className={styles.nav}>
            <Button size="large" icon={<ArrowLeftOutlined />} onClick={() => setIdx((n) => n - 1)} disabled={idx === 0}>
              {t('common.prev')}
            </Button>
            {!last ? (
              <Button size="large" type="primary" onClick={() => setIdx((n) => n + 1)} disabled={!picked[q.id]}>
                {t('common.next')} <ArrowRightOutlined />
              </Button>
            ) : (
              <Button
                size="large"
                type="primary"
                loading={submitting}
                disabled={!allDone}
                onClick={() => onSubmit(ordered.map((x) => ({ questionId: x.id, optionId: picked[x.id] })))}
              >
                {t('test.submit')}
              </Button>
            )}
          </div>
          {last && !allDone && <p className={`muted ${styles.warn}`}>{t('test.answerAll')}</p>}
        </div>
      </section>

      <aside className={styles.side} aria-label={t('run.progress')}>
        <div className={styles.sideCard}>
          <h2>{t('run.progress')}</h2>
          <p className={styles.bigCount}>
            <strong>{answered}</strong> / {ordered.length}
          </p>
          <Progress
            percent={percent}
            showInfo={false}
            size="small"
            strokeColor="var(--c-gold)"
            aria-label={`${answered} / ${ordered.length} ${t('common.answered')}`}
          />
          <p className={styles.answeredOf}>{t('run.answeredOf', { done: answered, total: ordered.length })}</p>
          <ol className={styles.dots} aria-label={t('common.question')}>
            {ordered.map((x, i) => (
              <li key={x.id}>
                <button
                  type="button"
                  aria-label={`${t('common.question')} ${i + 1}`}
                  aria-current={i === idx ? 'step' : undefined}
                  disabled={submitting}
                  className={`${i === idx ? styles.dotActive : ''} ${picked[x.id] ? styles.dotDone : ''}`}
                  onClick={() => setIdx(i)}
                >
                  {i + 1}
                </button>
              </li>
            ))}
          </ol>
          <ul className={styles.legend}>
            <li><i className={styles.lgNow} />{t('run.legendNow')}</li>
            <li><i className={styles.lgDone} />{t('run.legendDone')}</li>
            <li><i className={styles.lgTodo} />{t('run.legendTodo')}</li>
          </ul>
          <p className={styles.keys}>{t('run.hint')}</p>
        </div>
      </aside>
    </div>
  );
}

interface ResultProps {
  result: AttemptResult;
  questions: RunnerQuestion[];
  title?: string;
  /** Natija ostidagi tugmalar (qayta topshirish va h.k.). */
  actions?: ReactNode;
}

/** Natija: chapda ball va mezonlar, o'ngda javoblar tahlili. */
export function ResultView({ result, questions, title, actions }: ResultProps) {
  const { t, pick } = useI18n();
  const ordered = [...questions].sort((a, b) => a.order - b.order);
  return (
    <div className={styles.result}>
      {title && <h2 className={styles.resultTitle}>{title}</h2>}
      <div className={styles.resultGrid}>
        <aside className={styles.resSide}>
          <div className={styles.scoreCard}>
            <ScoreRing correct={result.correct} total={result.total} percent={result.percent} level={result.level} />
            <ul className={styles.counts}>
              <li>
                <CheckCircleFilled style={{ color: 'var(--c-ok)' }} aria-hidden /> {t('test.score')}: <strong>{result.correct}</strong>
              </li>
              <li>
                <CloseCircleFilled style={{ color: 'var(--c-bad)' }} aria-hidden /> {t('test.wrongAnswers')}:{' '}
                <strong>{result.total - result.correct}</strong>
              </li>
              <li>
                {t('test.total')}: <strong>{result.percent}%</strong>
              </li>
            </ul>
            {actions && <div className={styles.resActions}>{actions}</div>}
          </div>
          <h3>{t('test.byCriterion')}</h3>
          <CriterionBars data={result.byCriterion} />
        </aside>
        <section className={styles.resMain}>
          <h3>{t('test.review')}</h3>
          <ol className={styles.review}>
            {ordered.map((q) => {
              const a = result.answers.find((x) => x.questionId === q.id);
              const mine = q.options.find((o) => o.id === a?.optionId);
              const right = q.options.find((o) => o.id === a?.correctOptionId);
              return (
                <li key={q.id} className={a?.isCorrect ? styles.ok : styles.bad}>
                  <p className={styles.rq}>
                    {a?.isCorrect ? <CheckCircleFilled aria-label={t('common.correct')} /> : <CloseCircleFilled aria-label={t('common.wrong')} />}{' '}
                    {pick(q.question)}
                  </p>
                  <p>
                    {t('test.yourAnswer')}: <strong>{mine ? pick(mine.text) : '–'}</strong>
                  </p>
                  {!a?.isCorrect && right && (
                    <p>
                      {t('common.correctAnswer')}: <strong>{pick(right.text)}</strong>
                    </p>
                  )}
                </li>
              );
            })}
          </ol>
        </section>
      </div>
    </div>
  );
}
