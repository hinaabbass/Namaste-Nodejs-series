# 🟢 Episode 01 - Introduction to Node.js


## 📖 Table of Contents
- [What is Node.js?](#-what-is-nodejs)
- [Why was Node.js Created?](#-why-was-nodejs-created)
- [History & Evolution](#-history--evolution)
- [ Key Concepts](#-appendix-key-concepts)

---

## 💻 What is Node.js?

**Node.js** is an open-source, cross-platform JavaScript runtime environment built on **Chrome's V8 JavaScript engine**.

### Key Characteristics
* **Runtime, not a Language:** It allows JavaScript to run **outside the browser** (on servers, desktops, embedded systems).
* **The Engine:** Powered by Google's V8 Engine (written in C++), which converts JS code into machine code for high performance.
* **Architecture:** Features an **event-driven architecture** capable of **Asynchronous I/O** (Non-Blocking I/O).
* **Philosophy:** "Run JavaScript Everywhere" — Node.js transformed JS from a frontend-only tool into a general-purpose language.
* **Governance:** Currently maintained by the **OpenJS Foundation**.

---

## 🚀 Why was Node.js Created?

**Creator:** Ryan Dahl (2009)

### The Problem 🛑
Traditional servers (like **Apache HTTP Server**) relied on **Blocking I/O**.
* They handled requests sequentially or created a new thread for every single request.
* This consumed heavy system resources and did not scale well for applications with high concurrency (many users at once).

### The Solution ✅
Ryan Dahl designed Node.js to be **Non-Blocking**.
* It handles multiple requests simultaneously on a single thread.
* It does not wait for one task (like a database query) to finish before starting the next one.
* **Result:** Highly efficient handling of thousands of concurrent connections.

---

## ⏳ History & Evolution

| Year | Event | Details |
| :--- | :--- | :--- |
| **2009** | **Node.js Created** | Built by **Ryan Dahl**. Initially tried *SpiderMonkey* engine but switched to **V8**. Originally named *Web.js*. |
| **2010** | **NPM Born** | **Isaac Z. Schlueter** created **NPM**. This was a turning point, allowing developers to easily share and manage packages. |
| **2011** | **Windows Support** | Joyent and Microsoft collaborated to bring NPM to Windows (previously macOS/Linux only). |
| **2012** | **Leadership Change** | Ryan Dahl stepped down. **Isaac Z. Schlueter** (NPM creator) became the project lead. |
| **2014** | **The Fork (io.js)** | Fedor Indutny forked Node.js to create **io.js** due to disagreements over governance and release speed. |
| **2015** | **The Merge** | Node.js and io.js merged back together. The **Node.js Foundation** was formed to ensure open governance. |
| **2019** | **OpenJS Foundation** | Node.js Foundation merged with JS Foundation to form the **OpenJS Foundation**. |

---

## 📚 Key Concepts

### 📦 What is NPM?
**NPM is the standard package manager for Node.js and the world's largest software registry.
* It manages dependencies via `package.json` and `package-lock.json`.
* *Alternatives:* Yarn, pnpm.

### 🔄 Blocking vs. Non-Blocking I/O

#### Blocking I/O (Synchronous)
 *The Waiter Analogy:* A waiter takes an order, walks to the kitchen, and **stands there waiting** for the chef to cook the meal. They serve the food, and only *then* do they take the next table's order.

 **Result:** The waiter (CPU) is idle/blocked while the food cooks.

#### Non-Blocking I/O (Asynchronous)
 *The Waiter Analogy:* A waiter takes an order, hands the ticket to the kitchen, and **immediately goes to the next table** to take another order. When the food is ready, the kitchen alerts the waiter to serve it.

 **Result:** The waiter (CPU) is never idle and handles many tables at once.