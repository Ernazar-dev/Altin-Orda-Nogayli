import axios, { AxiosError } from 'axios';
import type { ApiEnvelope, ApiErrorBody } from '@/types';

const TOKEN_KEY = 'ao.token';

/**
 * Backend manzili (origin). Lokal ishlab chiqishda bo'sh: so'rovlar Vite proksisi orqali ketadi.
 * Render'da frontend alohida saytda bo'lgani uchun VITE_API_URL=https://<backend>.onrender.com beriladi.
 */
export const API_ORIGIN = (import.meta.env.VITE_API_URL ?? '').replace(/\/+$/, '');

/** Backend'da saqlangan rasm (/uploads/...) manzilini to'liq URL'ga aylantiradi. */
export function assetUrl(path: string | null | undefined): string | undefined {
  if (!path) return undefined;
  return path.startsWith('/uploads/') ? `${API_ORIGIN}${path}` : path;
}

export const tokenStore = {
  get(): string | null {
    try {
      return localStorage.getItem(TOKEN_KEY);
    } catch {
      return null;
    }
  },
  set(token: string): void {
    try {
      localStorage.setItem(TOKEN_KEY, token);
    } catch {
      /* ignore */
    }
  },
  clear(): void {
    try {
      localStorage.removeItem(TOKEN_KEY);
    } catch {
      /* ignore */
    }
  },
};

export const http = axios.create({
  baseURL: `${API_ORIGIN}/api`,
  // Render bepul tarifida xizmat uyquda bo'lsa, birinchi so'rov ~1 daqiqagacha cho'zilishi mumkin.
  timeout: 70000,
});

http.interceptors.request.use((config) => {
  const token = tokenStore.get();
  if (token) config.headers.set('Authorization', `Bearer ${token}`);
  return config;
});

http.interceptors.response.use(
  (res) => res,
  (error: AxiosError<ApiErrorBody>) => {
    if (error.response?.status === 401 && tokenStore.get()) {
      tokenStore.clear();
      window.dispatchEvent(new Event('ao:unauthorized'));
    }
    return Promise.reject(error);
  },
);

/** Xato xabarini foydalanuvchi uchun ajratib oladi. */
export function errorMessage(err: unknown, fallback: string): string {
  if (axios.isAxiosError<ApiErrorBody>(err)) {
    return err.response?.data?.error?.message ?? fallback;
  }
  return fallback;
}

/**
 * Ommaviy kontent (foydalanuvchiga bog'liq emas) uchun qisqa muddatli kesh. Bir sahifada bir xil ro'yxat bir necha marta
 * so'ralsa (masalan, mutafakkirlar) tarmoqqa bitta so'rov ketadi, sahifalar orasida o'tish esa deyarli bir zumda bo'ladi.
 * Faqat shu resurslar keshlanadi: natijalar, progress, topshiriqlar kabi shaxsiy ma'lumotlar HECH QACHON.
 */
const CACHEABLE = /^\/(periods|thinkers|sources|values|timeline|comparisons)(\/|$)/;
const CACHE_TTL_MS = 60_000;
const cache = new Map<string, { at: number; data: Promise<unknown> }>();

/** Shu resursga yozuv bo'lsa kesh tozalanadi (boshqa so'rovlar, masalan progress/view, keshni buzmaydi). */
function invalidate(url: string): void {
  if (CACHEABLE.test(url)) cache.clear();
}

export function clearApiCache(): void {
  cache.clear();
}

export async function get<T>(url: string, params?: object): Promise<T> {
  if (!CACHEABLE.test(url)) {
    const res = await http.get<ApiEnvelope<T>>(url, { params });
    return res.data.data;
  }
  const key = `${url}?${JSON.stringify(params ?? {})}`;
  let hit = cache.get(key);
  if (!hit || Date.now() - hit.at > CACHE_TTL_MS) {
    const data = http.get<ApiEnvelope<T>>(url, { params }).then((r) => r.data.data);
    hit = { at: Date.now(), data };
    cache.set(key, hit);
    // Xato keshda qolib ketmasin: keyingi urinish yangidan so'raydi.
    data.catch(() => cache.delete(key));
  }
  // Nusxa qaytariladi: komponent massivni joyida o'zgartirsa (sort va h.k.) umumiy kesh buzilmaydi.
  return structuredClone(await hit.data) as T;
}
export async function post<T>(url: string, body?: unknown): Promise<T> {
  const res = await http.post<ApiEnvelope<T>>(url, body);
  invalidate(url);
  return res.data.data;
}
export async function put<T>(url: string, body?: unknown): Promise<T> {
  const res = await http.put<ApiEnvelope<T>>(url, body);
  invalidate(url);
  return res.data.data;
}
export async function del(url: string): Promise<void> {
  await http.delete(url);
  invalidate(url);
}
