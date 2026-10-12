import type { Period } from '@/types';

export type Tone = 'gold' | 'teal';

/** Davr rangi: 1-davr (Oltin O'rda) – oltin, 2-davr (No'g'oyli) – firuza. */
export function toneOf(period?: Pick<Period, 'order'> | null): Tone {
  return period && period.order === 2 ? 'teal' : 'gold';
}

export const TONE_VARS: Record<Tone, { fg: string; soft: string; hex: string }> = {
  gold: { fg: 'var(--c-gold-deep)', soft: 'var(--c-gold-soft)', hex: '#8a6414' },
  teal: { fg: 'var(--c-teal)', soft: 'var(--c-teal-soft)', hex: '#1b6f6d' },
};
