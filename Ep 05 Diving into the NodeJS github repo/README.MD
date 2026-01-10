# 🟢 Episode 05 – Diving into the NodeJS github repo

This README explains how Node.js modules actually work internally:  
how `require()` and `module.exports` are implemented, why module code is private, and where this logic lives in the Node.js GitHub repository.

---

## 📑 Table of Contents

- [1. Function Scope vs Module Scope](#1-function-scope-vs-module-scope)
- [2. How Node.js Wraps Your Code (IIFE)](#2-how-nodejs-wraps-your-code-iife)
- [3. Where `module` and `module.exports` Come From](#3-where-module-and-moduleexports-come-from)
- [4. How `require()` Works Internally](#4-how-require-works-internally)
  - [4.1 Steps of `require()`](#41-steps-of-require)
  - [4.2 Module Caching (Very Important)](#42-module-caching-very-important)
- [5. Inside the Node.js GitHub Repo](#5-inside-the-nodejs-github-repo)
  - [5.1 V8, libuv, and “Node.js Superpowers”](#51-v8-libuv-and-nodejs-superpowers)
  - [5.2 `lib/` Directory – Core JS of Node.js](#52-lib-directory--core-js-of-nodejs)
  - [5.3 Implementation of `require()`](#53-implementation-of-require)
- [6. `makeRequireFunction` & Helpers](#6-makerequirefunction--helpers)
- [7. Error Handling in `require()`](#7-error-handling-in-require)
- [8. Key Takeaways & Interview Points](#8-key-takeaways--interview-points)

---

## 1. Function Scope vs Module Scope

Consider this JavaScript code:

```js
function x() {
  const a = 10;
  function b() {
    console.log("b");
  }
}
console.log(a); // ❌ ReferenceError: a is not defined
```
- Variable a is defined inside function x
- It is not accessible outside – this is function scope

> **Important Idea:**
 Node.js modules behave like functions. Each file’s code is effectively wrapped inside a function, so its variables are not visible globally.

---

## 2. How Node.js Wraps Your Code (IIFE)
When you require a file in Node.js, Node internally wraps that file’s code in a function before executing it.

Conceptually, Node does something like this:

```
(function (exports, require, module, __filename, __dirname) {
  // Your original module code is here
})();
```
This is an IIFE (Immediately Invoked Function Expression):

- **Immediately invoked:** runs as soon as it’s defined
- **Creates a private scope:** keeps variables and functions inside the module
- Prevents them from polluting the global scope

> 🔑 Q1: How are variables and functions private in different modules?
A: Because Node wraps each module in an IIFE when you require() it.
Each module gets its own function scope.

--- 

## 3. Where module and module.exports Come From
Inside that wrapper function, Node passes several parameters:

```
(function (exports, require, module, __filename, __dirname) {
  // Your code can use: module, module.exports, require, etc.
});
```
So:

- module is an object created by Node for each module
- `module.exports` is initially `{}` (an empty object)

When you write:

```
module.exports = {
  x,
  calculateSum,
};
```

you are setting what will be returned when another file does:

```
const { x, calculateSum } = require('./thisModule');
```

> 🔑 Q2: How do you get access to module.exports? Where does module come from?
A: Node injects module (and module.exports) as parameters into the wrapper function that it uses to run your module.

---

## 4. How require() Works Internally

### 4.1 Steps of require()
When you call:

```
const xyz = require('./xyz');
```
Node.js goes through several internal steps:

1. Resolve the Module Path
- Checks if `'./xyz'` is:
    - A local file `(./xyz.js, ./xyz.json, etc.)`
    - A directory with `index.js`
    - A package in `node_modules`
    - Uses Node’s module resolution algorithm.

2. Load the Module
- Reads the file if it’s:
    - JavaScript (.js)
    - JSON (.json)
    - Native add-on (.node)
- For JSON, it parses the JSON into an object.
- For JS, it reads the source code as text.

3. Wrap in IIFE

Wraps the code in the function:

```
(function (exports, require, module, __filename, __dirname) {
  // source code of the module
});
```
4. Evaluate the Code
- Executes the wrapper function
- During execution, your code can:
    - Modify `module.exports`
    - Use `require()`
    - Use `__filename, __dirname`, etc.

5. Return module.exports

- Whatever is in module.exports at the end of execution is returned from require().

### 4.2 Module Caching (Very Important)
Node.js caches the result of a require() call:

- **First time:** full process (resolve → load → wrap → execute → cache)
- **Next times:** directly returns cached module.exports

Example scenario:

Files: sum.js, app.js, multiply.js, all doing:

```
const xyz = require('./xyz');
```
First `require('./xyz')` (e.g., from sum.js):

- Full steps:
    - Resolve path
    - Load file
    - Wrap in IIFE
    - Execute
    - Store module.exports in cache

Subsequent `require('./xyz')` (from app.js & multiply.js):

- Node skips:
    - Re-reading file 
    - Re-wrapping
    - Re-executing

- It simply returns the cached module.exports

>⚡**Why caching matters:**
> - Huge performance boost, especially when:
    - Many files require the same large module
    - Modules perform heavy initialization

>- Guarantees each module is executed once (per process), which is why many people say modules behave like singletons.

---

## 5. Inside the Node.js GitHub Repo
Node.js is open-source and hosted here:

https://github.com/nodejs/node

### 5.1 V8, libuv, and “Node.js Superpowers”
Node.js combines:

- V8 – JavaScript engine (from Chrome)
- libuv – C library that powers:
    - Asynchronous I/O
    - Event loop
    - Cross-platform abstractions (file system, network, timers, etc.)

> #### 🧱 Why is Node.js so popular?

> Largely because of libuv, which gives Node:
>- Non-blocking I/O
>- Scalable event-loop architecture
