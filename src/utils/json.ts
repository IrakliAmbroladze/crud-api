import { IncomingMessage } from "node:http";

export async function parseJsonBody<T>(req: IncomingMessage): Promise<T> {
  return new Promise((resolve, reject) => {
    let data = "";

    req.on("data", (chunk) => {
      data += chunk;
    });

    req.on("end", () => {
      try {
        const parsed = JSON.parse(data || "{}");
        resolve(parsed);
      } catch (error) {
        reject(error);
      }
    });

    req.on("error", (err) => reject(err));
  });
}
