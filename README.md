# RPN Calculator MEAN App

Public repository: [kengcc/RPN_Calculator](https://github.com/kengcc/RPN_Calculator)

This project implements the screenshot requirements as a MEAN stack RPN calculator. It evaluates postfix, or RPN, expressions from an Angular UI through an Express API backed by Node.js calculator logic. MongoDB is used for optional calculation history persistence.

## Features

- Evaluates RPN expressions such as `2 3 +`.
- Supports sum, difference, division, and multiplication.
- Supports floating point values.
- Supports exponent expressions with `^`, such as `2 3 ^`.
- Supports percent expressions with `%`, such as `25 %`.
- Supports factorial expressions with `!`, such as `5 !`.
- Returns validation errors for missing operands, unknown tokens, division by zero, invalid factorial input, and malformed expressions.
- Displays recent calculation history when MongoDB is available.
- Uses the Genesis design system documented in [DESIGN.md](./DESIGN.md).

## Stack

- MongoDB stores calculation history.
- Express.js exposes calculator and history APIs.
- Angular provides the browser interface.
- Node.js runs the backend calculator service.

## Project Structure

```text
backend/
  src/
    config/      MongoDB connection setup
    models/      Mongoose calculation history model
    routes/      Express API routes
    services/    RPN calculator domain logic
  test/          Backend unit and API tests
frontend/
  src/app/       Angular components and services
DESIGN.md        Genesis design system reference
PLAN.md          Completed implementation roadmap
requirements.md  Original screenshot-derived requirements
```

## Setup

Install dependencies:

```sh
npm run install:all
```

Optional MongoDB configuration:

```sh
cp .env.example .env
```

By default, the backend tries `mongodb://127.0.0.1:27017/rpn_calculator`. If MongoDB is unavailable, calculation still works and history returns an empty list.

## Development

Run backend:

```sh
npm run dev:backend
```

Run frontend:

```sh
npm run dev:frontend
```

Open the app at:

```text
http://localhost:4200/
```

The backend listens on:

```text
http://localhost:3000/
```

## Commands

Run all tests:

```sh
npm test
```

Run backend tests only:

```sh
npm run test:backend
```

Run frontend tests only:

```sh
npm run test:frontend
```

Build frontend:

```sh
npm run build --workspace frontend
```

Check production dependency audit:

```sh
npm audit --omit=dev
```

## API

Health check:

```http
GET /health
```

Evaluate an RPN expression:

```http
POST /api/calculate
Content-Type: application/json

{ "expression": "2 3 +" }
```

Example response:

```json
{
  "expression": "2 3 +",
  "result": 5
}
```

List recent history:

```http
GET /api/history
```

Clear history:

```http
DELETE /api/history
```

## Runtime Notes

- Calculation responses are returned immediately.
- Calculation history is saved in the background so MongoDB latency does not block the UI result.
- The Angular component explicitly triggers change detection after API responses so the result appears without requiring focus or blur events.
- The current local environment uses Node.js `v25.9.0`, which works for development but is not an LTS production version.
