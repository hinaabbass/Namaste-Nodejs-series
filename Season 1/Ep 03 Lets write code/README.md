# 🟢 Episode 03: Let's Write Code!

## 📖 Table of Contents
- [Installation & Verification](#-installation--verification)
- [Running Code: REPL vs. Files](#-running-code-repl-vs-files)
- [The Global Object](#-the-global-object)

---

## 🛠️ Installation & Verification
Before writing code, you need to install the Node.js runtime on your computer.
1.  **Install:** Download from [nodejs.org](https://nodejs.org).
2.  **Verify:** Open your terminal and run:
    ```bash
    node -v   # Checks Node version
    npm -v    # Checks NPM version
    ```

---

## 🏃 Running Code: REPL vs. Files
There are two main ways to execute JavaScript code using Node.js:

### 1. Node REPL (Read-Evaluate-Print Loop)
The REPL is a simple, interactive shell that allows you to execute JavaScript code line-by-line directly in the terminal. It is great for quick tests but not for building real applications.
* **Start:** Type `node` in terminal.
* **Usage:** Type JS code (`2+2`) and hit Enter.

### 2. File Execution (Standard Method)
This is the standard way to build applications.
1.  Create a file (e.g., `app.js`).
2.  Write code: `console.log("Hello Node");`
3.  Run in terminal: `node app.js`

---

## 🌍 The Global Object

In the browser, the global object is window. In Node.js, there is no window; instead, we have global.

| Environment | Global Object | Standardized Name (ES2020) |
| :--- | :--- | :--- |
| **Browser** | `window` | `globalThis` |
| **Node.js** | `global` | `globalThis` |

### The globalThis Object
**The Problem:** Historically, the global object had different names in different environments (`window` in browsers, `global` in Node.js, `self` in web workers). This made it hard to write code that ran everywhere.

**The Solution:** globalThis was introduced (ES2020) as a standard name.

#### How it works:

In a Browser: ``globalThis === window``

In Node.js: ``globalThis === global``