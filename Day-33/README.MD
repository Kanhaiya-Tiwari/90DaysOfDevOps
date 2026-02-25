
# 🐳 Day 33 – Docker Compose: Multi-Container Basics

## 🎯 Objective

Today’s goal was to understand how Docker Compose simplifies:

- Running multi-container applications
- Automatic networking between services
- Volume management for persistence
- Environment variable configuration
- Container lifecycle management

---

## ✅ Task 1 – Install & Verify Docker Compose

Checked Compose availability:

```bash
docker compose version
````

✔ Docker Compose is installed and functioning correctly.

---

## ✅ Task 2 – First Compose File (Single Container)

Created a basic Compose setup running Nginx.

### docker-compose.yml

```yaml
services:
  web:
    image: nginx
    ports:
      - "8080:80"
```

### Commands Used

```bash
docker compose up
docker compose down
```

### Verification

Accessed in browser:

[http://localhost:8080](http://localhost:8080)

✔ Container started and served default Nginx page successfully.

---

## ✅ Task 3 – Two-Container Setup (WordPress + MySQL)

Built a multi-container application using Docker Compose.

### Services Configured

* **WordPress**
* **MySQL**
* **Named Volume for MySQL data**

### Key Concepts Practiced

✔ Compose automatically created a shared network
✔ Containers communicated using service names
✔ Database data persisted via named volume

---

## 🧠 Persistence Test

```bash
docker compose down
docker compose up
```

👉 WordPress configuration and data remained intact.

✔ Confirmed volume persistence works as expected.

---

## ✅ Task 4 – Docker Compose Commands Practiced

```bash
docker compose up -d        # Start in detached mode
docker compose ps           # List running services
docker compose logs         # View logs of all services
docker compose logs web     # Logs of specific service
docker compose stop         # Stop without removing
docker compose down         # Stop & remove containers + network
docker compose up --build   # Rebuild images
```

---

## ✅ Task 5 – Environment Variables

Configured environment variables:

* Directly in `docker-compose.yml`
* Using a `.env` file

✔ Verified Compose correctly substituted variables.

---

## 🧠 Key Learnings

✔ Docker Compose removes manual container management
✔ Networking between services is automatic
✔ Service names act as DNS
✔ Named volumes ensure persistence
✔ Compose commands improve workflow efficiency

