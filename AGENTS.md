# AGENTS.md - StarWars Speckit Project

## Project Overview
Spec-Driven Development (Speckit) project with OpenCode integration. Uses the full SDD cycle: **specify → plan → tasks → implement** with review gates.

## Key Commands
Run speckit commands via OpenCode:
- `speckit.specify <feature>` - Create specification
- `speckit.plan <feature>` - Generate implementation plan
- `speckit.tasks <feature>` - Break down into tasks
- `speckit.implement <feature>` - Execute implementation

## Workflow
Defined in `.specify/workflows/speckit/workflow.yml`:
1. Specify feature → 2. Review spec (gate) → 3. Plan → 4. Review plan (gate) → 5. Tasks → 6. Implement

## Project Structure
- `.specify/` - Speckit configuration, templates, scripts, constitution
- `.opencode/` - OpenCode plugin + command definitions
- `.specify/memory/constitution.md` - Project constitution (template, needs customization)
- `.specify/init-options.json` - Project initialization settings

## Conventions
- Branch numbering: sequential (from init-options.json)
- Scripts: bash (`.specify/scripts/bash/`)
- AI integration: opencode

## Constitution
Template at `.specify/memory/constitution.md` - must be customized with project-specific principles before use.

## Development Notes
- No package.json at root - only in `.opencode/` for plugin deps
- No traditional build/test/lint commands - this is a spec/methodology project
- Commands defined in `.opencode/command/` and `.specify/extensions/git/commands/`

## Active Technologies
- TypeScript 5.x, React 18.x, Vite 5.x + react-router-dom (routing), @tanstack/react-query (data fetching/caching), axios or fetch wrapper (001-star-wars-catalog)
- None (client-side only, no persistence — SWAPI fetched on demand) (001-star-wars-catalog)

## Recent Changes
- 001-star-wars-catalog: Added TypeScript 5.x, React 18.x, Vite 5.x + react-router-dom (routing), @tanstack/react-query (data fetching/caching), axios or fetch wrapper
- 001-star-wars-catalog: Integrated akabab starwars-api (https://akabab.github.io/starwars-api/api/all.json) for character portrait photos — new `useCharacterImages` hook fetches & caches a name→image-url lookup; ItemCard shows 64px thumbnail with initial-letter fallback; DetailPage shows 200px image for people; onError handler hides broken images gracefully
