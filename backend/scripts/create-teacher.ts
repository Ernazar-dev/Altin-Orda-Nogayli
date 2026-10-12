import { syncTeacher } from '../src/modules/auth/teacher';
import { prisma } from '../src/config/prisma';

syncTeacher()
  .then((user) => console.log('Ustoz tayyor (login):', user.username, 'Parol: backend/.env'))
  .catch((error: unknown) => {
    console.error(error instanceof Error ? error.message : 'Teacher setup failed');
    process.exitCode = 1;
  })
  .finally(() => prisma.$disconnect());
