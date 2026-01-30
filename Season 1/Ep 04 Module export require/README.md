# 🟢 Episode 04 - Module.export  require

## 📖 Table of Contents

- [📦 Node.js Module System](#-nodejs-module-system)
  - [🧩 Introduction to Modules](#-introduction-to-modules)
    - [What is a Module?](#what-is-a-module)
      - [Why use modules?](#why-use-modules)
  - [1. CommonJS Modules (CJS)](#1-commonjs-modules-cjs)
    - [Importing Modules (CommonJS) - require()](#importing-modules-commonjs---require)
      - [Why Just Writing a Function in Another File Doesn’t Work](#why-just-writing-a-function-in-another-file-doesnt-work)
    - [Exporting from a Module (CommonJS) - module.exports](#exporting-from-a-module-commonjs---moduleexports)
      - [What is module.exports?](#what-is-moduleexports)
      - [Exporting a Single Value](#exporting-a-single-value)
      - [Exporting Multiple Things (Variable + Function)](#exporting-multiple-things-variable--function)
      - [Alternative Export Pattern](#alternative-export-pattern)
    - [Grouping modules together / Folder as a Module](#grouping-modules-together--folder-as-a-module)
  - [2. ES Modules (ESM)](#2-es-modules-esm)
    - [Enabling ES Modules](#enabling-es-modules)
  - [CommonJS vs ES Modules](#commonjs-vs-es-modules)
    - [When to Use CommonJS vs ES Modules](#when-to-use-commonjs-vs-es-modules)
  - [Requiring JSON Files](#requiring-json-files)
  - [Built-in Modules](#built-in-modules)

---

# 📦 Node.js Module System

## 🧩 Introduction to Modules
### What is a Module?
**Definition:** In Node.js, a module is essentially a separate file containing code. Instead of writing all code in one huge file (which is hard to manage), we split it into multiple files (modules).

```bash 
Example:
app.js → one module
xyz.js → another module
```
Each file has its own private scope (variables and functions are not visible to other files unless exported).

#### Why use modules?

- Organize code
- Reuse logic
- Make big projects maintainable and readable
- Multiple developers can work on different modules simultaneously.

#### There are two main module systems in Node.js:
- CommonJS (CJS) (Default in Node.js)
- ES Modules (ESM)

---

### 1. CommonJS Modules (CJS)

### Importing Modules (CommonJS) – require()

- This is the default module system in Node.js.
- require() is a built-in Node.js function used to import modules.

```bash
const xyz = require('./xyz'); // imports code from xyz.js
```

- require ```('./xyz')```:
  - ```./``` means current folder
  - ```.js``` extension is optional → ```require('./xyz')``` is the same as ```require('./xyz.js')```


#### Why Just Writing a Function in Another File Doesn’t Work
If you write this in xyz.js:
```bash 
function calculateSum(a, b) {
  return a + b;
}
```
and in app.js you do:
```bash
calculateSum(2, 3); // ❌ This will NOT work
```
You’ll get an error: calculateSum is not defined.

Reason (Important):
- Modules are private by default.
- Functions and variables declared in one file are not automatically accessible in another file.

To share them, you must export from one module and require in another.

### Exporting from a Module (CommonJS) – module.exports
#### What is module.exports?
- In every Node.js file, there is a built-in object called module.exports.
- By default:
```bash
module.exports = {};
```
- Whatever you set on module.exports is what other files will get when they use require().

#### Exporting a Single Value
sum.js:

```bash
function calculateSum(a, b) {
  return a + b;
}
module.exports = calculateSum;
```
app.js:
```bash
const calculateSum = require('./sum');

console.log(calculateSum(2, 3)); // 5
```

#### Exporting Multiple Things (Variable + Function)

sum.js:
```bash
let x = "exports in Node";

function calculateSum(a, b) {
  return a + b;
}

module.exports = {
  x,
  calculateSum,
};
```
app.js:
```bash
const { x, calculateSum } = require('./sum');

console.log(x);                 // "exports in Node"
console.log(calculateSum(2,3)); // 5

```
#### Alternative Export Pattern
Instead of:

```module.exports = { x, calculateSum };```

You might see:

```
module.exports.x = x;
module.exports.calculateSum = calculateSum;
```
This does the same thing, just assigns properties step by step. because module.export is {} empty object and we are assigning properties to it.


### Grouping modules together / Folder as a Module

The "Folder as a Module" Pattern

For large features, you can group files into a folder (e.g., a calculate folder).

- Create folder calculate.
- Create sum.js and multiply.js inside it.
- Create an index.js inside the folder to gather exports.

Imagine this structure:

```
project/
├── app.js
└── calculate/
    ├── index.js
    ├── sum.js
    └── multiply.js
```
sum.js
```bash
function calculateSum(a, b) {
  return a + b;
}
module.exports = calculateSum;
```

multiply.js
```bash
function calculateMultiply(a, b) {
  return a * b;
}
module.exports = calculateMultiply;
```
index.js (acts as an entry point for the folder)

```bash
const calculateSum = require('./sum');
const calculateMultiply = require('./multiply');
module.exports = {
  calculateSum,
  calculateMultiply,
};
```
app.js

```
const { calculateSum, calculateMultiply } = require('./calculate');

console.log(calculateSum(2, 3));      // 5
console.log(calculateMultiply(2, 3)); // 6
```
Key idea:
- If you require a folder, Node.js automatically looks for its index.js file.

---

## 2. ES Modules (ESM)
Use import and export keywords.
Files often use .mjs extension, or you set "type": "module" in package.json.

### Enabling ES Modules
Create package.json and add:

```
{
  "type": "module"
}
```

Now .js files are treated as ES modules.

Syntax

math.js (ESM)
```
export const x = 10;

export function calculateSum(a, b) {
  return a + b;
}

// OR default export
export default function greet(name) {
  console.log(`Hello, ${name}`);
}
```
app.js (ESM)

```

import greet, { x, calculateSum } from './math.js';

console.log(x);                 // 10
console.log(calculateSum(2, 3)); // 5
greet('John');                  // Hello, John
```


---
## CommonJS vs ES Modules

| Feature           | CommonJS (CJS)                 | ES Modules (ESM)                                   |
|-------------------|--------------------------------|---------------------------------------------------|
| Import syntax     | `require()`                    | `import`                                          |
| Export syntax     | `module.exports` / `exports`   | `export`, `export default`                        |
| Loading           | Synchronous                    | Asynchronous                                      |
| Strict mode       | Non-strict by default          | Always strict mode                                |
| File extensions   | `.js`                          | `.mjs` or `.js` (with `"type": "module"`)         |
| Environment       | Node.js only                   | Node.js + Browsers                                |
| Tree-shaking      | Limited                        | Fully supported (static imports)                  |

### When to Use CommonJS vs ES Modules
#### CommonJS:
- Still extremely common in existing Node.js codebases.
- Many libraries are written in CJS.

#### ES Modules:
- More modern/standard (used in browsers).
- Better tooling, tree-shaking, async loading.
- Probably the future default in a few years.

---

## Requiring JSON Files
You can directly import JSON using require.

data.json:
```bash 
{
  "name": "John",
  "age": 25
}
```

app.js:

```bash
const data = require('./data.json');

console.log(data.name); // "John"
console.log(data.age);  // 25
```
Node.js automatically parses the JSON into a JavaScript object.

---

## Built-in Modules

Node.js has core modules built-in (like util, fs, http). You should import them using the node: prefix to be explicit.
```bash
const util = require('node:util');
const fs = require('node:fs');
const path = require('node:path');
const util = require('node:util');
```
Using the node: prefix is a recommended modern style, clarifying that the module is built-in.
