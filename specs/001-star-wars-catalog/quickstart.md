# Quickstart: Star Wars Catalog

## Prerequisites

- Node.js 18+ (recommended: 20 LTS)
- npm 9+ or pnpm 8+

## Setup

```bash
# Create the Vite project
npm create vite@latest star-wars-catalog -- --template react-ts
cd star-wars-catalog

# Install dependencies
npm install react-router-dom @tanstack/react-query

# Install dev dependencies
npm install -D vitest @testing-library/react @testing-library/jest-dom jsdom

# Run development server
npm run dev
```

## Project Structure

```
star-wars-catalog/
├── public/
├── src/
│   ├── api/           # SWAPI client + resolution logic
│   ├── components/    # UI components (layout, catalog, detail)
│   ├── hooks/         # Custom React hooks
│   ├── pages/         # Route page components
│   ├── types/         # TypeScript interfaces
│   └── utils/         # Helpers (filters, formatters)
├── index.html
├── package.json
└── vite.config.ts
```

## Available Scripts

```bash
npm run dev          # Start dev server (hot reload)
npm run build        # Production build → dist/
npm run preview      # Preview production build
npm test             # Run Vitest tests
npm run lint         # ESLint
```

## Design Setup

Add Google Fonts in `index.html`:

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&display=swap" rel="stylesheet">
```

CSS custom properties in `index.css`:

```css
:root {
  --font-heading: 'Bebas Neue', sans-serif;
  --font-body: 'Libre Baskerville', serif;
  --color-bg: #0a0a0a;
  --color-bg-elevated: #1a1a1a;
  --color-bg-card: #2a2a2a;
  --color-text: #f0e6d0;
  --color-text-muted: #c9b89b;
  --color-accent: #d4a843;
  --color-accent-hover: #b8862d;
}
```

## Key Decisions

- **Data fetching**: `@tanstack/react-query` with `staleTime: 5min` for lists, `30min` for individual resources
- **Routing**: `react-router-dom` v6 with URL params for category and item ID
- **Search**: Client-side with Fuse.js (fuzzy matching on name field)
- **Filters**: Category-specific facet filters (gender, climate, etc.) — client-side
- **Relationship resolution**: On-demand parallel fetch with React Query dedup
- **Styling**: Plain CSS with custom properties — no framework
- **Testing**: Vitest + React Testing Library
