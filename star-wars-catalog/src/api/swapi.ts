import { fetchJson, buildUrl } from './client';
import type { PaginatedResponse, SwapiCategory, ResourceRaw } from '../types/swapi';

export function listResources<T extends ResourceRaw>(
  category: SwapiCategory,
  page = 1,
): Promise<PaginatedResponse<T>> {
  const url = buildUrl(`/${category}/?page=${page}`);
  return fetchJson<PaginatedResponse<T>>(url);
}

export function getResource<T extends ResourceRaw>(
  category: SwapiCategory,
  id: string,
): Promise<T> {
  const url = buildUrl(`/${category}/${id}/`);
  return fetchJson<T>(url);
}

export function getResourceByUrl<T extends ResourceRaw>(url: string): Promise<T> {
  return fetchJson<T>(url);
}
