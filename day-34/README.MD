# Day 34 – Docker Compose: Real-World Multi-Container Apps

## 🎯 Objective

Today’s goal was to build a production-like multi-container setup using Docker Compose including:

* Web Application (Flask)
* PostgreSQL Database
* Redis Cache
* Healthchecks
* Restart Policies
* Named Networks & Volumes
* Scaling

---

# 🏗 Architecture Overview

3-service stack:

* **web** → Python Flask app
* **db** → PostgreSQL 15
* **redis** → Redis 7

All services communicate through a custom backend network.

---

# 📦 Task 1 – Build Your Own App Stack

## Web Application

* Built using Python Flask
* Connects to:

  * PostgreSQL
  * Redis
* Reads DB_HOST and REDIS_HOST from environment variables

### Dockerfile Strategy

* Used python:3.11-slim (lightweight image)
* Separate COPY for requirements (better caching)
* Exposed port 5000
* CMD runs app.py

### Why this matters

* Slim images reduce size
* Layer caching speeds rebuilds
* Environment variables make it configurable

---

# 🧠 Task 2 – depends_on & Healthchecks

## Problem

Container start does NOT mean service ready.

Postgres may take a few seconds to initialize.

If app starts too early → connection failure.

## Solution

Used:

```yaml
depends_on:
  db:
    condition: service_healthy
```

And added healthcheck:

```yaml
healthcheck:
  test: ["CMD-SHELL", "pg_isready -U postgres"]
  interval: 5s
  timeout: 3s
  retries: 5
```

## What I Observed

* Without healthcheck → app sometimes failed
* With service_healthy → app waited properly
* Logs clearly showed DB becoming healthy first

---

# 🔁 Task 3 – Restart Policies

Tested:

### restart: always

* Database restarted automatically after:

  ```
  docker kill postgres_db
  ```
* Useful for critical infrastructure services

### restart: on-failure

* Restart only if exit code ≠ 0
* Manual docker kill does NOT restart container

## When to Use

| Policy     | Use Case                      |
| ---------- | ----------------------------- |
| always     | Databases, caches, core infra |
| on-failure | Workers, batch jobs           |
| no         | Debugging                     |

---

# 🏗 Task 4 – Custom Dockerfile with build:

Instead of using a pre-built image:

```yaml
build: ./app
```

Advantages:

* Full control over image
* Can modify app code
* Rebuild using single command:

```
docker compose up --build
```

After changing app.py, rebuild worked correctly.

---

# 🌐 Task 5 – Named Networks & Volumes

## Named Volume

```yaml
volumes:
  postgres_data:
```

Mapped to:

```
/var/lib/postgresql/data
```

## Result

* Data persisted after:

  ```
  docker compose down
  docker compose up
  ```

## Named Network

```yaml
networks:
  backend:
```

Benefits:

* Better isolation
* Explicit architecture
* Cleaner design

---

# 📈 Task 6 – Scaling (Bonus)

Command used:

```
docker compose up --scale web=3
```

## What Happened?

* Only one container bound to port 5000
* Others failed due to port conflict

## Why?

Because:

```
ports:
  - "5000:5000"
```

Host port 5000 can only be used once.

## Lesson Learned

Scaling with static port mapping does not work.

Real production scaling requires:

* Reverse Proxy (Nginx / Traefik)
* Load Balancer
* Kubernetes Service

---

# 🧪 Commands Used

```
docker compose up --build
docker compose down
docker compose up --scale web=3
docker kill postgres_db
docker volume ls
docker network ls
docker ps
```

---

# 💡 Key Takeaways

* Multi-container apps require proper service ordering
* Healthchecks are critical for reliability
* Restart policies prevent downtime
* Named volumes protect database data
* Scaling requires load balancing
* Docker Compose is good for development
