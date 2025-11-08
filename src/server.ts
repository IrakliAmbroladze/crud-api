import http from "node:http";
import { createApp } from "./app";

export function startServer(port: number) {
  const app = createApp("/api");
  const server = http.createServer(app);
  return new Promise<http.Server>((resolve) => {
    server.listen(port, () => {
      console.log(`Server listening on port ${port}`);
      resolve(server);
    });
  });
}
