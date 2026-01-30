# 🟢 Episode 09 – libuv & Event Loop 🔄⚙️

This episode dives deep into **how Node.js handles asynchronous operations internally** using **libuv**, the **event loop**, **callback queues**, **microtasks**, and **thread pools**.

## 📑 Table of Contents

- [Why libuv Is Important](#-why-libuv-is-important)

- 🔄 [What Is the Event Loop?](#-what-is-the-event-loop)

- [Callback Queue](#-callback-queue)

- [Thread Pool (libuv)](#-thread-pool-libuv)

- [Multiple Callback Queues in libuv](#-multiple-callback-queues-in-libuv)

- 🔁 [Event Loop Phases](#-event-loop-phases-very-important)
  - 1️⃣ [Timers Phase](#1️⃣-timers-phase)
  - 2️⃣ [Poll Phase](#2️⃣-poll-phase)
  - 3️⃣ [Check Phase](#3️⃣-check-phase)
  - 4️⃣ [Close Callbacks Phase](#4️⃣-close-callbacks-phase)

- [Microtasks (Highest Priority)](#-microtasks-highest-priority)

- [process.nextTick](#-processnexttick-very-important)

- [Example 1: setTimeout vs setImmediate](#example-1-settimeout-vs-setimmediate)

- [Example 2: Promise + nextTick](#example-2-promise--nexttick)

- [Example 3: Full Event Loop Priority](#example-3-full-event-loop-priority)

- [Nested process.nextTick Example](#nested-processnexttick-example)

- [What Happens When Event Loop Is Idle?](#what-happens-when-event-loop-is-idle)

- [Key Takeaways](#key-takeaways)


---

## 🧠 Why libuv Is Important

- JavaScript is **single-threaded**
- Node.js achieves **non-blocking I/O** using **libuv**
- libuv is a **C library** that provides:
  - Event loop
  - Callback queues
  - Thread pool
  - OS-level async handling

---

## 🔄 What Is the Event Loop?

- The event loop is the **heart of Node.js async behavior**
- Its job is to:
  - Monitor the **call stack**
  - Execute callbacks when the stack is empty
- Ensures Node.js remains **non-blocking**

---

## 📥 Callback Queue

- Stores callbacks of **completed async operations**
- Callbacks wait here **until the call stack is empty**
- Examples:
  - `setTimeout`
  - `setImmediate`
  - I/O callbacks (`fs.readFile`)
  - Network callbacks

---

## 🧵 Thread Pool (libuv)

- Default size: **4 threads**
- Used for:
  - File system operations
  - Crypto functions
  - DNS lookups (some cases)
- Prevents heavy tasks from blocking the event loop

---

## 🧩 Multiple Callback Queues in libuv

libuv maintains **separate queues** for different async tasks:

- 🕒 Timers queue → `setTimeout`, `setInterval`
- 📂 Poll queue → I/O callbacks (fs, network)
- ✅ Check queue → `setImmediate`
- ❌ Close callbacks queue → cleanup tasks

---

## 🔁 Event Loop Phases (Very Important)

The event loop runs in **phases**, in the following order:

### 1️⃣ Timers Phase
- Executes callbacks from:
  - `setTimeout`
  - `setInterval`
- Only if the timer has expired

---

### 2️⃣ Poll Phase
- Handles **I/O callbacks**
- Examples:
  - `fs.readFile`
  - Network responses
- If poll queue is empty:
  - Event loop may wait for new events

---

### 3️⃣ Check Phase
- Executes callbacks from:
  - `setImmediate`
- Always runs **after poll phase**

---

### 4️⃣ Close Callbacks Phase
- Handles cleanup callbacks
- Example:
  - `socket.on("close")`


![Alt text for the image](./Event%20loop%20Phases.png)

---

## ⚡ Microtasks (Highest Priority)

Before **every phase**, Node.js executes **microtasks**.

### Microtasks include:
1. `process.nextTick`
2. `Promise.then / catch / finally`

### Priority Order
```
process.nextTick
→ Promises
→ Timers
→ Poll
→ setImmediate
```

## ⚠️ process.nextTick (Very Important)

- Runs **before everything else**
- Can starve the event loop if abused
- Nested `process.nextTick` executes immediately

---

## Example 1: setTimeout vs setImmediate

```js
setImmediate(() => console.log("setImmediate"));
setTimeout(() => console.log("Timer expired"), 0);

console.log("Last line of the file.");

```
```
Last line of the file.
Timer expired
setImmediate
```
## Example 2: Promise + nextTick

```
process.nextTick(() => console.log("nextTick"));
Promise.resolve("promise").then(console.log);

console.log("End");
```

```
End
nextTick
promise
```

## Example 3: Full Event Loop Priority

### Code Summary

- process.nextTick
- Promise
- setTimeout
- setImmediate
- fs.readFile
- Output Order

```
Last line of the file.
Process.nextTick
promise
Timer expired
setImmediate
File reading CB
```

## Nested process.nextTick Example
```
process.nextTick(() => {
  console.log("outer nextTick");
  process.nextTick(() => console.log("inner nextTick"));
});
```
```
outer nextTick
inner nextTick
```

## What Happens When Event Loop Is Idle?

- If:
  - Call stack is empty
  - No timers ready
  - No I/O callbacks

- Event loop enters poll phase
- Waits for new events

## Key Takeaways

- Node.js uses libuv for async behavior
- Event loop runs in phases
- Microtasks run before every phase
- process.nextTick has highest priority
- setImmediate runs after poll phase
- Heavy tasks go to thread pool
- Bad use of nextTick can block the app
