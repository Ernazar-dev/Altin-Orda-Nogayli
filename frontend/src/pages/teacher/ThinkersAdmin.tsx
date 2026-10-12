import { Button, Form, Input, InputNumber, Select, Switch } from 'antd';
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { useI18n } from '@/i18n';
import { thinkersApi } from '@/api/resources';
import type { LText, ReviewStatus, Thinker } from '@/types';
import { CrudPage } from '@/components/forms/CrudPage';
import { LTextField } from '@/components/forms/LTextInput';
import { ImageUpload } from '@/components/forms/ImageUpload';
import { ThinkerAvatar } from '@/components/Cards';
import { useLookups } from '@/hooks/useLookups';
import { cleanL, num, reqL } from '@/utils/payload';

interface LinkForm {
  valueId: string;
  description?: LText;
  sourceId?: string;
}
interface FormValues {
  name: string;
  periodId: string;
  birthYear: number | null;
  deathYear: number | null;
  biography: LText;
  mainIdeas: LText;
  educationalViews: LText;
  modernImportance: LText;
  image: string | null;
  draft: boolean;
  links: LinkForm[];
}

export default function ThinkersAdmin() {
  const { t, pick } = useI18n();
  const lookups = useLookups();
  return (
    <CrudPage<Thinker, FormValues>
      title={t('crud.thinkers')}
      api={thinkersApi}
      loadFull={(id) => thinkersApi.get(id)}
      searchText={(r) => r.name}
      initial={{ draft: true, links: [] }}
      columns={[
        { title: '', key: 'a', width: 64, render: (_, r) => <ThinkerAvatar thinker={r} size={40} /> },
        { title: t('common.name'), dataIndex: 'name', render: (v: string) => <strong>{v}</strong> },
        { title: t('thinker.period'), key: 'p', render: (_, r) => (r.period ? pick(r.period.name) : lookups.periods.find((p) => p.value === r.periodId)?.label) },
      ]}
      toForm={(r) => ({
        name: r.name,
        periodId: r.periodId,
        birthYear: r.birthYear ?? null,
        deathYear: r.deathYear ?? null,
        biography: r.biography,
        mainIdeas: r.mainIdeas,
        educationalViews: r.educationalViews,
        modernImportance: r.modernImportance,
        image: r.image ?? null,
        draft: r.reviewStatus === 'DRAFT',
        links: (r.values ?? []).map((l) => ({ valueId: l.value.id, description: l.description ?? undefined, sourceId: l.source?.id })),
      })}
      fromForm={(v) => {
        const reviewStatus: ReviewStatus = v.draft ? 'DRAFT' : 'REVIEWED';
        return {
          name: v.name.trim(),
          periodId: v.periodId,
          birthYear: num(v.birthYear),
          deathYear: num(v.deathYear),
          biography: reqL(v.biography),
          mainIdeas: reqL(v.mainIdeas),
          educationalViews: reqL(v.educationalViews),
          modernImportance: reqL(v.modernImportance),
          image: v.image ?? null,
          reviewStatus,
        };
      }}
      afterSave={async (saved, v) => {
        // Mavjud bog'lanishlarni almashtiramiz: avval o'chirib, so'ng yangilarini qo'shamiz.
        const existing = await thinkersApi.get(saved.id);
        await Promise.all((existing.values ?? []).map((l) => thinkersApi.unlinkValue(saved.id, l.value.id)));
        const seen = new Set<string>();
        for (const l of v.links ?? []) {
          if (!l?.valueId || seen.has(l.valueId)) continue;
          seen.add(l.valueId);
          await thinkersApi.linkValue(saved.id, { valueId: l.valueId, description: cleanL(l.description), sourceId: l.sourceId || undefined });
        }
      }}
      renderForm={() => (
        <>
          <Form.Item name="name" label={t('common.name')} rules={[{ required: true, message: t('common.required') }]}>
            <Input />
          </Form.Item>
          <Form.Item name="periodId" label={t('thinker.period')} rules={[{ required: true, message: t('common.required') }]}>
            <Select options={lookups.periods} loading={lookups.loading} />
          </Form.Item>
          <Form.Item label={t('thinker.years')} extra={t('thinker.noYears')}>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <Form.Item name="birthYear" label={t('thinker.birthYear')} style={{ marginBottom: 0 }}>
                <InputNumber style={{ width: 160 }} />
              </Form.Item>
              <Form.Item name="deathYear" label={t('thinker.deathYear')} style={{ marginBottom: 0 }}>
                <InputNumber style={{ width: 160 }} />
              </Form.Item>
            </div>
          </Form.Item>
          <LTextField name="biography" label={t('thinker.biography')} rows={5} />
          <LTextField name="mainIdeas" label={t('thinker.mainIdeas')} rows={5} />
          <LTextField name="educationalViews" label={t('thinker.educationalViews')} rows={5} />
          <LTextField name="modernImportance" label={t('thinker.modernImportance')} rows={4} />
          <Form.Item name="image" label={t('common.imageOptional')}>
            <ImageUpload />
          </Form.Item>
          <Form.Item name="draft" label={t('crud.draftToggle')} valuePropName="checked">
            <Switch />
          </Form.Item>

          <h3>{t('crud.linkedValues')}</h3>
          <Form.List name="links">
            {(fields, { add, remove }) => (
              <>
                {fields.map((f) => (
                  <div key={f.key} style={{ border: '1px solid var(--c-line)', borderRadius: 12, padding: 16, marginBottom: 16, background: 'var(--c-paper)' }}>
                    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'flex-start' }}>
                      <Form.Item name={[f.name, 'valueId']} label={t('thinker.values')} rules={[{ required: true, message: t('common.required') }]} style={{ flex: '1 1 220px' }}>
                        <Select showSearch optionFilterProp="label" options={lookups.values} />
                      </Form.Item>
                      <Form.Item name={[f.name, 'sourceId']} label={t('thinker.linkSource')} style={{ flex: '1 1 220px' }}>
                        <Select allowClear showSearch optionFilterProp="label" options={lookups.sources} />
                      </Form.Item>
                      <Button type="text" danger icon={<DeleteOutlined />} onClick={() => remove(f.name)} aria-label={t('common.delete')} style={{ marginTop: 30 }} />
                    </div>
                    <LTextField name={[f.name, 'description']} label={t('thinker.linkDescription')} rows={2} required={false} />
                  </div>
                ))}
                <Button type="dashed" icon={<PlusOutlined />} onClick={() => add({})}>
                  {t('thinker.addValue')}
                </Button>
              </>
            )}
          </Form.List>
        </>
      )}
    />
  );
}
