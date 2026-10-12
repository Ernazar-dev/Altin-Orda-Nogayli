import type { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import type { Role } from '@prisma/client';
import { env } from '../config/env';
import { forbidden, unauthorized } from '../lib/errors';

interface JwtPayload {
  sub: string;
  role: Role;
}

export const signToken = (userId: string, role: Role): string =>
  jwt.sign({ sub: userId, role }, env.JWT_SECRET, {
    algorithm: 'HS256',
    expiresIn: env.JWT_EXPIRES_IN as jwt.SignOptions['expiresIn'],
  });

export const authenticate = (req: Request, _res: Response, next: NextFunction): void => {
  const header = req.headers.authorization;
  if (!header || !header.startsWith('Bearer ')) {
    next(unauthorized());
    return;
  }
  try {
    // Algoritm qat'iy HS256 bilan cheklangan ("alg" almashtirish hujumlariga qarshi).
    const payload = jwt.verify(header.slice(7), env.JWT_SECRET, { algorithms: ['HS256'] }) as JwtPayload;
    req.user = { id: payload.sub, role: payload.role };
    next();
  } catch {
    next(unauthorized('Token yaroqsiz yoki muddati tugagan'));
  }
};

/** Mehmonlarga ruxsat beradi; token berilgan bo'lsa tekshiradi va req.user ni to'ldiradi. */
export const optionalAuth = (req: Request, res: Response, next: NextFunction): void => {
  if (!req.headers.authorization) {
    next();
    return;
  }
  authenticate(req, res, next);
};

export const requireRole =
  (...roles: Role[]) =>
  (req: Request, _res: Response, next: NextFunction): void => {
    if (!req.user) {
      next(unauthorized());
      return;
    }
    if (!roles.includes(req.user.role)) {
      next(forbidden());
      return;
    }
    next();
  };

export const teacherOnly = requireRole('TEACHER');
export const studentOnly = requireRole('STUDENT');

export const currentUser = (req: Request): { id: string; role: Role } => {
  if (!req.user) throw unauthorized();
  return req.user;
};
