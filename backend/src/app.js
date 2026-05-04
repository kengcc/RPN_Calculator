import express from "express";
import cors from "cors";
import { calculatorRouter } from "./routes/calculator.routes.js";

export function createApp() {
  const app = express();

  app.use(cors({
    origin: process.env.FRONTEND_ORIGIN || "http://localhost:4200"
  }));
  app.use(express.json());

  app.get("/health", (_req, res) => {
    res.json({ status: "ok" });
  });

  app.use("/api", calculatorRouter);

  app.use((err, _req, res, _next) => {
    res.status(500).json({ error: err.message || "Unexpected server error." });
  });

  return app;
}
