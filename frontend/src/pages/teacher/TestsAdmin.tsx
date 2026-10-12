import { Form, Select } from 'antd';
import { useI18n } from '@/i18n';
import { testsApi } from '@/api/resources';
import type { Criterion, LText, Test } from '@/types';
import { BuilderHint, BuilderSection, LangModeBar, LangModeProvider } from '@/components/forms/Builder';
import { CrudPage } from '@/components/forms/CrudPage';
import { LTextField } from '@/components/forms/LTextInput';
import { QuestionsEditor } from '@/components/forms/QuestionsEditor';
import { useLookups } from '@/hooks/useLookups';
import { cleanL, reqL } from '@/utils/payload';

interface QuestionForm {
  question: LText;
  criterion: Criterion;
  options: { text: LText; isCorrect: boolean }[];
}
interface FormValues {
  title: LText;
  description?: LText;
  periodId?: string;
  thinkerId?: string;
  questions: QuestionForm[];
}

export default function TestsAdmin() {
  const { t, pick } = useI18n();
  const lookups = useLookups();
  return (
    <CrudPage<Test, FormValues>
      title={t('crud.tests')}
      api={testsApi}
      loadFull={(id) => testsApi.get(id)}
      searchText={(r) => `${r.title.uz ?? ''} ${r.title.kaa ?? ''}`}
      initial={{
        questions: [{ criterion: 'COGNITIVE', options: [0, 1, 2, 3].map(() => ({ isCorrect: false, text: {} })) }] as unknown as QuestionForm[],
      }}
      drawerWidth={1180}
      columns={[
        { title: t('common.title'), key: 'title', render: (_, r) => <strong>{pick(r.title)}</strong> },
        { title: t('crud.questions'), dataIndex: 'questionCount', width: 140 },
        { title: t('test.period'), key: 'p', render: (_, r) => lookups.periods.find((p) => p.value === r.periodId)?.label ?? '–' },
      ]}
      toForm={(r) => ({
        title: r.title,
        description: r.description,
        periodId: r.periodId ?? undefined,
        thinkerId: r.thinkerId ?? undefined,
        questions: [...(r.questions ?? [])]
          .sort((a, b) => a.order - b.order)
          .map((q) => ({
            question: q.question,
            criterion: q.criterion,
            options: q.options.map((o) => ({ text: o.text, isCorrect: Boolean(o.isCorrect) })),
          })),
      })}
      fromForm={(v) => ({
        title: reqL(v.title),
        description: cleanL(v.description) ?? {},
        periodId: v.periodId || null,
        thinkerId: v.thinkerId || null,
        questions: v.questions.map((q, i) => ({
          question: reqL(q.question),
          order: i + 1,
          criterion: q.criterion,
          options: q.options.map((o) => ({ text: reqL(o.text), isCorrect: Boolean(o.isCorrect) })),
        })),
      })}
      renderForm={({ form }) => (
        <LangModeProvider>
          <BuilderHint steps={[t('b.hint1'), t('b.hint2'), t('b.hint3')]} />
          <LangModeBar />
          <BuilderSection title={t('b.general')}>
            <LTextField name="title" label={t('common.title')} multiline={false} compact />
            <LTextField name="description" label={t('common.description')} rows={2} required={false} compact />
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <Form.Item name="periodId" label={t('test.period')} style={{ flex: '1 1 220px' }}>
                <Select allowClear options={lookups.periods} />
              </Form.Item>
              <Form.Item name="thinkerId" label={t('test.thinker')} style={{ flex: '1 1 220px' }}>
                <Select allowClear showSearch optionFilterProp="label" options={lookups.thinkers} />
              </Form.Item>
            </div>
          </BuilderSection>
          <BuilderSection title={t('test.questionsEditor')}>
            <QuestionsEditor form={form} />
          </BuilderSection>
        </LangModeProvider>
      )}
    />
  );
}
