import type { ReactNode } from 'react';
import { Bar, BarChart, CartesianGrid, Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { useI18n } from '@/i18n';
import { LEVELS } from '@/types';
import type { ByClassRow, ByCriterionRow, Level, LevelsRow } from '@/types';
import { EmptyState } from './EmptyState';
import styles from './Charts.module.scss';

const C = { indigo: '#2e6150', gold: '#b99b5d', teal: '#528578', ok: '#286646', warn: '#98701f', bad: '#a8322d', grid: '#e3e6dc', text: '#303c34' };
const LEVEL_FILL: Record<Level, string> = { HIGH: C.ok, MEDIUM: C.warn, LOW: C.bad };

function Frame({ title, summary, children }: { title: string; summary: string; children: ReactNode }) {
  return (
    <figure className={styles.frame}>
      <figcaption>{title}</figcaption>
      <div role="img" aria-label={`${title}: ${summary}`} className={styles.canvas}>
        {children}
      </div>
    </figure>
  );
}

export function InitialFinalChart({ initial, final }: { initial: number | null; final: number | null }) {
  const { t } = useI18n();
  const title = t('dash.initialVsFinal');
  if (initial === null && final === null) return <Frame title={title} summary="–"><EmptyState compact title={t('dash.noData')} description="" /></Frame>;
  const data = [
    { name: t('diag.initialShort'), value: initial, fill: C.indigo },
    { name: t('diag.finalShort'), value: final, fill: C.gold },
  ];
  return (
    <Frame title={title} summary={data.map((d) => `${d.name} ${d.value === null ? t('dash.noData') : `${d.value}%`}`).join(', ')}>
      <ResponsiveContainer width="100%" height={240}>
        <BarChart data={data} margin={{ top: 16, right: 8, left: -16, bottom: 0 }}>
          <CartesianGrid stroke={C.grid} vertical={false} />
          <XAxis dataKey="name" tick={{ fill: C.text, fontSize: 13 }} />
          <YAxis domain={[0, 100]} unit="%" tick={{ fill: C.text, fontSize: 12 }} />
          <Tooltip formatter={(v: unknown) => `${String(v)}%`} />
          <Bar dataKey="value" radius={[6, 6, 0, 0]} label={{ position: 'top', formatter: (v: unknown) => `${String(v)}%`, fill: C.text, fontSize: 12 }} isAnimationActive={false}>
            {data.map((d) => (
              <Cell key={d.name} fill={d.fill} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </Frame>
  );
}

export function LevelsChart({ data }: { data: Record<Level, number> | LevelsRow[] }) {
  const { t } = useI18n();
  const title = t('dash.levels');
  const map: Record<Level, number> = Array.isArray(data)
    ? { HIGH: data.find((d) => d.level === 'HIGH')?.count ?? 0, MEDIUM: data.find((d) => d.level === 'MEDIUM')?.count ?? 0, LOW: data.find((d) => d.level === 'LOW')?.count ?? 0 }
    : data;
  const rows = LEVELS.map((l) => ({ level: l, name: `${t(`level.${l}` as const)}: ${map[l] ?? 0}`, value: map[l] ?? 0 }));
  const total = rows.reduce((s, r) => s + r.value, 0);
  if (total === 0) return <Frame title={title} summary="–"><EmptyState compact title={t('dash.noData')} description="" /></Frame>;
  return (
    <Frame title={title} summary={rows.map((r) => r.name).join(', ')}>
      <ResponsiveContainer width="100%" height={240}>
        <PieChart>
          <Pie data={rows.filter((r) => r.value > 0)} dataKey="value" nameKey="name" innerRadius={52} outerRadius={88} paddingAngle={2} isAnimationActive={false}>
            {rows
              .filter((r) => r.value > 0)
              .map((r) => (
                <Cell key={r.level} fill={LEVEL_FILL[r.level]} />
              ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </Frame>
  );
}

export function CriteriaChart({ data }: { data: ByCriterionRow[] }) {
  const { t } = useI18n();
  const title = t('dash.byCriterion');
  const rows = data.map((d) => ({ name: t(`criterion.${d.criterion}` as const), value: d.percent }));
  if (rows.every((r) => r.value === null)) return <Frame title={title} summary="–"><EmptyState compact title={t('dash.noData')} description="" /></Frame>;
  return (
    <Frame title={title} summary={rows.map((r) => `${r.name} ${r.value === null ? t('dash.noData') : `${r.value}%`}`).join(', ')}>
      <ResponsiveContainer width="100%" height={240}>
        <BarChart data={rows} layout="vertical" margin={{ top: 8, right: 32, left: 8, bottom: 0 }}>
          <CartesianGrid stroke={C.grid} horizontal={false} />
          <XAxis type="number" domain={[0, 100]} unit="%" tick={{ fill: C.text, fontSize: 12 }} />
          <YAxis type="category" dataKey="name" width={96} tick={{ fill: C.text, fontSize: 12 }} />
          <Tooltip formatter={(v: unknown) => `${String(v)}%`} />
          <Bar dataKey="value" fill={C.indigo} radius={[0, 6, 6, 0]} label={{ position: 'right', formatter: (v: unknown) => `${String(v)}%`, fill: C.text, fontSize: 12 }} isAnimationActive={false} />
        </BarChart>
      </ResponsiveContainer>
    </Frame>
  );
}

export function ClassChart({ data }: { data: ByClassRow[] }) {
  const { t } = useI18n();
  const title = t('dash.byClass');
  if (data.length === 0) return <Frame title={title} summary="–"><EmptyState compact title={t('dash.noData')} description="" /></Frame>;
  const rows = data.map((d) => ({ name: d.classLevel === null ? t('common.none') : `${d.classLevel}`, value: d.averagePercent }));
  return (
    <Frame title={title} summary={rows.map((r) => `${r.name}: ${r.value}%`).join(', ')}>
      <ResponsiveContainer width="100%" height={240}>
        <BarChart data={rows} margin={{ top: 16, right: 8, left: -16, bottom: 0 }}>
          <CartesianGrid stroke={C.grid} vertical={false} />
          <XAxis dataKey="name" tick={{ fill: C.text, fontSize: 13 }} />
          <YAxis domain={[0, 100]} unit="%" tick={{ fill: C.text, fontSize: 12 }} />
          <Tooltip formatter={(v: unknown) => `${String(v)}%`} />
          <Bar dataKey="value" fill={C.teal} radius={[6, 6, 0, 0]} label={{ position: 'top', formatter: (v: unknown) => `${String(v)}%`, fill: C.text, fontSize: 12 }} isAnimationActive={false} />
        </BarChart>
      </ResponsiveContainer>
    </Frame>
  );
}
