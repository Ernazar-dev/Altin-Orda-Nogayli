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

export async function get<T>(url: string, params?: object): Promise<T> {
  const res = await http.get<ApiEnvelope<T>>(url, { params });
  return res.data.data;
}
export async function post<T>(url: string, body?: unknown): Promise<T> {
  const res = await http.post<ApiEnvelope<T>>(url, body);
  return res.data.data;
}
export async function put<T>(url: string, body?: unknown): Promise<T> {
  const res = await http.put<ApiEnvelope<T>>(url, body);
  return res.data.data;
}
export async function del(url: string): Promise<void> {
  await http.delete(url);
}
