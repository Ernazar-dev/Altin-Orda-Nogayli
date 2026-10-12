import type { LText } from '@/types';

/** Bo'sh tillarni olib tashlaydi; hammasi bo'sh bo'lsa undefined. */
export function cleanL(v?: LText | null): LText | undefined {
  if (!v) return undefined;
  const out: LText = {};
  if (v.uz?.trim()) out.uz = v.uz.trim();
  if (v.kaa?.trim()) out.kaa = v.kaa.trim();
  return out.uz || out.kaa ? out : undefined;
}

/** Majburiy LText: bo'sh bo'lsa ham {} qaytaradi (validatsiya forma darajasida). */
export function reqL(v?: LText | null): LText {
  return cleanL(v) ?? {};
}

export function num(v: number | null | undefined): number | null {
  return typeof v === 'number' && Number.isFinite(v) ? v : null;
}

export function str(v: string | null | undefined): string | undefined {
  const s = v?.trim();
  return s ? s : undefined;
}
