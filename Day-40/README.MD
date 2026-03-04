Day 40 – First GitHub Actions Workflow

Introduction

Today I created my first CI/CD pipeline using GitHub Actions. This was the first time I saw how code pushed to a repository can automatically trigger a workflow in the cloud.

GitHub provides hosted runners (virtual machines) that execute workflows defined in YAML files.

The goal of today was to:

Create a GitHub repository
Configure a GitHub Actions workflow
Run the workflow automatically on every push
Observe how pipelines succeed and fail
Understand the structure of a workflow file
Step 1 – Create Repository

First, I created a public repository on GitHub.

Repository name:

github-actions-practice
Then I cloned it to my local machine.

git clone https://github.com/Kanhaiya-Tiwari/github-actions-practice.git
cd github-actions-practice
Step 2 – Create Workflow Folder

GitHub Actions workflows must be placed inside a special directory.

.github/workflows/
I created this structure using:

mkdir -p .github/workflows
Step 3 – Create First Workflow

Inside the workflows directory I created a file:

.github/workflows/hello.yml
This file defines the automation pipeline.

Step 4 – Write the Workflow

The workflow contains:

A trigger event
A job
Steps executed by the job
My workflow YAML file:

name: First GitHub Actions Workflow

on:
  push:

jobs:
  greet:
    runs-on: ubuntu-latest

    steps:

      - name: Checkout Repository
        uses: actions/checkout@v4

      - name: Print Hello Message
        run: echo "Hello from GitHub Actions!"

      - name: Show Date and Time
        run: date

      - name: Show Branch Name
        run: echo "Branch: ${{ github.ref_name }}"

      - name: List Repository Files
        run: ls -la

      - name: Show Runner Operating System
        run: uname -a
Step 5 – Commit and Push

After creating the workflow file, I pushed the code to GitHub.

git add .
git commit -m "Added first GitHub Actions workflow"
git push origin main
Once the code was pushed, GitHub automatically started the workflow.

Step 6 – Observe the Pipeline

After pushing the code, I opened the Actions tab in the repository.

There I could see the workflow running.

The pipeline executed the following steps:

Checkout the repository
Print a hello message
Show the current date and time
Display the branch name
List files in the repository
Display the runner operating system
The workflow completed successfully and showed a green status.

Step 7 – Break the Pipeline Intentionally

To understand how failures work, I intentionally broke the pipeline by adding a failing command.

- name: Break Pipeline
  run: exit 1
After pushing the change, the workflow failed.

This helped me understand how errors appear in the GitHub Actions logs.

The Actions tab showed a red failed pipeline, and clicking the job displayed the error message.

Step 8 – Fix the Pipeline

I removed the failing step and pushed the code again.

The workflow ran successfully again and returned to a green status.

This demonstrated how developers debug and fix CI/CD pipelines.

Understanding the Workflow Structure

on:

Defines the event that triggers the workflow.

Example:

on: push
This means the workflow runs whenever code is pushed to the repository.

jobs:

Defines tasks that the workflow will execute.

Each workflow can contain multiple jobs.

Example:

jobs:
  greet:
Here, the job is named greet.

runs-on:

Specifies the operating system used to run the job.

Example:

runs-on: ubuntu-latest
GitHub starts a Linux virtual machine to run the workflow.

steps:

Steps are individual tasks executed inside a job.

Example:

steps:
Each step runs sequentially.

uses:

Uses a pre-built GitHub Action created by someone else.

Example:

uses: actions/checkout@v4
This action checks out the repository code into the runner.

run:

Executes shell commands on the runner machine.

Example:

run: echo "Hello from GitHub Actions"

name:

Provides a readable label for a step in the pipeline logs.

Example:

name: Print Hello Message

Key Learnings

Today I learned:

How CI/CD pipelines work
How GitHub Actions automatically runs workflows
How to define pipelines using YAML
How to debug failed pipelines
How to use GitHub-provided environment variables
This was my first hands-on experience building an automated pipeline in the cloud
