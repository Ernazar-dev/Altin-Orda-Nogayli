import { useEffect } from 'react';
import { useState } from 'react';
import { Alert, App, Button, Form, InputNumber } from 'antd';
import { useI18n } from '@/i18n';
import { settingsApi } from '@/api/resources';
import { errorMessage } from '@/api/client';
import { useAsync } from '@/hooks/useAsync';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import { Async } from '@/components/Async';
import { PageHeader } from '@/components/PageHeader';
import { LevelTag } from '@/components/Results';
import type { LevelThreshold } from '@/types';

interface Values {
  high: number;
  medium: number;
}

export default function Settings() {
  const { t } = useI18n();
  const { message } = App.useApp();
  useDocumentTitle(t('nav.settings'));
  const state = useAsync(() => settingsApi.levels(), []);
  const [form] = Form.useForm<Values>();
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!state.data) return;
    form.setFieldsValue({
      high: state.data.find((l) => l.level === 'HIGH')?.minPercent ?? 80,
      medium: state.data.find((l) => l.level === 'MEDIUM')?.minPercent ?? 60,
    });
  }, [state.data, form]);

  async function save(v: Values) {
    setSaving(true);
    try {
      const body: LevelThreshold[] = [
        { level: 'HIGH', minPercent: v.high },
        { level: 'MEDIUM', minPercent: v.medium },
        { level: 'LOW', minPercent: 0 },
      ];
      await settingsApi.saveLevels(body);
      void message.success(t('common.saved'));
      state.reload();
    } catch (e) {
      void message.error(errorMessage(e, t('common.error')));
    } finally {
      setSaving(false);
    }
  }

  return (
    <>
      <PageHeader eyebrow={t('nav.control')} title={t('settings.levels')} />
      <Alert type="warning" showIcon title={t('settings.levelsNote')} style={{ marginBottom: 24, maxWidth: 720 }} />
      <Async state={state}>
        {() => (
          <Form<Values> form={form} layout="vertical" onFinish={(v) => void save(v)} style={{ maxWidth: 420 }}>
            <Form.Item
              name="high"
              label={<span><LevelTag level="HIGH" /> {t('settings.minPercent')}</span>}
              rules={[{ required: true, message: t('common.required') }]}
            >
              <InputNumber min={1} max={100} suffix="%" style={{ width: '100%' }} />
            </Form.Item>
            <Form.Item
              name="medium"
              label={<span><LevelTag level="MEDIUM" /> {t('settings.minPercent')}</span>}
              dependencies={['high']}
              rules={[
                { required: true, message: t('common.required') },
                ({ getFieldValue }) => ({
                  validator: (_, v: number) => (v < (getFieldValue('high') as number) && v >= 1 ? Promise.resolve() : Promise.reject(new Error(t('settings.invalid')))),
                }),
              ]}
            >
              <InputNumber min={1} max={99} suffix="%" style={{ width: '100%' }} />
            </Form.Item>
            <p>
              <LevelTag level="LOW" /> {t('settings.lowFixed')}
            </p>
            <Button type="primary" htmlType="submit" loading={saving} size="large">
              {t('common.save')}
            </Button>
          </Form>
        )}
      </Async>
    </>
  );
}
