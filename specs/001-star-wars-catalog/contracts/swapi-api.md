# SWAPI API Contract

## Base URL

```
https://swapi.py4e.com/api/
```

## Endpoints

### List Resources

```
GET /api/{category}/
```

**Parameters**:

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `page` | `number` | `1` | Page number (pagination) |
| `search` | `string` | — | Server-side search query |

**Response** (200):

```typescript
{
  count: number;
  next: string | null;
  previous: string | null;
  results: ResourceItem[];
}
```

**Categories**: `people`, `films`, `planets`, `starships`, `vehicles`, `species`

### Get Single Resource

```
GET /api/{category}/{id}/
```

**Response** (200): Single resource object (fields vary by category)

**Response** (404): `{ "detail": "Not found" }`

### Root

```
GET /api/
```

**Response** (200): Object with category names as keys and their list URLs as values.

## Client Contract

### Fetch Layer

```typescript
interface SwapiClient {
  list<T>(category: Category): Promise<PaginatedResponse<T>>;
  listPage<T>(url: string): Promise<PaginatedResponse<T>>;
  get<T>(url: string): Promise<T>;
}

type Category = 'people' | 'films' | 'planets' | 'starships' | 'vehicles' | 'species';
```

### Caching Strategy

- Use React Query with `staleTime: 5 * 60 * 1000` (5 min) for list queries
- Individual resource `staleTime: 30 * 60 * 1000` (30 min) — resources change rarely
- Cache resolved relationships aggressively (they're read-only)
- On error: retry 2 times with exponential backoff, then show error state

### Rate Limiting

SWAPI allows 10,000 requests per day. Relationship resolution is the main consumer — a single detail page may trigger 20+ requests. Mitigation:

- Use React Query deduplication (same URL only fetched once)
- Cache resolved data aggressively
- Show progressive loading rather than blocking on all resolves
