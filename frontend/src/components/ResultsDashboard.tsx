import { Progress, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { PolarAngleAxis, PolarGrid, Radar, RadarChart, ResponsiveContainer } from 'recharts';
import { useI18n } from '@/i18n';
import { CRITERIA } from '@/types';
import type { DiagnosticResult, ResultsSummary, TestResult } from '@/types';
import { formatDate } from '@/utils/format';
import { CriterionBars, LevelTag, ScoreRing } from './Results';
import { EmptyState } from './EmptyState';
import styles from './ResultsDashboard.module.scss';

function ProgressRow({ label, done, total }: { label: string; done: number; total: number }) {
  const pct = total ? Math.round((done / total) * 100) : 0;
  return (
    <li>
      <div className={styles.rowHead}>
        <span>{label}</span>
        <strong>
          {done} / {total}
        </strong>
      </div>
      <Progress percent={pct} showInfo={false} strokeColor="var(--c-teal)" railColor="var(--c-paper-2)" aria-label={`${label}: ${done}/${total}`} />
    </li>
  );
}

/** Student natijalari: o'qituvchi ham, student ham bir xil ko'radi. */
export function ResultsDashboard({ data }: { data: ResultsSummary }) {
  const { t, pick, lang } = useI18n();
  const radar = CRITERIA.map((c) => ({ criterion: t(`criterion.${c}` as const), value: data.byCriterion?.[c]?.percent ?? 0 }));
  const hasRadar = CRITERIA.some((c) => data.byCriterion?.[c]);

  const testCols: ColumnsType<TestResult> = [
    { title: t('nav.tests'), key: 't', render: (_, r) => pick(r.test?.title) || r.testId },
    { title: t('common.score'), key: 's', width: 100, render: (_, r) => `${r.correct}/${r.total}` },
    { title: '%', dataIndex: 'percent', width: 80, render: (v: number) => `${v}%` },
    { title: t('results.level'), key: 'l', width: 110, render: (_, r) => <LevelTag level={r.level} /> },
    ...CRITERIA.map((c) => ({
      title: t(`criterion.${c}` as const),
      key: c,
      width: 110,
      responsive: ['lg' as const],
      render: (_: unknown, r: TestResult) => (r.byCriterion?.[c] ? `${r.byCriterion[c]?.percent}%` : '–'),
    })),
    { title: t('common.date'), dataIndex: 'createdAt', width: 120, render: (v: string) => formatDate(v, lang) },
  ];
  const diagCols: ColumnsType<DiagnosticResult> = [
    {
      title: t('diag.kind'),
      key: 'k',
      render: (_, r) => ((r.kind ?? r.diagnostic?.kind) === 'FINAL' ? t('diag.final') : t('diag.initial')),
    },
    { title: '%', dataIndex: 'percent', width: 80, render: (v: number) => `${v}%` },
    { title: t('results.level'), key: 'l', width: 110, render: (_, r) => <LevelTag level={r.level} /> },
    { title: t('common.date'), dataIndex: 'createdAt', width: 120, render: (v: string) => formatDate(v, lang) },
  ];

  return (
    <div className={styles.wrap}>
      <section className={styles.top}>
        <div className={styles.panel}>
          <h2>{t('results.average')}</h2>
          <ScoreRing
            correct={[...data.tests, ...data.diagnostics].reduce((s, r) => s + r.correct, 0)}
            total={[...data.tests, ...data.diagnostics].reduce((s, r) => s + r.total, 0)}
            percent={data.average}
            level={data.level ?? undefined}
          />
          <p className="muted" style={{ marginTop: 12 }}>
            {t('results.levelsNote')}
          </p>
        </div>
        <div className={styles.panel}>
          <h2>{t('results.progress')}</h2>
          <ul className={styles.progress}>
            <ProgressRow label={t('results.periodsViewed')} done={data.progress.periodsViewed} total={data.progress.periodsTotal} />
            <ProgressRow label={t('results.thinkersViewed')} done={data.progress.thinkersViewed} total={data.progress.thinkersTotal} />
            <ProgressRow label={t('results.valuesViewed')} done={data.progress.valuesViewed} total={data.progress.valuesTotal} />
          </ul>
          <p className={styles.act}>
            {t('results.activities')}: <strong>{data.activities.total}</strong> · {t('results.activitiesCorrect')}: <strong>{data.activities.correct}</strong>
          </p>
        </div>
      </section>

      {data.growth && (
        <section className={styles.growth} aria-label={t('diag.growth')}>
          <div>
            <span>{t('diag.initialShort')}</span>
            <strong>{data.growth.initial}%</strong>
          </div>
          <div>
            <span>{t('diag.finalShort')}</span>
            <strong>{data.growth.final}%</strong>
          </div>
          <div>
            <span>{t('diag.growth')}</span>
            <strong>
              {data.growth.delta > 0 ? '+' : ''}
              {data.growth.delta}%
            </strong>
          </div>
        </section>
      )}

      <section>
        <h2>{t('results.byCriterion')}</h2>
        <div className={hasRadar ? styles.criteria : styles.criteriaSolo}>
          {hasRadar && (
            <div className={styles.radar} role="img" aria-label={radar.map((r) => `${r.criterion}: ${r.value}%`).join(', ')}>
              <ResponsiveContainer width="100%" height={260}>
                <RadarChart data={radar} outerRadius="70%">
                  <PolarGrid stroke="#d5dccb" />
                  <PolarAngleAxis dataKey="criterion" tick={{ fill: '#303c34', fontSize: 12 }} />
                  <Radar dataKey="value" stroke="#2e6150" fill="#2e6150" fillOpacity={0.25} isAnimationActive={false} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          )}
          <CriterionBars data={data.byCriterion} />
        </div>
      </section>

      <section>
        <h2>{t('results.tests')}</h2>
        {data.tests.length === 0 ? (
          <EmptyState compact title={t('results.noTests')} />
        ) : (
          <Table<TestResult> rowKey="id" size="middle" pagination={false} columns={testCols} dataSource={[...data.tests].reverse()} scroll={{ x: 'max-content' }} />
        )}
      </section>

      <section>
        <h2>{t('results.diagnostics')}</h2>
        {data.diagnostics.length === 0 ? (
          <EmptyState compact title={t('diag.notTaken')} />
        ) : (
          <Table<DiagnosticResult> rowKey="id" size="middle" pagination={false} columns={diagCols} dataSource={[...data.diagnostics].reverse()} scroll={{ x: 'max-content' }} />
        )}
      </section>
    </div>
  );
}
