import dotenv from "dotenv";
dotenv.config();
import { startServer } from "./server.js";

const PORT = Number(process.env.PORT) || 4000;

startServer(PORT).catch((err) => {
  console.error("Dev server failed:", err);
  process.exit(1);
});
