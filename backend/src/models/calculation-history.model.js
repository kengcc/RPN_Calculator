import mongoose from "mongoose";

const calculationHistorySchema = new mongoose.Schema(
  {
    expression: {
      type: String,
      required: true,
      trim: true
    },
    result: {
      type: Number,
      default: null
    },
    status: {
      type: String,
      enum: ["success", "error"],
      required: true
    },
    errorMessage: {
      type: String,
      default: null
    }
  },
  {
    timestamps: true
  }
);

export const CalculationHistory = mongoose.model(
  "CalculationHistory",
  calculationHistorySchema
);
