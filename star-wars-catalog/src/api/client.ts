const BASE_URL = 'https://swapi.py4e.com/api';

export class ApiError extends Error {
  status: number;

  constructor(status: number, message: string) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
  }
}

export async function fetchJson<T>(url: string): Promise<T> {
  const response = await fetch(url);

  if (!response.ok) {
    throw new ApiError(
      response.status,
      `SWAPI request failed: ${response.status} ${response.statusText}`,
    );
  }

  return response.json() as Promise<T>;
}

export function buildUrl(path: string): string {
  if (path.startsWith('http')) return path;
  return `${BASE_URL}${path.startsWith('/') ? path : `/${path}`}`;
}
