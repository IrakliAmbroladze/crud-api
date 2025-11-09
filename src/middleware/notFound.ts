import type { ServerResponse } from "node:http";

export function notFound(res: ServerResponse) {
  res.writeHead(404, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ message: "Resource not found" }));
}
