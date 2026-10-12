import bcrypt from 'bcryptjs';
import type { Role, User } from '@prisma/client';
import { conflict, notFound, unauthorized } from '../../lib/errors';
import { signToken } from '../../middlewares/auth';
import { authRepository } from './auth.repository';

export interface UserDto {
  id: string;
  fullName: string;
  username: string;
  role: Role;
  classLevel: number | null;
  createdAt: Date;
  updatedAt: Date;
}

export const toUserDto = (u: User): UserDto => ({
  id: u.id,
  fullName: u.fullName,
  username: u.username,
  role: u.role,
  classLevel: u.classLevel,
  createdAt: u.createdAt,
  updatedAt: u.updatedAt,
});

export interface AuthResult {
  token: string;
  user: UserDto;
}

/** Login topilmasa ham bcrypt solishtiriladi: javob vaqti bo'yicha login mavjudligini bilib bo'lmasin. */
const DUMMY_HASH = bcrypt.hashSync('dummy-password-for-constant-time-compare', 10);

export const authService = {
  /** Ro'yxatdan o'tgan foydalanuvchi har doim o'quvchi bo'ladi; ustoz hisobi `npm run teacher:create` bilan ochiladi. */
  async register(input: { fullName: string; username: string; password: string; classLevel?: number }): Promise<AuthResult> {
    const username = input.username.toLowerCase();
    if (await authRepository.findByUsername(username)) throw conflict('Bu login band, boshqasini tanlang');
    const user = await authRepository.create({
      fullName: input.fullName.trim(),
      username,
      passwordHash: await bcrypt.hash(input.password, 10),
      role: 'STUDENT',
      classLevel: input.classLevel ?? 6,
    });
    return { token: signToken(user.id, user.role), user: toUserDto(user) };
  },

  async login(username: string, password: string): Promise<AuthResult> {
    const user = await authRepository.findByUsername(username.toLowerCase());
    const same = await bcrypt.compare(password, user?.passwordHash ?? DUMMY_HASH);
    if (!user || !same) throw unauthorized('Login yoki parol noto\'g\'ri');
    return { token: signToken(user.id, user.role), user: toUserDto(user) };
  },

  async me(id: string): Promise<UserDto> {
    const user = await authRepository.findById(id);
    if (!user) throw notFound('Foydalanuvchi topilmadi');
    return toUserDto(user);
  },
};
