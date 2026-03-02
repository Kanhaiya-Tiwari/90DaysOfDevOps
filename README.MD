
# 🚀 Day 35 – Multi-Stage Builds & Docker Hub

## 📌 Objective

The goal of this project is to:

* Understand the problem with large Docker images
* Implement multi-stage builds to optimize image size
* Push images to Docker Hub
* Apply Docker image best practices
* Compare performance and security improvements

This project demonstrates production-level Docker practices used in real-world DevOps environments.

---

# 🛠 Project Overview

We created a simple Node.js application and built:

1. A **Single-Stage Docker Image**
2. A **Multi-Stage Optimized Image**
3. A **Distroless Production Image**

We then pushed the optimized image to Docker Hub and verified it by pulling it again.

---

# 📂 Project Structure

```
2026/day-35/
 ├── app.js
 ├── Dockerfile.single
 ├── Dockerfile.multistage
 ├── Dockerfile.distroless
 └── day-35-multistage-hub.md
```

---

# 🧪 Task 1 – Single Stage Build

## Application Code

```js
console.log("Hello from Docker Multi-Stage!");
```

## Dockerfile (Single Stage)

```dockerfile
FROM node:18

WORKDIR /app
COPY . .

CMD ["node", "app.js"]
```

## Build Command

```bash
docker build -t node-single .
```

## Image Size

```
node-single   ~900MB
```

## Problem

* Includes full Debian OS
* Contains build tools and unnecessary packages
* Large attack surface
* Not production optimized

---

# ⚡ Task 2 – Multi-Stage Build

## Dockerfile (Multi-Stage)

```dockerfile
# Stage 1: Builder
FROM node:18-alpine AS builder

WORKDIR /app
COPY . .

# Stage 2: Runtime
FROM node:18-alpine

WORKDIR /app
COPY --from=builder /app /app

CMD ["node", "app.js"]
```

## Build Command

```bash
docker build -t node-multistage .
```

## Optimized Image Size

```
node-multistage   ~150MB
```

## Why Smaller?

* Uses Alpine (lightweight base image)
* Removes unnecessary OS components
* Separates build and runtime environments
* Reduces final layers

---

# 🔒 Task 3 – Distroless Production Image

## Dockerfile (Distroless)

```dockerfile
# Stage 1: Builder
FROM node:18-alpine AS builder

WORKDIR /app
COPY . .

# Stage 2: Distroless Runtime
FROM gcr.io/distroless/nodejs18

WORKDIR /app
COPY --from=builder /app /app

USER nonroot

CMD ["app.js"]
```

## Image Size

```
~60–80MB
```

## Benefits

* No shell
* No package manager
* Smaller attack surface
* Runs as non-root user
* Production-ready

---

# 📦 Task 4 – Docker Hub Integration

## Login

```bash
docker login
```

## Tag Image

```bash
docker tag node-multistage yourusername/node-multistage:v1
```

## Push Image

```bash
docker push yourusername/node-multistage:v1
```

## Pull Verification

```bash
docker rmi yourusername/node-multistage:v1
docker pull yourusername/node-multistage:v1
```

## Docker Hub Repository

```
https://hub.docker.com/r/yourusername/node-multistage
```

---

# 🏷 Understanding Tags

| Tag    | Meaning                       |
| ------ | ----------------------------- |
| v1     | Specific version              |
| v2     | Updated version               |
| latest | Default tag if none specified |

### Important

Using `latest` in production is risky because:

* It is mutable
* Can break builds unexpectedly
* Not reproducible

Best practice: Always use version-specific tags.

---

# 🧠 Task 5 – Image Best Practices Applied

### ✅ Used minimal base image (Alpine / Distroless)

### ✅ Avoided `latest` tag

```dockerfile
FROM node:18.19-alpine
```

### ✅ Non-root user

```dockerfile
USER nonroot
```

### ✅ Multi-stage separation

* Build environment isolated
* Only required artifacts copied

### ✅ Reduced layers

Combined commands where possible.

---

# 📊 Image Size Comparison

| Type             | Approx Size |
| ---------------- | ----------- |
| node:18 (Debian) | ~900MB      |
| node:18-alpine   | ~150MB      |
| Distroless       | ~60–80MB    |

---

# 🔐 Security Improvements

* Reduced attack surface
* No unnecessary tools in runtime
* No root execution
* Minimal OS footprint

---

# 🎯 Key Learnings

* Multi-stage builds drastically reduce image size
* Smaller images improve performance and security
* Docker Hub enables global distribution
* Versioning is critical for production stability
* Distroless images are ideal for secure deployments

---

# 🏁 Conclusion

This project demonstrates:

* Image optimization techniques
* Production-level Dockerfile practices
* Secure container design
* Proper image versioning
* Docker Hub integration

