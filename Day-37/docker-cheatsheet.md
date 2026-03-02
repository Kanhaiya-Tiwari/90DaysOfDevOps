
# 🐳 Docker Cheat Sheet

## 🔹 Container Commands

docker run -it nginx bash        # Run container interactively
docker run -d -p 8080:80 nginx   # Run in detached mode with port mapping
docker ps                        # List running containers
docker ps -a                     # List all containers
docker stop <id>                 # Stop container
docker rm <id>                   # Remove container
docker exec -it <id> sh          # Access running container
docker logs <id>                 # View container logs

## 🔹 Image Commands

docker build -t app:v1 .         # Build image
docker images                    # List images
docker rmi <id>                  # Remove image
docker pull nginx                # Pull from Docker Hub
docker push username/app:v1      # Push image
docker tag app:v1 user/app:v1    # Tag image

## 🔹 Volume Commands

docker volume create myvol       # Create volume
docker volume ls                 # List volumes
docker volume inspect myvol      # Inspect volume
docker volume rm myvol           # Remove volume
docker run -v myvol:/data nginx  # Use named volume

## 🔹 Bind Mount

docker run -v $(pwd):/app node   # Mount local folder


## 🔹 Network Commands

docker network create mynet      # Create network
docker network ls                # List networks
docker network inspect mynet     # Inspect network
docker network connect mynet c1  # Connect container to network

## 🔹 Docker Compose

docker compose up                # Start services
docker compose up --build        # Rebuild and start
docker compose down              # Stop and remove containers
docker compose down -v           # Remove containers + volumes
docker compose ps                # List services
docker compose logs              # View logs

## 🔹 Cleanup

docker system df                 # Check disk usage
docker container prune           # Remove stopped containers
docker image prune               # Remove unused images
docker volume prune              # Remove unused volumes
docker system prune -a           # Remove everything unused

## 🔹 Dockerfile Instructions

FROM        # Base image
RUN         # Execute command during build
COPY        # Copy files
ADD         # Copy + extract tar / remote URL
WORKDIR     # Set working directory
EXPOSE      # Document port
CMD         # Default command
ENTRYPOINT  # Fixed executable
USER        # Set non-root user
```

# 📄 2️⃣ day-37-revision.md

Copy this as `day-37-revision.md`

# 📘 Day 37 – Docker Revision

## Self-Assessment Checklist

| Skill                                  | Status |
| -------------------------------------- | ------ |
| Run container (interactive + detached) | Can Do |
| List, stop, remove containers/images   | Can Do |
| Explain image layers & caching         | Can Do |
| Write Dockerfile from scratch          | Can Do |
| Explain CMD vs ENTRYPOINT              | Can Do |
| Build and tag image                    | Can Do |
| Named volumes                          | Can Do |
| Bind mounts                            | Can Do |
| Custom networks                        | Can Do |
| Multi-container Compose app            | Can Do |
| Environment variables in Compose       | Can Do |
| Multi-stage Dockerfile                 | Can Do |
| Push to Docker Hub                     | Can Do |
| Healthchecks & depends_on              | Can Do |

# 🔥 Quick-Fire Answers

### 1️⃣ Image vs Container

Image is a blueprint.
Container is a running instance of that image.
### 2️⃣ What happens to container data after removal?

It is lost unless stored in a volume or bind mount.

### 3️⃣ How do containers communicate on same custom network?

Using service/container name as hostname via Docker DNS.

### 4️⃣ docker compose down vs down -v

`down` → removes containers
`down -v` → removes containers + volumes (deletes DB data)

### 5️⃣ Why multi-stage builds?

Reduce image size, remove build tools, improve security.

### 6️⃣ COPY vs ADD

COPY → simple file copy
ADD → copy + auto-extract tar + remote URL support

Best practice: Prefer COPY.

### 7️⃣ What does -p 8080:80 mean?

Host port 8080 → Container port 80.

### 8️⃣ Check Docker disk usage

docker system df

# 🧠 Weak Areas Revisited

Re-practiced:

* Multi-stage builds
* Custom networks + service name resolution

Tested from scratch by deleting all containers and rebuilding project.

# 🎯 Final Reflection

After revising Days 29–36:

* Comfortable writing Dockerfiles from memory
* Able to debug container networking issues
* Understand image optimization techniques
* Can deploy multi-container apps with Compose
* Ready for interview-level Docker questions
