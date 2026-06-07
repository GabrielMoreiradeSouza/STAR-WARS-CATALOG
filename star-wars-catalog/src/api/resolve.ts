import { getResourceByUrl } from './swapi';
import type { ResourceRaw } from '../types/swapi';

export function extractId(url: string): string {
  const parts = url.replace(/\/$/, '').split('/');
  return parts[parts.length - 1];
}

export function extractCategory(url: string): string {
  const parts = url.replace(/\/$/, '').split('/');
  return parts[parts.length - 2];
}

export async function resolveUrl<T extends ResourceRaw>(url: string): Promise<T> {
  return getResourceByUrl<T>(url);
}

export async function resolveAll<T extends ResourceRaw>(urls: string[]): Promise<T[]> {
  if (urls.length === 0) return [];
  const results = await Promise.allSettled(urls.map((url) => resolveUrl<T>(url)));
  const fulfilled: T[] = [];
  for (const r of results) {
    if (r.status === 'fulfilled') fulfilled.push(r.value);
  }
  return fulfilled;
}
