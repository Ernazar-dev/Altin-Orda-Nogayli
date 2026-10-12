import { get, post } from './client';
import type { AuthPayload, User } from '@/types';

export interface RegisterInput {
  fullName: string;
  username: string;
  password: string;
  classLevel?: number;
}

export const authApi = {
  login: (username: string, password: string) => post<AuthPayload>('/auth/login', { username, password }),
  register: (input: RegisterInput) => post<AuthPayload>('/auth/register', input),
  me: () => get<User>('/auth/me'),
};
