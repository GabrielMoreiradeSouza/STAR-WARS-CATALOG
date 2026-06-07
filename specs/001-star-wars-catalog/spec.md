# Feature Specification: Star Wars Catalog

**Feature Branch**: `001-star-wars-catalog`
**Created**: 2026-06-07
**Status**: Draft
**Input**: User description: "Star Wars Catalog — a catalog website consuming all endpoints from https://swapi.dev/api (people, films, planets, starships, vehicles, species), where each section lists all items with name search and category-specific filters, and clicking an item opens a detail page with all endpoint information including resolved relationships such as homeworld, films and starships. Stack: React + TypeScript + Vite. Design: dark theme inspired by the Star Wars universe, no neon colors, uncommon typography using Bebas Neue for headings and Cormorant Garamond or Libre Baskerville for body text (serif, high contrast, editorial style), cinematic, sober and elegant visual, no Helvetica, Arial or generic sans-serif fonts."

## User Scenarios & Testing

### User Story 1 - Browse and Search Catalog (Priority: P1)

A user visits the catalog homepage, sees all 6 resource categories (People, Films, Planets, Starships, Vehicles, Species), can navigate to any category, browse a paginated list of items, filter by name search, and view category-specific filters to narrow results.

**Why this priority**: Core functionality — without browsing and searching, the catalog has no value.

**Independent Test**: Can be tested by loading the homepage, clicking a category, seeing items rendered, and using the search bar to filter results.

**Acceptance Scenarios**:

1. **Given** the user is on the homepage, **When** they click "People", **Then** a list of people from SWAPI is displayed with name and key attributes.
2. **Given** the user is on the People list, **When** they type "Luke" in the search bar, **Then** only people matching "Luke" are shown.
3. **Given** the user is on the Planets list, **When** they filter by climate "arid", **Then** only arid-climate planets are shown.

---

### User Story 2 - View Item Detail (Priority: P1)

A user clicks on any catalog item and sees a detail page with all available information from the API, including resolved relationships (e.g., a person's homeworld name, films list, starships list).

**Why this priority**: The detail view is the main value proposition — showing resolved cross-referenced data.

**Independent Test**: Can be tested by clicking any item and verifying all fields and resolved relationships render correctly.

**Acceptance Scenarios**:

1. **Given** the user is on a People list, **When** they click "Luke Skywalker", **Then** a detail page shows name, height, mass, hair color, skin color, eye color, birth year, gender, homeworld (resolved name), films (resolved titles), starships (resolved names), vehicles (resolved names), and species (resolved name).
2. **Given** the user is on a Films list, **When** they click "A New Hope", **Then** a detail page shows title, episode ID, opening crawl, director, producer, release date, characters (resolved names), planets (resolved names), starships (resolved names), vehicles (resolved names), and species (resolved names).

---

### User Story 3 - Category-Specific Filters (Priority: P2)

On each category list page, the user sees filters specific to that category (e.g., for People: gender, birth year range; for Films: release year, director; for Planets: climate, terrain, diameter range) and can combine them with text search.

**Why this priority**: Enhances usability by letting users narrow results meaningfully beyond text search.

**Independent Test**: Can be tested by applying category-specific filters and verifying the list updates correctly.

**Acceptance Scenarios**:

1. **Given** the user is on the Planets list, **When** they select climate "desert", **Then** only desert planets (Tatooine, Jakku) are shown.
2. **Given** the user is on the Starships list, **When** they enter min crew "2" and max crew "10", **Then** only starships with crew in that range are shown.

---

### User Story 4 - Responsive and Cinematic Experience (Priority: P3)

The user accesses the site on any device and gets a dark, cinematic Star Wars-themed experience with elegant typography and smooth navigation.

**Why this priority**: Design polish, while important for brand feel, is secondary to functional completeness.

**Independent Test**: Can be tested by loading the site on desktop, tablet, and mobile viewports and verifying the layout adjusts and typography renders correctly.

**Acceptance Scenarios**:

1. **Given** the user is on any page, **When** they resize the browser to mobile width, **Then** the layout adapts (cards stack, navigation collapses).
2. **Given** the user loads the site, **Then** all headings use Bebas Neue, body text uses Libre Baskerville or Cormorant Garamond, and the background is dark (no neon colors).

### Edge Cases

- What happens when SWAPI is unreachable or returns an error?
- How does the UI handle items with missing fields (e.g., a person with no starships)?
- How does pagination work when API returns 87+ items per category?
- What happens when a relationship URL returns 404 (e.g., deleted resource)?

## Requirements

### Functional Requirements

- **FR-001**: System MUST fetch and display all 6 resource categories from https://swapi.dev/api (People, Films, Planets, Starships, Vehicles, Species).
- **FR-002**: Each category list page MUST display a paginated list of items with name and key attributes.
- **FR-003**: Each category list page MUST provide a text search input that filters items by name client-side.
- **FR-004**: Each category list page MUST provide category-specific facet filters (e.g., gender for People, climate for Planets).
- **FR-005**: Clicking an item MUST navigate to a detail page showing all fields from the API response.
- **FR-006**: Detail pages MUST resolve relationship URLs to display human-readable names (e.g., homeworld name, film titles).
- **FR-007**: System MUST handle loading states (spinner/skeleton) while fetching data.
- **FR-008**: System MUST handle error states (SWAPI down, network error) gracefully with user-friendly messages.
- **FR-009**: System MUST use React Router for client-side navigation.
- **FR-010**: The UI MUST use a dark theme inspired by the Star Wars universe (no neon, no Helvetica/Arial/sans-serif).
- **FR-011**: Headings MUST use Bebas Neue font; body text MUST use Libre Baskerville or Cormorant Garamond.
- **FR-012**: System MUST be responsive (desktop, tablet, mobile).

### Key Entities

- **Person**: name, height, mass, hair_color, skin_color, eye_color, birth_year, gender, homeworld (→ Planet), films (→ Film[]), species (→ Species[]), vehicles (→ Vehicle[]), starships (→ Starship[])
- **Film**: title, episode_id, opening_crawl, director, producer, release_date, characters (→ Person[]), planets (→ Planet[]), starships (→ Starship[]), vehicles (→ Vehicle[]), species (→ Species[])
- **Planet**: name, rotation_period, orbital_period, diameter, climate, gravity, terrain, surface_water, population, residents (→ Person[]), films (→ Film[])
- **Starship**: name, model, manufacturer, cost_in_credits, length, max_atmosphering_speed, crew, passengers, cargo_capacity, consumables, hyperdrive_rating, MGLT, starship_class, pilots (→ Person[]), films (→ Film[])
- **Vehicle**: name, model, manufacturer, cost_in_credits, length, max_atmosphering_speed, crew, passengers, cargo_capacity, consumables, vehicle_class, pilots (→ Person[]), films (→ Film[])
- **Species**: name, classification, designation, average_height, skin_colors, hair_colors, eye_colors, average_lifespan, homeworld (→ Planet), language, people (→ Person[]), films (→ Film[])

## Success Criteria

### Measurable Outcomes

- **SC-001**: All 6 resource categories render lists and detail pages without errors.
- **SC-002**: Relationship resolution loads within 5s for items with up to 20 related resources.
- **SC-003**: Search filters return results in under 500ms for datasets up to 100 items.
- **SC-004**: Category-specific filters correctly narrow results across all 6 categories.
- **SC-005**: Design renders correctly on desktop (1920x1080), tablet (768x1024), and mobile (375x667) viewports.

## Assumptions

- SWAPI (https://swapi.dev/api) is available and returns data in its documented JSON format.
- The API does not require authentication.
- Client-side filtering is sufficient for the dataset size (no server-side search needed).
- No backend is required — this is a purely client-side React application.
- Relationship resolution can be done by fetching linked resource URLs.
- Fonts Bebas Neue, Libre Baskerville, and Cormorant Garamond are available via Google Fonts.
- Mobile responsiveness uses standard CSS media breakpoints (no device-specific builds).
