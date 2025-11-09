import { createServer, type Server } from "node:http";
import { createApp } from "./app";

export const startServer = async (port: number) => {
  const app = createApp("/api");
  const server = createServer(app);
  return new Promise<Server>((resolve) => {
    server.listen(port, () => {
      console.log(`Server listening on port ${port}`);
      resolve(server);
    });
  });
};
