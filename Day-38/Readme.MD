
# 📘 Day 38 – YAML Basics

## 🎯 Objective

The goal of Day 38 was to understand YAML fundamentals before moving into CI/CD pipelines.

Since YAML is used in:

* Docker Compose
* Kubernetes
* GitHub Actions
* CI/CD pipelines


# 📝 Task 1 – Key-Value Pairs

Created `person.yaml` with basic key-value structure:

```yaml
name: Kanha
role: DevOps Engineer Aspirant
experience_years: 0
learning: true
```

### 🔎 Concepts Learned

* YAML uses `key: value` format
* Booleans are written as `true` / `false` (without quotes)
* Indentation matters
* Tabs are not allowed

---

# 📝 Task 2 – Lists

Extended `person.yaml` to include lists:

```yaml
tools:
  - docker
  - kubernetes
  - linux
  - github-actions
  - aws

hobbies: [coding, reading, fitness]
```

### Two Ways to Write Lists

1. Block style (recommended)
2. Inline style `[item1, item2]`

---

# 📝 Task 3 – Nested Objects

Created `server.yaml` with nested structure:

```yaml
server:
  name: production-server
  ip: 192.168.1.10
  port: 8080

database:
  host: db.internal
  name: userdb
  credentials:
    user: admin
    password: securepassword
```

### Concepts Learned

* Indentation defines hierarchy
* Nested objects require consistent spacing (2 spaces recommended)

---

# 📝 Task 4 – Multi-line Strings

Added multi-line fields:

```yaml
startup_script_literal: |
  echo "Starting server"
  npm install
  npm start

startup_script_folded: >
  echo "Starting server"
  npm install
  npm start
```

### Difference Between `|` and `>`

| Symbol | Behavior                          |                            |
| ------ | --------------------------------- | -------------------------- |
| `      | `                                 | Preserves newlines exactly |
| `>`    | Folds newlines into a single line |                            |

Use `|` for scripts.
Use `>` for long text paragraphs.

---

# 📝 Task 5 – YAML Validation

Validated files using:

```bash
yamllint person.yaml
yamllint server.yaml
```

Intentionally broke indentation to observe errors such as:

```
mapping values are not allowed here
```

Fixed spacing and revalidated successfully.

---

# 📝 Task 6 – Spot the Error

Incorrect block:

```yaml
tools:
- docker
  - kubernetes
```

Problem:

* Inconsistent indentation under `tools`
* YAML structure becomes invalid

Correct version:

```yaml
tools:
  - docker
  - kubernetes
```

---

# 🔑 Key Takeaways

1. YAML uses spaces only — never tabs.
2. Indentation defines structure.
3. Lists can be block style or inline style.
4. Nested objects require consistent indentation.
5. `|` and `>` control multi-line string formatting.
6. Validation tools help detect indentation errors quickly.

---

# 🚀 Outcome

After completing Day 38:

* Comfortable writing YAML manually
* Understand nested structures and lists
* Able to debug indentation errors
* Ready to write CI/CD pipelines


