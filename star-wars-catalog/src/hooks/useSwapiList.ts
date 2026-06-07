import { useQuery } from '@tanstack/react-query';
import { listResources, getResource } from '../api/swapi';
import type { PaginatedResponse, SwapiCategory, ResourceRaw } from '../types/swapi';

export function useSwapiList<T extends ResourceRaw>(category: SwapiCategory | null, page = 1) {
  return useQuery<PaginatedResponse<T>>({
    queryKey: ['swapi', category, 'list', page],
    queryFn: () => listResources<T>(category!, page),
    enabled: !!category,
    staleTime: 5 * 60 * 1000,
  });
}

export function useSwapiDetail<T extends ResourceRaw>(category: SwapiCategory, id: string) {
  return useQuery<T>({
    queryKey: ['swapi', category, 'detail', id],
    queryFn: () => getResource<T>(category, id),
    staleTime: 30 * 60 * 1000,
  });
}
