import bcrypt from 'bcryptjs';
import { env } from '../../config/env';
import { prisma } from '../../config/prisma';

/** Sync the configured teacher before accepting registrations or logins. */
export async function syncTeacher() {
  const existing = await prisma.user.findUnique({ where: { username: env.TEACHER_USERNAME } });
  if (existing && existing.role !== 'TEACHER') {
    throw new Error('TEACHER_USERNAME belongs to a student. Choose another username.');
  }
  const passwordHash = existing && await bcrypt.compare(env.TEACHER_PASSWORD, existing.passwordHash)
    ? existing.passwordHash : await bcrypt.hash(env.TEACHER_PASSWORD, 10);
  return prisma.user.upsert({
    where: { username: env.TEACHER_USERNAME },
    update: { fullName: env.TEACHER_NAME, passwordHash },
    create: { username: env.TEACHER_USERNAME, fullName: env.TEACHER_NAME, passwordHash, role: 'TEACHER' },
  });
}
