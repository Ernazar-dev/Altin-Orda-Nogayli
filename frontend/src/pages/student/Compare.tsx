import { useI18n } from '@/i18n';
import { comparisonsApi } from '@/api/resources';
import { useAsync } from '@/hooks/useAsync';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import { Async } from '@/components/Async';
import { PageHeader } from '@/components/PageHeader';
import { EmptyState } from '@/components/EmptyState';
import styles from './Compare.module.scss';

export default function Compare() {
  const { t, pick } = useI18n();
  useDocumentTitle(t('nav.compare'));
  const state = useAsync(() => comparisonsApi.list(), []);
  return (
    <>
      <PageHeader eyebrow={t('nav.learn')} title={t('compare.title')} lead={t('compare.lead')} />
      <Async state={state} isEmpty={(d) => d.length === 0} empty={<EmptyState />}>
        {(rows) => (
          <>
            <div className={styles.legend} aria-hidden="true">
              <span className={styles.gold}>{t('period.goldenHorde')}</span>
              <span className={styles.teal}>{t('period.nogai')}</span>
            </div>
            <ol className={styles.list}>
              {[...rows]
                .sort((a, b) => a.order - b.order)
                .map((r) => (
                  <li key={r.id} className={styles.row}>
                    <h2>{pick(r.aspect)}</h2>
                    <div className={styles.cols}>
                      <section className={styles.gold} aria-label={t('period.goldenHorde')}>
                        <h3>{t('period.goldenHorde')}</h3>
                        <p>{pick(r.goldenHorde) || t('common.notInDissertation')}</p>
                      </section>
                      <section className={styles.teal} aria-label={t('period.nogai')}>
                        <h3>{t('period.nogai')}</h3>
                        <p>{pick(r.nogai) || t('common.notInDissertation')}</p>
                      </section>
                    </div>
                    <div className={styles.cols}>
                      <section className={styles.same}>
                        <h3>{t('compare.similarity')}</h3>
                        <p>{pick(r.similarity) || '–'}</p>
                      </section>
                      <section className={styles.diff}>
                        <h3>{t('compare.difference')}</h3>
                        <p>{pick(r.difference) || '–'}</p>
                      </section>
                    </div>
                    {r.sourceRef && (
                      <p className={styles.ref}>
                        {t('compare.sourceRef')}: {r.sourceRef}
                      </p>
                    )}
                  </li>
                ))}
            </ol>
          </>
        )}
      </Async>
    </>
  );
}
