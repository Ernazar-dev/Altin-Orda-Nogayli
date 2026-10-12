import { useEffect } from 'react';
import { BRAND } from '@/brand';

export function useDocumentTitle(title: string) {
  useEffect(() => {
    const prev = document.title;
    document.title = title ? `${title} · ${BRAND}` : BRAND;
    return () => {
      document.title = prev;
    };
  }, [title]);
}
