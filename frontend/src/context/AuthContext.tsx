import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import type { User } from '@/types';
import { authApi } from '@/api/auth';
import type { RegisterInput } from '@/api/auth';
import { tokenStore } from '@/api/client';

interface AuthValue {
  user: User | null;
  loading: boolean;
  login: (username: string, password: string) => Promise<User>;
  register: (input: RegisterInput) => Promise<User>;
  logout: () => void;
}

const AuthContext = createContext<AuthValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(Boolean(tokenStore.get()));

  useEffect(() => {
    if (!tokenStore.get()) return;
    let alive = true;
    authApi
      .me()
      .then((u) => alive && setUser(u))
      .catch(() => tokenStore.clear())
      .finally(() => alive && setLoading(false));
    const onExpired = () => setUser(null);
    window.addEventListener('ao:unauthorized', onExpired);
    return () => {
      alive = false;
      window.removeEventListener('ao:unauthorized', onExpired);
    };
  }, []);

  const login = useCallback(async (username: string, password: string) => {
    const { token, user: u } = await authApi.login(username, password);
    tokenStore.set(token);
    setUser(u);
    return u;
  }, []);

  const register = useCallback(async (input: RegisterInput) => {
    const { token, user: u } = await authApi.register(input);
    tokenStore.set(token);
    setUser(u);
    return u;
  }, []);

  const logout = useCallback(() => {
    tokenStore.clear();
    setUser(null);
  }, []);

  const value = useMemo(() => ({ user, loading, login, register, logout }), [user, loading, login, register, logout]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth AuthProvider ichida ishlatilishi kerak');
  return ctx;
}
