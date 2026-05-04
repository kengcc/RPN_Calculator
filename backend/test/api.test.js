import assert from "node:assert/strict";
import test from "node:test";
import { createApp } from "../src/app.js";

test("health endpoint returns ok", async () => {
  const { default: request } = await import("supertest");
  const response = await request(createApp()).get("/health").expect(200);

  assert.equal(response.body.status, "ok");
});

test("calculate endpoint returns RPN result", async () => {
  const { default: request } = await import("supertest");
  const response = await request(createApp())
    .post("/api/calculate")
    .send({ expression: "2 3 +" })
    .expect(200);

  assert.equal(response.body.result, 5);
});

test("calculate endpoint returns validation error", async () => {
  const { default: request } = await import("supertest");
  const response = await request(createApp())
    .post("/api/calculate")
    .send({ expression: "2 +" })
    .expect(400);

  assert.match(response.body.error, /requires two operands/);
});
