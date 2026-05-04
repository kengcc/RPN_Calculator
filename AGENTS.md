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

## Coding Style & Naming Conventions
Use the style rules of the chosen language and keep them consistent across the repository:
- Indent JavaScript, TypeScript, HTML, and CSS with 2 spaces
- Use `camelCase` for JavaScript and TypeScript variables and functions
- Use `PascalCase` for Angular classes, services, and components
- Name tests after the feature or module they cover, such as `backend/test/calculator.service.test.js`

If you add formatting or linting tools, record the exact command here.

## Testing Guidelines
Add tests alongside new behavior, not after the fact. Keep test names descriptive and specific to the scenario being verified. Prefer fast unit tests by default, and add integration tests only when they cover real cross-module behavior.

## Commit & Pull Request Guidelines
There is no Git history available in this workspace to infer a commit style. Use clear, imperative commit messages, for example: `Add auth token validation`.

Pull requests should include:
- A short summary of the change
- Any related issue or task reference
- Screenshots or logs when the change affects UI or runtime behavior
- Notes about manual verification when automated tests are not available

## Agent Notes
Before editing, inspect the existing files and avoid overwriting user work. Keep changes minimal, well-scoped, and documented.
