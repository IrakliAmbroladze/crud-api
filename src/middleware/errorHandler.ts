import type { ServerResponse } from "node:http";

export function handleServerError(res: ServerResponse, err: any) {
  console.error("Server error:", err);
  res.writeHead(500, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ message: "Internal Server Error" }));
}
