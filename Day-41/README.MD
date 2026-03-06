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
        description: "Enter environment (staging or production)"
        required: true
        default: "staging"

jobs:
  manual-job:
    runs-on: ubuntu-latest

    steps:
      - name: Print environment
        run: echo "Deploying to ${{ github.event.inputs.environment }}"
```

### Explanation

This workflow can be triggered manually from the **GitHub Actions tab**.

Steps:

1. Go to **Actions**
2. Select workflow
3. Click **Run workflow**
4. Enter environment value

Example:

```
staging
production
```

The workflow prints the selected environment.

---

# Task 4 – Matrix Builds

Matrix builds allow running the **same job across multiple environments**.

Example combinations:

* Python versions: **3.10, 3.11, 3.12**
* Operating Systems: **Ubuntu, Windows**

### Workflow File

```
.github/workflows/matrix.yml
```

### YAML

```yaml
name: Matrix Build

on:
  push:

jobs:
  matrix-job:
    runs-on: ${{ matrix.os }}

    strategy:
      matrix:
        os: [ubuntu-latest, windows-latest]
        python-version: ["3.10", "3.11", "3.12"]

    steps:
      - name: Checkout Repository
        uses: actions/checkout@v4

      - name: Setup Python
        uses: actions/setup-python@v5
        with:
          python-version: ${{ matrix.python-version }}

      - name: Show Python Version
        run: python --version
```

### Total Jobs

```
2 OS × 3 Python versions = 6 jobs
```

All jobs run **in parallel**.

---

# Task 5 – Exclude & Fail-Fast

Matrix builds allow excluding specific combinations.

Example:

```yaml
exclude:
  - os: windows-latest
    python-version: "3.10"
```

This prevents that combination from running.

### Fail Fast

Default behavior:

```
fail-fast: true
```

Meaning:

If one job fails, the remaining jobs stop.

If set to:

```yaml
fail-fast: false
```

Other jobs continue running even if one job fails.

This is useful when testing across multiple environments.

---

# Key Learnings

Today I learned:

* How workflows trigger using **Pull Requests**
* How to schedule workflows using **Cron**
* How to manually trigger workflows
* How **Matrix builds** run jobs across multiple environments
* How **exclude and fail-fast** control matrix execution

---

# Screenshots

Add screenshots of:

* Pull Request workflow running
* Manual workflow execution
* Matrix build showing multiple jobs
* Scheduled workflow run
