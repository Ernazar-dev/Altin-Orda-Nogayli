import { useState } from 'react';
import { App, Button, InputNumber, Select, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { DownloadOutlined } from '@ant-design/icons';
import { useI18n } from '@/i18n';
import { analyticsApi, studentsApi, testsApi } from '@/api/resources';
import { errorMessage } from '@/api/client';
import { CRITERIA } from '@/types';
import type { AnalyticsFilter, ByTestRow, Criterion, DiagnosticKind, GrowthRow } from '@/types';
import { useAsync } from '@/hooks/useAsync';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import { Async } from '@/components/Async';
import { PageHeader } from '@/components/PageHeader';
import { ClassChart, CriteriaChart, InitialFinalChart, LevelsChart } from '@/components/Charts';
import { downloadBlob } from '@/utils/format';
import styles from './Dashboard.module.scss';

export default function Analytics() {
  const { t, pick } = useI18n();
  const { message } = App.useApp();
  useDocumentTitle(t('nav.analytics'));
  const [classLevel, setClassLevel] = useState<number | undefined>();
  const [studentId, setStudentId] = useState<string | undefined>();
  const [testId, setTestId] = useState<string | undefined>();
  const [criterion, setCriterion] = useState<Criterion | undefined>();
  const [kind, setKind] = useState<DiagnosticKind | undefined>();
  const [exporting, setExporting] = useState(false);
  const filter: AnalyticsFilter = { classLevel, studentId, testId, criterion, kind };
  const key = JSON.stringify(filter);

  const students = useAsync(() => studentsApi.list(), []);
  const tests = useAsync(() => testsApi.list(), []);
  const overview = useAsync(() => analyticsApi.overview(filter), [key]);
  const byClass = useAsync(() => analyticsApi.byClass(filter), [key]);
  const byCriterion = useAsync(() => analyticsApi.byCriterion(filter), [key]);
  const byTest = useAsync(() => analyticsApi.byTest(filter), [key]);
  const growth = useAsync(() => analyticsApi.growth(filter), [key]);

  async function exportCsv() {
    setExporting(true);
    try {
      downloadBlob(await analyticsApi.exportCsv(filter), `natijalar-${new Date().toISOString().slice(0, 10)}.csv`);
    } catch (e) {
      void message.error(errorMessage(e, t('common.error')));
    } finally {
      setExporting(false);
    }
  }

  const growthCols: ColumnsType<GrowthRow> = [
    { title: t('analytics.student'), dataIndex: 'fullName', render: (v: string | undefined) => v ?? '–' },
    { title: t('students.class'), dataIndex: 'classLevel', width: 90, render: (v: number | null | undefined) => v ?? '–' },
    { title: t('diag.initialShort'), dataIndex: 'initial', width: 130, render: (v: number | null) => (v === null ? '–' : `${v}%`) },
    { title: t('diag.finalShort'), dataIndex: 'final', width: 130, render: (v: number | null) => (v === null ? '–' : `${v}%`) },
    {
      title: t('analytics.delta'),
      dataIndex: 'delta',
      width: 120,
      sorter: (a, b) => (a.delta ?? -999) - (b.delta ?? -999),
      render: (v: number | null) => (v === null ? '–' : <strong style={{ color: v >= 0 ? 'var(--c-ok)' : 'var(--c-bad)' }}>{v > 0 ? '+' : ''}{v}%</strong>),
    },
  ];
  const testCols: ColumnsType<ByTestRow> = [
    { title: t('analytics.test'), key: 't', render: (_, r) => (typeof r.title === 'string' ? r.title : pick(r.title)) },
    { title: t('analytics.attempts'), dataIndex: 'attempts', width: 130 },
    { title: t('dash.average'), dataIndex: 'averagePercent', width: 130, render: (v: number) => `${v}%` },
  ];

  return (
    <>
      <PageHeader
        eyebrow={t('nav.control')}
        title={t('analytics.title')}
        lead={t('analytics.lead')}
        actions={
          <Button icon={<DownloadOutlined />} loading={exporting} onClick={() => void exportCsv()} size="large">
            {t('common.exportCsv')}
          </Button>
        }
      />
      <div className={styles.filters} role="group" aria-label={t('common.filter')}>
        <InputNumber min={1} max={11} placeholder={t('analytics.class')} value={classLevel} onChange={(v) => setClassLevel(v ?? undefined)} aria-label={t('analytics.class')} />
        <Select<string>
          allowClear
          showSearch
          optionFilterProp="label"
          placeholder={t('analytics.student')}
          value={studentId}
          onChange={setStudentId}
          style={{ minWidth: 200 }}
          options={(students.data ?? []).map((s) => ({ value: s.id, label: s.fullName }))}
        />
        <Select<string>
          allowClear
          placeholder={t('analytics.test')}
          value={testId}
          onChange={setTestId}
          style={{ minWidth: 200 }}
          options={(tests.data ?? []).map((x) => ({ value: x.id, label: pick(x.title) }))}
        />
        <Select<Criterion>
          allowClear
          placeholder={t('analytics.criterion')}
          value={criterion}
          onChange={setCriterion}
          style={{ minWidth: 160 }}
          options={CRITERIA.map((c) => ({ value: c, label: t(`criterion.${c}` as const) }))}
        />
        <Select<DiagnosticKind>
          allowClear
          placeholder={t('analytics.kind')}
          value={kind}
          onChange={setKind}
          style={{ minWidth: 200 }}
          options={[
            { value: 'INITIAL', label: t('diag.initial') },
            { value: 'FINAL', label: t('diag.final') },
          ]}
        />
        <Button
          onClick={() => {
            setClassLevel(undefined);
            setStudentId(undefined);
            setTestId(undefined);
            setCriterion(undefined);
            setKind(undefined);
          }}
        >
          {t('common.reset')}
        </Button>
      </div>

      <Async state={overview}>
        {(o) => (
          <div className={styles.charts}>
            <InitialFinalChart initial={o.diagnosticAvg.initial} final={o.diagnosticAvg.final} />
            <LevelsChart data={o.levelDistribution} />
            <CriteriaChart data={byCriterion.data ?? []} />
            <ClassChart data={byClass.data ?? []} />
          </div>
        )}
      </Async>

      <section style={{ marginTop: 40 }}>
        <h2>{t('analytics.growthTable')}</h2>
        <Async state={growth}>
          {(rows) => <Table<GrowthRow> rowKey={(r) => r.studentId ?? r.fullName ?? ''} columns={growthCols} dataSource={rows} pagination={{ pageSize: 15, hideOnSinglePage: true }} scroll={{ x: 'max-content' }} />}
        </Async>
      </section>
      <section style={{ marginTop: 40 }}>
        <h2>{t('analytics.byTest')}</h2>
        <Async state={byTest}>
          {(rows) => <Table<ByTestRow> rowKey="testId" columns={testCols} dataSource={rows} pagination={false} scroll={{ x: 'max-content' }} />}
        </Async>
      </section>
    </>
  );
}
