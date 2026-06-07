# Data Model: Star Wars Catalog

All data originates from the [SWAPI](https://swapi.dev/api) REST API. This document defines the client-side TypeScript types used throughout the application.

## Resource Types

### Person

| Field | Type | Source | Notes |
|-------|------|--------|-------|
| `name` | `string` | SWAPI | |
| `height` | `string` | SWAPI | In cm, string from API (may contain "unknown") |
| `mass` | `string` | SWAPI | In kg |
| `hair_color` | `string` | SWAPI | |
| `skin_color` | `string` | SWAPI | |
| `eye_color` | `string` | SWAPI | |
| `birth_year` | `string` | SWAPI | BBY/ABY format |
| `gender` | `string` | SWAPI | "Male", "Female", "n/a", etc. |
| `homeworld` | `string` (URL) → `Planet` | Resolved | Relationship |
| `films` | `string[]` (URLs) → `Film[]` | Resolved | Relationship |
| `species` | `string[]` (URLs) → `Species[]` | Resolved | Relationship |
| `vehicles` | `string[]` (URLs) → `Vehicle[]` | Resolved | Relationship |
| `starships` | `string[]` (URLs) → `Starship[]` | Resolved | Relationship |
| `url` | `string` | SWAPI | Unique resource identifier |
| `created` | `string` | SWAPI | ISO 8601 |
| `edited` | `string` | SWAPI | ISO 8601 |

### Film

| Field | Type | Source | Notes |
|-------|------|--------|-------|
| `title` | `string` | SWAPI | |
| `episode_id` | `number` | SWAPI | |
| `opening_crawl` | `string` | SWAPI | |
| `director` | `string` | SWAPI | |
| `producer` | `string` | SWAPI | |
| `release_date` | `string` | SWAPI | YYYY-MM-DD |
| `characters` | `string[]` (URLs) → `Person[]` | Resolved | Relationship |
| `planets` | `string[]` (URLs) → `Planet[]` | Resolved | Relationship |
| `starships` | `string[]` (URLs) → `Starship[]` | Resolved | Relationship |
| `vehicles` | `string[]` (URLs) → `Vehicle[]` | Resolved | Relationship |
| `species` | `string[]` (URLs) → `Species[]` | Resolved | Relationship |
| `url` | `string` | SWAPI | |
| `created` | `string` | SWAPI | |
| `edited` | `string` | SWAPI | |

### Planet

| Field | Type | Source | Notes |
|-------|------|--------|-------|
| `name` | `string` | SWAPI | |
| `rotation_period` | `string` | SWAPI | In hours |
| `orbital_period` | `string` | SWAPI | In days |
| `diameter` | `string` | SWAPI | In km |
| `climate` | `string` | SWAPI | Comma-separated (e.g., "arid") |
| `gravity` | `string` | SWAPI | In Gs (e.g., "1 standard") |
| `terrain` | `string` | SWAPI | Comma-separated |
| `surface_water` | `string` | SWAPI | Percentage |
| `population` | `string` | SWAPI | |
| `residents` | `string[]` (URLs) → `Person[]` | Resolved | Relationship |
| `films` | `string[]` (URLs) → `Film[]` | Resolved | Relationship |
| `url` | `string` | SWAPI | |
| `created` | `string` | SWAPI | |
| `edited` | `string` | SWAPI | |

### Starship

| Field | Type | Source | Notes |
|-------|------|--------|-------|
| `name` | `string` | SWAPI | |
| `model` | `string` | SWAPI | |
| `manufacturer` | `string` | SWAPI | |
| `cost_in_credits` | `string` | SWAPI | |
| `length` | `string` | SWAPI | In meters |
| `max_atmosphering_speed` | `string` | SWAPI | |
| `crew` | `string` | SWAPI | |
| `passengers` | `string` | SWAPI | |
| `cargo_capacity` | `string` | SWAPI | In kg |
| `consumables` | `string` | SWAPI | e.g., "2 months" |
| `hyperdrive_rating` | `string` | SWAPI | |
| `MGLT` | `string` | SWAPI | Megalight per hour |
| `starship_class` | `string` | SWAPI | |
| `pilots` | `string[]` (URLs) → `Person[]` | Resolved | Relationship |
| `films` | `string[]` (URLs) → `Film[]` | Resolved | Relationship |
| `url` | `string` | SWAPI | |
| `created` | `string` | SWAPI | |
| `edited` | `string` | SWAPI | |

### Vehicle

| Field | Type | Source | Notes |
|-------|------|--------|-------|
| `name` | `string` | SWAPI | |
| `model` | `string` | SWAPI | |
| `manufacturer` | `string` | SWAPI | |
| `cost_in_credits` | `string` | SWAPI | |
| `length` | `string` | SWAPI | In meters |
| `max_atmosphering_speed` | `string` | SWAPI | |
| `crew` | `string` | SWAPI | |
| `passengers` | `string` | SWAPI | |
| `cargo_capacity` | `string` | SWAPI | In kg |
| `consumables` | `string` | SWAPI | e.g., "2 months" |
| `vehicle_class` | `string` | SWAPI | |
| `pilots` | `string[]` (URLs) → `Person[]` | Resolved | Relationship |
| `films` | `string[]` (URLs) → `Film[]` | Resolved | Relationship |
| `url` | `string` | SWAPI | |
| `created` | `string` | SWAPI | |
| `edited` | `string` | SWAPI | |

### Species

| Field | Type | Source | Notes |
|-------|------|--------|-------|
| `name` | `string` | SWAPI | |
| `classification` | `string` | SWAPI | e.g., "mammal" |
| `designation` | `string` | SWAPI | e.g., "sentient" |
| `average_height` | `string` | SWAPI | In cm |
| `skin_colors` | `string` | SWAPI | |
| `hair_colors` | `string` | SWAPI | |
| `eye_colors` | `string` | SWAPI | |
| `average_lifespan` | `string` | SWAPI | In years |
| `homeworld` | `string` (URL) → `Planet` | Resolved | Relationship |
| `language` | `string` | SWAPI | |
| `people` | `string[]` (URLs) → `Person[]` | Resolved | Relationship |
| `films` | `string[]` (URLs) → `Film[]` | Resolved | Relationship |
| `url` | `string` | SWAPI | |
| `created` | `string` | SWAPI | |
| `edited` | `string` | SWAPI | |

## Relationship Graph

```
Person ──homeworld──→ Planet
Person ──films──────→ Film
Person ──species────→ Species
Person ──vehicles───→ Vehicle
Person ──starships──→ Starship

Film ────characters─→ Person
Film ────planets────→ Planet
Film ────starships──→ Starship
Film ────vehicles───→ Vehicle
Film ────species────→ Species

Planet ──residents──→ Person
Planet ──films──────→ Film

Starship ─pilots────→ Person
Starship ─films─────→ Film

Vehicle ──pilots────→ Person
Vehicle ──films─────→ Film

Species ──homeworld─→ Planet
Species ──people────→ Person
Species ──films─────→ Film
```

## Resolved Entity Type

Each resource has a corresponding resolved type where all URL references are replaced with their resolved data:

```typescript
interface ResolvedPerson extends PersonRaw {
  homeworld: ResolvedPlanet | null;
  films: ResolvedFilm[];
  species: ResolvedSpecies[];
  vehicles: ResolvedVehicle[];
  starships: ResolvedStarship[];
}
```

## Pagination

SWAPI responses use the following pagination structure:

| Field | Type | Description |
|-------|------|-------------|
| `count` | `number` | Total items available |
| `next` | `string \| null` | URL to next page (null if last page) |
| `previous` | `string \| null` | URL to previous page (null if first page) |
| `results` | `T[]` | Array of resource items |

## Validation Rules

- All string fields may contain "unknown" or "n/a" as values — display gracefully
- `height`, `mass`, `population`, `diameter` are strings in the API but represent numeric values — parse for filtering/comparison when possible
- `climate`, `terrain` may be comma-separated lists — treat as tag sets for filtering
- Relationship URLs always follow the pattern `https://swapi.dev/api/{category}/{id}/`
- URLs ending in `/1/` are guaranteed to exist (core resources)
- No authentication; no write operations (read-only catalog)
