import type { Request, RequestHandler } from 'express';
import { asyncHandler, param, send } from './http';

export interface CrudService {
  list(query: Record<string, string | undefined>, userId: string, role: string): Promise<unknown>;
  get(id: string, userId: string, role: string): Promise<unknown>;
  create(data: never, userId: string): Promise<unknown>;
  update(id: string, data: never): Promise<unknown>;
  remove(id: string): Promise<void>;
}

export interface CrudController {
  list: RequestHandler;
  get: RequestHandler;
  create: RequestHandler;
  update: RequestHandler;
  remove: RequestHandler;
}

const flatQuery = (req: Request): Record<string, string | undefined> => {
  const out: Record<string, string | undefined> = {};
  for (const [k, v] of Object.entries(req.query)) if (typeof v === 'string' && v) out[k] = v;
  return out;
};

const who = (req: Request): { id: string; role: string } => ({
  id: req.user?.id ?? '',
  role: req.user?.role ?? 'STUDENT',
});

export const crudController = (svc: CrudService): CrudController => ({
  list: asyncHandler(async (req, res) => {
    const u = who(req);
    send(res, await svc.list(flatQuery(req), u.id, u.role));
  }),
  get: asyncHandler(async (req, res) => {
    const u = who(req);
    send(res, await svc.get(param(req, 'id'), u.id, u.role));
  }),
  create: asyncHandler(async (req, res) => {
    send(res, await svc.create(req.body as never, who(req).id), undefined, 201);
  }),
  update: asyncHandler(async (req, res) => {
    send(res, await svc.update(param(req, 'id'), req.body as never));
  }),
  remove: asyncHandler(async (req, res) => {
    await svc.remove(param(req, 'id'));
    send(res, { deleted: true });
  }),
});
