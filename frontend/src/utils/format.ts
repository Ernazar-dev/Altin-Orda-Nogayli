import type { Level } from '@/types';

export function yearsLabel(a?: number | null, b?: number | null): string | null {
  if (a && b) return `${a}–${b}`;
  if (a) return `${a}–`;
  if (b) return `–${b}`;
  return null;
}

export function initials(name: string): string {
  const parts = name.replace(/[()]/g, '').trim().split(/\s+/).filter(Boolean);
  const pick = parts.filter((p) => !/^(jırov|jıraw|jirov|sheshen|chechan)$/i.test(p));
  const src = pick.length >= 2 ? pick : parts;
  return src
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase() ?? '')
    .join('');
}

export function formatDate(iso: string, lang: 'uz' | 'kaa'): string {
  const d = new Date(iso);
  return d.toLocaleDateString(lang === 'kaa' ? 'kk-KZ' : 'uz-UZ', { year: 'numeric', month: '2-digit', day: '2-digit' });
}

/** «12.10.2026, 14:35» ko'rinishida sana va vaqt. */
export function formatDateTime(iso: string, lang: 'uz' | 'kaa'): string {
  const d = new Date(iso);
  const locale = lang === 'kaa' ? 'kk-KZ' : 'uz-UZ';
  return `${d.toLocaleDateString(locale, { day: '2-digit', month: '2-digit', year: 'numeric' })}, ${d.toLocaleTimeString(locale, { hour: '2-digit', minute: '2-digit' })}`;
}

export const LEVEL_COLOR: Record<Level, string> = {
  HIGH: 'var(--c-ok)',
  MEDIUM: 'var(--c-warn)',
  LOW: 'var(--c-bad)',
};

export function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}
