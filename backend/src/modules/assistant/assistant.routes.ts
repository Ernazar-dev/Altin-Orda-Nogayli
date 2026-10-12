import { Router } from 'express';
import { z } from 'zod';
import { HttpError } from '../../lib/errors';
import { asyncHandler, send } from '../../lib/http';
import { assistantLimiter } from '../../middlewares/rateLimit';
import { validateBody } from '../../middlewares/validate';
import { assistantService } from './assistant.service';

const chatSchema = z.object({
  lang: z.enum(['uz', 'kaa']).default('uz'),
  // Tarix uzunligi va hajmi cheklangan (narx va suiiste'molga qarshi); oxirgi xabar foydalanuvchiniki bo'lishi shart.
  messages: z
    .array(z.object({ role: z.enum(['user', 'assistant']), text: z.string().trim().min(1).max(1000) }))
    .min(1)
    .max(12)
    .refine((m) => m[m.length - 1].role === 'user', "Oxirgi xabar foydalanuvchiniki bo'lishi kerak"),
});

export const assistantRoutes = Router();
assistantRoutes.get('/status', (_req, res) => send(res, { enabled: assistantService.enabled() }));

assistantRoutes.post(
  '/chat',
  assistantLimiter,
  validateBody(chatSchema),
  asyncHandler(async (req, res) => {
    const { lang, messages } = req.body as z.infer<typeof chatSchema>;
    send(res, { reply: await assistantService.chat(lang, messages) });
  }),
);

/**
 * Oqimli variant (Server-Sent Events): har bir bo'lak `data: {"t":"..."}` ko'rinishida yuboriladi, oxirida `data: [DONE]`.
 * Xato oqim boshlanishidan oldin bo'lsa oddiy JSON xato (errorHandler) qaytadi, boshlangandan keyin `data: {"e":"..."}`.
 */
assistantRoutes.post(
  '/chat/stream',
  assistantLimiter,
  validateBody(chatSchema),
  asyncHandler(async (req, res) => {
    const { lang, messages } = req.body as z.infer<typeof chatSchema>;
    const abort = new AbortController();
    res.on('close', () => abort.abort());
    let started = false;
    const begin = (): void => {
      if (started) return;
      started = true;
      res.set({ 'Content-Type': 'text/event-stream; charset=utf-8', 'Cache-Control': 'no-cache, no-transform', 'X-Accel-Buffering': 'no' });
      res.flushHeaders();
    };
    try {
      await assistantService.chatStream(
        lang,
        messages,
        (t) => {
          begin();
          res.write(`data: ${JSON.stringify({ t })}\n\n`);
        },
        abort.signal,
      );
      begin();
      res.write('data: [DONE]\n\n');
      res.end();
    } catch (err) {
      if (!started) throw err;
      const message = err instanceof HttpError ? err.message : 'AI xizmati hozir javob bermayapti, birozdan keyin urining';
      res.write(`data: ${JSON.stringify({ e: message })}\n\n`);
      res.end();
    }
  }),
);
