import { Form, Select, Tag } from 'antd';
import { useI18n } from '@/i18n';
import { valuesApi } from '@/api/resources';
import { VALUE_CATEGORIES } from '@/types';
import type { EducationalValue, LText, ValueCategory } from '@/types';
import { CrudPage } from '@/components/forms/CrudPage';
import { LTextField } from '@/components/forms/LTextInput';
import { reqL } from '@/utils/payload';

interface FormValues {
  name: LText;
  description: LText;
  modernInterpretation: LText;
  category: ValueCategory;
}

export default function ValuesAdmin() {
  const { t, pick } = useI18n();
  return (
    <CrudPage<EducationalValue, FormValues>
      title={t('crud.values')}
      api={valuesApi}
      searchText={(r) => `${r.name.uz ?? ''} ${r.name.kaa ?? ''}`}
      columns={[
        { title: t('common.name'), key: 'name', render: (_, r) => <strong>{pick(r.name)}</strong> },
        { title: t('value.category'), key: 'c', render: (_, r) => <Tag variant="filled">{t(`value.cat.${r.category}` as const)}</Tag> },
      ]}
      initial={{ category: 'AXIOLOGICAL' }}
      toForm={(r) => ({ name: r.name, description: r.description, modernInterpretation: r.modernInterpretation, category: r.category })}
      fromForm={(v) => ({
        name: reqL(v.name),
        description: reqL(v.description),
        modernInterpretation: reqL(v.modernInterpretation),
        category: v.category,
      })}
      renderForm={() => (
        <>
          <LTextField name="name" label={t('common.name')} multiline={false} />
          <Form.Item name="category" label={t('crud.category')} rules={[{ required: true, message: t('common.required') }]}>
            <Select options={VALUE_CATEGORIES.map((c) => ({ value: c, label: t(`value.cat.${c}` as const) }))} />
          </Form.Item>
          <LTextField name="description" label={t('value.definition')} rows={5} />
          <LTextField name="modernInterpretation" label={t('value.modern')} rows={5} />
        </>
      )}
    />
  );
}
