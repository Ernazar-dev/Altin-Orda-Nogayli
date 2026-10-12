import type { NextFunction, Request, Response } from 'express';
import { Prisma } from '@prisma/client';
import { MulterError } from 'multer';
import { HttpError } from '../lib/errors';
import { env } from '../config/env';

export const notFoundHandler = (_req: Request, res: Response): void => {
  res.status(404).json({ error: { code: 'NOT_FOUND', message: 'Yo\'l topilmadi' } });
};

export const errorHandler = (
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction,
): void => {
  if (err instanceof HttpError) {
    res.status(err.status).json({ error: { code: err.code, message: err.message, details: err.details } });
    return;
  }
  // body-parser xatolari: juda katta so'rov (413) va buzilgan JSON (400) — 500 emas.
  const bodyErr = err as { type?: string; status?: number };
  if (bodyErr?.type === 'entity.too.large') {
    res.status(413).json({ error: { code: 'PAYLOAD_TOO_LARGE', message: 'So\'rov hajmi juda katta' } });
    return;
  }
  if (bodyErr?.type === 'entity.parse.failed' || bodyErr?.type === 'encoding.unsupported') {
    res.status(400).json({ error: { code: 'BAD_REQUEST', message: 'So\'rov formati noto\'g\'ri (JSON kutilgan)' } });
    return;
  }
  if (err instanceof MulterError) {
    const message = err.code === 'LIMIT_FILE_SIZE' ? 'Fayl hajmi juda katta' : err.message;
    res.status(400).json({ error: { code: 'UPLOAD_ERROR', message } });
    return;
  }
  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    if (err.code === 'P2002') {
      res.status(409).json({ error: { code: 'CONFLICT', message: 'Bunday yozuv allaqachon mavjud' } });
      return;
    }
    if (err.code === 'P2025') {
      res.status(404).json({ error: { code: 'NOT_FOUND', message: 'Yozuv topilmadi' } });
      return;
    }
    if (err.code === 'P2003') {
      res.status(409).json({
        error: { code: 'CONFLICT', message: 'Bog\'liq yozuvlar mavjud yoki havola noto\'g\'ri' },
      });
      return;
    }
  }
  // Kutilmagan xato: ishlab chiqarishda ham jurnalga yoziladi (Render logs), lekin javobda ichki ma'lumot chiqmaydi.
  console.error(env.NODE_ENV === 'production' ? (err instanceof Error ? `${err.name}: ${err.message}` : err) : err);
  res.status(500).json({ error: { code: 'INTERNAL', message: 'Server xatosi' } });
};
