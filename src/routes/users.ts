import { IncomingMessage, ServerResponse } from "node:http";
import { parseJsonBody } from "../utils/json";

export async function usersHandler(
  req: IncomingMessage,
  res: ServerResponse,
  basePath: string,
) {
  const url = new URL(req.url || "", `http://${req.headers.host}`);
  const path = url.pathname.replace(basePath, "");
  const parts = path.split("/").filter(Boolean);

  try {
    if (req.method === "GET" && parts.length === 1) {
      const list = { 1234: "Irakli" };
      res.writeHead(200, { "Content-Type": "application/json" });
      return res.end(JSON.stringify(list));
    }
  } catch (err) {
    throw err;
  }
}
