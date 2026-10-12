import type { NextFunction, Request, Response } from 'express';
import type { ZodTypeAny, z } from 'zod';
import { badRequest } from '../lib/errors';

export const validateBody =
  <T extends ZodTypeAny>(schema: T) =>
  (req: Request, _res: Response, next: NextFunction): void => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      next(badRequest('Ma\'lumotlar noto\'g\'ri', result.error.flatten()));
      return;
    }
    req.body = result.data as z.infer<T>;
    next();
  };

export const parseQuery = <T extends ZodTypeAny>(schema: T, req: Request): z.infer<T> => {
  const result = schema.safeParse(req.query);
  if (!result.success) throw badRequest('So\'rov parametrlari noto\'g\'ri', result.error.flatten());
  return result.data as z.infer<T>;
};
