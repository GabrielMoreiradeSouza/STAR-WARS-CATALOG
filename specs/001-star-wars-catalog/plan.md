# Implementation Plan: Star Wars Catalog

**Branch**: `001-star-wars-catalog` | **Date**: 2026-06-07 | **Spec**: specs/001-star-wars-catalog/spec.md
**Input**: Feature specification from `specs/001-star-wars-catalog/spec.md`

**Note**: This template is filled in by the `/speckit.plan` command. See `.specify/templates/plan-template.md` for the execution workflow.

## Summary

Single-page application consuming all 6 SWAPI endpoints (People, Films, Planets, Starships, Vehicles, Species). Each category section lists items with name search and category-specific filters; clicking an item opens a detail page with resolved relationships. Built as a client-side React + TypeScript + Vite SPA with no backend. Dark editorial Star Wars theme using Bebas Neue headings and serif body text.

## Technical Context

**Language/Version**: TypeScript 5.x, React 18.x, Vite 5.x
**Primary Dependencies**: react-router-dom (routing), @tanstack/react-query (data fetching/caching), axios or fetch wrapper
**Storage**: None (client-side only, no persistence — SWAPI fetched on demand)
**Testing**: Vitest + React Testing Library
**Target Platform**: Modern browsers (Chrome, Firefox, Safari, Edge — latest 2 major versions)
**Project Type**: Web application (frontend-only SPA)
**Performance Goals**: Category list loaded within 2s on broadband; search filters responsive under 200ms; detail page relationships resolved within 5s
**Constraints**: No backend; no SSR/SSG; no auth; SWAPI rate limits (10k/day); must work offline gracefully (show cached data if available, error state otherwise)
**Scale/Scope**: 6 category sections, ~20-100 items each, ~6 detail page variants, responsive design (3 breakpoints)

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

### Pre-Design (Phase 0 Gate)

**Constitution status**: Template-only constitution — no enforceable gates. Project uses standard Spec-Driven Development workflow. All principles are placeholders requiring customization. No violations detected at this stage.

**Gate verdict**: PASS (template constitution, no violations)

### Post-Design (Phase 1 Gate)

**Constitution status**: Unchanged — still template-only. No new violations introduced by the design.

**Design review**:
- **Project type**: Single web application (appropriate for scope)
- **Dependencies**: React, React Router, React Query, Vite — standard, well-established ecosystem
- **No unnecessary abstractions**: No monorepo, no backend, no SSR — minimal viable architecture
- **Complexity justification**: N/A — no complexity violations present

**Gate verdict**: PASS — design stays within reasonable bounds. Constitution customization recommended before next feature iteration.

## Project Structure

### Documentation (this feature)

```text
specs/001-star-wars-catalog/
├── plan.md              # This file (/speckit.plan command output)
├── research.md          # Phase 0 output (/speckit.plan command)
├── data-model.md        # Phase 1 output (/speckit.plan command)
├── quickstart.md        # Phase 1 output (/speckit.plan command)
├── contracts/           # Phase 1 output (/speckit.plan command)
└── tasks.md             # Phase 2 output (/speckit.tasks command - NOT created by /speckit.plan)
```

### Source Code (repository root)

```text
star-wars-catalog/
├── public/
│   └── favicon.svg
├── src/
│   ├── api/
│   │   ├── client.ts          # HTTP client + base fetch layer
│   │   ├── swapi.ts           # SWAPI-specific query functions
│   │   └── resolve.ts         # Relationship URL resolver
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.tsx
│   │   │   └── Footer.tsx
│   │   ├── catalog/
│   │   │   ├── CategoryCard.tsx
│   │   │   ├── ItemCard.tsx
│   │   │   ├── ItemList.tsx
│   │   │   ├── SearchBar.tsx
│   │   │   └── FilterPanel.tsx
│   │   ├── detail/
│   │   │   ├── DetailField.tsx
│   │   │   ├── RelationshipList.tsx
│   │   │   └── ResourceLink.tsx
│   │   └── ui/
│   │       ├── Loading.tsx
│   │       ├── ErrorMessage.tsx
│   │       └── Pagination.tsx
│   ├── hooks/
│   │   ├── useSwapiList.ts
│   │   ├── useSwapiDetail.ts
│   │   ├── useSearch.ts
│   │   └── useResolve.ts
│   ├── pages/
│   │   ├── HomePage.tsx
│   │   ├── CategoryPage.tsx
│   │   └── DetailPage.tsx
│   ├── types/
│   │   └── swapi.ts           # TypeScript interfaces for all SWAPI resources
│   ├── utils/
│   │   ├── filters.ts         # Category-specific filter logic
│   │   └── formatters.ts     # Display formatters (dates, units)
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

**Structure Decision**: Standard Vite React-TS single-project layout. All source lives under `star-wars-catalog/src/` organized by concern: api layer, components (layout/catalog/detail/ui), hooks, pages, types, utils. No monorepo — this is a standalone SPA.

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

No violations — template constitution with no applicable constraints.
