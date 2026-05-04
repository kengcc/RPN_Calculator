# Repository Guidelines

## Project Structure & Module Organization
This repository contains a MEAN stack RPN calculator:
- `backend/` for the Node.js, Express.js, MongoDB, and calculator service code
- `backend/src/services/` for RPN calculator domain logic
- `backend/src/routes/` for Express API routes
- `backend/src/models/` for MongoDB models
- `backend/test/` for backend unit and API tests
- `frontend/` for the Angular application
- `frontend/src/app/` for Angular components and services
- `assets/` for static files such as images, fixtures, or sample data

## Build, Test, and Development Commands
Use the root npm workspace commands:
- `npm run install:all` to install backend and frontend dependencies
- `npm run dev:backend` to run the Express API
- `npm run dev:frontend` to run the Angular app
- `npm run test:backend` to run backend tests
- `npm run test:frontend` to run frontend tests
- `npm test` to run backend and frontend tests
- `npm run build --workspace frontend` to build the Angular app
- `npm audit --omit=dev` to check production dependency vulnerabilities

## Coding Style & Naming Conventions
Use the style rules of the chosen language and keep them consistent across the repository:
- Indent JavaScript, TypeScript, HTML, and CSS with 2 spaces
- Use `camelCase` for JavaScript and TypeScript variables and functions
- Use `PascalCase` for Angular classes, services, and components
- Name tests after the feature or module they cover, such as `backend/test/calculator.service.test.js`

If you add formatting or linting tools, record the exact command here.

## Testing Guidelines
Add tests alongside new behavior, not after the fact. Keep test names descriptive and specific to the scenario being verified. Prefer fast unit tests by default, and add integration tests only when they cover real cross-module behavior.

## Design Guidelines
Use [DESIGN.md](./DESIGN.md) as the source of truth for visual styling. Keep Genesis tokens in `frontend/src/styles.css` and feature-specific layout styles near the Angular component. Use indigo only for interactive states, 12px radius for cards, 6px radius for buttons and inputs, and JetBrains Mono for RPN expressions and history rows.

## Runtime Notes
Calculation responses should not wait for MongoDB history writes. Save history in the background so the UI can show results immediately. The Angular calculator component explicitly triggers change detection after API responses; preserve that behavior unless the app is migrated to a different change detection strategy.

## Commit & Pull Request Guidelines
Use clear, imperative commit messages, for example: `Add auth token validation`.

Pull requests should include:
- A short summary of the change
- Any related issue or task reference
- Screenshots or logs when the change affects UI or runtime behavior
- Notes about manual verification when automated tests are not available

## Agent Notes
Before editing, inspect the existing files and avoid overwriting user work. Keep changes minimal, well-scoped, and documented.
