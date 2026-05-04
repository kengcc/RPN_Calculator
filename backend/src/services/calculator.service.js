const BINARY_OPERATORS = new Map([
  ["+", (left, right) => left + right],
  ["sum", (left, right) => left + right],
  ["-", (left, right) => left - right],
  ["difference", (left, right) => left - right],
  ["*", (left, right) => left * right],
  ["multiplication", (left, right) => left * right],
  ["/", (left, right) => {
    if (right === 0) {
      throw new Error("Division by zero is not allowed.");
    }
    return left / right;
  }],
  ["division", (left, right) => {
    if (right === 0) {
      throw new Error("Division by zero is not allowed.");
    }
    return left / right;
  }],
  ["^", (left, right) => left ** right]
]);

const UNARY_OPERATORS = new Map([
  ["%", (value) => value / 100],
  ["!", factorial]
]);

export function evaluateRpn(expression) {
  if (typeof expression !== "string" || expression.trim() === "") {
    throw new Error("Expression is required.");
  }

  const stack = [];
  const tokens = expression.trim().split(/\s+/);

  for (const token of tokens) {
    if (isNumberToken(token)) {
      stack.push(Number(token));
      continue;
    }

    if (BINARY_OPERATORS.has(token)) {
      if (stack.length < 2) {
        throw new Error(`Operator "${token}" requires two operands.`);
      }

      const right = stack.pop();
      const left = stack.pop();
      stack.push(BINARY_OPERATORS.get(token)(left, right));
      continue;
    }

    if (UNARY_OPERATORS.has(token)) {
      if (stack.length < 1) {
        throw new Error(`Operator "${token}" requires one operand.`);
      }

      stack.push(UNARY_OPERATORS.get(token)(stack.pop()));
      continue;
    }

    throw new Error(`Unknown token "${token}".`);
  }

  if (stack.length !== 1) {
    throw new Error("Malformed RPN expression.");
  }

  return stack[0];
}

function isNumberToken(token) {
  return /^-?(?:\d+\.?\d*|\.\d+)$/.test(token);
}

function factorial(value) {
  if (!Number.isInteger(value) || value < 0) {
    throw new Error("Factorial requires a non-negative integer.");
  }

  let result = 1;
  for (let factor = 2; factor <= value; factor += 1) {
    result *= factor;
  }
  return result;
}
