# Research: Star Wars Catalog

## Technical Decisions

### Language & Runtime

- **Decision**: TypeScript 5.x with strict mode
- **Rationale**: Type safety for complex SWAPI data shapes (6 resource types with nested relationships). SWAPI returns fields like `homeworld` as a URL string — TypeScript enforces typing on resolved objects.
- **Alternatives considered**: JavaScript without types (too error-prone for cross-referencing), Elm (steeper learning curve, smaller ecosystem)

### Framework & Build

- **Decision**: React 18 + Vite 5
- **Rationale**: Vite provides instant HMR, fast builds, and first-class TypeScript support. React 18 is the standard for SPA development. SWAPI is REST-based, so no SSR needed.
- **Alternatives considered**: Next.js (overkill — no SSR/SSG needed), Remix (same), CRA (deprecated)

### Data Fetching

- **Decision**: `@tanstack/react-query` v5 + native `fetch`
- **Rationale**: React Query provides caching, deduplication, background refetch, loading/error states out of the box. Native `fetch` avoids extra dependencies — SWAPI responses are simple JSON. Key for relationship resolution: React Query caches resolved URLs so subsequent resolves reuse cached data.
- **Alternatives considered**: Axios (abort controllers, interceptors not needed for this use case), RTK Query (too heavy for a simple catalog), plain `useEffect` + `fetch` (no caching/dedup)

### Routing

- **Decision**: `react-router-dom` v6
- **Rationale**: Industry standard for React SPA routing. Data loader pattern (loaders/actions) isn't needed since React Query handles async data.
- **Alternatives considered**: TanStack Router (newer, less proven), wouter (too lightweight)

### Styling Approach

- **Decision**: Plain CSS with CSS custom properties (no framework)
- **Rationale**: The design is custom (dark Star Wars theme, specific typography). CSS custom properties provide theme variables (colors, spacing) without framework overhead. No component library fits the bespoke cinematic aesthetic.
- **Alternatives considered**: Tailwind CSS (utility-first clashes with editorial/cinematic design philosophy), styled-components (runtime overhead), Chakra/MUI (generic look)

### Typography

- **Decision**: Bebas Neue (headings), Libre Baskerville (body)
- **Rationale**: Bebas Neue gives a bold, cinematic title feel (reminiscent of Star Wars title cards). Libre Baskerville is a high-contrast serif suitable for long-form reading with an editorial, sober aesthetic. Both available on Google Fonts.
- **Alternatives considered**: Cormorant Garamond (slightly more ornate — kept as fallback), Playfair Display (too decorative for data-heavy pages)

### Color Palette

- **Decision**: Dark backgrounds (#0a0a0a, #1a1a1a, #2a2a2a), warm off-white text (#f0e6d0, #c9b89b), amber/gold accents (#d4a843, #b8862d)
- **Rationale**: Matches Star Wars aesthetic (Imperial/desert tones) without neon. High contrast for readability. Gold accents echo Star Wars crawls and UI elements.
- **Alternatives considered**: Blue/cyan accents (too sci-fi generic), pure white on black (too stark)

### Search & Filtering

- **API Base URL**: Uses `https://swapi.py4e.com/api/` (maintained mirror) instead of `https://swapi.dev/api/` (original, SSL certificate expired)

**Decision**: Client-side filtering with Fuse.js for fuzzy name search; manual JS filter for category-specific facets
- **Rationale**: SWAPI datasets are small (under 100 items per category). Client-side filtering is instant and avoids additional API calls. Fuse.js provides fuzzy matching for forgiving search.
- **Alternatives considered**: Server-side search via SWAPI `?search=` parameter (latency, cannot combine with facet filters), no fuzzy search (exact match only is less user-friendly)

### Relationship Resolution Strategy

- **Decision**: Resolve on demand with React Query caching; parallel fetching for concurrent URLs; progressive loading with skeleton placeholders
- **Rationale**: A Person may have 10+ film URLs, each requiring a separate fetch. Parallel resolution with `Promise.all` minimizes wait time. React Query caches resolves across the session.
- **Alternatives considered**: Bulk resolve endpoint (SWAPI doesn't offer one), pre-fetch on list view (unnecessary — details only needed on detail page)

### Error & Loading States

- **Decision**: Skeleton loading for lists; inline spinners for relationship resolution; dedicated error pages with retry buttons; error boundaries at page level
- **Rationale**: Skeletons feel faster than spinners for initial loads. Inline spinners let users see partially resolved data (e.g., person info loads while films resolve). Error boundaries prevent one broken resource from crashing the whole page.

## Open Questions

None — all technical decisions resolved. The spec covers the full scope.
