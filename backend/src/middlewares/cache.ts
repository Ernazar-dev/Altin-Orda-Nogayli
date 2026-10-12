import type { NextFunction, Request, Response } from 'express';

/**
 * Ommaviy kontent (davrlar, mutafakkirlar, manbalar...) uchun xotiradagi kesh.
 * Baza uzoqda (Neon) bo'lgani uchun har bir so'rov bir necha tarmoq aylanishi (round-trip) talab qiladi;
 * kesh shu kutishni olib tashlaydi. Bu resurslar foydalanuvchiga bog'liq emas, shuning uchun kesh umumiy.
 * Shu resurslarga POST/PUT/DELETE kelsa kesh butunlay tozalanadi (o'qituvchi o'zgartirgach darhol yangi ma'lumot).
 */
const TTL_MS = 5 * 60_000;
const MAX_ENTRIES = 300;
const PREFIXES = ['/periods', '/thinkers', '/sources', '/values', '/timeline', '/comparisons'];

const store = new Map<string, { at: number; body: string }>();

const isCached = (path: string): boolean => PREFIXES.some((p) => path === p || path.startsWith(`${p}/`));

export const publicCache = (req: Request, res: Response, next: NextFunction): void => {
  if (!isCached(req.path)) {
    next();
    return;
  }
  if (req.method !== 'GET') {
    // Javob yuborilgach tozalaymiz: o'zgarish bazaga yozilganidan keyin eski nusxa qolib ketmasin.
    res.on('finish', () => store.clear());
    next();
    return;
  }
  const key = req.originalUrl;
  const hit = store.get(key);
  if (hit && Date.now() - hit.at < TTL_MS) {
    res.set({ 'X-Cache': 'HIT', 'Cache-Control': 'no-cache' }).type('json').send(hit.body);
    return;
  }
  const json = res.json.bind(res);
  res.json = (data: unknown) => {
    if (res.statusCode === 200) {
      if (store.size >= MAX_ENTRIES) store.delete(store.keys().next().value as string);
      store.set(key, { at: Date.now(), body: JSON.stringify(data) });
    }
    res.set('Cache-Control', 'no-cache');
    return json(data);
  };
  next();
};

/** Server ishga tushganda eng ko'p so'raladigan ro'yxatlarni oldindan yuklaydi: birinchi mehmon ham tez oladi. */
export async function warmPublicCache(port: number): Promise<void> {
  await Promise.allSettled(
    ['periods', 'thinkers', 'sources', 'values', 'timeline', 'comparisons'].map((p) =>
      fetch(`http://127.0.0.1:${port}/api/${p}`).then((r) => r.arrayBuffer()),
    ),
  );
}
