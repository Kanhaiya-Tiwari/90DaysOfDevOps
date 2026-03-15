# Day 46 – Reusable Workflows & Composite Actions

## Introduction

In large DevOps projects, writing the same GitHub Actions workflow again and again across multiple repositories is inefficient and hard to maintain. GitHub provides **Reusable Workflows** and **Composite Actions** to solve this problem.

Reusable workflows allow teams to define a CI/CD pipeline once and call it from multiple workflows or repositories. Composite actions allow developers to group several steps together into a single reusable action.

In this exercise, we create:

* A reusable workflow
* A caller workflow that triggers it
* Outputs shared between workflows
* A custom composite action

This demonstrates how modern DevOps teams build **modular CI/CD pipelines**.

---

# Task 1 – Understanding `workflow_call`

## Explanation

Before creating reusable workflows, it is important to understand the concept behind them.

Normally, each GitHub repository contains its own workflows. If multiple repositories require the same build or deployment pipeline, developers must duplicate the workflow files. This leads to maintenance problems.

Reusable workflows solve this by allowing a workflow to behave like a **function** that can be called by another workflow.

GitHub introduced the `workflow_call` trigger to support this feature.

---

## What is a Reusable Workflow?

A reusable workflow is a workflow that can be called by another workflow instead of running independently.

This allows teams to centralize CI/CD logic and reuse it across multiple repositories.

Common real-world examples include:

* Standard build pipelines
* Docker image builds
* Security scanning pipelines
* Deployment automation

---

## What is `workflow_call`?

`workflow_call` is a trigger that allows a workflow to be executed by another workflow.

Example:

```yaml
on:
  workflow_call:
```

Unlike normal workflows that run on events such as `push` or `pull_request`, reusable workflows run **only when another workflow calls them**.

---

## Difference Between Reusable Workflow and Action

| Feature       | Reusable Workflow       | Action                |
| ------------- | ----------------------- | --------------------- |
| Level         | Workflow level          | Step level            |
| Called using  | `uses:` inside a job    | `uses:` inside a step |
| Contains jobs | Yes                     | No                    |
| Purpose       | Reusable CI/CD pipeline | Small reusable tasks  |

---

## Where Must Reusable Workflows Live?

Reusable workflows must be stored inside the following directory:

```
.github/workflows/
```

GitHub automatically detects workflow files from this directory.

---

# Task 2 – Creating the Reusable Workflow

## Explanation

In this task, we create a reusable workflow that performs a simple build process. The workflow accepts parameters (inputs), receives secrets securely, and produces an output value that can be used by other workflows.

The workflow performs the following steps:

1. Checkout the repository
2. Print build information
3. Verify a secret exists
4. Generate a build version output

---

## File Location

```
.github/workflows/reusable-build.yml
```

---

## Reusable Workflow YAML

```yaml
name: Reusable Build Workflow

on:
  workflow_call:
    inputs:
      app_name:
        required: true
        type: string
      environment:
        required: true
        type: string
        default: staging

    secrets:
      docker_token:
        required: true

jobs:
  build:
    runs-on: ubuntu-latest

    outputs:
      build_version: ${{ steps.version.outputs.build_version }}

    steps:
      - name: Checkout Repository
        uses: actions/checkout@v4

      - name: Print Build Info
        run: echo "Building ${{ inputs.app_name }} for ${{ inputs.environment }}"

      - name: Check Docker Token
        run: echo "Docker token is set: true"

      - name: Generate Version
        id: version
        run: |
          VERSION=v1.0-${GITHUB_SHA::7}
          echo "build_version=$VERSION" >> $GITHUB_OUTPUT
```

This workflow cannot run by itself because it uses the `workflow_call` trigger.

---

# Task 3 – Creating the Caller Workflow

## Explanation

The caller workflow is responsible for triggering the reusable workflow.

When a push occurs on the `main` branch, the caller workflow runs and calls the reusable workflow using the `uses` keyword.

The caller workflow also passes:

* Input parameters
* Repository secrets

---

## File Location

```
.github/workflows/call-build.yml
```

---

## Caller Workflow YAML

```yaml
name: Call Reusable Workflow

on:
  push:
    branches:
      - main

jobs:
  build:
    uses: ./.github/workflows/reusable-build.yml

    with:
      app_name: "my-web-app"
      environment: "production"

    secrets:
      docker_token: ${{ secrets.DOCKER_TOKEN }}
```

When this workflow runs, it triggers the reusable workflow and passes the provided inputs and secrets.

---

# Task 4 – Using Outputs From Reusable Workflow

## Explanation

Reusable workflows can return values called **outputs**. These outputs can be used by other jobs in the caller workflow.

In this task:

1. The reusable workflow generates a version number.
2. The caller workflow reads this output.
3. Another job prints the generated version.

---

## Updated Caller Workflow

```yaml
name: Call Reusable Workflow

on:
  push:
    branches:
      - main

jobs:
  build:
    uses: ./.github/workflows/reusable-build.yml

    with:
      app_name: "my-web-app"
      environment: "production"

    secrets:
      docker_token: ${{ secrets.DOCKER_TOKEN }}

  show-version:
    runs-on: ubuntu-latest
    needs: build

    steps:
      - name: Print Build Version
        run: echo "Build version is ${{ needs.build.outputs.build_version }}"
```

The `needs:` keyword ensures the second job runs only after the build job finishes.

---

# Task 5 – Creating a Composite Action

## Explanation

Composite actions allow developers to group multiple workflow steps into a reusable action.

Instead of repeating the same set of steps across multiple workflows, we create a composite action that performs:

1. A greeting message
2. Displays the current date
3. Shows the runner operating system

---

## Directory Structure

```
.github/actions/setup-and-greet/
```

---

## Composite Action File

```
.github/actions/setup-and-greet/action.yml
```

```yaml
name: Setup and Greet
description: Custom greeting composite action

inputs:
  name:
    required: true
  language:
    required: false
    default: en

outputs:
  greeted:
    value: true

runs:
  using: "composite"

  steps:
    - name: Greeting
      run: |
        if [ "${{ inputs.language }}" == "en" ]; then
          echo "Hello ${{ inputs.name }}"
        else
          echo "Namaste ${{ inputs.name }}"
        fi
      shell: bash

    - name: Show Date
      run: date
      shell: bash

    - name: Runner OS
      run: echo "Runner OS: $RUNNER_OS"
      shell: bash
```

---

# Using the Composite Action

## Explanation

Now we create a workflow that uses the composite action. This demonstrates how custom actions can simplify workflows.

---

## Workflow File

```
.github/workflows/use-composite.yml
```

```yaml
name: Use Composite Action

on:
  workflow_dispatch:

jobs:
  greet:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4

      - name: Run Greeting Action
        uses: ./.github/actions/setup-and-greet
        with:
          name: Kanha
          language: en
```

This workflow runs manually and executes the custom greeting action.

---

# Task 6 – Comparison Table

| Feature        | Reusable Workflow    | Composite Action      |
| -------------- | -------------------- | --------------------- |
| Triggered by   | `workflow_call`      | `uses:` inside a step |
| Contains jobs  | Yes                  | No                    |
| Contains steps | Yes                  | Yes                   |
| Location       | `.github/workflows/` | `.github/actions/`    |
| Accept secrets | Yes                  | No                    |
| Best for       | Full CI/CD pipelines | Small reusable tasks  

---

# Conclusion

In this exercise, we learned how to design reusable CI/CD components using GitHub Actions.

Key concepts covered include:

* Reusable workflows using `workflow_call`
* Passing inputs and secrets between workflows
* Returning outputs from reusable workflows
* Creating composite actions
* Using modular CI/CD design patterns

These techniques are widely used in **large DevOps environments to standardize pipelines and reduce duplication**.
