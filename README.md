# crud-api

A Node.js application that implements a simple **CRUD (Create, Read, Update, Delete)** API for managing users.  
It is written in **TypeScript**, built with **esbuild**, and supports both **single-instance** and **multi-process (clustered)** execution modes with an integrated **load balancer** for horizontal scaling.

---

## 📋 Features

- CRUD operations for managing users.
- Validation of user IDs using regex (UUID v4 format).
- In-memory data storage (no database dependency).
- RESTful API architecture.
- Graceful error handling and standardized responses.
- Full test coverage with **Jest** and **Supertest**.
- Horizontal scaling with the Node.js **Cluster API** (load balancing across CPU cores).
- Configurable runtime environments: `development`, `test`, `production`.

---

## 🧰 Technologies Used

- **Node.js** (v20+)
- **TypeScript**
- **ESBuild** (for bundling)
- **Cross-Env** (for cross-platform env setup)
- **TS-Node-Dev** (for development auto-reload)
- **Jest** + **Supertest** (for testing)
- **Cluster API** (for horizontal scaling)

---

## 🚀 Installation and Setup

### 1. Clone the repository

```bash
git clone https://github.com/IrakliAmbroladze/crud-api.git
cd crud-api
```

### 2. Install dependencies
```bash
npm install
```

### 3. Environment setup
By default, the server runs on port 4000, but you can set a custom one in your .env file
```bash
cp .env.example .env
```

### Run in development mode
```bash
npm run start:dev

```


### Run in production mode
```bash
npm run start:prod
```


### Run with horizontal scaling (Cluster Mode)
```bash
npm run start:multi
```


### Run Tests
```bash
npm run test
```


📡 API Endpoints

All routes are prefixed with /api.
