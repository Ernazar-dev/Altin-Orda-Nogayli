import type { Request } from 'express';
import rateLimit, { ipKeyGenerator } from 'express-rate-limit';
import { env } from '../config/env';

const message = { error: { code: 'RATE_LIMIT', message: 'So\'rovlar juda ko\'p, birozdan keyin urining' } };
const prod = env.NODE_ENV === 'production';

/** Barcha API so'rovlari: DoS va skraping'ga qarshi umumiy chegara (IP bo'yicha). */
export const apiLimiter = rateLimit({
  windowMs: 60_000,
  limit: 600,
  standardHeaders: true,
  legacyHeaders: false,
  message,
});

/** Rasm yuklab olish. */
export const assetLimiter = rateLimit({
  windowMs: 60_000,
  limit: 600,
  standardHeaders: true,
  legacyHeaders: false,
  message,
});

/** Ro'yxatdan o'tish va kirish: IP bo'yicha. */
export const authLimiter = rateLimit({
  windowMs: 15 * 60_000,
  limit: prod ? 30 : 300,
  standardHeaders: true,
  legacyHeaders: false,
  message,
});

/**
 * Parolni taxmin qilishga (brute-force) qarshi: bir IP + bir login uchun 15 daqiqada ko'pi bilan 8 ta XATO urinish.
 * Muvaffaqiyatli kirishlar hisobga olinmaydi.
 */
export const loginLimiter = rateLimit({
  windowMs: 15 * 60_000,
  limit: prod ? 8 : 100,
  skipSuccessfulRequests: true,
  standardHeaders: true,
  legacyHeaders: false,
  message,
  keyGenerator: (req: Request) => {
    const body = req.body as { username?: unknown } | undefined;
    const user = typeof body?.username === 'string' ? body.username.trim().toLowerCase().slice(0, 64) : '';
    return `${ipKeyGenerator(req.ip ?? '')}|${user}`;
  },
});
