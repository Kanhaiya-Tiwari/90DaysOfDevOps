
# Day 52 – Kubernetes Namespaces and Deployments

## 1. Introduction

In this task, I learned how Kubernetes manages applications using Deployments and how Namespaces help organize resources inside a cluster. Unlike standalone Pods, Deployments provide self-healing, scaling, and rolling updates.

---

## 2. What are Namespaces?

Namespaces are used to divide a Kubernetes cluster into logical sections.

### Why use Namespaces?

* Resource isolation (dev, staging, production)
* Better organization
* Access control

### Default Namespaces:

* default
* kube-system
* kube-public
* kube-node-lease

---

## 3. Creating Namespaces

```bash
kubectl create namespace dev
kubectl create namespace staging
```

Create using YAML:

```yaml
apiVersion: v1
kind: Namespace
metadata:
  name: production
```

---

## 4. Running Pods in Namespaces

```bash
kubectl run nginx-dev --image=nginx:latest -n dev
kubectl run nginx-staging --image=nginx:latest -n staging
```

View all pods:

```bash
kubectl get pods -A
```

---

## 5. Deployment Manifest

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: nginx-deployment
  namespace: dev
  labels:
    app: nginx
spec:
  replicas: 3
  selector:
    matchLabels:
      app: nginx
  template:
    metadata:
      labels:
        app: nginx
    spec:
      containers:
      - name: nginx
        image: nginx:1.24
        ports:
        - containerPort: 80
```

---

## 6. Explanation of Deployment

* **replicas**: Number of Pods to maintain
* **selector.matchLabels**: Connects Deployment to Pods
* **template**: Blueprint for Pods
* **containers**: Defines image and ports

---

## 7. Key Difference: Pod vs Deployment

| Feature        | Pod  | Deployment |
| -------------- | ---- | ---------- |
| Self-healing   | ❌ No | ✅ Yes      |
| Scaling        | ❌ No | ✅ Yes      |
| Auto recreate  | ❌ No | ✅ Yes      |
| Production use | ❌ No | ✅ Yes      |

---

## 8. Self-Healing Behavior

When a Pod managed by a Deployment is deleted:

* Kubernetes automatically creates a new Pod
* New Pod has a different name
* Desired state is maintained

Standalone Pod:

* Deleted permanently
* Not recreated

---

## 9. Scaling

### Imperative Scaling:

```bash
kubectl scale deployment nginx-deployment --replicas=5 -n dev
```

### Declarative Scaling:

Edit YAML:

```yaml
replicas: 4
```

Then apply:

```bash
kubectl apply -f nginx-deployment.yaml
```

---

## 10. Rolling Updates

Update image:

```bash
kubectl set image deployment/nginx-deployment nginx=nginx:1.25 -n dev
```

Check rollout:

```bash
kubectl rollout status deployment/nginx-deployment -n dev
```

### Key Concept:

* Pods are updated one by one
* No downtime
* Old pods removed after new ones are ready

---

## 11. Rollback

```bash
kubectl rollout undo deployment/nginx-deployment -n dev
```

Check history:

```bash
kubectl rollout history deployment/nginx-deployment -n dev
```

---

## 12. What Happens During Scaling Down?

When scaling from 5 to 2:

* Extra Pods are terminated
* Kubernetes keeps only required replicas

---

## 13. Commands Used

```bash
kubectl get namespaces
kubectl get pods -A
kubectl get deployments -n dev
kubectl get pods -n dev
kubectl delete pod <pod-name> -n dev
kubectl scale deployment nginx-deployment --replicas=5 -n dev
kubectl set image deployment/nginx-deployment nginx=nginx:1.25 -n dev
kubectl rollout undo deployment/nginx-deployment -n dev
```

---

## 14. Conclusion

In this task, I learned:

* How Namespaces organize resources
* How Deployments manage Pods
* Self-healing and scaling concepts
* Rolling updates and rollback mechanisms

