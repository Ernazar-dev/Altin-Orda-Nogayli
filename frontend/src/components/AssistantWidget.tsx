import { useEffect, useRef, useState } from 'react';
import { Button, Input, Modal } from 'antd';
import type { TextAreaRef } from 'antd/es/input/TextArea';
import { ClearOutlined, CloseOutlined, FullscreenExitOutlined, FullscreenOutlined, MessageOutlined, SendOutlined } from '@ant-design/icons';
import { API_ORIGIN } from '@/api/client';
import { useI18n } from '@/i18n';
import styles from './AssistantWidget.module.scss';

interface Msg {
  id: number;
  role: 'user' | 'assistant';
  text: string;
}

const MAX_HISTORY = 11;
const MAX_LEN = 1000;
const SIZE_KEY = 'ao.assistant.large';

function readLarge(): boolean {
  try {
    return localStorage.getItem(SIZE_KEY) === '1';
  } catch {
    return false;
  }
}

const SUGGESTIONS = ['assistant.s1', 'assistant.s2', 'assistant.s3', 'assistant.s4'] as const;

/** O'ng pastki burchakdagi AI yordamchi: tugma bosilganda suhbat oynasi ochiladi. */
export function AssistantWidget() {
  const { t, lang } = useI18n();
  const [open, setOpen] = useState(false);
  const [large, setLarge] = useState(readLarge);
  const [messages, setMessages] = useState<Msg[]>([]);
  const [draft, setDraft] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const nextId = useRef(1);
  const abortRef = useRef<AbortController | null>(null);
  const endRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<TextAreaRef>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ block: 'end' });
  }, [messages, busy, error, open]);

  /** Javobni oqim (SSE) bilan oladi: matn kelgan sari ekranda o'sib boradi, to'liq javobni kutish shart emas. */
  async function run(history: Msg[]) {
    setBusy(true);
    setError(null);
    // Gemini suhbat foydalanuvchi xabaridan boshlanishini kutadi: kesilgan tarix boshidagi javoblar tashlanadi.
    const turns = history.slice(-MAX_HISTORY);
    const first = turns.findIndex((m) => m.role === 'user');
    const id = nextId.current++;
    const ctrl = new AbortController();
    abortRef.current = ctrl;
    const append = (chunk: string) =>
      setMessages((m) =>
        m.some((x) => x.id === id)
          ? m.map((x) => (x.id === id ? { ...x, text: x.text + chunk } : x))
          : [...m, { id, role: 'assistant', text: chunk }],
      );
    try {
      const res = await fetch(`${API_ORIGIN}/api/assistant/chat/stream`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ lang, messages: turns.slice(Math.max(first, 0)).map(({ role, text }) => ({ role, text })) }),
        signal: ctrl.signal,
      });
      if (!res.ok || !res.body) {
        const body = (await res.json().catch(() => null)) as { error?: { message?: string } } | null;
        throw new Error(body?.error?.message ?? t('assistant.error'));
      }
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buf = '';
      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        buf += decoder.decode(value, { stream: true });
        let nl: number;
        while ((nl = buf.indexOf('\n')) >= 0) {
          const line = buf.slice(0, nl).trim();
          buf = buf.slice(nl + 1);
          if (!line.startsWith('data:') || line.slice(5).trim() === '[DONE]') continue;
          const evt = JSON.parse(line.slice(5)) as { t?: string; e?: string };
          if (evt.e) throw new Error(evt.e);
          if (evt.t) append(evt.t);
        }
      }
    } catch (err) {
      if (ctrl.signal.aborted) return;
      setError(err instanceof Error && err.message ? err.message : t('assistant.error'));
    } finally {
      if (abortRef.current === ctrl) {
        abortRef.current = null;
        setBusy(false);
        inputRef.current?.focus();
      }
    }
  }

  /** Xatodan keyin qayta urinish: yarim kelgan javob tashlanib, oxirgi savoldan boshlanadi. */
  function retry() {
    const lastUser = messages.map((m) => m.role).lastIndexOf('user');
    const cut = messages.slice(0, lastUser + 1);
    setMessages(cut);
    void run(cut);
  }

  function ask(raw: string) {
    const text = raw.trim().slice(0, MAX_LEN);
    if (!text || busy) return;
    const next = [...messages, { id: nextId.current++, role: 'user' as const, text }];
    setMessages(next);
    setDraft('');
    void run(next);
  }

  function toggleSize() {
    setLarge((v) => {
      try {
        localStorage.setItem(SIZE_KEY, v ? '0' : '1');
      } catch {
        /* ignore */
      }
      return !v;
    });
  }

  function clear() {
    abortRef.current?.abort();
    abortRef.current = null;
    setBusy(false);
    setMessages([]);
    setError(null);
    setDraft('');
  }

  return (
    <>
      <button type="button" className={styles.fab} onClick={() => setOpen(true)} aria-haspopup="dialog" aria-label={t('assistant.open')}>
        <MessageOutlined />
        <span className={styles.fabLabel}>{t('assistant.open')}</span>
      </button>

      <Modal
        open={open}
        onCancel={() => setOpen(false)}
        footer={null}
        closable={false}
        centered
        width={large ? 900 : 460}
        rootClassName={styles.root}
        afterOpenChange={(o) => o && inputRef.current?.focus()}
        title={null}
        aria-label={t('assistant.title')}
      >
        <section className={`${styles.panel} ${large ? styles.large : ''}`}>
          <header className={styles.head}>
            <span className={styles.avatar} aria-hidden><MessageOutlined /></span>
            <div className={styles.headText}>
              <h2>{t('assistant.title')}</h2>
              <p>{t('assistant.subtitle')}</p>
            </div>
            {messages.length > 0 && <Button type="text" size="small" icon={<ClearOutlined />} onClick={clear} disabled={busy} aria-label={t('assistant.clear')} title={t('assistant.clear')} />}
            <Button className={styles.sizeBtn} type="text" size="small" icon={large ? <FullscreenExitOutlined /> : <FullscreenOutlined />} onClick={toggleSize} aria-pressed={large} aria-label={large ? t('assistant.shrink') : t('assistant.enlarge')} title={large ? t('assistant.shrink') : t('assistant.enlarge')} />
            <Button type="text" size="small" icon={<CloseOutlined />} onClick={() => setOpen(false)} aria-label={t('common.close')} />
          </header>

          <div className={styles.list} role="log" aria-live="polite" aria-busy={busy}>
            {messages.length === 0 && (
              <div className={styles.chips}>
                {SUGGESTIONS.map((k) => (
                  <button type="button" key={k} onClick={() => ask(t(k))}>{t(k)}</button>
                ))}
              </div>
            )}
            {messages.map((m) => (
              <div key={m.id} className={`${styles.msg} ${m.role === 'user' ? styles.me : styles.bot}`}>{m.text}</div>
            ))}
            {busy && messages[messages.length - 1]?.role === 'user' && <div className={`${styles.msg} ${styles.bot} ${styles.typing}`} aria-label={t('common.loading')}><i /><i /><i /></div>}
            {error && (
              <div className={styles.error} role="alert">
                <span>{error}</span>
                <Button size="small" onClick={retry} disabled={busy}>{t('common.retry')}</Button>
              </div>
            )}
            <div ref={endRef} />
          </div>

          <form className={styles.composer} onSubmit={(e) => { e.preventDefault(); ask(draft); }}>
            <Input.TextArea
              ref={inputRef}
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey && !e.nativeEvent.isComposing) { e.preventDefault(); ask(draft); }
              }}
              placeholder={t('assistant.placeholder')}
              aria-label={t('assistant.placeholder')}
              maxLength={MAX_LEN}
              autoSize={{ minRows: 1, maxRows: 4 }}
            />
            <Button type="primary" htmlType="submit" icon={<SendOutlined />} loading={busy} disabled={!draft.trim()} aria-label={t('assistant.send')} />
          </form>
          <p className={styles.note}>{t('assistant.note')}</p>
        </section>
      </Modal>
    </>
  );
}
