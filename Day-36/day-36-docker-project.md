
# 📁 Final Project Structure

```
2026/day-36/
 ├── app/
 │    ├── server.js
 │    ├── package.json
 │    ├── Dockerfile
 │    └── .dockerignore
 ├── docker-compose.yml
 ├── .env
 └── day-36-docker-project.md

# 🧠 The Application

Simple API:

* GET / → health message
* POST /users → save user
* GET /users → list users


## 📌 Project Overview

This project demonstrates full end-to-end Dockerization of a Node.js Express application with MongoDB database using Docker Compose.

The goal was to simulate a real-world production deployment scenario including:

* Multi-stage Docker build
* Non-root container user
* Database persistence using volumes
* Environment variable configuration
* Healthchecks
* Custom network
* Docker Hub image distribution

---

## 🛠 Tech Stack

* Node.js (Express)
* MongoDB
* Docker
* Docker Compose

---

## 🐳 Dockerfile Explanation

```dockerfile
FROM node:18-alpine AS builder
```

Lightweight base image for dependency installation.

```dockerfile
WORKDIR /app
```

Sets working directory.

```dockerfile
COPY package*.json ./
RUN npm install --production
```

Installs only production dependencies.

```dockerfile
FROM node:18-alpine
```

Fresh minimal runtime image.

```dockerfile
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
```

Creates non-root user for security.

```dockerfile
COPY --from=builder /app /app
```

Copies built app from builder stage.

```dockerfile
USER appuser
```

Prevents root execution.

---

## 🐳 Docker Compose Features

* App service built locally
* MongoDB official image
* Named volume for data persistence
* Custom network
* Healthcheck for DB readiness
* .env file for configuration

---

## 🔐 Security Improvements

* Non-root container user
* Lightweight Alpine base
* Multi-stage build
* No unnecessary tools inside image

---

## 📦 Final Image Size

Approx: 140MB (node:18-alpine based)

---

## 🔗 Docker Hub Repository

```
https://hub.docker.com/r/kanhaiyatiwari/node-docker-project
```

---

## 🧠 Challenges Faced

* MongoDB connection failing due to wrong hostname (fixed by using service name)
* Healthcheck timing issues (fixed with retries)
* Volume persistence misunderstanding (fixed by testing down -v)

---

## 🎯 Key Learnings

* Containers communicate via service names, not localhost
* Multi-stage builds reduce image size and improve security
* Docker Compose orchestrates multi-container applications
* Healthchecks are critical for production reliability
