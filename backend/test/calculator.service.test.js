import assert from "node:assert/strict";
import test from "node:test";
import { evaluateRpn } from "../src/services/calculator.service.js";

test("evaluates sum, difference, multiplication, and division", () => {
  assert.equal(evaluateRpn("2 3 +"), 5);
  assert.equal(evaluateRpn("7 4 -"), 3);
  assert.equal(evaluateRpn("6 5 *"), 30);
  assert.equal(evaluateRpn("12 3 /"), 4);
});

test("supports floating point operations", () => {
  assert.equal(evaluateRpn("2.5 1.25 +"), 3.75);
  assert.equal(evaluateRpn("5.5 2 *"), 11);
});

test("evaluates exponent expressions", () => {
  assert.equal(evaluateRpn("2 3 ^"), 8);
});

test("evaluates percent expressions", () => {
  assert.equal(evaluateRpn("25 %"), 0.25);
});

test("evaluates factorial expressions", () => {
  assert.equal(evaluateRpn("5 !"), 120);
  assert.equal(evaluateRpn("0 !"), 1);
});

test("rejects invalid expressions", () => {
  assert.throws(() => evaluateRpn(""), /Expression is required/);
  assert.throws(() => evaluateRpn("2 +"), /requires two operands/);
  assert.throws(() => evaluateRpn("10 0 /"), /Division by zero/);
  assert.throws(() => evaluateRpn("2.5 !"), /non-negative integer/);
  assert.throws(() => evaluateRpn("2 3"), /Malformed/);
  assert.throws(() => evaluateRpn("2 3 @"), /Unknown token/);
});
