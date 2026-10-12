import { Router } from 'express';
import { z } from 'zod';
import { asyncHandler, send } from '../../lib/http';
import { authenticate, currentUser } from '../../middlewares/auth';
import { authLimiter, loginLimiter } from '../../middlewares/rateLimit';
import { validateBody } from '../../middlewares/validate';
import { authService } from './auth.service';

/** Login: lotin harflari, raqam, nuqta, pastki chiziq yoki chiziqcha; 3–32 belgi. */
const username = z
  .string()
  .trim()
  .toLowerCase()
  .regex(/^[a-z0-9._-]{3,32}$/);

const registerSchema = z.object({
  // HTML belgilari (<, >) ism sifatida qabul qilinmaydi: saqlanadigan XSS yuklamalariga qarshi qo'shimcha to'siq.
  fullName: z.string().trim().min(3).max(120).regex(/^[^<>]*$/),
  username,
  password: z.string().min(8).max(128),
  classLevel: z.number().int().min(1).max(11).optional(),
});
const loginSchema = z.object({ username: z.string().trim().min(1).max(64), password: z.string().min(1).max(128) });

export const authRoutes = Router();
authRoutes.post(
  '/register',
  authLimiter,
  validateBody(registerSchema),
  asyncHandler(async (req, res) => send(res, await authService.register(req.body), undefined, 201)),
);
authRoutes.post(
  '/login',
  authLimiter,
  validateBody(loginSchema),
  loginLimiter,
  asyncHandler(async (req, res) => send(res, await authService.login(req.body.username, req.body.password))),
);
authRoutes.get(
  '/me',
  authenticate,
  asyncHandler(async (req, res) => send(res, await authService.me(currentUser(req).id))),
);
