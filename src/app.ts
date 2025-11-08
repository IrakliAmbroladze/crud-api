import { IncomingMessage, ServerResponse } from "node:http";

export function createApp(basePath = "/api") {
  return async function handler(req: IncomingMessage, res: ServerResponse) {};
}
