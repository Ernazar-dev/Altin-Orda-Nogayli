import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Alert, Button } from 'antd';
import { CheckCircleFilled, CloseCircleFilled } from '@ant-design/icons';
import { useI18n } from '@/i18n';
import { activitiesApi, sourcesApi } from '@/api/resources';
import { errorMessage } from '@/api/client';
import type { ActivityAttemptResult } from '@/types';
import { useAsync } from '@/hooks/useAsync';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import { Async } from '@/components/Async';
import { BackLink } from '@/components/BackLink';
import { FocusPage } from '@/components/FocusPage';
import { PageHeader } from '@/components/PageHeader';
import { SourceLayers } from '@/components/SourceLayers';
import styles from './Activities.module.scss';

export default function ActivityPlay() {
  const { id = '' } = useParams();
  const { t, pick } = useI18n();
  const state = useAsync(() => activitiesApi.get(id), [id]);
  const all = useAsync(() => activitiesApi.list(), []);
  const src = useAsync(async () => {
    const a = await activitiesApi.get(id);
    if (a.source) return a.source;
    return a.sourceId ? sourcesApi.get(a.sourceId) : null;
  }, [id]);
  const [chosen, setChosen] = useState<string | null>(null);
  const [result, setResult] = useState<ActivityAttemptResult | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  useDocumentTitle(state.data ? pick(state.data.title) : t('nav.activities'));

  async function check() {
    if (!chosen) return;
    setBusy(true);
    setError(null);
    try {
      setResult(await activitiesApi.attempt(id, chosen));
    } catch (e) {
      setError(errorMessage(e, t('common.error')));
    } finally {
      setBusy(false);
    }
  }

  function reset() {
    setChosen(null);
    setResult(null);
    setError(null);
  }

  return (
    <Async state={state}>
      {(a) => {
        const list = (all.data ?? []).filter((x) => x.type === a.type);
        const next = list[(list.findIndex((x) => x.id === a.id) + 1) % Math.max(list.length, 1)];
        const hasNext = next && next.id !== a.id;
        const explanation = result ? pick(result.explanation) || pick(a.options.find((o) => o.id === result.correctOptionId)?.explanation) : '';
        const chosenNote = result && !result.isCorrect ? pick(result.chosenExplanation) : '';
        return (
          <FocusPage wide={Boolean(src.data)}>
          <PageHeader
            back={<BackLink to="/activities" label={t('nav.activities')} />}
            eyebrow={t(`activity.type.${a.type}` as const)}
            title={pick(a.title)}
            lead={t('activity.noScore')}
          />
          <div className={src.data ? styles.playGrid : styles.playSolo}>
          {src.data && (
            <div className={styles.playSource}>
              <p className={styles.stepLabel}>{t('act.readFirst')}</p>
              <SourceLayers source={src.data} />
            </div>
          )}
          <div className={styles.play}>
            {src.data && <p className={styles.stepLabel}>{t('act.thenAnswer')}</p>}
            <p className={styles.prompt}>{pick(a.prompt)}</p>
            <fieldset className={styles.options} disabled={Boolean(result)}>
              <legend className="sr-only">{t('activity.chooseOne')}</legend>
              {a.options.map((o, i) => {
                const isRight = result?.correctOptionId === o.id;
                const isWrongPick = result && chosen === o.id && !result.isCorrect;
                return (
                  <label
                    key={o.id}
                    className={`${styles.option} ${chosen === o.id ? styles.chosen : ''} ${isRight ? styles.right : ''} ${isWrongPick ? styles.wrong : ''}`}
                  >
                    <input type="radio" name="opt" value={o.id} checked={chosen === o.id} onChange={() => setChosen(o.id)} />
                    <span className={styles.letter}>{String.fromCharCode(65 + i)}</span>
                    <span>{pick(o.text)}</span>
                    {isRight && <CheckCircleFilled className={styles.mark} style={{ color: 'var(--c-ok)' }} aria-label={t('common.correct')} />}
                    {isWrongPick && <CloseCircleFilled className={styles.mark} style={{ color: 'var(--c-bad)' }} aria-label={t('common.wrong')} />}
                  </label>
                );
              })}
            </fieldset>
            {error && <Alert type="error" showIcon title={error} />}
            {!result ? (
              <div className={styles.actions}>
                <Button type="primary" size="large" disabled={!chosen} loading={busy} onClick={check}>
                  {t('activity.check')}
                </Button>
              </div>
            ) : (
              <div role="status" aria-live="polite" className={`${styles.feedback} ${result.isCorrect ? styles.fbOk : styles.fbBad}`}>
                <h2>
                  {result.isCorrect ? <CheckCircleFilled /> : <CloseCircleFilled />}
                  {result.isCorrect ? t('common.correct') : t('common.wrong')}
                </h2>
                {chosenNote && (
                  <div className={styles.note}>
                    <h3>{t('test.yourAnswer')}</h3>
                    <p>{chosenNote}</p>
                  </div>
                )}
                {explanation && (
                  <div className={styles.note}>
                    <h3>{t('activity.pedagogicalNote')}</h3>
                    <p>{explanation}</p>
                  </div>
                )}
                {result.modernExample && pick(result.modernExample) && (
                  <div className={styles.note}>
                    <h3>{t('activity.modernExample')}</h3>
                    <p>{pick(result.modernExample)}</p>
                  </div>
                )}
                <div className={styles.actions}>
                  <Button onClick={reset}>{t('test.retake')}</Button>
                  {hasNext && (
                    <Link to={`/activities/${next.id}`} onClick={reset}>
                      <Button type="primary">{t('activity.tryNext')}</Button>
                    </Link>
                  )}
                </div>
              </div>
            )}
          </div>
          </div>
          </FocusPage>
        );
      }}
    </Async>
  );
}
