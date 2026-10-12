import { Alert, Button, Form, Input, Select, Tag } from 'antd';
import { Link, useSearchParams } from 'react-router-dom';
import { useI18n } from '@/i18n';
import { sourcesApi } from '@/api/resources';
import { SOURCE_TYPES } from '@/types';
import type { LText, Source, SourceType, ReviewStatus } from '@/types';
import { CrudPage } from '@/components/forms/CrudPage';
import { LTextField } from '@/components/forms/LTextInput';
import { ImageUpload } from '@/components/forms/ImageUpload';
import { useLookups } from '@/hooks/useLookups';
import { cleanL, reqL, str } from '@/utils/payload';

interface FormValues {
  title: LText;
  type: SourceType;
  periodId: string;
  thinkerId?: string;
  content: string;
  excerpt: string;
  description: LText;
  educationalMeaning: LText;
  dissertationNote?: LText;
  reference: string;
  image: string | null;
  valueIds: string[];
  reviewStatus: ReviewStatus;
}

export default function SourcesAdmin() {
  const { t, pick } = useI18n();
  const lookups = useLookups();
  const [params, setParams] = useSearchParams();
  const review = params.get('review');
  const issue = params.get('issue');
  return (
    <CrudPage<Source, FormValues>
      title={t('crud.sources')}
      api={sourcesApi}
      loadFull={(id) => sourcesApi.get(id)}
      searchText={(r) => `${r.title.uz ?? ''} ${r.title.kaa ?? ''} ${r.reference}`}
      initial={{ type: 'TOLGOV', valueIds: [], reviewStatus: 'DRAFT' }}
      filterRow={r => (!review || (r.reviewStatus ?? 'DRAFT') === review) && (issue !== 'reference' || !r.reference?.trim()) && (issue !== 'content' || !r.content?.trim())}
      toolbar={<><Select aria-label={t('study.reviewState')} placeholder={t('study.reviewState')} allowClear value={review ?? undefined} style={{ minWidth: 220 }} onChange={v => setParams(v ? { review: v } : {})} options={[{ value: 'DRAFT', label: t('study.drafts') }, { value: 'REVIEWED', label: t('study.reviewed') }]} />{issue && <Button onClick={() => setParams({})}>{t('common.reset')}: {t(issue === 'reference' ? 'study.references' : 'study.missingOriginal')}</Button>}</>}
      extraActions={r => <Link to={`/sources/${r.id}`} aria-label={t('common.view')}><Button type="text">↗</Button></Link>}
      columns={[
        { title: t('common.title'), key: 'title', width: 280, render: (_, r) => <strong style={{ display: 'block', maxWidth: 280, whiteSpace: 'normal' }}>{pick(r.title)}</strong> },
        { title: t('source.type'), key: 'type', width: 140, render: (_, r) => <Tag variant="filled">{t(`source.type.${r.type}` as const)}</Tag> },
        { title: t('source.reference'), dataIndex: 'reference', width: 240, render: (value: string) => <span style={{ display: 'block', maxWidth: 240, whiteSpace: 'normal' }}>{value}</span> },
        { title: t('study.reviewState'), key: 'review', width: 180, render: (_, r) => <Tag color={r.reviewStatus === 'REVIEWED' ? 'green' : 'gold'}>{t(r.reviewStatus === 'REVIEWED' ? 'study.reviewed' : 'study.drafts')}</Tag> },
      ]}
      toForm={(r) => ({
        title: r.title,
        type: r.type,
        periodId: r.periodId,
        thinkerId: r.thinkerId ?? undefined,
        content: r.content,
        excerpt: r.excerpt,
        description: r.description,
        educationalMeaning: r.educationalMeaning,
        dissertationNote: r.dissertationNote ?? undefined,
        reference: r.reference,
        image: r.image ?? null,
        valueIds: r.valueIds ?? [],
        reviewStatus: r.reviewStatus ?? 'DRAFT',
      })}
      fromForm={(v) => ({
        title: reqL(v.title),
        type: v.type,
        periodId: v.periodId,
        thinkerId: v.thinkerId || null,
        content: v.content,
        excerpt: str(v.excerpt) ?? v.content.split('\n').slice(0, 3).join('\n'),
        description: reqL(v.description),
        educationalMeaning: reqL(v.educationalMeaning),
        dissertationNote: cleanL(v.dissertationNote) ?? null,
        reference: v.reference.trim(),
        image: v.image ?? null,
        valueIds: v.valueIds,
        reviewStatus: v.reviewStatus,
      })}
      renderForm={() => (
        <>
          <Alert type="info" showIcon style={{ marginBottom: 16 }} title={t('crud.contentOriginal')} />
          <LTextField name="title" label={t('common.title')} multiline={false} />
          <Form.Item name="reviewStatus" label={t('study.reviewState')} rules={[{ required: true, message: t('common.required') }]}><Select options={[{ value: 'DRAFT', label: t('study.drafts') }, { value: 'REVIEWED', label: t('study.reviewed') }]} /></Form.Item>
          <Form.Item name="type" label={t('source.type')} rules={[{ required: true, message: t('common.required') }]}>
            <Select options={SOURCE_TYPES.map((s) => ({ value: s, label: t(`source.type.${s}` as const) }))} />
          </Form.Item>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <Form.Item name="periodId" label={t('crud.period')} rules={[{ required: true, message: t('common.required') }]} style={{ flex: '1 1 220px' }}>
              <Select options={lookups.periods} loading={lookups.loading} />
            </Form.Item>
            <Form.Item name="thinkerId" label={t('crud.thinker')} style={{ flex: '1 1 220px' }}>
              <Select allowClear showSearch optionFilterProp="label" options={lookups.thinkers} />
            </Form.Item>
          </div>
          <Form.Item name="content" label={t('source.content')} rules={[{ required: true, message: t('common.required') }]}>
            <Input.TextArea lang="uz-Cyrl" autoSize={{ minRows: 6, maxRows: 18 }} style={{ fontFamily: 'var(--f-serif)', fontSize: 16 }} />
          </Form.Item>
          <Form.Item name="excerpt" label={t('crud.excerpt')}>
            <Input.TextArea lang="uz-Cyrl" autoSize={{ minRows: 2, maxRows: 6 }} />
          </Form.Item>
          <Form.Item name="reference" label={t('crud.reference')} rules={[{ required: true, message: t('common.required') }]}>
            <Input />
          </Form.Item>
          <LTextField name="description" label={t('common.description')} rows={3} />
          <LTextField name="dissertationNote" label={t('crud.dissertationNote')} rows={4} required={false} />
          <LTextField name="educationalMeaning" label={t('crud.educationalMeaning')} rows={4} />
          <Form.Item name="valueIds" label={t('source.values')}>
            <Select mode="multiple" showSearch optionFilterProp="label" options={lookups.values} />
          </Form.Item>
          <Form.Item name="image" label={t('common.imageOptional')}>
            <ImageUpload />
          </Form.Item>
        </>
      )}
    />
  );
}
