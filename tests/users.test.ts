import { createApp } from "../src/app";
import http from "node:http";
import supertest from "supertest";
import { userService } from "../src/services/userService";

let server: http.Server;
let request: supertest.SuperTest<supertest.Test>;

beforeAll((done) => {
  const app = createApp("/api");
  server = http.createServer(app).listen(0, () => {
    const port = (server.address() as any).port;
    request = supertest(
      `http://127.0.0.1:${port}`,
    ) as unknown as supertest.SuperTest<supertest.Test>;
    done();
  });
});

afterAll(async () => {
  server.close();
});

beforeEach(async () => {
  await userService.clear();
});

test("GET /api/users returns empty array initially", async () => {
  const res = await request.get("/api/users");
  expect(res.status).toBe(200);
  expect(Array.isArray(res.body)).toBe(true);
  expect(res.body.length).toBe(0);
});

test("POST /api/users creates user and GET /api/users/:id returns it", async () => {
  const createRes = await request
    .post("/api/users")
    .send({ username: "Alice", age: 30, hobbies: ["chess", "development"] });
  expect(createRes.status).toBe(201);
  expect(createRes.body).toHaveProperty("id");
  const id = createRes.body.id;

  const getRes = await request.get(`/api/users/${id}`);
  expect(getRes.status).toBe(200);
  expect(getRes.body.username).toBe("Alice");
});

test("PUT /api/users/:id updates the user", async () => {
  const createRes = await request
    .post("/api/users")
    .send({ username: "Bob", age: 30, hobbies: ["chess", "development"] });
  const id = createRes.body.id;
  const putRes = await request
    .put(`/api/users/${id}`)
    .send({ username: "Bobby", age: 25, hobbies: ["chess", "development"] });
  expect(putRes.status).toBe(200);
  expect(putRes.body.username).toBe("Bobby");
  expect(putRes.body.id).toBe(id);
});

test("DELETE /api/users/:id removes user", async () => {
  const createRes = await request
    .post("/api/users")
    .send({ username: "ToDelete", age: 30, hobbies: ["chess", "development"] });
  const id = createRes.body.id;
  const delRes = await request.delete(`/api/users/${id}`);
  expect(delRes.status).toBe(204);

  const getRes = await request.get(`/api/users/${id}`);
  expect(getRes.status).toBe(404);
});
