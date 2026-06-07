# Component API Contract

## Pages

### `HomePage`

Displays 6 category cards linking to each resource type.

- **State**: Fetches `/api/` root to verify connectivity; shows category links with icon/emoji

### `CategoryPage`

```
Props: { category: Category }
```

- Fetches paginated list for the given category
- Renders `SearchBar` + `FilterPanel` + `ItemList` + `Pagination`
- Search is client-side, filters are client-side
- URL updates with search params (`?search=...&filter=...`)

### `DetailPage`

```
Props: { category: Category, id: string }
```

- Fetches single item
- Renders all scalar fields as `DetailField`
- Renders all relationship fields as `RelationshipList` with progressive loading

## Layout Components

### `Header`
- App title ("Star Wars Catalog")
- Navigation back to homepage
- Responsive: collapses on mobile

### `Footer`
- Credits, SWAPI attribution
- Stays at bottom of viewport

## Catalog Components

### `CategoryCard`
```
Props: { name: string; slug: string; icon: string; itemCount: number }
```
- Used on HomePage
- Links to `/:slug`
- Shows item count (fetched from API)

### `ItemCard`
```
Props: { item: { name: string; url: string }; fields: { label: string; value: string }[] }
```
- Used in lists
- Click navigates to detail page
- Shows key attributes (varies by category)

### `ItemList`
```
Props: { items: ItemCardProps[]; isLoading: boolean; error: Error | null }
```
- Grid/list layout of ItemCards
- Shows skeletons when loading, error message when errored

### `SearchBar`
```
Props: { value: string; onChange: (value: string) => void; placeholder?: string }
```
- Debounced input (300ms)
- Clears filters on empty

### `FilterPanel`
```
Props: { 
  category: Category; 
  filters: Record<string, string | number>; 
  onChange: (key: string, value: string | number) => void 
}
```
- Renders category-specific filter controls
- For People: gender (select), birth year range (min/max)
- For Films: director (select), release year range
- For Planets: climate (multi-select), terrain (multi-select)
- For Starships: crew range, class (select)
- For Vehicles: class (select), crew range
- For Species: classification (select), designation (select)

## Detail Components

### `DetailField`
```
Props: { label: string; value: string }
```
- Renders a single key-value pair

### `RelationshipList`
```
Props: { 
  label: string; 
  urls: string[]; 
  resolve: (url: string) => Promise<{ name: string; url: string }>;
  renderAs?: 'list' | 'links'
}
```
- Fetches each URL, displays resolved names as links
- Shows inline spinner for each URL being resolved
- Shows "(unknown)" for failed resolutions

### `ResourceLink`
```
Props: { name: string; category: string; id: string }
```
- Links to `/:category/:id`
- Used in resolved relationship lists

## UI Components

### `Loading`
```
Props: { variant: 'skeleton' | 'spinner' | 'pulse'; count?: number }
```
- Skeleton layout matching list/grid pattern
- Inline spinner for relationship resolution

### `ErrorMessage`
```
Props: { message: string; onRetry?: () => void }
```
- Styled error card with retry button

### `Pagination`
```
Props: { 
  currentPage: number; 
  totalPages: number; 
  onPageChange: (page: number) => void 
}
```
- Previous/Next + page numbers
- Shows "Page X of Y" on mobile
