---

description: "Task list for Star Wars Catalog feature implementation"

---

# Tasks: Star Wars Catalog (001-star-wars-catalog)

**Input**: Design documents from `specs/001-star-wars-catalog/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/

**Tests**: Not requested in spec — automated tests excluded from this task list.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

Project root is `star-wars-catalog/` (Vite React-TS single project layout).

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Scaffold the Vite project and install dependencies

- [X] T001 Create Vite project with `npm create vite@latest star-wars-catalog -- --template react-ts`
- [X] T002 [P] Install runtime dependencies: `react-router-dom`, `@tanstack/react-query`
- [X] T003 [P] Install dev dependencies: `vitest`, `@testing-library/react`, `@testing-library/jest-dom`, `jsdom`
- [X] T004 Create directory structure following plan.md layout under `star-wars-catalog/src/`
- [X] T005 Configure `vite.config.ts` with React plugin and test configuration

---

## Phase 2: Foundational (Blocking Prerequisites)

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [X] T006 [P] Define all SWAPI TypeScript interfaces in `star-wars-catalog/src/types/swapi.ts` (PersonRaw, FilmRaw, PlanetRaw, StarshipRaw, VehicleRaw, SpeciesRaw, PaginatedResponse, and their resolved counterparts)
- [X] T007 [P] Implement base HTTP client in `star-wars-catalog/src/api/client.ts` with `fetch` wrapper, error handling, and base URL config
- [X] T008 [P] Implement SWAPI query functions in `star-wars-catalog/src/api/swapi.ts` (list resources, get single resource, with pagination support)
- [X] T009 [P] Implement relationship URL resolver in `star-wars-catalog/src/api/resolve.ts` (takes URL → fetches and caches via React Query)
- [X] T010 [P] Create custom hooks: `useSwapiList` in `star-wars-catalog/src/hooks/useSwapiList.ts` and `useSwapiDetail` in `star-wars-catalog/src/hooks/useSwapiDetail.ts`
- [X] T011 [P] Create `useResolve` hook in `star-wars-catalog/src/hooks/useResolve.ts` for resolving relationship URLs with parallel fetching
- [X] T012 [P] Create `useSearch` hook in `star-wars-catalog/src/hooks/useSearch.ts` with debounced client-side search
- [X] T013 [P] Set up React Router configuration in `star-wars-catalog/src/App.tsx` with routes for HomePage, CategoryPage, and DetailPage
- [X] T014 [P] Set up React Query provider (`QueryClientProvider`) in `star-wars-catalog/src/main.tsx`
- [X] T015 [P] Create CSS theme foundation in `star-wars-catalog/src/index.css` with CSS custom properties for dark theme (colors, spacing, typography), Bebas Neue heading font, and Libre Baskerville body font
- [X] T016 [P] Add Google Fonts link for Bebas Neue and Libre Baskerville in `star-wars-catalog/index.html`
- [X] T017 [P] Create Loading component in `star-wars-catalog/src/components/ui/Loading.tsx` (skeleton + spinner variants)
- [X] T018 [P] Create ErrorMessage component in `star-wars-catalog/src/components/ui/ErrorMessage.tsx` with retry button
- [X] T019 [P] Create Pagination component in `star-wars-catalog/src/components/ui/Pagination.tsx`

**Checkpoint**: Foundation ready — user story implementation can now begin

---

## Phase 3: User Story 1 - Browse and Search Catalog (Priority: P1) 🎯 MVP

**Goal**: User can see all 6 resource categories, navigate to any category, browse paginated items, and search by name.

**Independent Test**: Load the homepage, click a category, verify items render. Use search bar to filter by name.

### Implementation for User Story 1

- [X] T020 [P] [US1] Create Header component in `star-wars-catalog/src/components/layout/Header.tsx` with app title and nav link to home
- [X] T021 [P] [US1] Create Footer component in `star-wars-catalog/src/components/layout/Footer.tsx` with SWAPI attribution
- [X] T022 [P] [US1] Create CategoryCard component in `star-wars-catalog/src/components/catalog/CategoryCard.tsx`
- [X] T023 [US1] Create HomePage in `star-wars-catalog/src/pages/HomePage.tsx` displaying 6 category cards linking to each resource route
- [X] T024 [P] [US1] Create ItemCard component in `star-wars-catalog/src/components/catalog/ItemCard.tsx` showing name + key attributes per category
- [X] T025 [P] [US1] Create ItemList component in `star-wars-catalog/src/components/catalog/ItemList.tsx` with Loading/Error/empty states
- [X] T026 [P] [US1] Create SearchBar component in `star-wars-catalog/src/components/catalog/SearchBar.tsx` with debounced input
- [X] T027 [P] [US1] Create formatters utility in `star-wars-catalog/src/utils/formatters.ts` (date formatting, unit display, unknown/n/a handling)
- [X] T028 [US1] Create CategoryPage in `star-wars-catalog/src/pages/CategoryPage.tsx` combining ItemList + SearchBar + Pagination, connected to React Query and search hook

**Checkpoint**: At this point, US1 should be fully functional. User can browse all 6 categories, paginate results, and search by name. This is the MVP.

---

## Phase 4: User Story 2 - View Item Detail (Priority: P1)

**Goal**: User can click any catalog item and see a detail page with all fields and resolved relationships.

**Independent Test**: Click any item from a list and verify all fields render. Check relationship fields show resolved names (e.g., homeworld name, film titles).

### Implementation for User Story 2

- [X] T029 [P] [US2] Create DetailField component in `star-wars-catalog/src/components/detail/DetailField.tsx` for rendering key-value pairs
- [X] T030 [P] [US2] Create ResourceLink component in `star-wars-catalog/src/components/detail/ResourceLink.tsx` for linking to related resources
- [X] T031 [P] [US2] Create RelationshipList component in `star-wars-catalog/src/components/detail/RelationshipList.tsx` with inline spinners and resolved name display
- [X] T032 [US2] Create DetailPage in `star-wars-catalog/src/pages/DetailPage.tsx` fetching single item, rendering all scalar fields, and resolving all relationship fields with progressive loading
- [X] T033 [US2] Wire up ItemCard click navigation to DetailPage via React Router `useNavigate`

**Checkpoint**: US1 + US2 both work. User can browse lists, search, and view rich detail pages with resolved cross-references.

---

## Phase 5: User Story 3 - Category-Specific Filters (Priority: P2)

**Goal**: User can apply category-specific facet filters (gender, climate, crew range, etc.) to narrow results beyond text search.

**Independent Test**: Apply a category filter (e.g., climate "desert" on Planets) and verify only matching items appear.

### Implementation for User Story 3

- [X] T034 [P] [US3] Create filters utility in `star-wars-catalog/src/utils/filters.ts` with filter definition configs per category and filter logic functions
- [X] T035 [P] [US3] Create FilterPanel component in `star-wars-catalog/src/components/catalog/FilterPanel.tsx` rendering category-specific filter controls (selects, range inputs)
- [X] T036 [US3] Integrate FilterPanel into CategoryPage (`star-wars-catalog/src/pages/CategoryPage.tsx`) alongside SearchBar, combining search + filter + pagination
- [X] T037 [US3] Update URL search params on filter change for shareable filtered URLs

**Checkpoint**: US1 + US2 + US3 complete. Full catalog browsing with search and facet filtering.

---

## Phase 6: User Story 4 - Responsive and Cinematic Experience (Priority: P3)

**Goal**: The site looks great on all devices with a dark cinematic Star Wars theme and elegant typography.

**Independent Test**: Resize browser to mobile width. Verify layout adapts, fonts render correctly, no neon colors present.

### Implementation for User Story 4

- [X] T038 [P] [US4] Add responsive CSS breakpoints to `star-wars-catalog/src/index.css` for mobile (375px), tablet (768px), and desktop (1920px)
- [X] T039 [P] [US4] Make Header responsive (collapse nav to hamburger on mobile)
- [X] T040 [P] [US4] Make HomePage category grid responsive (single column on mobile, 2-3 columns on desktop)
- [X] T041 [P] [US4] Make CategoryPage list responsive (cards stack vertically on mobile)
- [X] T042 [P] [US4] Make DetailPage layout responsive (fields stack on mobile, two-column on desktop)
- [X] T043 [P] [US4] Add hover/transition effects (gold accent on hover, smooth color transitions)
- [X] T044 [P] [US4] Add loading skeleton animations for initial page loads

**Checkpoint**: Full feature complete with responsive design and cinematic theming.

---

## Phase 7: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [X] T045 [P] Add error boundary at page level for graceful crash handling
- [X] T046 [P] Add 404 page for invalid routes
- [X] T047 [P] Handle SWAPI downtime with persistent retry messaging in `src/api/client.ts`
- [X] T048 [P] Handle edge cases: missing relationship URLs, 404 on resolve, "unknown"/"n/a" field values
- [X] T049 [P] Final review: verify all 6 categories render, search works, filters work, detail pages render all fields

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies — can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion — BLOCKS all user stories
- **US1 (Phase 3)**: Depends on Foundational — no other story dependencies (MVP)
- **US2 (Phase 4)**: Depends on Foundational + US1 (ItemCard click → DetailPage navigation)
- **US3 (Phase 5)**: Depends on Foundational + US1 (integrates into CategoryPage)
- **US4 (Phase 6)**: Depends on US1 + US2 + US3 (applies responsive styles to all pages)
- **Polish (Phase 7)**: Depends on all user stories complete

### User Story Dependencies

- **US1 (P1)**: No dependencies on other stories — Story 1 is the MVP
- **US2 (P1)**: Integrates with US1 (navigation from list to detail) but independently testable via direct URL access
- **US3 (P2)**: Integrates with US1 (filters added to CategoryPage) but independently testable
- **US4 (P3)**: Applies responsive styling across all pages — depends on page structure from US1-3

### Within Each User Story

Core implementation before integration. Models/services/hooks before pages.

### Parallel Opportunities

- All Phase 1 tasks marked [P] can run in parallel
- All Phase 2 tasks marked [P] can run in parallel
- Within each user story, [P] tasks can run in parallel
- Different user stories can be implemented in priority order (P1 → P2 → P3)

---

## Parallel Example: User Story 1

```bash
# Launch all independent UI components for US1 together:
Task: "Create Header component in src/components/layout/Header.tsx"
Task: "Create Footer component in src/components/layout/Footer.tsx"
Task: "Create CategoryCard component in src/components/catalog/CategoryCard.tsx"
Task: "Create ItemCard component in src/components/catalog/ItemCard.tsx"
Task: "Create SearchBar component in src/components/catalog/SearchBar.tsx"
Task: "Create formatters utility in src/utils/formatters.ts"

# Then integrate:
Task: "Create HomePage in src/pages/HomePage.tsx"
Task: "Create ItemList in src/components/catalog/ItemList.tsx"
Task: "Create CategoryPage in src/pages/CategoryPage.tsx"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational
3. Complete Phase 3: User Story 1
4. **STOP and VALIDATE**: Browse + search Catalog works independently
5. Deploy/demo if ready

### Incremental Delivery

1. Complete Setup + Foundational → Foundation ready
2. Add US1 (Browse + Search) → Test independently → **MVP!**
3. Add US2 (Detail pages) → Test independently → Deploy
4. Add US3 (Category filters) → Test independently → Deploy
5. Add US4 (Responsive design) → Test independently → Deploy

### Sequential Strategy (Single Developer)

1. Phase 1 → Phase 2 → US1 → US2 → US3 → US4 → Polish
2. Each phase is a complete, independently testable increment
3. Stop at any checkpoint to validate and deploy

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- Each user story should be independently completable and testable
- Commit after each task or logical group
- Stop at any checkpoint to validate story independently
- Avoid: vague tasks, same file conflicts, cross-story dependencies that break independence
- No test tasks per spec (tests not explicitly requested)
