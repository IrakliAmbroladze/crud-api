import dotenv from "dotenv";
dotenv.config();
import { startServer } from "./server";

const PORT = Number(process.env.PORT) || 4000;

const main = async () => {
  try {
    await startServer(PORT);
  } catch (err) {
    if (err instanceof Error) {
      console.error("Failed to start server:", err.message);
    } else {
      console.error("Unknown error has occured:", err);
    }
    process.exit(1);
  }
};

main();
