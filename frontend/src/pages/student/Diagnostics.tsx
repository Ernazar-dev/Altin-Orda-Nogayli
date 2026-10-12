import { useI18n } from '@/i18n';
import { useAuth } from '@/context/AuthContext';
import { resultsApi } from '@/api/resources';
import { GateButton } from '@/components/AuthGate';
import { useAsync } from '@/hooks/useAsync';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import { Async } from '@/components/Async';
import { PageHeader } from '@/components/PageHeader';
import { LevelTag } from '@/components/Results';
import { formatDate } from '@/utils/format';
import type { DiagnosticKind, DiagnosticResult, ResultsSummary } from '@/types';
import styles from './Tests.module.scss';

/** Mehmon uchun bo'sh natijalar: ro'yxat ko'rinadi, boshlash esa kirishni so'raydi. */
const GUEST_ME = { tests: [], diagnostics: [], growth: null } as unknown as ResultsSummary;

export default function Diagnostics() {
  const { t, lang } = useI18n();
  const { user } = useAuth();
  useDocumentTitle(t('nav.diagnostics'));
  const state = useAsync(() => (user?.role === 'STUDENT' ? resultsApi.me() : Promise.resolve(GUEST_ME)), [user?.id]);

  return (
    <>
      <PageHeader eyebrow={t('nav.practice')} title={t('nav.diagnostics')} lead={t('diag.noteDesc')} />
      <Async state={state}>
        {(me) => {
          const last = (k: DiagnosticKind): DiagnosticResult | undefined =>
            [...me.diagnostics].reverse().find((d) => d.kind === k || d.diagnostic?.kind === k);
          const init = last('INITIAL');
          const fin = last('FINAL');
          const growth = me.growth ?? (init && fin ? { initial: init.percent, final: fin.percent, delta: fin.percent - init.percent } : null);
          const cards: { kind: DiagnosticKind; title: string; desc: string; res?: DiagnosticResult; slug: string }[] = [
            { kind: 'INITIAL', title: t('diag.initial'), desc: t('diag.initialDesc'), res: init, slug: 'initial' },
            { kind: 'FINAL', title: t('diag.final'), desc: t('diag.finalDesc'), res: fin, slug: 'final' },
          ];
          return (
            <>
              {!init && <p className="muted">{t('diag.recommend')}</p>}
              <div className={styles.hub}>
                {cards.map((c) => (
                  <section key={c.kind} className={styles.diag} aria-labelledby={`d-${c.slug}`}>
                    <h2 id={`d-${c.slug}`}>{c.title}</h2>
                    <p className="muted">{c.desc}</p>
                    {c.res ? (
                      <>
                        <p className={styles.big}>{c.res.percent}%</p>
                        <p>
                          {c.res.correct} / {c.res.total} · <LevelTag level={c.res.level} /> · {formatDate(c.res.createdAt, lang)}
                        </p>
                      </>
                    ) : (
                      <p>{t('diag.notTaken')}</p>
                    )}
                    <GateButton
                      to={`/diagnostics/${c.slug}`}
                      type="primary"
                      size="large"
                      disabled={c.kind === 'FINAL' && !init && Boolean(user)}
                      title={c.kind === 'FINAL' && !init && user ? t('diag.takeInitialFirst') : undefined}
                    >
                      {c.res ? t('test.retake') : t('test.start')}
                    </GateButton>
                  </section>
                ))}
              </div>
              {growth && (
                <section className={styles.growth} aria-labelledby="gr">
                  <h2 id="gr">{t('diag.growth')}</h2>
                  <div>
                    <strong>{growth.initial}%</strong>
                    <span>{t('diag.initialShort')}</span>
                  </div>
                  <div>
                    <strong>{growth.final}%</strong>
                    <span>{t('diag.finalShort')}</span>
                  </div>
                  <div>
                    <strong>
                      {growth.delta > 0 ? '+' : ''}
                      {growth.delta}%
                    </strong>
                    <span>{t('diag.growth')}</span>
                  </div>
                </section>
              )}
            </>
          );
        }}
      </Async>
    </>
  );
}
