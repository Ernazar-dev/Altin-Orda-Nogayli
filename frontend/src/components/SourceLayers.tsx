import { useI18n } from '@/i18n';
import type { LText, Source } from '@/types';
import styles from './SourceLayers.module.scss';

interface Props {
  source: Pick<Source, 'content' | 'reference' | 'dissertationNote'>;
  modern?: LText | null;
  modernLabel?: string;
  showSource?: boolean;
}

/**
 * Ilmiy ishonchlilik: uch qatlam bir-biridan vizual ajratiladi.
 * 1) asl manba (o'zgartirilmagan) 2) dissertatsiya talqini 3) zamonaviy talqin.
 */
export function SourceLayers({ source, modern, modernLabel, showSource = true }: Props) {
  const { t, pick } = useI18n();
  const dissertation = pick(source.dissertationNote);
  const modernText = pick(modern);
  return (
    <div className={styles.layers}>
      {showSource && (
        <figure className={`${styles.layer} ${styles.source}`}>
          <figcaption>
            <span className={styles.tag}>{t('layer.source')}</span>
            <span className={styles.hint}>{t('layer.sourceHint')}</span>
          </figcaption>
          <blockquote lang="uz-Cyrl">{source.content}</blockquote>
          <p className={styles.ref}>
            <span>{t('layer.original')}</span> · {t('layer.reference')}: <strong>{source.reference}</strong>
          </p>
        </figure>
      )}
      {dissertation && (
        <section className={`${styles.layer} ${styles.diss}`}>
          <h3>
            <span className={styles.tag}>{t('layer.dissertation')}</span>
            <span className={styles.hint}>{t('layer.dissertationHint')}</span>
          </h3>
          <p className="prose">{dissertation}</p>
        </section>
      )}
      {modernText && (
        <section className={`${styles.layer} ${styles.modern}`}>
          <h3>
            <span className={styles.tag}>{modernLabel ?? t('layer.modern')}</span>
            <span className={styles.hint}>{t('layer.modernHint')}</span>
          </h3>
          <p className="prose">{modernText}</p>
        </section>
      )}
    </div>
  );
}
