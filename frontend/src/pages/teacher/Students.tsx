import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Input, InputNumber, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useI18n } from '@/i18n';
import { studentsApi } from '@/api/resources';
import type { StudentRow } from '@/types';
import { useAsync } from '@/hooks/useAsync';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import { Async } from '@/components/Async';
import { EmptyState } from '@/components/EmptyState';
import { PageHeader } from '@/components/PageHeader';

export default function Students() {
  const { t } = useI18n();
  useDocumentTitle(t('students.title'));
  const [q, setQ] = useState('');
  const [classLevel, setClassLevel] = useState<number | null>(null);
  const state = useAsync(() => studentsApi.list({ q: q || undefined, classLevel: classLevel ?? undefined }), [q, classLevel]);

  const columns: ColumnsType<StudentRow> = [
    { title: t('students.name'), key: 'n', render: (_, r) => <Link to={`/teacher/students/${r.id}`}><strong>{r.fullName}</strong></Link> },
    { title: t('students.class'), dataIndex: 'classLevel', width: 100, render: (v: number | null) => v ?? '–' },
    { title: t('auth.username'), dataIndex: 'username', responsive: ['md'] },
    { title: t('students.testResults'), dataIndex: 'testsCompleted', width: 120, responsive: ['lg'], render: (v: number | undefined) => v ?? 0 },
    { title: t('dash.average'), dataIndex: 'average', width: 120, render: (v: number | null | undefined) => (typeof v === 'number' ? `${v}%` : '–') },
    { title: t('diag.initialShort'), dataIndex: 'initialPercent', width: 130, responsive: ['md'], render: (v: number | null | undefined) => (typeof v === 'number' ? `${v}%` : '–') },
    { title: t('diag.finalShort'), dataIndex: 'finalPercent', width: 130, responsive: ['md'], render: (v: number | null | undefined) => (typeof v === 'number' ? `${v}%` : '–') },
    {
      title: t('analytics.delta'),
      dataIndex: 'delta',
      width: 110,
      responsive: ['md'],
      render: (v: number | null | undefined) => (typeof v === 'number' ? <strong style={{ color: v >= 0 ? 'var(--c-ok)' : 'var(--c-bad)' }}>{v > 0 ? '+' : ''}{v}%</strong> : '–'),
    },
    {
      title: t('common.actions'),
      key: 'a',
      width: 120,
      render: (_, r) => (
        <Link to={`/teacher/students/${r.id}`}>
          <Button size="small">{t('common.open')}</Button>
        </Link>
      ),
    },
  ];

  return (
    <>
      <PageHeader eyebrow={t('nav.control')} title={t('students.title')} />
      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 16 }}>
        <Input.Search allowClear placeholder={t('students.search')} onSearch={setQ} style={{ maxWidth: 360 }} aria-label={t('common.search')} />
        <InputNumber min={1} max={11} placeholder={t('students.classFilter')} value={classLevel} onChange={setClassLevel} aria-label={t('students.classFilter')} />
      </div>
      <Async state={state} isEmpty={(d) => d.length === 0} empty={<EmptyState />}>
        {(rows) => <Table<StudentRow> rowKey="id" columns={columns} dataSource={rows} pagination={{ pageSize: 20, hideOnSinglePage: true }} scroll={{ x: 'max-content' }} />}
      </Async>
    </>
  );
}
