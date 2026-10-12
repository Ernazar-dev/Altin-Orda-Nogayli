export class HttpError extends Error {
  constructor(
    public readonly status: number,
    public readonly code: string,
    message: string,
    public readonly details?: unknown,
  ) {
    super(message);
  }
}

export const badRequest = (message: string, details?: unknown): HttpError =>
  new HttpError(400, 'BAD_REQUEST', message, details);
export const unauthorized = (message = 'Autentifikatsiya talab etiladi'): HttpError =>
  new HttpError(401, 'UNAUTHORIZED', message);
export const forbidden = (message = 'Ruxsat yo\'q'): HttpError =>
  new HttpError(403, 'FORBIDDEN', message);
export const notFound = (message = 'Topilmadi'): HttpError =>
  new HttpError(404, 'NOT_FOUND', message);
export const conflict = (message: string): HttpError => new HttpError(409, 'CONFLICT', message);
