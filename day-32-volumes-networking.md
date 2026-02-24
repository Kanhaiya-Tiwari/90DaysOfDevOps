Perfect. Use this as your **submission-ready Markdown template**.

---

# 🐳 **Day 32 – Docker Volumes & Networking**

## 🎯 Objective

Today’s focus:

* Understand why containers lose data
* Fix persistence using volumes
* Learn bind mounts
* Explore Docker networking
* Enable container-to-container communication

---

## ✅ **Task 1 – The Problem (Ephemeral Containers)**

### **What I Did**

```bash
# Run Postgres
docker run --name pg-test \
  -e POSTGRES_PASSWORD=secret \
  -d postgres

# Connect
docker exec -it pg-test psql -U postgres
```

SQL commands:

```sql
CREATE DATABASE day32;
\c day32

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name TEXT
);

INSERT INTO users (name) VALUES ('Alice');
SELECT * FROM users;
```

---

### **Then I Removed Container**

```bash
docker stop pg-test
docker rm pg-test
```

---

### **What Happened**

👉 My data was **gone**

---

### **Why It Happened**

* Containers are ephemeral
* Data stored in container writable layer
* Removing container deletes filesystem changes

---

---

## ✅ **Task 2 – Named Volumes (Persistence Fix)**

### **Volume Creation**

```bash
docker volume create pg-data
docker volume ls
```

---

### **Run Container with Volume**

```bash
docker run --name pg-volume \
  -e POSTGRES_PASSWORD=secret \
  -v pg-data:/var/lib/postgresql/data \
  -d postgres
```

---

### **Data Creation**

(Same SQL steps as Task 1)

---

### **Container Removal**

```bash
docker stop pg-volume
docker rm pg-volume
```

---

### **Run New Container Using SAME Volume**

```bash
docker run --name pg-volume-new \
  -e POSTGRES_PASSWORD=secret \
  -v pg-data:/var/lib/postgresql/data \
  -d postgres
```

---

### **Result**

👉 Data **persisted successfully**

---

### **Verification**

```bash
docker volume ls
docker volume inspect pg-data
```

---

### **Key Learning**

* Volumes live outside container lifecycle
* Safe for databases
* Docker-managed storage

---

---

## ✅ **Task 3 – Bind Mounts**

### **Host Folder Setup**

```bash
mkdir ~/day32-site
cd ~/day32-site
echo "<h1>Hello Day 32</h1>" > index.html
```

---

### **Run Nginx with Bind Mount**

```bash
docker run --name nginx-bind \
  -p 8080:80 \
  -v ~/day32-site:/usr/share/nginx/html \
  -d nginx
```

---

### **Browser Test**

Opened:

```
http://localhost:8080
```

---

### **Live Edit Test**

```bash
echo "<h1>Updated Live!</h1>" > index.html
```

👉 Browser refreshed → Changes visible instantly

---

### **Named Volume vs Bind Mount**

| Named Volume     | Bind Mount                 |
| ---------------- | -------------------------- |
| Docker-managed   | User-managed               |
| Portable         | Host-coupled               |
| Best for DB/data | Best for dev/code          |
| Safer            | Risky if host path changes |

---

---

## ✅ **Task 4 – Docker Networking Basics**

### **List Networks**

```bash
docker network ls
```

---

### **Inspect Default Bridge**

```bash
docker network inspect bridge
```

---

### **Run Two Containers**

```bash
docker run -dit --name c1 alpine sh
docker run -dit --name c2 alpine sh
```

---

### **Ping by Name**

```bash
docker exec -it c1 ping c2
```

👉 Failed ❌

---

### **Ping by IP**

```bash
docker inspect c2 | grep IPAddress
docker exec -it c1 ping <IP>
```

👉 Worked ✅

---

### **Why Name Failed**

Default bridge lacks automatic DNS resolution.

---

---

## ✅ **Task 5 – Custom Networks**

### **Create Network**

```bash
docker network create my-app-net
```

---

### **Run Containers**

```bash
docker run -dit --name n1 --network my-app-net alpine sh
docker run -dit --name n2 --network my-app-net alpine sh
```

---

### **Ping by Name**

```bash
docker exec -it n1 ping n2
```

👉 Worked ✅

---

### **Why It Worked**

* Custom networks enable Docker DNS
* Containers resolve names automatically

---

---

## ✅ **Task 6 – Put It Together**

### **Network**

```bash
docker network create app-net
```

---

### **Volume**

```bash
docker volume create mysql-data
```

---

### **Run Database**

```bash
docker run --name mysql \
  --network app-net \
  -e MYSQL_ROOT_PASSWORD=secret \
  -e MYSQL_DATABASE=testdb \
  -v mysql-data:/var/lib/mysql \
  -d mysql
```

---

### **Run App Container**

```bash
docker run -it --name app \
  --network app-net \
  alpine sh
```

Inside container:

```bash
ping mysql
```

👉 Success ✅

---

### **Key Learning**

* Containers communicate via network
* DNS resolution works in custom networks
* Volume ensures DB persistence

---

---

# 🧠 **Final Takeaways**

✔ Containers are ephemeral
✔ Volumes solve persistence
✔ Bind mounts sync host ↔ container
✔ Default bridge ≠ DNS-based discovery
✔ Custom networks enable name resolution
✔ Networking + Volumes = real-world Docker setup

---

---

# 📸 **Screenshots**

/Users/kanha/Documents/p1.png
/Users/kanha/Documents/p2.png
/Users/kanha/Documents/p3.png
