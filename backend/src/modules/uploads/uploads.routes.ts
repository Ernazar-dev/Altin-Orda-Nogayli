import { Router } from 'express';
import { badRequest } from '../../lib/errors';
import { asyncHandler, send } from '../../lib/http';
import { authenticate, teacherOnly } from '../../middlewares/auth';
import { imageUpload, saveImage } from '../../middlewares/upload';

export const uploadsRoutes = Router();
uploadsRoutes.post(
  '/image',
  authenticate,
  teacherOnly,
  imageUpload.single('file'),
  asyncHandler(async (req, res) => {
    if (!req.file) throw badRequest('Fayl yuborilmadi (maydon nomi: file)');
    send(res, { url: await saveImage(req.file.buffer) }, undefined, 201);
  }),
);
