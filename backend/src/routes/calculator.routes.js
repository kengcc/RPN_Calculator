import { Router } from "express";
import { evaluateRpn } from "../services/calculator.service.js";
import { CalculationHistory } from "../models/calculation-history.model.js";

export const calculatorRouter = Router();

calculatorRouter.post("/calculate", async (req, res) => {
  const expression = req.body?.expression;

  try {
    const result = evaluateRpn(expression);
    queueHistorySave({ expression, result, status: "success" });
    res.json({ expression, result });
  } catch (error) {
    queueHistorySave({
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

function queueHistorySave(entry) {
  if (!isHistoryAvailable()) {
    return;
  }

  CalculationHistory.create(entry).catch((error) => {
    console.warn(`Calculation history save failed: ${error.message}`);
  });
}

function isHistoryAvailable() {
  return CalculationHistory.db.readyState === 1;
}
