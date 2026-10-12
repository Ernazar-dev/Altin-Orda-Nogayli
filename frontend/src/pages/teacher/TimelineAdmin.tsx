import { Form, Input, InputNumber, Select, Tag } from 'antd';
import { useI18n } from '@/i18n';
import { timelineApi } from '@/api/resources';
import { TIMELINE_KINDS } from '@/types';
import type { LText, TimelineEvent, TimelineKind } from '@/types';
import { CrudPage } from '@/components/forms/CrudPage';
import { LTextField } from '@/components/forms/LTextInput';
import { useLookups } from '@/hooks/useLookups';
import { num, reqL, str } from '@/utils/payload';

interface FormValues {
  kind: TimelineKind;
  year: number | null;
  yearLabel?: string;
  title: LText;
  description: LText;
  periodId?: string;
  refType?: string;
  refId?: string;
  order: number;
}

export default function TimelineAdmin() {
  const { t, pick } = useI18n();
  const lookups = useLookups();
  const refOptions: Record<string, { value: string; label: string }[]> = {
    PERIOD: lookups.periods,
    THINKER: lookups.thinkers,
    SOURCE: lookups.sources,
    VALUE: lookups.values,
  };
  return (
    <CrudPage<TimelineEvent, FormValues>
      title={t('crud.timeline')}
      api={timelineApi}
      initial={{ kind: 'VOQEA', order: 1 }}
      columns={[
        { title: t('common.order'), dataIndex: 'order', width: 80, sorter: (a, b) => a.order - b.order, defaultSortOrder: 'ascend' },
        { title: t('timeline.year'), key: 'y', width: 140, render: (_, r) => r.yearLabel || r.year || t('timeline.noYear') },
        { title: t('timeline.kind'), key: 'k', width: 160, render: (_, r) => <Tag variant="filled">{t(`timeline.kind.${r.kind}` as const)}</Tag> },
        { title: t('common.title'), key: 't', render: (_, r) => <strong>{pick(r.title)}</strong> },
      ]}
      toForm={(r) => ({
        kind: r.kind,
        year: r.year ?? null,
        yearLabel: r.yearLabel ?? undefined,
        title: r.title,
        description: r.description,
        periodId: r.periodId ?? undefined,
        refType: r.refType ?? undefined,
        refId: r.refId ?? undefined,
        order: r.order,
      })}
      fromForm={(v) => ({
        kind: v.kind,
        year: num(v.year),
        yearLabel: str(v.yearLabel) ?? null,
        title: reqL(v.title),
        description: reqL(v.description),
        periodId: v.periodId || null,
        refType: v.refType || null,
        refId: v.refType && v.refId ? v.refId : null,
        order: v.order,
      })}
      renderForm={({ form }) => (
        <>
          <Form.Item name="kind" label={t('timeline.kind')} rules={[{ required: true, message: t('common.required') }]}>
            <Select options={TIMELINE_KINDS.map((k) => ({ value: k, label: t(`timeline.kind.${k}` as const) }))} />
          </Form.Item>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <Form.Item name="year" label={t('crud.year')} style={{ flex: '0 1 160px' }} extra={t('timeline.noYear')}>
              <InputNumber style={{ width: '100%' }} />
            </Form.Item>
            <Form.Item name="yearLabel" label={t('timeline.yearLabel')} style={{ flex: '1 1 220px' }}>
              <Input />
            </Form.Item>
            <Form.Item name="order" label={t('common.order')} rules={[{ required: true, message: t('common.required') }]} style={{ flex: '0 1 120px' }}>
              <InputNumber min={1} style={{ width: '100%' }} />
            </Form.Item>
          </div>
          <LTextField name="title" label={t('common.title')} multiline={false} />
          <LTextField name="description" label={t('common.description')} rows={4} />
          <Form.Item name="periodId" label={t('crud.period')}>
            <Select allowClear options={lookups.periods} />
          </Form.Item>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <Form.Item name="refType" label={t('crud.refType')} style={{ flex: '1 1 200px' }}>
              <Select
                allowClear
                onChange={() => form.setFieldValue('refId', undefined)}
                options={[
                  { value: 'PERIOD', label: t('crud.period') },
                  { value: 'THINKER', label: t('crud.thinker') },
                  { value: 'SOURCE', label: t('crud.source') },
                  { value: 'VALUE', label: t('nav.values') },
                ]}
              />
            </Form.Item>
            <Form.Item noStyle shouldUpdate={(a, b) => a.refType !== b.refType}>
              {({ getFieldValue }) => (
                <Form.Item name="refId" label={t('crud.refId')} style={{ flex: '1 1 260px' }}>
                  <Select allowClear showSearch optionFilterProp="label" disabled={!getFieldValue('refType')} options={refOptions[getFieldValue('refType') as string] ?? []} />
                </Form.Item>
              )}
            </Form.Item>
          </div>
        </>
      )}
    />
  );
}
