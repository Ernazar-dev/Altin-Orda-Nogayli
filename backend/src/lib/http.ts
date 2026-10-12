import type { NextFunction, Request, RequestHandler, Response } from 'express';

export const asyncHandler =
  (fn: (req: Request, res: Response) => Promise<void>): RequestHandler =>
  (req: Request, res: Response, next: NextFunction): void => {
    fn(req, res).catch(next);
  };

export const send = <T>(res: Response, data: T, meta?: Record<string, unknown>, status = 200): void => {
  res.status(status).json(meta ? { data, meta } : { data });
};

/** Express 4 params are `string`; helper to read a required param. */
export const param = (req: Request, name: string): string => {
  const v = req.params[name];
  return typeof v === 'string' ? v : '';
};

export const queryStr = (req: Request, name: string): string | undefined => {
  const v = req.query[name];
  return typeof v === 'string' && v.length > 0 ? v : undefined;
};
