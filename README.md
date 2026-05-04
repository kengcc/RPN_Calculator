# RPN Calculator MEAN App

This project implements the screenshot requirements as a MEAN stack RPN calculator.

## Stack

- MongoDB stores calculation history.
- Express.js exposes calculator and history APIs.
- Angular provides the browser interface.
- Node.js runs the backend calculator service.

## Commands

Install dependencies:

```sh
npm run install:all
```

Run backend:

```sh
npm run dev:backend
```

Run frontend:

```sh
npm run dev:frontend
```

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

## API

Evaluate an RPN expression:

```http
POST /api/calculate
Content-Type: application/json

{ "expression": "2 3 +" }
```

List recent history:

```http
GET /api/history
```

Clear history:

```http
DELETE /api/history
```
