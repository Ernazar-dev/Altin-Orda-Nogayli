import { Alert, Form, Select, Tag } from 'antd';
import { useI18n } from '@/i18n';
import { diagnosticsApi } from '@/api/resources';
import type { Criterion, Diagnostic, DiagnosticKind, LText } from '@/types';
import { BuilderHint, BuilderSection, LangModeBar, LangModeProvider } from '@/components/forms/Builder';
import { CrudPage } from '@/components/forms/CrudPage';
import { LTextField } from '@/components/forms/LTextInput';
import { QuestionsEditor } from '@/components/forms/QuestionsEditor';
import { reqL } from '@/utils/payload';

interface FormValues {
  kind: DiagnosticKind;
  title: LText;
  questions: { question: LText; criterion: Criterion; options: { text: LText; isCorrect: boolean }[] }[];
}

export default function DiagnosticsAdmin() {
  const { t, pick } = useI18n();
  return (
    <CrudPage<Diagnostic, FormValues>
      title={t('crud.diagnostics')}
      api={diagnosticsApi}
      loadFull={(id) => diagnosticsApi.get(id)}
      drawerWidth={1180}
      initial={{
        kind: 'INITIAL',
        questions: [{ criterion: 'COGNITIVE', options: [0, 1, 2, 3].map(() => ({ isCorrect: false, text: {} })) }] as unknown as FormValues['questions'],
      }}
      columns={[
        {
          title: t('diag.kind'),
          key: 'k',
          width: 200,
          render: (_, r) => <Tag color={r.kind === 'INITIAL' ? 'blue' : 'gold'} variant="filled">{r.kind === 'INITIAL' ? t('diag.initial') : t('diag.final')}</Tag>,
        },
        { title: t('common.title'), key: 'title', render: (_, r) => <strong>{pick(r.title)}</strong> },
        { title: t('crud.questions'), key: 'q', width: 140, render: (_, r) => r.questionCount ?? r.questions?.length ?? 0 },
      ]}
      toForm={(r) => ({
        kind: r.kind,
        title: r.title,
        questions: [...(r.questions ?? [])]
          .sort((a, b) => a.order - b.order)
          .map((q) => ({
            question: q.question,
            criterion: q.criterion,
            options: q.options.map((o) => ({ text: o.text, isCorrect: Boolean(o.isCorrect) })),
          })),
      })}
      fromForm={(v) => ({
        kind: v.kind,
        title: reqL(v.title),
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
          <Alert type="info" showIcon style={{ marginBottom: 16 }} title={t('diag.noteDesc')} />
          <LangModeBar />
          <BuilderSection title={t('b.general')}>
            <Form.Item name="kind" label={t('crud.diagnosticKind')} rules={[{ required: true, message: t('common.required') }]}>
              <Select
                options={[
                  { value: 'INITIAL', label: t('diag.initial') },
                  { value: 'FINAL', label: t('diag.final') },
                ]}
              />
            </Form.Item>
            <LTextField name="title" label={t('common.title')} multiline={false} compact />
          </BuilderSection>
          <BuilderSection title={t('diag.editor')}>
            <QuestionsEditor form={form} />
          </BuilderSection>
        </LangModeProvider>
      )}
    />
  );
}
