import { IncomingMessage, ServerResponse } from "node:http";
import { parseJsonBody } from "../utils/json";
import { userService } from "../services/userService";
import { User } from "../types/user";
import { isUuid } from "../utils/validateUuid";

export const usersHandler = async (
  req: IncomingMessage,
  res: ServerResponse,
  basePath: string,
) => {
  const url = new URL(req.url || "", `http://${req.headers.host}`);
  const path = url.pathname.replace(basePath, "");
  const parts = path.split("/").filter(Boolean);

  try {
    if (req.method === "GET" && parts.length === 1) {
      const list = await userService.getAll();
      res.writeHead(200, { "Content-Type": "application/json" });
      return res.end(JSON.stringify(list));
    }

    if (req.method === "POST" && parts.length === 1) {
      const body = await parseJsonBody<Omit<User, "id">>(req);

      if (!body.username || !body.age || !body.hobbies) {
        res.writeHead(400, { "Content-Type": "application/json" });
        return res.end(
          JSON.stringify({
            message: "Missing required fields: username, age, hobbies",
          }),
        );
      }

      const created = await userService.create(body);
      res.writeHead(201, { "Content-Type": "application/json" });
      return res.end(JSON.stringify(created));
    }

    if (req.method === "GET" && parts.length === 2) {
      const id = parts[1];

      if (!isUuid(id)) {
        res.writeHead(400, { "Content-Type": "application/json" });
        return res.end(
          JSON.stringify({ message: "Invalid userId format (not UUID)" }),
        );
      }

      const user = await userService.getById(id);
      if (!user) {
        res.writeHead(404, { "Content-Type": "application/json" });
        return res.end(JSON.stringify({ message: "User not found" }));
      }
      res.writeHead(200, { "Content-Type": "application/json" });
      return res.end(JSON.stringify(user));
    }

    if (req.method === "PUT" && parts.length === 2) {
      const id = parts[1];

      if (!isUuid(id)) {
        res.writeHead(400, { "Content-Type": "application/json" });
        return res.end(
          JSON.stringify({ message: "Invalid userId format (not UUID)" }),
        );
      }

      const body = await parseJsonBody<Partial<Omit<User, "id">>>(req);

      const updated = await userService.update(id, body);

      if (!updated) {
        res.writeHead(404, { "Content-Type": "application/json" });
        return res.end(JSON.stringify({ message: "User not found" }));
      }

      res.writeHead(200, { "Content-Type": "application/json" });
      return res.end(JSON.stringify(updated));
    }

    if (req.method === "DELETE" && parts.length === 2) {
      const id = parts[1];

      if (!isUuid(id)) {
        res.writeHead(400, { "Content-Type": "application/json" });
        return res.end(
          JSON.stringify({ message: "Invalid userId format (not UUID)" }),
        );
      }

      const removed = await userService.delete(id);
      if (!removed) {
        res.writeHead(404, { "Content-Type": "application/json" });
        return res.end(JSON.stringify({ message: "User not found" }));
      }
      res.writeHead(204);
      return res.end();
    }

    res.writeHead(404, { "Content-Type": "application/json" });
    return res.end(JSON.stringify({ message: "Not Found" }));
  } catch (err) {
    throw err;
  }
};
