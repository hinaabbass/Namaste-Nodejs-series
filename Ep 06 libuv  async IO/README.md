
# 🟢 Episode 06 – libuv  async IO

📑 Table of Contents
## 📑 Table of Contents

- [Episode 06 – libuv & Async I/O](#-episode-06--libuv--async-io)

- [What Is a Thread?](#what-is-a-thread)
  - [Types of Threading](#types-of-threading)

- [JavaScript Threading Model](#javascript-threading-model)

- [Synchronous vs Asynchronous Systems](#synchronous-vs-asynchronous-systems)
  - [Synchronous](#synchronous)
  - [Asynchronous](#asynchronous)

- [JavaScript Engine (V8) – Core Components](#javascript-engine-v8--core-components)
  - [Call Stack](#1-call-stack)
  - [Memory Heap](#2-memory-heap)
  - [Garbage Collector](#3-garbage-collector)

- [How Synchronous JavaScript Code Executes](#how-synchronous-javascript-code-executes)
  - [Global Execution Context (GEC)](#step-1-global-execution-context-gec)
  - [Memory Creation Phase](#step-2-memory-creation-phase)
  - [Code Execution Phase](#step-3-code-execution-phase)
  - [Function Execution Context](#step-4-function-execution-context)
  - [Function Completion & Program End](#step-5-function-completion)

- [Why JavaScript Alone Cannot Handle Async Work](#why-javascript-alone-cannot-handle-async-work)

- [Node.js and libuv](#nodejs-and-libuv-very-important)
  - [libuv](#libuv)

- [The Event Loop](#the-event-loop)

- [Thread Pool](#thread-pool-important-missing-point)

- [Callback Queue / Event Queue](#callback-queue--event-queue)

- [How Asynchronous Code Executes in Node.js](#how-asynchronous-code-executes-in-nodejs)

- [Complete Execution Flow Example](#complete-execution-flow-example)
  - [Initial Execution (Synchronous Phase)](#1️⃣-initial-execution-synchronous-phase)
  - [Line-by-Line Execution](#2️⃣-line-by-line-execution)
  - [Call Stack Visualization](#3️⃣-call-stack-visualization-synchronous-phase)
  - [Call Stack Becomes Empty](#4️⃣-call-stack-becomes-empty)
  - [Asynchronous Callbacks Execution Phase](#5️⃣-asynchronous-callbacks-execution-phase)
  - [Final Output Order](#8️⃣-final-output-order-typical)


## What Is a Thread?
- A thread is the smallest unit of execution inside a process.
- **Multiple threads:**
	- Can exist inside one process
	- Share memory
	- Can run tasks in parallel

### Types of threading

- **Single-threaded** → one thread executes all code
- **Multi-threaded** → multiple threads execute code simultaneously

## JavaScript Threading Model

- JavaScript is:
    - Single-threaded
    - Synchronous by nature
- Only one call stack exists.
- Code executes line by line, one operation at a time.

**👉 Important clarification:**
- JavaScript itself is not asynchronous
- The runtime environment (Node.js or browser) enables async behavior

## Synchronous vs Asynchronous Systems
### Synchronous
- Tasks run one after another
- Each task must finish before the next starts
- Blocking behavior
**Example:**
- One person doing 10 tasks with one hand

### Asynchronous
- Tasks can run independently
- Slow tasks don’t block fast ones
- Results come back when ready

**Example:**
- 10 tasks, 10 hands — everyone works independently

## JavaScript Engine (V8) – Core Components
### 1. Call Stack
- Keeps track of:
   - What function is currently running
   - Which function called which
- Only one function runs at a time

### 2. Memory Heap
- Stores:
    - Variables
    - Objects
    - Functions

### 3. Garbage Collector
- Automatically removes unused memory
- Developers do not manually free memory
- Prevents memory leaks (mostly, but not always)

## How Synchronous JavaScript Code Executes
### Step 1: Global Execution Context (GEC)
- Created when the program starts
- Pushed first onto the call stack
- Contains:
    - Global variables
    - Function declarations

### Step 2: Memory Creation Phase
- Variables → initialized as undefined
- Functions → stored fully in memory

### Step 3: Code Execution Phase
- Values assigned to variables
- Functions invoked

### Step 4: Function Execution Context
- When a function is called:
- New execution context is created
- Pushed onto the call stack
- Has:
    - Its own variables
    - Its own memory space

### Step 5: Function Completion
- return sends value back
- Function context is popped off the stack
- Memory may be garbage-collected

### Step 6: Program End
- Global execution context removed
- Call stack becomes empty
```Example
function multiply(a, b) {
    return a * b;
}

function calculate() {
    const result = multiply(5, 10);
    return result;
}

calculate();

// Call Stack visualization:
// [Global Execution Context]           ← Base
// [calculate()]                        ← Pushed when calculate() called
// [multiply(5, 10)]                    ← Pushed when multiply() called
// [multiply(5, 10)] returns            ← Popped after return
// [calculate()] returns                ← Popped after return
// [Global Execution Context] complete  ← Popped when program ends
```
## Why JavaScript Alone Cannot Handle Async Work
- JavaScript cannot:
    - Access files
    - Create timers
    - Handle network requests
- It needs external help

## Node.js and libuv (Very Important)
### libuv
- A C library used by Node.js
- Provides:
    - Event loop
    - Thread pool
    - OS-level async operations
- 👉 libuv is not JavaScript, it runs at a lower level


### The Event Loop
**The event loop:**
- Continuously checks:
   - Is the call stack empty?
   - Are callbacks ready to execute?
- If yes:
    - Pushes callbacks onto the call stack

### Thread Pool (IMPORTANT MISSING POINT)
- libuv maintains a thread pool (default size: 4)
- Used for:
   - File system operations
    - Crypto operations
    - DNS lookups (some cases)
**⚠️ Even though JS is single-threaded:**
- Node.js is multi-threaded under the hood

### Callback Queue / Event Queue
- Stores callback functions of completed asynchronous operations
- Contains functions ready to execute
**Examples of callbacks stored:**
- setTimeout callbacks
- setInterval callbacks
- I/O callbacks (fs.readFile, https.get)

## How Asynchronous Code Executes in Node.js
**When JS sees async code (like setTimeout, file read, API call):**
- V8 recognizes it as async
- Delegates the task to libuv
- libuv:
   - Registers the task
   - Sends it to OS or thread pool
- JS continues executing remaining code
- When async work finishes:
   - Callback is queued
   - Eventually pushed to call stack


```Example 
const fs = require("fs");
const https = require("https");

var a = 10;
var b = 10;

https.get("https://api.fbi.com", (res) => {
  console.log(res?.secret);
});

setTimeout(() => {
  console.log("setTimeout");
}, 5000);

fs.readFile("./data.txt", "utf-8", (err, data) => {
  if (err) {
    console.error("Failed to read file:", err);
    return;
  }
  console.log("File Data:", data);
});

function multiplyfn(a, b) {
  const result = a * b;
  return result;
}

var c = multiplyfn(a, b);
console.log(c);

```
## Complete Execution Flow Example

### 1️⃣ Initial Execution (Synchronous Phase)
- Global Execution Context (GEC) is created
- Memory is allocated:
   - a, b, c → undefined
   - multiplyfn → full function stored

### 2️⃣ Line-by-Line Execution
**https.get(...)**
- JS engine detects asynchronous network I/O
- Delegates request to libuv + OS
- Callback is registered
- JS does not wait

**setTimeout(..., 5000)**
- Timer is delegated to libuv timers
- Callback registered
JS continues execution

**fs.readFile(...)**
- File read delegated to libuv thread pool
- Callback registered
- JS continues execution

**multiplyfn(a, b)**
- Normal synchronous function call
- New function execution context created
- result = 100 returned
- Function context popped

**console.log(c)**
- Prints 100

### 3️⃣ Call Stack Visualization (Synchronous Phase)
```
[Global Execution Context]                  ← Base

https.get(...)                              ← Delegated to libuv
setTimeout(...)                             ← Delegated to libuv
fs.readFile(...)                            ← Delegated to libuv

[multiplyfn(10, 10)]                        ← Pushed
[multiplyfn(10, 10)] returns 100            ← Popped

[console.log(100)]                          ← Pushed
[console.log(100)] returns                 ← Popped
```
**Output so far:**
```
100
```
### 4️⃣ Call Stack Becomes Empty
```
[Global Execution Context] complete          ← Popped
```
- 👉 At this point:
    -JavaScript execution is finished
- Event loop takes control

### 5️⃣ Asynchronous Callbacks Execution Phase
**Event Loop Rules**

- Callback executes only when call stack is empty
- Order depends on completion time, not code order

#### Likely Completion Order
- HTTPS response (network is usually fast)
- File read callback (thread pool)
- setTimeout callback (after 5 seconds)

```setTimeout is guaranteed not before 5 seconds, not exactly at 5 seconds.```

### 6️⃣ Callback Execution Visualization

```HTTPS Callback
[console.log(res?.secret)]                 ← Pushed
[console.log(res?.secret)] returns         ← Popped
```
```File System Callback
[console.log("File Data:", data)]          ← Pushed
[console.log("File Data:", data)] returns  ← Popped
```
```Timer Callback (after ≥5s)
[console.log("setTimeout")]                ← Pushed
[console.log("setTimeout")] returns        ← Popped
```

### 8️⃣ Final Output Order (Typical)
```
100
<API response secret>
File Data: <file contents>
setTimeout
```
**Note:**
- HTTPS and FS callback order may swap depending on system/network speed

### 9️⃣ Key Takeaways (Mapped to This Code)
- JS executes all synchronous code first
- Async operations are registered, not executed
- libuv handles:
   - Network I/O
   - File system
   - Timers
- Event loop runs callbacks only after stack is empty

> JavaScript finishes synchronous execution first, delegates async tasks to libuv, and later executes their callbacks via the event loop when the call stack is empty.

![Alt text for the image](./Node.js-Event-Loop-1024x424.png)







