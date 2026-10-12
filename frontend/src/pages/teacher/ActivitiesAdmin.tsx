import { Form, Select, Tag } from 'antd';
import { useI18n } from '@/i18n';
import { activitiesApi } from '@/api/resources';
import { ACTIVITY_TYPES, CRITERIA } from '@/types';
import type { Activity, ActivityType, Criterion, LText } from '@/types';
import { BuilderHint, BuilderSection, CardPicker, LangModeBar, LangModeProvider } from '@/components/forms/Builder';
import { CrudPage } from '@/components/forms/CrudPage';
import { LTextField } from '@/components/forms/LTextInput';
import { OptionsEditor } from '@/components/forms/QuestionsEditor';
import { useLookups } from '@/hooks/useLookups';
import { cleanL, reqL } from '@/utils/payload';

interface OptionForm {
  text: LText;
  isCorrect: boolean;
  explanation?: LText;
}
interface FormValues {
  type: ActivityType;
  title: LText;
  prompt: LText;
  sourceId?: string;
  periodId?: string;
  thinkerId?: string;
  criterion: Criterion;
  options: OptionForm[];
}

export default function ActivitiesAdmin() {
  const { t, pick } = useI18n();
  const lookups = useLookups();
  return (
    <CrudPage<Activity, FormValues>
      title={t('crud.activities')}
      api={activitiesApi}
      loadFull={(id) => activitiesApi.get(id)}
      searchText={(r) => `${r.title.uz ?? ''} ${r.title.kaa ?? ''}`}
      initial={{
        type: 'SOURCE_ANALYSIS',
        criterion: 'AXIOLOGICAL',
        options: [0, 1, 2, 3].map(() => ({ isCorrect: false, text: {} })),
      }}
      drawerWidth={980}
      columns={[
        { title: t('common.title'), key: 'title', render: (_, r) => <strong>{pick(r.title)}</strong> },
        { title: t('common.type'), key: 'type', render: (_, r) => <Tag variant="filled">{t(`activity.type.${r.type}` as const)}</Tag> },
        { title: t('activity.criterion'), key: 'c', render: (_, r) => t(`criterion.${r.criterion}` as const) },
      ]}
      toForm={(r) => ({
        type: r.type,
        title: r.title,
        prompt: r.prompt,
        sourceId: r.sourceId ?? undefined,
        periodId: r.periodId ?? undefined,
        thinkerId: r.thinkerId ?? undefined,
        criterion: r.criterion,
        options: r.options.map((o) => ({ text: o.text, isCorrect: Boolean(o.isCorrect), explanation: o.explanation ?? undefined })),
      })}
      fromForm={(v) => ({
        type: v.type,
        title: reqL(v.title),
        prompt: reqL(v.prompt),
        sourceId: v.sourceId || null,
        periodId: v.periodId || null,
        thinkerId: v.thinkerId || null,
        criterion: v.criterion,
        options: v.options.map((o) => ({ text: reqL(o.text), isCorrect: Boolean(o.isCorrect), explanation: cleanL(o.explanation) ?? null })),
      })}
      renderForm={({ form }) => (
        <LangModeProvider>
          <BuilderHint steps={[t('b.hint1'), t('b.act.hint'), t('b.hint3')]} />
          <LangModeBar />
          <BuilderSection title={t('b.act.1')}>
            <Form.Item name="type" rules={[{ required: true, message: t('common.required') }]}>
              <CardPicker<ActivityType>
                items={ACTIVITY_TYPES.map((a) => ({ value: a, title: t(`activity.type.${a}` as const), desc: t(`activity.type.desc.${a}` as const) }))}
              />
            </Form.Item>
            <LTextField name="title" label={t('common.title')} multiline={false} compact />
            <Form.Item name="criterion" label={t('activity.criterion')} rules={[{ required: true, message: t('common.required') }]} style={{ maxWidth: 360 }}>
              <Select options={CRITERIA.map((c) => ({ value: c, label: t(`criterion.${c}` as const) }))} />
            </Form.Item>
          </BuilderSection>
          <BuilderSection title={t('b.act.2')}>
            <LTextField name="prompt" label={t('activity.prompt')} rows={3} compact />
          </BuilderSection>
          <BuilderSection title={t('b.act.3')}>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <Form.Item name="sourceId" label={t('activity.source')} style={{ flex: '1 1 260px' }}>
                <Select allowClear showSearch optionFilterProp="label" options={lookups.sources} />
              </Form.Item>
              <Form.Item name="periodId" label={t('crud.period')} style={{ flex: '1 1 180px' }}>
                <Select allowClear options={lookups.periods} />
              </Form.Item>
              <Form.Item name="thinkerId" label={t('crud.thinker')} style={{ flex: '1 1 180px' }}>
                <Select allowClear showSearch optionFilterProp="label" options={lookups.thinkers} />
              </Form.Item>
            </div>
          </BuilderSection>
          <BuilderSection title={t('b.act.4')}>
            <OptionsEditor listName="options" absolute={['options']} form={form} withExplanation />
          </BuilderSection>
        </LangModeProvider>
      )}
    />
  );
}
