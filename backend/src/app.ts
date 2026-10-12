import cors from 'cors';
import express, { type Express } from 'express';
import helmet from 'helmet';
import { env } from './config/env';
import { prisma } from './config/prisma';
import { asyncHandler, param } from './lib/http';
import { errorHandler, notFoundHandler } from './middlewares/error';
import { apiLimiter, assetLimiter } from './middlewares/rateLimit';
import { MIME_BY_EXT, type ImageExt } from './middlewares/upload';
import { activitiesRoutes } from './modules/activities/activities.routes';
import { analyticsRoutes } from './modules/analytics/analytics.routes';
import { authRoutes } from './modules/auth/auth.routes';
import { comparisonsRoutes } from './modules/comparisons/comparisons.routes';
import { diagnosticsRoutes } from './modules/diagnostics/diagnostics.routes';
import { periodsRoutes } from './modules/periods/periods.routes';
import { progressRoutes, resultsRoutes } from './modules/results/results.routes';
import { settingsRoutes } from './modules/settings/settings.routes';
import { sourcesRoutes } from './modules/sources/sources.routes';
import { studentsRoutes } from './modules/students/students.routes';
import { testsRoutes } from './modules/tests/tests.routes';
import { thinkersRoutes } from './modules/thinkers/thinkers.routes';
import { timelineRoutes } from './modules/timeline/timeline.routes';
import { uploadsRoutes } from './modules/uploads/uploads.routes';
import { valuesRoutes } from './modules/values/values.routes';

const UPLOAD_FILE = /^([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})\.(jpg|png|webp)$/;

export const createApp = (): Express => {
  const app = express();
  app.disable('x-powered-by');
  // Render (va boshqa proksi) ortida haqiqiy mijoz IP'sini olish uchun: aks holda rate-limit hammani bitta IP deb hisoblaydi.
  if (env.NODE_ENV === 'production') app.set('trust proxy', 1);
  app.use(helmet({ crossOriginResourcePolicy: { policy: 'cross-origin' } }));
  app.use(
    cors({
      origin: env.CORS_ORIGIN.split(',').map((o) => o.trim()),
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization'],
      maxAge: 600,
    }),
  );
  app.use(express.json({ limit: '1mb' }));

  app.get('/api/health', (_req, res) => {
    res.json({ data: { status: 'ok' } });
  });

  // Yuklangan rasmlar bazadan beriladi (disk emas). Faqat uuid.jpg|png|webp ko'rinishidagi nomlar qabul qilinadi.
  app.get(
    '/uploads/:file',
    assetLimiter,
    asyncHandler(async (req, res) => {
      const m = UPLOAD_FILE.exec(param(req, 'file'));
      const row = m ? await prisma.upload.findUnique({ where: { id: m[1] } }) : null;
      if (!m || !row || MIME_BY_EXT[m[2] as ImageExt] !== row.mime) {
        res.status(404).json({ error: { code: 'NOT_FOUND', message: 'Fayl topilmadi' } });
        return;
      }
      res.set({
        'Content-Type': row.mime,
        'Cache-Control': 'public, max-age=31536000, immutable',
        'X-Content-Type-Options': 'nosniff',
        'Content-Security-Policy': "default-src 'none'; sandbox",
      });
      res.send(Buffer.from(row.data));
    }),
  );

  const api = express.Router();
  api.use(apiLimiter);
  api.use('/auth', authRoutes);
  api.use('/periods', periodsRoutes);
  api.use('/thinkers', thinkersRoutes);
  api.use('/values', valuesRoutes);
  api.use('/sources', sourcesRoutes);
  api.use('/activities', activitiesRoutes);
  api.use('/tests', testsRoutes);
  api.use('/diagnostics', diagnosticsRoutes);
  api.use('/timeline', timelineRoutes);
  api.use('/comparisons', comparisonsRoutes);
  api.use('/uploads', uploadsRoutes);
  api.use('/results', resultsRoutes);
  api.use('/progress', progressRoutes);
  api.use('/students', studentsRoutes);
  api.use('/settings', settingsRoutes);
  api.use('/analytics', analyticsRoutes);
  app.use('/api', api);

  app.use(notFoundHandler);
  app.use(errorHandler);
  return app;
};
