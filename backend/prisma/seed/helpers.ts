import type { LText } from '../../src/lib/types';

/** "Uzbekcha | Qaraqalpaqsha" -> { uz, kaa }. Bitta matn (ajratgichsiz) ikkala tilga bir xil. */
export const t = (s: string): LText => {
  const i = s.indexOf(' | ');
  if (i === -1) return { uz: s, kaa: s };
  return { uz: s.slice(0, i).trim(), kaa: s.slice(i + 3).trim() };
};

/** Kalit bo'yicha bog'lash uchun oddiy registry. */
export class Registry<T> {
  private map = new Map<string, T>();
  set(key: string, value: T): void {
    this.map.set(key, value);
  }
  get(key: string): T {
    const v = this.map.get(key);
    if (v === undefined) throw new Error(`Seed kaliti topilmadi: ${key}`);
    return v;
  }
  entries(): [string, T][] {
    return [...this.map.entries()];
  }
}

export const rotate = <T>(arr: T[], by: number): T[] => {
  const n = arr.length;
  const k = ((by % n) + n) % n;
  return [...arr.slice(k), ...arr.slice(0, k)];
};
