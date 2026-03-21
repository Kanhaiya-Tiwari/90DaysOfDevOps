# Day 51 – Kubernetes Manifests and Pods

## 1. Introduction

In this task, I learned how to create and manage Kubernetes Pods using YAML manifests. A Pod is the smallest deployable unit in Kubernetes that can run one or more containers.

---

## 2. Anatomy of a Kubernetes Manifest

Every Kubernetes manifest has four main fields:

### 1. apiVersion

Defines which version of Kubernetes API to use.
Example: `v1`

### 2. kind

Specifies the type of resource.
Example: `Pod`

### 3. metadata

Contains information about the object like:

* name (unique identifier)
* labels (key-value pairs for grouping and filtering)

### 4. spec

Defines the desired state of the resource:

* container image
* ports
* commands

---

## 3. Pod Manifests

### 3.1 Nginx Pod

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: nginx-pod
  labels:
    app: nginx
    environment: dev
spec:
  containers:
  - name: nginx-container
    image: nginx:latest
    ports:
    - containerPort: 80
```

---

### 3.2 BusyBox Pod

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: busybox-pod
  labels:
    app: busybox
    environment: dev
spec:
  containers:
  - name: busybox-container
    image: busybox:latest
    command: ["sh", "-c", "echo Hello from BusyBox && sleep 3600"]
```

**Explanation:**
BusyBox does not run a long-lived process by default.
Without the `sleep 3600` command, the container would exit immediately and the Pod would fail.

---

### 3.3 Redis Pod (Custom Pod)

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: redis-pod
  labels:
    app: redis
    environment: production
    team: devops
spec:
  containers:
  - name: redis-container
    image: redis:latest
    ports:
    - containerPort: 6379
```

---

## 4. Imperative vs Declarative Approach

### Imperative Approach

Commands are used directly:

```
kubectl run redis-pod --image=redis:latest
```

* Quick and simple
* Not suitable for production

### Declarative Approach

YAML files are used:

```
kubectl apply -f pod.yaml
```

* Easy to manage and version control
* Industry standard

---

## 5. Commands Used

```
kubectl apply -f nginx-pod.yaml
kubectl apply -f busybox-pod.yaml
kubectl apply -f redis-pod.yaml

kubectl get pods
kubectl describe pod nginx-pod
kubectl logs busybox-pod
kubectl exec -it nginx-pod -- /bin/bash
```

---

## 6. Labels and Filtering

Labels help organize and filter resources.

Examples:

```
kubectl get pods --show-labels
kubectl get pods -l app=nginx
kubectl get pods -l environment=dev
```

---

## 7. What Happens When You Delete a Pod?

When a standalone Pod is deleted:

* It is permanently removed
* It is NOT recreated automatically
* There is no controller managing it

This is why in production we use Deployments instead of Pods.

---

## 8. Conclusion

In this task, I learned:

* Structure of Kubernetes manifests
* Creating Pods using YAML
* Difference between imperative and declarative approaches
* Importance of labels
* Behavior of Pods when deleted


