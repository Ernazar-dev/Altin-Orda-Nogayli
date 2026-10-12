import { useEffect, useState } from 'react';
import { Button, Input, InputNumber, Segmented, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { ReloadOutlined } from '@ant-design/icons';
import { useI18n } from '@/i18n';
import { resultsApi } from '@/api/resources';
import type { FeedFilter, FeedItem } from '@/types';
import { formatDateTime } from '@/utils/format';
import { useAsync } from '@/hooks/useAsync';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import { Async } from '@/components/Async';
import { EmptyState } from '@/components/EmptyState';
import { PageHeader } from '@/components/PageHeader';
import { FeedKindTag, FeedResult, StudentLink } from '@/components/ResultFeed';
import styles from './Results.module.scss';

type Kind = FeedFilter | 'ALL';
const PAGE = 100;
const REFRESH_MS = 30_000;

/** Ustoz: o'quvchilar topshirgan barcha test, diagnostika va topshiriqlar (kim, nima, qancha, qachon). */
export default function TeacherResults() {
  const { t, pick, lang } = useI18n();
  useDocumentTitle(t('feed.title'));
  const [kind, setKind] = useState<Kind>('ALL');
  const [q, setQ] = useState('');
  const [classLevel, setClassLevel] = useState<number | null>(null);
  const [limit, setLimit] = useState(PAGE);
  const state = useAsync(
    () => resultsApi.feed({ kind: kind === 'ALL' ? undefined : kind, q: q || undefined, classLevel: classLevel ?? undefined, limit }),
    [kind, q, classLevel, limit],
  );
  const { reload } = state;

  useEffect(() => {
    const id = window.setInterval(reload, REFRESH_MS);
    return () => window.clearInterval(id);
  }, [reload]);

  const columns: ColumnsType<FeedItem> = [
    { title: t('feed.when'), key: 'when', width: 150, render: (_, r) => <time dateTime={r.createdAt} className={styles.when}>{formatDateTime(r.createdAt, lang)}</time> },
    { title: t('feed.student'), key: 's', width: 230, render: (_, r) => <StudentLink item={r} /> },
    { title: t('feed.type'), key: 'k', width: 180, render: (_, r) => <FeedKindTag kind={r.kind} /> },
    { title: t('feed.work'), key: 'w', render: (_, r) => <span className={styles.work}>{pick(r.title)}</span> },
    { title: t('feed.result'), key: 'r', width: 200, render: (_, r) => <FeedResult item={r} /> },
  ];

  return (
    <>
      <PageHeader
        eyebrow={t('nav.control')}
        title={t('feed.title')}
        lead={t('feed.lead')}
        actions={
          <Button icon={<ReloadOutlined />} loading={state.loading && state.data !== null} onClick={reload}>
            {t('feed.refresh')}
          </Button>
        }
      />
      <div className={styles.toolbar}>
        <Segmented<Kind>
          value={kind}
          onChange={(v) => { setKind(v); setLimit(PAGE); }}
          options={[
            { value: 'ALL', label: t('feed.all') },
            { value: 'TEST', label: t('feed.kind.TEST') },
            { value: 'DIAGNOSTIC', label: t('feed.diagnostic') },
            { value: 'ACTIVITY', label: t('feed.kind.ACTIVITY') },
          ]}
        />
        <Input.Search allowClear placeholder={t('students.search')} onSearch={(v) => { setQ(v.trim()); setLimit(PAGE); }} className={styles.search} aria-label={t('common.search')} />
        <InputNumber min={1} max={11} placeholder={t('students.classFilter')} value={classLevel} onChange={(v) => { setClassLevel(v); setLimit(PAGE); }} aria-label={t('students.classFilter')} />
        <span className={styles.auto}>{t('feed.auto')}</span>
      </div>
      <Async state={state} isEmpty={(d) => d.items.length === 0} empty={<EmptyState title={t('feed.empty')} />}>
        {(d) => (
          <>
            <p className={styles.totals}>{t('feed.counts', { tests: d.totals.tests, diag: d.totals.diagnostics, acts: d.totals.activities })}</p>
            <Table<FeedItem> rowKey={(r) => `${r.kind}-${r.id}`} columns={columns} dataSource={d.items} pagination={{ pageSize: 20, hideOnSinglePage: true, showSizeChanger: false }} scroll={{ x: 900 }} />
            {d.items.length >= limit && (
              <div className={styles.more}>
                <Button onClick={() => setLimit((n) => n + PAGE)}>{t('feed.more')}</Button>
              </div>
            )}
          </>
        )}
      </Async>
    </>
  );
}
