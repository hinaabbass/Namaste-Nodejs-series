# 🟢 Episode 07 – Sync, Async & setTimeout(0)

## 📑 Table of Contents

- [Synchronous Code in Node.js](#-synchronous-code-in-nodejs)

- [Why fs.readFileSync() Blocks the Main Thread](#why-fsreadfilesync-blocks-the-main-thread)

- [Why Blocking Code Is Dangerous](#why-blocking-code-is-dangerous)

- [Introducing the crypto Module](#introducing-the-crypto-module)

- [Blocking Code with crypto](#blocking-code-with-crypto)

- [Why Sync at the End Is a Red Flag](#why-sync-at-the-end-is-a-red-flag-)

- [Asynchronous Alternative (pbkdf2)](#asynchronous-alternative-pbkdf2)

-  [setTimeout(0) Concept](#settimeout0-concept)

- [Why setTimeout(0) Runs Late](#why-settimeout0-runs-late)

- [Example Interview Question](#example-interview-question)

- [“Trust Issues” with setTimeout(0)](#trust-issues-with-settimeout0)

- [Final Takeaways](#final-takeaways-very-important)

---

## 📌 Synchronous Code in Node.js

### Example
```js
fs.readFileSync("./file.txt", "utf8");
```
**What happens here?**
- This function reads a file synchronously
- It blocks the main thread
- JavaScript cannot do anything else until the file is fully read

## Why fs.readFileSync() Blocks the Main Thread
- The V8 engine executes JavaScript
- Synchronous functions:
	- Are executed directly by V8
	- Cannot be offloaded to libuv
- Result:
	- Event loop is blocked
	- Application becomes unresponsive

## Why Blocking Code Is Dangerous

- While Node.js allows synchronous APIs, they are:
	- Meant mainly for:
		- Startup scripts
		- CLI tools
		- One-time operations

- In servers or APIs:
	- Blocking = poor performance
	- Users must wait

**✅ Best Practice**
- Avoid synchronous methods in production
- Prefer asynchronous alternatives
```
fs.readFile("./file.txt", "utf8", (err, data) => {
  console.log(data);
});
```

## Introducing the crypto Module
- crypto is a core Node.js module
- Used for:
	- Password hashing
	- Key generation
	- Encryption
- Imported as:
```
const crypto = require("crypto");
// or
const crypto = require("node:crypto");
```

## Blocking Code with crypto
```pbkdf2Sync``` **(Synchronous)**
```
crypto.pbkdf2Sync(password, salt, iterations, keylen, "sha512");

```
- Runs synchronously
- Blocks the event loop

## Why Sync at the End Is a Red Flag 🚨

- Any function ending with Sync:
	- Blocks the main thread
	- Stops event loop execution
- Examples:
	- fs.readFileSync
	- pbkdf2Sync
**👉 Rule of thumb:**
- If it ends with Sync, think twice.

## Asynchronous Alternative (pbkdf2)
```
crypto.pbkdf2(password, salt, iterations, keylen, "sha512", (err, key) => {
  console.log("Key generated");
});
```
**What changes?**
- Task is delegated to libuv thread pool
- Event loop stays free
- Other code continues executing

##  setTimeout(0) Concept:
```
setTimeout(() => {
  console.log("Hello");
}, 0);
```
### Common misconception ❌
> “It runs immediately”

### Reality ✅
- setTimeout is asynchronous
- Callback is sent to libuv
- Even with 0ms delay:
    - It runs only after call stack is empty

Why setTimeout(0) Runs Late
**Execution Flow**

- Synchronous code runs first
- ```setTimeout``` callback goes to callback queue
- Event loop waits
- Callback executes only when stack is empty

## Example Interview Question
```
console.log("Start");

setTimeout(() => {
  console.log("Timeout");
}, 0);

console.log("End");
```
Output
```
Start
End
Timeout
```
**Why?**
- setTimeout(0) ≠ immediate execution
- It obeys event loop rules

## “Trust Issues” with setTimeout(0)
- 0ms does not mean exact timing
- Actual execution depends on:
	- Call stack being empty
	- System load
	- Other queued callbacks
- 👉 setTimeout(0) = “run later, not now”

## Final Takeaways (Very Important)
- JavaScript:
	- Single-threaded
- Synchronous code:
	- Blocks event loop
	- Should be avoided in production
- Sync methods:
	- Execute on main thread
	- Do not use libuv
- Asynchronous methods:
	- Use libuv
	- Keep app responsive
- setTimeout(0):
	- Always runs after synchronous code
	- Depends on event loop

> Synchronous methods block the event loop, asynchronous methods delegate work to libuv, and setTimeout(0) runs only after the call stack is empty.