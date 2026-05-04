import { Router } from "express";
import { evaluateRpn } from "../services/calculator.service.js";
import { CalculationHistory } from "../models/calculation-history.model.js";

export const calculatorRouter = Router();

calculatorRouter.post("/calculate", async (req, res) => {
  const expression = req.body?.expression;

  try {
    const result = evaluateRpn(expression);
    await saveHistory({ expression, result, status: "success" });
    res.json({ expression, result });
  } catch (error) {
    await saveHistory({
      expression: typeof expression === "string" ? expression : "",
      result: null,
      status: "error",
      errorMessage: error.message
    });
    res.status(400).json({ error: error.message });
  }
});

calculatorRouter.get("/history", async (_req, res) => {
  if (!isHistoryAvailable()) {
    res.json({ history: [] });
    return;
  }

  const history = await CalculationHistory.find()
    .sort({ createdAt: -1 })
    .limit(25)
    .lean();

  res.json({ history });
});

calculatorRouter.delete("/history", async (_req, res) => {
  if (!isHistoryAvailable()) {
    res.status(204).send();
    return;
  }

  await CalculationHistory.deleteMany({});
  res.status(204).send();
});

async function saveHistory(entry) {
  if (!isHistoryAvailable()) {
    return;
  }

  await CalculationHistory.create(entry);
}

function isHistoryAvailable() {
  return CalculationHistory.db.readyState === 1;
}
