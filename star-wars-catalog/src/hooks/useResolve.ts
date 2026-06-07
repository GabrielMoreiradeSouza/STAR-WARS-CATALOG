import { useQuery } from '@tanstack/react-query';
import type { ResourceRaw } from '../types/swapi';

async function fetchOne<T extends ResourceRaw>(url: string): Promise<T> {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to resolve ${url}`);
  return res.json();
}

export function useResolve<T extends ResourceRaw>(url: string | null | undefined) {
  return useQuery<T>({
    queryKey: ['resolve', url],
    queryFn: () => fetchOne<T>(url!),
    enabled: !!url,
    staleTime: 30 * 60 * 1000,
  });
}

export function useResolveAll<T extends ResourceRaw>(urls: string[]) {
  return useQuery<T[]>({
    queryKey: ['resolveAll', ...urls],
    queryFn: async () => {
      const results = await Promise.allSettled(urls.map((url) => fetchOne<T>(url)));
      const fulfilled: T[] = [];
      for (const r of results) {
        if (r.status === 'fulfilled') fulfilled.push(r.value);
      }
      return fulfilled;
    },
    enabled: urls.length > 0,
    staleTime: 30 * 60 * 1000,
  });
}
