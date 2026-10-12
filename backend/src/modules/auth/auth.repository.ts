import type { Role, User } from '@prisma/client';
import { prisma } from '../../config/prisma';

export const authRepository = {
  findByUsername: (username: string): Promise<User | null> => prisma.user.findUnique({ where: { username } }),
  findById: (id: string): Promise<User | null> => prisma.user.findUnique({ where: { id } }),
  create: (data: {
    fullName: string;
    username: string;
    passwordHash: string;
    role: Role;
    classLevel: number | null;
  }): Promise<User> => prisma.user.create({ data }),
};
