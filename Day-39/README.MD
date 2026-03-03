
# 📘 Day 39 – CI/CD Concepts

## 🚨 Task 1: The Problem

### Scenario:

5 developers pushing code to the same repository and manually deploying to production.

### ❌ What Can Go Wrong?

* Code conflicts between developers
* One developer overwrites another’s fix
* Manual deployment mistakes
* Skipped testing
* Wrong version deployed
* Downtime in production
* No rollback strategy
* Different environments (dev vs prod mismatch)
* No audit trail of who deployed what

Manual deployment does not scale.


### 💻 What Does “It Works on My Machine” Mean?

It means:

> The application runs correctly on the developer’s local system but fails in staging or production.

Why?

* Different OS
* Different dependency versions
* Different environment variables
* Missing packages
* Different database configurations

This is a real problem because production ≠ local machine.

Without CI, these issues are discovered late — sometimes after users are affected.

### 📊 How Many Times Can a Team Safely Deploy Manually?

Realistically:

* 1–2 times per day (if careful)
* Maybe fewer in production

Manual deployments increase risk with every attempt.

High-performing DevOps teams deploy:

* Multiple times per day
* Even hundreds of times per day

Manual processes can’t support that scale.

# 🔁 Task 2: CI vs CD

## 🔹 Continuous Integration (CI)

Continuous Integration is the practice of automatically building and testing code every time a developer pushes changes.

* Happens multiple times per day
* Runs automated tests
* Detects integration issues early

### Real-World Example:

A developer pushes code to GitHub → GitHub Actions runs tests → if tests fail, merge is blocked.

CI catches bugs early before production.

## 🔹 Continuous Delivery (CD)

Continuous Delivery means the application is automatically built, tested, and prepared for release — but deployment requires manual approval.

The code is always in a deployable state.

### Real-World Example:

After successful tests, the pipeline builds a Docker image and pushes it to a registry.
A release manager clicks “Deploy to Production”.

Delivery = Ready to release.

## 🔹 Continuous Deployment

Continuous Deployment automatically deploys every successful build to production without manual approval.

No human intervention after tests pass.

### Real-World Example:

Developer pushes code → tests pass → Docker image built → automatically deployed to production Kubernetes cluster.

Used by:

* Mature DevOps teams
* Companies with strong automated testing

Deployment = Fully automated release.

# 🧠 Task 3: Pipeline Anatomy

A CI/CD pipeline consists of:

### 🔔 Trigger

Event that starts the pipeline.

Examples:

* git push
* pull request
* schedule
* manual trigger

### 🧱 Stage

A logical phase in the pipeline.

Examples:

* Build
* Test
* Security Scan
* Deploy

Stages help organize workflow.

### ⚙ Job

A unit of work inside a stage.

Example:
Inside "Test" stage:

* Run unit tests
* Run integration tests

Each job runs independently.

### 🪜 Step

A single command or action inside a job.

Example:

* npm install
* docker build .
* pytest

Smallest executable unit.

### 🖥 Runner

The machine that executes the job.

Can be:

* GitHub-hosted runner
* Self-hosted runner
* Jenkins agent

Without a runner, nothing executes.


### 📦 Artifact

Output produced by a job.

Examples:

* Compiled application
* Docker image
* JAR file
* Test reports

Artifacts move between stages.


# 🎨 Task 4: CI/CD Pipeline Diagram

## Scenario:

Developer pushes code → tested → built into Docker image → deployed to staging.

### 📌 Text-Based Pipeline Diagram

```
Developer
    │
    ▼
Push Code to GitHub
    │
    ▼
Trigger: on push
    │
    ▼
=========================
STAGE 1: Build
=========================
- Install dependencies
- Compile application
- Create build artifact

    │
    ▼
=========================
STAGE 2: Test
=========================
- Run unit tests
- Run integration tests

    │
    ▼
=========================
STAGE 3: Dockerize
=========================
- Build Docker image
- Push to Docker Registry

    │
    ▼
=========================
STAGE 4: Deploy
=========================
- Pull image on staging server
- Restart container
```

If any stage fails → pipeline stops.

Failure is protection.

# 🌍 Task 5: Exploring an Open Source Repository

I explored the repository of:

## 🧩 Kubernetes

Inside `.github/workflows/`

Observed:

### 🔔 What Triggers It?

* push
* pull_request
* scheduled jobs

### ⚙ How Many Jobs?

Multiple jobs (linting, testing, building, validation)

##What Does It Do?

* Validates code formatting
* Runs automated tests
* Checks dependencies
* Ensures pull requests meet quality standards

Large open-source projects rely heavily on automated pipelines to maintain stability.

Without CI/CD, such projects would collapse under contributor scale.

