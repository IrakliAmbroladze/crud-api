import cluster from "node:cluster";
import os from "node:os";
import http from "node:http";
import dotenv from "dotenv";

dotenv.config();

const PORT = Number(process.env.PORT) || 4000;
const cpus = Math.max(1, os.cpus().length);
const workersCount = Math.max(1, cpus - 1);

if (cluster.isPrimary) {
  console.log(`Primary pid ${process.pid}. Spawning ${workersCount} workers.`);
  for (let i = 0; i < workersCount; i++) {
    const workerPort = PORT + 1 + i;
    const env = { ...process.env, WORKER_PORT: String(workerPort) };
    cluster.fork(env);
  }

  let rr = 0;
  const workerPorts = Array.from(
    { length: workersCount },
    (_, i) => PORT + 1 + i,
  );

  const proxy = http.createServer((req, res) => {
    const targetPort = workerPorts[rr % workerPorts.length];
    rr++;
    const options = {
      hostname: "127.0.0.1",
      port: targetPort,
      path: req.url,
      method: req.method,
      headers: req.headers,
    };

    const proxyReq = http.request(options, (proxyRes) => {
      res.writeHead(proxyRes.statusCode || 500, proxyRes.headers as any);
      proxyRes.pipe(res, { end: true });
    });

    proxyReq.on("error", (err) => {
      console.error("Proxy error:", err);
      res.writeHead(502, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Bad Gateway" }));
    });

    if (req.pipe) {
      req.pipe(proxyReq, { end: true });
    } else {
      proxyReq.end();
    }
  });

  proxy.listen(PORT, () => {
    console.log(`Load balancer listening on port ${PORT}`);
  });

  cluster.on("exit", (worker, code) => {
    console.log("Worker died, code:", code, " pid:", worker.process?.pid);
    const newWorker = cluster.fork();
    console.log("Restarted worker", newWorker.process?.pid);
  });
} else {
  const workerPort = Number(process.env.WORKER_PORT);
  import("./server.js").then((mod) => {
    mod.startServer(workerPort).then(() => {
      console.log(`Worker listening on ${workerPort} pid ${process.pid}`);
    });
  });
}
