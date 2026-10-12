import { useEffect } from 'react';
import { progressApi } from '@/api/resources';
import { useAuth } from '@/context/AuthContext';
import type { ViewEntity } from '@/types';

/** Student sahifani ko'rganini qayd etadi (progress uchun). */
export function useTrackView(type: ViewEntity, id: string | undefined) {
  const { user } = useAuth();
  useEffect(() => {
    if (id && user?.role === 'STUDENT') void progressApi.view(type, id);
  }, [type, id, user?.role]);
}
