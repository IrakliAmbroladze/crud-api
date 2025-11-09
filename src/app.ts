import type { IncomingMessage, ServerResponse } from "node:http";
import { usersHandler } from "./routes/users";

export function createApp(basePath = "/api") {
  return async function handler(req: IncomingMessage, res: ServerResponse) {
    try {
      const url = new URL(req.url || "", `http://${req.headers.host}`);
      if (
        url.pathname.startsWith(`${basePath}/users`) ||
        url.pathname === `${basePath}/users`
      ) {
        return await usersHandler(req, res, basePath);
      }
      if (url.pathname === basePath || url.pathname === `${basePath}/`) {
        res.writeHead(200, { "Content-Type": "application/json" });
        return res.end(JSON.stringify({ message: "API root" }));
      }
    } catch (err) {
      throw err;
    }
  };
}
