import "dotenv/config";
import { createApp } from "./app.js";
import { connectDatabase } from "./config/database.js";

const port = Number(process.env.PORT || 3000);
const mongoUri = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/rpn_calculator";
const app = createApp();

try {
  await connectDatabase(mongoUri);
  console.log("Connected to MongoDB.");
} catch (error) {
  console.warn(`MongoDB connection skipped: ${error.message}`);
}

app.listen(port, () => {
  console.log(`RPN calculator API listening on http://localhost:${port}`);
});
