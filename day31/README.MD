
# ✅ **Task 1 – my First Dockerfile**

## 1️⃣ Create project folder

```bash
mkdir my-first-image
cd my-first-image

## 2️⃣ Create Dockerfile

```bash
touch Dockerfile
```

Open it:

```bash
vim Dockerfile
```

Paste:

```dockerfile
FROM ubuntu:latest

RUN apt-get update && apt-get install -y curl

CMD ["echo", "Hello from my custom image!"]
```

---

## 3️⃣ Build image

```bash
docker build -t my-ubuntu:v1 .
```

👉 `.` = current folder = **build context**

---

## 4️⃣ Run container

```bash
docker run my-ubuntu:v1
```

✅ Output:

```
Hello from my custom image!
```

---

## 🧠 What happened?

| Line        | Meaning                    |
| ----------- | -------------------------- |
| FROM ubuntu | Base OS                    |
| RUN apt-get | Install curl during build  |
| CMD echo    | Default command at runtime |

---

# ✅ **Task 2 – Dockerfile Instructions**

---

## 1️⃣ Create new folder

```bash
mkdir dockerfile-demo
cd dockerfile-demo
```

---

## 2️⃣ Create files

```bash
touch Dockerfile
touch app.txt
```

Edit `app.txt`:

```bash
vim app.txt
```

Add:

```
Hello from inside container
```

---

## 3️⃣ Dockerfile

```dockerfile
FROM ubuntu:latest

RUN apt-get update && apt-get install -y curl

WORKDIR /app

COPY app.txt .

EXPOSE 8080

CMD ["cat", "app.txt"]
```

---

## 4️⃣ Build

```bash
docker build -t demo:v1 .
```

---

## 5️⃣ Run

```bash
docker run demo:v1
```

✅ Output:

```
Hello from inside container
```

---

## 🧠 Understand each instruction

| Instruction | Purpose                     |
| ----------- | --------------------------- |
| FROM        | Base image                  |
| RUN         | Executes during build       |
| WORKDIR     | Sets working directory      |
| COPY        | Copy file from host → image |
| EXPOSE      | Documentation only          |
| CMD         | Default runtime command     |

⚠️ EXPOSE **does NOT open port automatically**

---

# ✅ **Task 3 – CMD vs ENTRYPOINT**

---

## 🔹 Case 1: CMD

Dockerfile:

```dockerfile
FROM ubuntu:latest
CMD ["echo", "hello"]
```

Build:

```bash
docker build -t cmd-test .
```

Run:

```bash
docker run cmd-test
```

✅ Output:

```
hello
```

---

### Override CMD

```bash
docker run cmd-test ls
```

✅ Output:

```
bin
boot
dev
...
```

👉 CMD is **replaced**

---

## 🔹 Case 2: ENTRYPOINT

Dockerfile:

```dockerfile
FROM ubuntu:latest
ENTRYPOINT ["echo"]
```

Build:

```bash
docker build -t entry-test .
```

Run:

```bash
docker run entry-test hello
```

✅ Output:

```
hello
```

---

### Add arguments

```bash
docker run entry-test hello world
```

✅ Output:

```
hello world
```

👉 Arguments are **appended**

---

## 🧠 Key Difference

| CMD               | ENTRYPOINT         |
| ----------------- | ------------------ |
| Easily overridden | Harder to override |
| Default behavior  | Main executable    |
| Flexible          | Fixed purpose      |

---

## ✅ When to use?

✔ **CMD** → default command
✔ **ENTRYPOINT** → fixed app (nginx, python app)

---

# ✅ **Task 4 – Simple Web App Image**

---

## 1️⃣ Create folder

```bash
mkdir my-website
cd my-website
```

---

## 2️⃣ index.html

```bash
touch index.html
```

Edit:

```html
<h1>Hello from Docker Website 🚀</h1>
```

---

## 3️⃣ Dockerfile

```dockerfile
FROM nginx:alpine

COPY index.html /usr/share/nginx/html/

EXPOSE 80
```

---

## 4️⃣ Build

```bash
docker build -t my-website:v1 .
```

---

## 5️⃣ Run

```bash
docker run -p 8080:80 my-website:v1
```

Open browser:

```
http://localhost:8080
```

✅ Your page appears

---

## 🧠 Why it works?

Nginx serves from:

```
/usr/share/nginx/html/
```

---

# ✅ **Task 5 – .dockerignore**

---

## 1️⃣ Create file

```bash
touch .dockerignore
```

---

## 2️⃣ Add

```
node_modules
.git
*.md
.env
```

---

## 🧠 Why important?

Without `.dockerignore`:

❌ Slow builds
❌ Large images
❌ Sensitive data leak

---

## 3️⃣ Verify

Build again:

```bash
docker build -t test-ignore .
```

Ignored files NOT sent to Docker daemon.

---

# ✅ **Task 6 – Build Optimization**

---

## 🧪 Observe Cache

Build once:

```bash
docker build -t cache-demo .
```

Rebuild without change:

```bash
docker build -t cache-demo .
```

✅ “Using cache”

---

## 🔥 Now change something

Modify Dockerfile:

```dockerfile
CMD ["echo", "Changed"]
```

Rebuild.

👉 Only last layer rebuilds.

---

## 🧠 Why layer order matters?

Docker builds **layer by layer**

Bad order:

```dockerfile
COPY . .
RUN npm install
```

Any code change → reinstall dependencies ❌

---

Better order:

```dockerfile
COPY package.json .
RUN npm install
COPY . .
```

Dependencies cached ✅

---

## ✅ Rule of thumb

👉 **Stable layers first**
👉 **Changing layers last**



