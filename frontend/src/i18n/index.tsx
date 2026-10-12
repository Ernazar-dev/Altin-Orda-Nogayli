import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import type { Lang, LText } from '@/types';
import { uz } from './uz';
import type { I18nKey } from './uz';
import { kaa } from './kaa';

const dictionaries: Record<Lang, Record<I18nKey, string>> = { uz, kaa };
const STORAGE_KEY = 'ao.lang';

function readStoredLang(): Lang {
  try {
    const v = localStorage.getItem(STORAGE_KEY);
    if (v === 'uz' || v === 'kaa') return v;
  } catch {
    /* localStorage mavjud emas */
  }
  return 'kaa';
}

/** Tanlangan tilni oladi; bo'sh bo'lsa ikkinchisiga qaytadi. */
export function pickText(lt: LText | string | null | undefined, lang: Lang): string {
  if (!lt) return '';
  if (typeof lt === 'string') return lt;
  const other: Lang = lang === 'uz' ? 'kaa' : 'uz';
  return lt[lang]?.trim() ? (lt[lang] as string) : (lt[other] ?? '');
}

/** Tanlangan tilda matn yo'qligini bildiradi (zaxira til ishlatilgan). */
export function isFallback(lt: LText | null | undefined, lang: Lang): boolean {
  if (!lt) return false;
  return !lt[lang]?.trim() && Boolean(lt[lang === 'uz' ? 'kaa' : 'uz']?.trim());
}

interface I18nValue {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: I18nKey, params?: Record<string, string | number>) => string;
  pick: (lt: LText | string | null | undefined) => string;
}

const I18nContext = createContext<I18nValue | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(readStoredLang);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    try {
      localStorage.setItem(STORAGE_KEY, l);
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang === 'kaa' ? 'kaa' : 'uz';
  }, [lang]);

  const value = useMemo<I18nValue>(
    () => ({
      lang,
      setLang,
      t: (key, params) => {
        let s = dictionaries[lang][key] ?? key;
        if (params) {
          for (const [k, v] of Object.entries(params)) s = s.replace(`{${k}}`, String(v));
        }
        return s;
      },
      pick: (lt) => pickText(lt, lang),
    }),
    [lang, setLang],
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n(): I18nValue {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error('useI18n I18nProvider ichida ishlatilishi kerak');
  return ctx;
}

export type { I18nKey };
