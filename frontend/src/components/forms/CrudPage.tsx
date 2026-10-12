import { useEffect, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import { useSearchParams } from 'react-router-dom';
import { App, Button, Drawer, Form, Input, Popconfirm, Space, Table } from 'antd';
import type { FormInstance } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import { useI18n } from '@/i18n';
import type { Payload, Resource } from '@/api/resources';
import { errorMessage } from '@/api/client';
import { useAsync } from '@/hooks/useAsync';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import { Async } from '@/components/Async';
import { EmptyState } from '@/components/EmptyState';
import { PageHeader } from '@/components/PageHeader';

export interface CrudProps<T extends { id: string }, F extends object> {
  title: string;
  api: Resource<T>;
  columns: ColumnsType<T>;
  /** Forma maydonlari. */
  renderForm: (ctx: { form: FormInstance<F>; record: T | null }) => ReactNode;
  toForm: (record: T) => F;
  fromForm: (values: F, record: T | null) => Payload;
  initial?: Partial<F>;
  /** Tahrirlashdan oldin to'liq yozuvni yuklash (ro'yxatda ichki ma'lumot bo'lmasa). */
  loadFull?: (id: string) => Promise<T>;
  searchText?: (r: T) => string;
  drawerWidth?: number;
  /** Saqlangandan keyin qo'shimcha amal (masalan, bog'lanishlar). */
  afterSave?: (saved: T, values: F) => Promise<void>;
  extraActions?: (r: T, reload: () => void) => ReactNode;
  toolbar?: ReactNode;
  filterRow?: (r: T) => boolean;
}

interface EditorFormProps<T, F extends object> {
  record: T | null;
  initialValues: F | undefined;
  saving: boolean;
  formRef: { current: FormInstance<F> | null };
  renderForm: (ctx: { form: FormInstance<F>; record: T | null }) => ReactNode;
  onFinish: (values: F) => void;
  onInvalid: (errorFields: { name: (string | number)[] }[]) => void;
  onDirty: () => void;
  optionalMark: string;
}

/**
 * Har ochilishda yangi montaj qilinadi va o'z `Form` instance'iga ega bo'ladi,
 * shuning uchun oldingi yozuvning qiymatlari keyingi formaga o'tib qolmaydi.
 */
function EditorForm<T, F extends object>(props: EditorFormProps<T, F>) {
  const [form] = Form.useForm<F>();
  const { formRef } = props;
  useEffect(() => {
    formRef.current = form;
    return () => {
      formRef.current = null;
    };
  }, [form, formRef]);
  return (
    <Form<F>
      form={form}
      layout="vertical"
      requiredMark={(label, info) => (
        <>
          {label}
          {!info.required && <span style={{ color: 'var(--c-muted)', fontWeight: 400, marginLeft: 6 }}>({props.optionalMark})</span>}
        </>
      )}
      onFinish={(v) => props.onFinish(v)}
      onFinishFailed={(info) => props.onInvalid(info.errorFields)}
      onValuesChange={props.onDirty}
      disabled={props.saving}
      initialValues={props.initialValues}
      scrollToFirstError
    >
      {props.renderForm({ form, record: props.record })}
    </Form>
  );
}

export function CrudPage<T extends { id: string }, F extends object>(props: CrudProps<T, F>) {
  const { t } = useI18n();
  const { message, modal } = App.useApp();
  const formRef = useRef<FormInstance<F> | null>(null);
  const [open, setOpen] = useState(false);
  const [record, setRecord] = useState<T | null>(null);
  const [nonce, setNonce] = useState(0);
  const [saving, setSaving] = useState(false);
  const [opening, setOpening] = useState<string | null>(null);
  const [q, setQ] = useState('');
  const [dirty, setDirty] = useState(false);
  const [page, setPage] = useState(1);
  useDocumentTitle(props.title);
  const state = useAsync(() => props.api.list(), []);
  const query = q.trim().toLocaleLowerCase();
  const filteredRows = (state.data ?? []).filter(r =>
    (!props.filterRow || props.filterRow(r)) &&
    (!props.searchText || !query || props.searchText(r).toLocaleLowerCase().includes(query)),
  );
  const currentPage = Math.min(page, Math.max(1, Math.ceil(filteredRows.length / 15)));
  useEffect(() => {
    if (!open || !dirty) return;
    const prevent = (event: BeforeUnloadEvent) => { event.preventDefault(); event.returnValue = ''; };
    window.addEventListener('beforeunload', prevent);
    return () => window.removeEventListener('beforeunload', prevent);
  }, [open, dirty]);

  function closeEditor() {
    if (saving) return;
    if (!dirty) { setOpen(false); return; }
    modal.confirm({ title: t('study.unsaved'), content: t('study.unsavedBody'), okText: t('study.discard'), cancelText: t('study.keepEditing'), onOk: () => { setDirty(false); setOpen(false); } });
  }

  const openNew = () => {
    setDirty(false);
    setRecord(null);
    setNonce((n) => n + 1);
    setOpen(true);
  };

  // `?new=1` bilan kelinsa (masalan, boshqaruv panelidagi «Test qo'shish»), yangi yozuv oynasi darhol ochiladi.
  const [searchParams, setSearchParams] = useSearchParams();
  useEffect(() => {
    if (searchParams.get('new') !== '1') return;
    openNew();
    const next = new URLSearchParams(searchParams);
    next.delete('new');
    setSearchParams(next, { replace: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function openEdit(r: T) {
    setOpening(r.id);
    try {
      const full = props.loadFull ? await props.loadFull(r.id) : r;
      setDirty(false);
      setRecord(full);
      setNonce((n) => n + 1);
      setOpen(true);
    } catch (e) {
      void message.error(errorMessage(e, t('common.error')));
    } finally {
      setOpening(null);
    }
  }

  async function onFinish(values: F) {
    setSaving(true);
    try {
      const payload = props.fromForm(values, record);
      const saved = record ? await props.api.update(record.id, payload) : await props.api.create(payload);
      if (props.afterSave) await props.afterSave(saved, values);
      void message.success(t('common.saved'));
      setDirty(false);
      setOpen(false);
      state.reload();
    } catch (e) {
      void message.error(errorMessage(e, t('common.error')));
    } finally {
      setSaving(false);
    }
  }

  async function remove(r: T) {
    try {
      await props.api.remove(r.id);
      void message.success(t('common.deleted'));
      state.reload();
    } catch (e) {
      void message.error(errorMessage(e, t('common.error')));
    }
  }

  const columns: ColumnsType<T> = [
      ...props.columns,
      {
        title: t('common.actions'),
        key: 'actions',
        fixed: 'right',
        width: 150,
        render: (_, r) => (
          <Space size={4}>
            {props.extraActions?.(r, state.reload)}
            <Button type="text" icon={<EditOutlined />} loading={opening === r.id} onClick={() => void openEdit(r)} aria-label={t('common.edit')} />
            <Popconfirm title={t('common.confirmDelete')} okText={t('common.yes')} cancelText={t('common.no')} onConfirm={() => void remove(r)}>
              <Button type="text" danger icon={<DeleteOutlined />} aria-label={t('common.delete')} />
            </Popconfirm>
          </Space>
        ),
      },
    ];

  return (
    <>
      <PageHeader
        eyebrow={t('nav.manage')}
        title={props.title}
        actions={
          <Button type="primary" icon={<PlusOutlined />} onClick={openNew} size="large">
            {t('common.add')}
          </Button>
        }
      />
      <div className="crud-toolbar">
      {props.searchText && (
        <Input.Search
          allowClear
          placeholder={t('common.search')}
          value={q}
          onChange={(e) => { setQ(e.target.value); setPage(1); }}
          style={{ maxWidth: 360 }}
          aria-label={t('common.search')}
        />
      )}
      {props.toolbar}
      <span className="muted" aria-live="polite">{state.data ? t('study.records', { count: filteredRows.length }) : t('common.loading')}</span>
      </div>
      <Async
        state={state}
        isEmpty={(d) => d.length === 0}
        empty={<EmptyState description={t('empty.teacherAdd')} action={<Button type="primary" onClick={openNew}>{t('common.add')}</Button>} />}
      >
        {() => (
          <Table<T>
            rowKey="id"
            columns={columns}
            dataSource={filteredRows}
            pagination={{ current: currentPage, onChange: setPage, pageSize: 15, hideOnSinglePage: true, showSizeChanger: false }}
            scroll={{ x: 'max-content' }}
          />
        )}
      </Async>
      <Drawer
        open={open}
        onClose={closeEditor}
        closable={!saving}
        keyboard={!saving}
        maskClosable={!saving}
        title={record ? t('crud.editTitle') : t('crud.new')}
        size={`min(${props.drawerWidth ?? 780}px, 100vw)`}
        destroyOnHidden
        extra={
          <Space>
            <Button disabled={saving} onClick={closeEditor}>{t('common.cancel')}</Button>
            <Button type="primary" loading={saving} onClick={() => formRef.current?.submit()}>
              {t('common.save')}
            </Button>
          </Space>
        }
      >
        <EditorForm<T, F>
          key={`${record?.id ?? 'new'}-${nonce}`}
          record={record}
          initialValues={record ? props.toForm(record) : (props.initial as F | undefined)}
          saving={saving}
          formRef={formRef}
          renderForm={props.renderForm}
          onFinish={(v) => void onFinish(v)}
          onInvalid={(fields) => {
            window.dispatchEvent(new CustomEvent('crud-invalid', { detail: fields }));
            void message.error(t('b.invalid'));
          }}
          onDirty={() => setDirty(true)}
          optionalMark={t('common.optionalMark')}
        />
      </Drawer>
    </>
  );
}
