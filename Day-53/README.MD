# 🚀 Kubernetes Learning – Day 53 (Services)

## 📌 Introduction

In this task, I implemented Kubernetes Services to expose applications running inside a cluster. Services solve the problem of unstable Pod IPs and provide a stable network endpoint with built-in load balancing.

---

## ❗ Problem Without Services

* Each Pod gets a unique IP
* Pod IP changes when restarted
* Multiple Pods exist in a Deployment

👉 Result: No stable way to access the application

---

## ✅ Solution: Kubernetes Services

A Service provides:

* Stable IP address
* DNS name
* Load balancing across Pods

```
Client → Service → Pods
```

---

## ⚙️ Step 1: Create Deployment

### app-deployment.yaml

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: web-app
  labels:
    app: web-app
spec:
  replicas: 3
  selector:
    matchLabels:
      app: web-app
  template:
    metadata:
      labels:
        app: web-app
    spec:
      containers:
      - name: nginx
        image: nginx:1.25
        ports:
        - containerPort: 80
```

### Apply:

```bash
kubectl apply -f app-deployment.yaml
kubectl get pods -o wide
```

---

## 🔍 Observation

* 3 Pods running
* Each Pod has different IP

👉 This creates instability → need Service

---

## 🌐 Step 2: ClusterIP Service (Internal Access)

### clusterip-service.yaml

```yaml
apiVersion: v1
kind: Service
metadata:
  name: web-app-clusterip
spec:
  type: ClusterIP
  selector:
    app: web-app
  ports:
  - port: 80
    targetPort: 80
```

### Apply:

```bash
kubectl apply -f clusterip-service.yaml
kubectl get services
```

---

## 🧪 Test Inside Cluster

```bash
kubectl run test-client --image=busybox --rm -it --restart=Never -- sh
```

Inside:

```bash
wget -qO- http://web-app-clusterip
```

👉 Output: Nginx welcome page

---

## 🧠 Key Concept

* Service routes traffic to Pods using labels
* Load balancing happens automatically

---

## 🔎 Step 3: DNS-Based Service Discovery

Each Service gets DNS:

```
web-app-clusterip.default.svc.cluster.local
```

### Test:

```bash
nslookup web-app-clusterip
```

👉 Resolves to ClusterIP

---

## 🌍 Step 4: NodePort Service (External Access)

### nodeport-service.yaml

```yaml
apiVersion: v1
kind: Service
metadata:
  name: web-app-nodeport
spec:
  type: NodePort
  selector:
    app: web-app
  ports:
  - port: 80
    targetPort: 80
    nodePort: 30080
```

### Access:

```
http://<NodeIP>:30080
```

---

## ☁️ Step 5: LoadBalancer Service (Production)

### loadbalancer-service.yaml

```yaml
apiVersion: v1
kind: Service
metadata:
  name: web-app-loadbalancer
spec:
  type: LoadBalancer
  selector:
    app: web-app
  ports:
  - port: 80
    targetPort: 80
```

---

## ⚠️ Important Note

* On local clusters → EXTERNAL-IP = `<pending>`
* On cloud (AWS, GCP, Azure) → real public IP is assigned

---

## 🔄 Step 6: Service Types Comparison

| Type         | Access               | Use Case                         |
| ------------ | -------------------- | -------------------------------- |
| ClusterIP    | Internal only        | Service-to-service communication |
| NodePort     | External via node IP | Testing                          |
| LoadBalancer | Public access        | Production                       |

---

## 🔗 Step 7: Endpoints

### Check endpoints:

```bash
kubectl get endpoints web-app-clusterip
```

👉 Shows actual Pod IPs behind the Service

---

## 🧠 Key Insight

* Service does NOT run application
* It only routes traffic to Pods

---

## 🧹 Step 8: Cleanup

```bash
kubectl delete -f app-deployment.yaml
kubectl delete -f clusterip-service.yaml
kubectl delete -f nodeport-service.yaml
kubectl delete -f loadbalancer-service.yaml
```

---

## 🎯 Conclusion

In this task, I learned:

* Why Services are required
* How to expose applications in Kubernetes
* Differences between ClusterIP, NodePort, and LoadBalancer
* How DNS works in Kubernetes
* How Services perform load balancing


## 🚨 Key Learnings (Important)

* Pods are dynamic, Services are stable
* Selector must match Pod labels
* ClusterIP cannot be accessed from outside
* LoadBalancer depends on cloud provider

---

