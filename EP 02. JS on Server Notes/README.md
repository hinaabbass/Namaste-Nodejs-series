# 🟢 Episode 02: JS on Server


## 📖 Table of Contents
- [What is a Server?](#-what-is-a-server)
- [The V8 Engine & Architecture](#-the-v8-engine--architecture)
- [Node.js vs. Browser](#-nodejs-vs-browser)
- [Key Definitions](#-key-definitions)

---

## 🖥️ What is a Server?
A **server** is a computer or system that provides resources, data, services, or programs to other computers (clients) over a network.
* **Analogy:** Think of it as a remote computer. When you access a website, your computer sends a request to the server's **IP address**, and the server sends back the website data.

#### What is IP address?
An IP address, or Internet Protocol address, is a unique number that identifies
every device connected to the internet.

---

## ⚙️ The V8 Engine & Architecture

### How does JS come to life?
1. **You write JavaScript** (High-Level Code).
2. **The V8 Engine** (written in C++) parses your code.
3. It compiles it into **Machine Code** (Low-Level Binary).
4. The **CPU** executes these instructions.

### The Role of C++
The V8 engine is written in **C++** because it requires high performance and low-level memory management to execute JavaScript quickly.

---

## 🆚 Node.js vs. Browser

Both environments use the **V8 Engine**, but they provide different capabilities ("Superpowers") based on where the code is running.

| Feature | 🌐 Chrome Browser | 🟢 Node.js |
| :--- | :--- | :--- |
| **Engine** | V8 Engine | V8 Engine |
| **Focus** | User Interface & DOM | Server Logic & System |
| **Global Object** | `window` | `global` |
| **Unique APIs** | DOM, `document`, `localStorage` | `fs` (FileSystem), `http`, `path`, `crypto` |
| **Limitations** | No file system access (security) | No DOM access (no GUI) |

 **Key Takeaway:** Node.js is a **C++ container** (runtime) surrounding the V8 engine that gives JavaScript access to the operating system's features (files, network) which are normally restricted in a browser.

---

## 📚 Key Definitions

### 📜 ECMAScript (ECMA)
The standard that defines the rules and specifications for JavaScript.
* It ensures that JS code works consistently across different engines (V8, SpiderMonkey, etc.).
* Node.js and browsers both implement these standards.

### 🏗️ Low-Level Code
Code that provides little abstraction from a computer's instruction set architecture.
1. **Assembly Language:** Symbolic representations (mnemonics) of machine instructions.
2. **Machine Language:** Binary code (0s and 1s) that the CPU executes directly.

### 🧩 Javascript Runtime
The environment that allows JavaScript to run. It consists of:
1. **The Engine** (e.g., V8)
2. **Web/Node APIs** (e.g., `fs` or `fetch`)
3. **The Event Loop** (handles asynchronous tasks)