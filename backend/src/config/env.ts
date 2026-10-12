import 'dotenv/config';
import { z } from 'zod';

const schema = z
  .object({
    NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
    PORT: z.coerce.number().default(4000),
    DATABASE_URL: z.string().min(1),
    JWT_SECRET: z.string().min(16),
    JWT_EXPIRES_IN: z.string().default('7d'),
    TEACHER_USERNAME: z.string().trim().toLowerCase().regex(/^[a-z0-9._-]{3,32}$/),
    TEACHER_PASSWORD: z.string().min(8).max(72),
    TEACHER_NAME: z.string().trim().min(3).max(120).default('Ustoz'),
    /** Ruxsat etilgan frontend manzillari, vergul bilan: https://site.onrender.com,https://boshqa.uz */
    CORS_ORIGIN: z.string().default('http://localhost:5173'),
    MAX_UPLOAD_MB: z.coerce.number().min(1).max(10).default(5),
  })
  .superRefine((v, ctx) => {
    if (v.NODE_ENV !== 'production') return;
    // Ishlab chiqarishda zaif sir va xavfli CORS sozlamalariga yo'l qo'yilmaydi.
    if (v.JWT_SECRET.length < 32 || /change-me|secret|password|12345/i.test(v.JWT_SECRET)) {
      ctx.addIssue({ code: 'custom', path: ['JWT_SECRET'], message: 'Ishlab chiqarishda JWT_SECRET kamida 32 belgili tasodifiy qiymat bo‘lsin' });
    }
    const origins = v.CORS_ORIGIN.split(',').map((o) => o.trim());
    if (origins.some((o) => o === '*' || !/^https:\/\//.test(o))) {
      ctx.addIssue({ code: 'custom', path: ['CORS_ORIGIN'], message: 'Ishlab chiqarishda CORS_ORIGIN faqat https:// manzillar bo‘lsin (yulduzcha mumkin emas)' });
    }
  });

const parsed = schema.safeParse(process.env);
if (!parsed.success) {
  console.error('Noto\'g\'ri environment:', parsed.error.flatten().fieldErrors);
  process.exit(1);
}

export const env = parsed.data;
