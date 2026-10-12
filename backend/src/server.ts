import { env } from './config/env';
import { prisma } from './config/prisma';
import { createApp } from './app';

import { syncTeacher } from './modules/auth/teacher';
import type { Server } from 'node:http';

const app = createApp();
let server: Server | undefined;
void syncTeacher().then(() => {
  server = app.listen(env.PORT, () => console.log('Backend ishga tushdi, port:', env.PORT));
}).catch(async (error: unknown) => {
  console.error('Teacher setup failed:', error instanceof Error ? error.message : 'Unknown error');
  await prisma.$disconnect();
  process.exit(1);
});

const shutdown = async (): Promise<void> => {
  server?.close();
  await prisma.$disconnect();
  process.exit(0);
};
process.on('SIGINT', () => void shutdown());
process.on('SIGTERM', () => void shutdown());
