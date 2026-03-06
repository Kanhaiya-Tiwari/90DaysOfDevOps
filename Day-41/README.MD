# Day 41 – Triggers & Matrix Builds

Today I learned how different **GitHub Actions triggers** work and how to run workflows across multiple environments using **Matrix builds**.

These triggers allow workflows to start automatically based on different events such as pushes, pull requests, schedules, or manual execution.

---

# Task 1 – Pull Request Trigger

### Workflow File

```
.github/workflows/pr-check.yml
```

### YAML

```yaml
name: PR Check

on:
  pull_request:
    branches:
      - main

jobs:
  pr-check-job:
    runs-on: ubuntu-latest

    steps:
      - name: Print branch name
        run: echo "PR check running for branch: ${{ github.head_ref }}"
```

### Explanation

This workflow runs whenever:

* A **pull request is opened**
* A **pull request is updated**

Target branch:

```
main
```

This helps teams automatically run checks before code is merged.

---

# Task 2 – Scheduled Trigger

### Workflow File

```
.github/workflows/schedule.yml
```

### YAML

```yaml
name: Scheduled Workflow

on:
  schedule:
    - cron: '0 0 * * *'

jobs:
  schedule-job:
    runs-on: ubuntu-latest

    steps:
      - name: Print message
        run: echo "This workflow runs every day at midnight UTC"
```

### Cron Expression

```
0 0 * * *
```

Meaning:

| Field   | Value |
| ------- | ----- |
| Minute  | 0     |
| Hour    | 0     |
| Day     | *     |
| Month   | *     |
| Weekday | *     |

This runs **every day at midnight (UTC)**.

### Answer

Cron expression for **every Monday at 9 AM UTC**

```
0 9 * * 1
```

---

# Task 3 – Manual Trigger

### Workflow File

```
.github/workflows/manual.yml
```

### YAML

```yaml
name: Manual Workflow

on:
  workflow_dispatch:
    inputs:
      environment:
        description: "Enter environment (stagin
```
