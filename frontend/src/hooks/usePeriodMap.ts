import { useEffect, useState } from 'react';
import { periodsApi } from '@/api/resources';
import type { Period } from '@/types';

let cache: Promise<Period[]> | null = null;

/** Davrlar ro'yxati (bir marta yuklanadi): kartalarda davr rangi uchun `order` kerak. */
export function usePeriodMap(): Map<string, Period> {
  const [map, setMap] = useState<Map<string, Period>>(new Map());
  useEffect(() => {
    let alive = true;
    cache ??= periodsApi.list().catch(() => {
      cache = null;
      return [] as Period[];
    });
    void cache.then((list) => {
      if (alive) setMap(new Map(list.map((p) => [p.id, p])));
    });
    return () => {
      alive = false;
    };
  }, []);
  return map;
}
