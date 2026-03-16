
# Day 45 – Docker Build & Push in GitHub Actions

## Objective

The goal of this task is to build a **complete CI/CD pipeline** using GitHub Actions.  
Whenever code is pushed to the repository, GitHub Actions will automatically:

1. Build a Docker image
2. Tag the image
3. Push the image to Docker Hub

This removes all manual steps and simulates a real-world production pipeline.

---

# Project Structure

```

github-actions-practice
│
├── .github
│   └── workflows
│       └── docker-publish.yml
│
├── Dockerfile
├── app.js
└── README.md

# Task 1 – Preparation

Before creating the CI/CD pipeline, the project must contain a **Dockerized application**.

### Requirements

1. A Dockerfile
2. A simple application
3. Docker Hub credentials stored in GitHub Secrets

Secrets required:

DOCKER_USERNAME
DOCKER_TOKEN

These secrets allow GitHub Actions to securely log in to Docker Hub.

# Task 2 – Build Docker Image in CI

We create a workflow file:


.github/workflows/docker-publish.yml

```

This workflow runs automatically when code is pushed to the repository.

### Workflow Trigger

```

on:
push:
branches:

* main

```

This means the pipeline runs whenever a commit is pushed to the **main branch**.

---

# Step 1 – Checkout Repository

```

* name: Checkout Code
  uses: actions/checkout@v4

```

Purpose:

The GitHub runner downloads the repository code so that the workflow can use it.

Without this step, the runner would not have access to the project files.

---

# Step 2 – Generate Short Commit SHA

```

* name: Set Short SHA
  id: vars
  run: echo "SHORT_SHA=${GITHUB_SHA::7}" >> $GITHUB_ENV

```

Purpose:

Git commits have long hashes.

Example:

```

3a5c81f52ab234cd78912...

```

We shorten it to:

```

3a5c81f

```

This is useful for tagging Docker images uniquely.

---

# Step 3 – Login to Docker Hub

```

* name: Login to Docker Hub
  uses: docker/login-action@v3
  with:
  username: ${{ secrets.DOCKER_USERNAME }}
  password: ${{ secrets.DOCKER_TOKEN }}

```

Purpose:

GitHub Actions must authenticate with Docker Hub before pushing images.

Credentials are securely stored in **GitHub Secrets**.

This prevents sensitive information from being exposed in the code.

---

# Step 4 – Build Docker Image

```

* name: Build Docker Image
  uses: docker/build-push-action@v5
  with:
  context: .

```

Purpose:

This step builds a Docker image from the Dockerfile in the repository.

Equivalent local command:

```

docker build .

```

The **context** parameter tells Docker where to find the Dockerfile and application files.

---

# Step 5 – Tag Docker Image

The image is tagged with two versions.

```

tags: |
username/repo:latest
username/repo:sha-${{ env.SHORT_SHA }}

```

### Tag 1 – latest

```

username/repo:latest

```

Represents the newest version of the application.

---

### Tag 2 – Commit Tag

```

username/repo:sha-3a5c81f

```

This allows tracking exactly which commit produced the image.

This is extremely useful in debugging production issues.

---

# Step 6 – Push Image to Docker Hub

```

push: true

```

Purpose:

After the image is built, it is uploaded to Docker Hub.

Equivalent command locally:

```

docker push username/repo:latest

```

Once pushed, the image becomes publicly available.

---

# Task 4 – Push Only on Main Branch

To prevent accidental deployments from feature branches, pushing is restricted.

```

if: github.ref == 'refs/heads/main'

```

Meaning:

Feature branch → build only  
Main branch → build + push

This protects production images from unstable code.

---

# Task 5 – Status Badge

A status badge is added to the README.

```

![Docker CI](https://github.com/<username>/<repo>/actions/workflows/docker-publish.yml/badge.svg)

```

Purpose:

The badge displays the pipeline status.

Green badge → pipeline passed  
Red badge → pipeline failed

This allows anyone viewing the repository to instantly see build health.

---

# Task 6 – Pull and Run Docker Image

After the pipeline pushes the image to Docker Hub, it can be pulled anywhere.

### Pull Image

```

docker pull username/github-actions-practice:latest

```

### Run Container

```

docker run -p 3000:3000 username/github-actions-practice:latest

```

The container will start and expose the application on port 3000.

---

# Complete CI/CD Journey

The full automation pipeline works as follows.

1. Developer writes code
2. Code is pushed to GitHub
3. GitHub Actions workflow triggers
4. GitHub runner starts a virtual machine
5. Repository code is downloaded
6. Docker image is built
7. GitHub logs in to Docker Hub
8. Docker image is tagged
9. Docker image is pushed to Docker Hub
10. Image becomes available for deployment anywhere

This process is the foundation of **modern DevOps pipelines**.

---

# Docker Hub Repository

```

[https://hub.docker.com/r/](https://hub.docker.com/r/)<your-username>/github-actions-practice

```

---

# Screenshot

Add a screenshot of the successful pipeline run from the GitHub Actions tab.

Example:

```

Actions → Docker CI/CD → Successful Run

```

---

# Key Learnings

From this task, the following DevOps concepts were practiced:

- CI/CD automation
- Docker image building
- Docker image tagging
- Docker Hub authentication
- GitHub Actions workflows
- Secure secrets management
- Automated container deployment

These practices are widely used in real-world DevOps pipelines.

---
```

---

Brutally honest truth you should hear:

Most students copy CI/CD examples and think they understand DevOps. They don’t.

Real engineers understand **why every step exists**.

If an interviewer asks you **“Why tag Docker images with commit SHA?”** and you cannot answer — it immediately exposes that you only copied tutorials.

If you want, I can also show you the **production-grade GitHub Actions Docker pipeline companies use (with caching + multi-platform builds)** which is **10x better for interviews.**
