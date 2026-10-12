import { Form, Input, InputNumber } from 'antd';
import { useI18n } from '@/i18n';
import { comparisonsApi } from '@/api/resources';
import type { ComparisonEntry, LText } from '@/types';
import { CrudPage } from '@/components/forms/CrudPage';
import { LTextField } from '@/components/forms/LTextInput';
import { reqL, str } from '@/utils/payload';

interface FormValues {
  aspect: LText;
  goldenHorde: LText;
  nogai: LText;
  similarity: LText;
  difference: LText;
  sourceRef?: string;
  order: number;
}

export default function ComparisonsAdmin() {
  const { t, pick } = useI18n();
  return (
    <CrudPage<ComparisonEntry, FormValues>
      title={t('crud.comparisons')}
      api={comparisonsApi}
      initial={{ order: 1 }}
      columns={[
        { title: t('common.order'), dataIndex: 'order', width: 80, sorter: (a, b) => a.order - b.order, defaultSortOrder: 'ascend' },
        { title: t('crud.aspect'), key: 'a', render: (_, r) => <strong>{pick(r.aspect)}</strong> },
        { title: t('compare.sourceRef'), dataIndex: 'sourceRef' },
      ]}
      toForm={(r) => ({
        aspect: r.aspect,
        goldenHorde: r.goldenHorde,
        nogai: r.nogai,
        similarity: r.similarity,
        difference: r.difference,
        sourceRef: r.sourceRef ?? undefined,
        order: r.order,
      })}
      fromForm={(v) => ({
        aspect: reqL(v.aspect),
        goldenHorde: reqL(v.goldenHorde),
        nogai: reqL(v.nogai),
        similarity: reqL(v.similarity),
        difference: reqL(v.difference),
        sourceRef: str(v.sourceRef) ?? null,
        order: v.order,
      })}
      renderForm={() => (
        <>
          <LTextField name="aspect" label={t('crud.aspect')} multiline={false} />
          <LTextField name="goldenHorde" label={t('crud.goldenHorde')} rows={4} />
          <LTextField name="nogai" label={t('crud.nogai')} rows={4} />
          <LTextField name="similarity" label={t('crud.similarity')} rows={3} required={false} />
          <LTextField name="difference" label={t('crud.difference')} rows={3} required={false} />
          <Form.Item name="sourceRef" label={t('crud.sourceRef')}>
            <Input />
          </Form.Item>
          <Form.Item name="order" label={t('common.order')} rules={[{ required: true, message: t('common.required') }]}>
            <InputNumber min={1} style={{ width: 120 }} />
          </Form.Item>
        </>
      )}
    />
  );
}
