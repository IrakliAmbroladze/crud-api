import { IncomingMessage, ServerResponse } from "node:http";

export function createApp(basePath = "/api") {
  return async function handler(req: IncomingMessage, res: ServerResponse) {
    res.writeHead(200, { "Content-Type": "application/json" });
    return res.end(JSON.stringify({ message: "test message" }));
  };
}
