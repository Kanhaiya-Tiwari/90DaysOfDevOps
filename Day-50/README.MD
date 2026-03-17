# Day 50 – Kubernetes Architecture and Cluster Setup

---

## 📌 Introduction

Kubernetes is a container orchestration platform used to automate deployment, scaling, and management of containerized applications. While Docker helps in creating and running containers, it does not handle large-scale management. Kubernetes fills this gap by managing multiple containers across multiple machines efficiently.

---

## 🧠 Why Kubernetes Was Created

When applications started using containers, managing them manually became difficult. Problems included:

* No automatic scaling when traffic increases
* No self-healing if containers crash
* No centralized management for multiple containers
* Difficult load balancing

Kubernetes was created to solve these problems by automating container orchestration and ensuring reliability in production systems.

---

## 🏛️ History of Kubernetes

Kubernetes was developed by Google and released as an open-source project in 2014. It is inspired by Google's internal system called **Borg**, which was used to manage large-scale workloads.

The name **Kubernetes** comes from Greek, meaning **“Helmsman”** or **“ship pilot”**, representing its role in managing containerized applications.

---

## 🏗️ Kubernetes Architecture (Detailed Explanation)

Kubernetes architecture is divided into two main parts:

### 1. Control Plane (Master Node)

The Control Plane is the brain of the Kubernetes cluster. It makes decisions and manages the entire system.

#### 🔹 API Server

* Acts as the entry point to the cluster
* All commands (via kubectl or UI) go through the API server
* Validates and processes requests

#### 🔹 etcd

* A distributed key-value database
* Stores all cluster data such as:

  * Pods
  * Nodes
  * Configurations
* If etcd fails, the cluster loses its state

#### 🔹 Scheduler

* Decides which node will run a new pod
* Considers:

  * CPU usage
  * Memory availability
  * Resource constraints

#### 🔹 Controller Manager

* Maintains the desired state of the cluster
* Example:

  * If 3 pods are required and 1 fails → creates a new pod automatically

---

### 2. Worker Node

Worker nodes are responsible for executing the actual workloads (containers).

#### 🔹 kubelet

* Agent running on each node
* Communicates with API server
* Ensures containers are running as expected

#### 🔹 kube-proxy

* Manages networking rules
* Enables communication between pods and services

#### 🔹 Container Runtime

* Runs the actual containers
* Examples:

  * containerd
  * CRI-O

---

## 🔄 How Kubernetes Works (Request Flow)

When a user runs the command:

```bash
kubectl apply -f pod.yaml
```

The following steps occur:

1. kubectl sends the request to the API Server
2. API Server validates the request
3. Desired state is stored in etcd
4. Scheduler selects the best worker node
5. kubelet on that node creates the pod
6. Container runtime runs the container
7. kube-proxy enables networking

---

## ⚠️ Failure Scenarios

### API Server Failure

* Cluster becomes inaccessible
* No new deployments or updates can be made

### Worker Node Failure

* Pods on that node stop working
* Kubernetes automatically reschedules pods on other nodes

---

## ⚙️ kubectl Installation

kubectl is the command-line tool used to interact with Kubernetes clusters.

### Verify Installation

```bash
kubectl version --client
```

---

## 🖥️ Local Cluster Setup

### Tool Used: kind (Kubernetes in Docker)

#### Why kind?

* Lightweight and fast
* Uses Docker (already familiar)
* Ideal for local development and DevOps learning

---

### Create Cluster

```bash
kind create cluster --name devops-cluster
```

---

### Verify Cluster

```bash
kubectl cluster-info
kubectl get nodes
```

Expected output: Node should be in **Ready** state

---

## 🔍 Exploring the Cluster

### List Nodes

```bash
kubectl get nodes
```

---

### Describe Node

```bash
kubectl describe node <node-name>
```

---

### List Namespaces

```bash
kubectl get namespaces
```

---

### View All Pods

```bash
kubectl get pods -A
```

---

## 🔧 kube-system Namespace

This namespace contains internal Kubernetes components.

```bash
kubectl get pods -n kube-system
```

### Important Pods

| Pod Name                | Function                |
| ----------------------- | ----------------------- |
| kube-apiserver          | Handles API requests    |
| etcd                    | Stores cluster data     |
| kube-scheduler          | Assigns pods to nodes   |
| kube-controller-manager | Maintains desired state |
| coredns                 | Provides DNS services   |
| kube-proxy              | Manages networking      |

---

## 🔁 Cluster Lifecycle Management

### Delete Cluster

```bash
kind delete cluster --name devops-cluster
```

---

### Recreate Cluster

```bash
kind create cluster --name devops-cluster
```

---

### Check Current Context

```bash
kubectl config current-context
```

---

### View All Contexts

```bash
kubectl config get-contexts
```

---

## 🧠 What is kubeconfig?

kubeconfig is a configuration file used by kubectl to connect to Kubernetes clusters.

### It contains:

* Cluster details
* User credentials
* Context (which cluster to use)

### Default Location:

```
~/.kube/config
```

---

## 🚀 Key Learnings

* Kubernetes manages container orchestration at scale
* Control Plane handles decisions, Worker Nodes execute tasks
* All interactions go through the API Server
* etcd stores the entire cluster state
* Kubernetes automatically heals failures
* kubeconfig is essential for cluster communication

---

## 📸 Screenshots (To Add)

* kubectl get nodes
* kubectl get pods -n kube-system

(Add your actual screenshots here after running commands)

---

## ✅ Conclusion

Kubernetes simplifies container management by automating deployment, scaling, and recovery. It is essential for modern DevOps practices and widely used in production environments.

Understanding its architecture and basic commands is the first step toward mastering container orchestration.
