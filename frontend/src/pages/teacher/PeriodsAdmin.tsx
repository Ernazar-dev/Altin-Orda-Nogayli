import { Form, InputNumber } from 'antd';
import { useI18n } from '@/i18n';
import { periodsApi } from '@/api/resources';
import type { LText, Period } from '@/types';
import { CrudPage } from '@/components/forms/CrudPage';
import { LTextField } from '@/components/forms/LTextInput';
import { ImageUpload } from '@/components/forms/ImageUpload';
import { num, reqL } from '@/utils/payload';
import { yearsLabel } from '@/utils/format';

interface FormValues {
  name: LText;
  startYear: number | null;
  endYear: number | null;
  shortDescription: LText;
  content: LText;
  image: string | null;
  order: number;
}

export default function PeriodsAdmin() {
  const { t, pick } = useI18n();
  return (
    <CrudPage<Period, FormValues>
      title={t('crud.periods')}
      api={periodsApi}
      initial={{ order: 1 }}
      columns={[
        { title: t('common.order'), dataIndex: 'order', width: 80, sorter: (a, b) => a.order - b.order },
        { title: t('common.name'), key: 'name', render: (_, r) => <strong>{pick(r.name)}</strong> },
        { title: t('period.years'), key: 'y', render: (_, r) => yearsLabel(r.startYear, r.endYear) ?? t('common.notInDissertation') },
      ]}
      toForm={(r) => ({
        name: r.name,
        startYear: r.startYear,
        endYear: r.endYear,
        shortDescription: r.shortDescription,
        content: r.content,
        image: r.image ?? null,
        order: r.order,
      })}
      fromForm={(v) => ({
        name: reqL(v.name),
        startYear: num(v.startYear),
        endYear: num(v.endYear),
        shortDescription: reqL(v.shortDescription),
        content: reqL(v.content),
        image: v.image ?? null,
        order: v.order,
      })}
      renderForm={() => (
        <>
          <LTextField name="name" label={t('common.name')} multiline={false} />
          <Form.Item label={t('period.years')} extra={t('common.notInDissertation')}>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <Form.Item name="startYear" label={t('crud.startYear')} style={{ marginBottom: 0 }}>
                <InputNumber style={{ width: 160 }} />
              </Form.Item>
              <Form.Item name="endYear" label={t('crud.endYear')} style={{ marginBottom: 0 }}>
                <InputNumber style={{ width: 160 }} />
              </Form.Item>
            </div>
          </Form.Item>
          <LTextField name="shortDescription" label={t('crud.shortDescription')} rows={3} />
          <LTextField name="content" label={t('crud.content')} rows={10} />
          <Form.Item name="order" label={t('common.order')} rules={[{ required: true, message: t('common.required') }]}>
            <InputNumber min={1} style={{ width: 120 }} />
          </Form.Item>
          <Form.Item name="image" label={t('common.imageOptional')}>
            <ImageUpload />
          </Form.Item>
        </>
      )}
    />
  );
}
