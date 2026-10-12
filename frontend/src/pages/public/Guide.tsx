import { Link } from 'react-router-dom';
import { useI18n } from '@/i18n';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import { PageHeader } from '@/components/PageHeader';
import { ReadingTools } from '@/components/ReadingTools';
import styles from './Guide.module.scss';

export default function Guide() {
  const { t } = useI18n();
  useDocumentTitle(t('study.guide'));
  return <>
    <PageHeader eyebrow={t('study.sourceBased')} title={t('study.guide')} lead={t('study.guideLead')} />
    <ReadingTools />
    <div className={styles.chapters}>{([1,2,3] as const).map((n) => <section key={n}><span>0{n}</span><h2>{t(`study.chapter${n}`)}</h2><p>{t(`study.chapter${n}Body`)}</p><Link to={['/periods','/sources','/diagnostics'][n-1]}>{t('common.open')} →</Link></section>)}</div>
    <article className={styles.article}>
      <section><h2>{t('study.lesson')}</h2><p className="prose">{t('study.lessonBody')}</p><Link to="/diagnostics/initial">{t('diag.initial')} →</Link></section>
      <section><h2>{t('study.scientific')}</h2><p className="prose">{t('study.scientificBody')}</p></section>
      <section><h2>{t('study.criteria')}</h2><p className="prose">{t('study.criteriaBody')}</p><p className="muted">{t('settings.levelsNote')}</p></section>
    </article>
  </>;
}
