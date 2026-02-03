# 🟢 Episode 18. Middlewares and Error Handlers in Express

This section covers **route handlers**, **middlewares**, **error handling**, and important Express concepts like `next()`, HTTP status codes, and the difference between `app.use()` and `app.all()`.

## 📖 Table of Contents

- [🚏 Route Handlers in Express](#-route-handlers-in-express)
  - [📖 Overview](#-overview)
  - [🔁 Multiple Route Handlers](#-multiple-route-handlers)
  - [Understanding next() in Express](#understanding-next-in-express)
  - [Skipping Route Handlers using next('route')](#skipping-route-handlers-using-nextroute)
- [Middlewares in Express.js](#middlewares-in-expressjs)
  - [📖 What is Middleware?](#-what-is-middleware)
  - [Why Do We Need Middleware?](#why-do-we-need-middleware)
  - [How Express Executes Middleware](#how-express-executes-middleware)
  - [Middleware Flow Example](#middleware-flow-example)
- [HTTP Status Codes](#http-status-codes)
  - [Common HTTP Status Codes](#common-http-status-codes)
- [Using Status Codes in Express](#using-status-codes-in-express)
- [Difference Between app.use() and app.all()](#difference-between-appuse-and-appall)
- [Error-Handling Middleware in Express](#error-handling-middleware-in-express)
- [Key Takeaways](#key-takeaways)


## 🚏 Route Handlers in Express

### 📖 Overview

In Express, **route handlers** are functions that execute when a specific route and HTTP method are matched.  
A single route can have **multiple handlers**, allowing better control and modular logic.

---

### 🔁 Multiple Route Handlers

Express allows defining more than one handler for a route.  
Each handler can perform a task and pass control to the next handler using `next()`.

```js
app.get('/example',
  (req, res, next) => {
    console.log('First handler');
    next(); // Pass control to next handler
  },
  (req, res) => {
    res.send('Second handler');
  }
);
```

**Flow Explanation:**

- First handler logs a message
- next() moves execution to the next handler
- Second handler sends the response

### Understanding next() in Express
#### 📌 What is next?
- next is a function provided by Express
- It passes control to the next middleware or route handler
- If next() is not called, the request will hang

#### 🛠 Basic Usage of next()
```
app.get('/example',
  (req, res, next) => {
    console.log('First handler');
    next();
  },
  (req, res) => {
    res.send('Second handler');
  }
);
```
#### Skipping Route Handlers using next('route')

Using next('route'), Express skips the remaining handlers of the current route and moves to the next matching route.

```
app.get('/skip',
  (req, res, next) => {
    console.log('This handler will be skipped');
    next('route');
  },
  (req, res) => {
    res.send('This will not execute');
  }
);

// Next matching route
app.get('/skip', (req, res) => {
  res.send('Skipped to this route handler');
});
```
#### Use Case:

- Conditional logic
- Authorization checks
- Feature toggles


## Middlewares in Express.js
### 📖 What is Middleware?

**Middleware is a function that has access to:**
- req (request)
- res (response)
- next (next middleware)

**Middleware can:**
- Execute code
- Modify request or response objects
- End the request-response cycle
- Pass control using next()

### Why Do We Need Middleware?
- Modularity – Separate logic (auth, logging, validation)
- Pre-processing – Validate or modify requests
- Authentication & Authorization
- Error Handling
- Logging & Monitoring

How Express Executes Middleware

### Express builds a middleware stack
- Middleware runs in the order defined
- Each middleware must call next() to continue
- If next() is not called, the request stops

### Middleware Flow Example
```
const express = require('express');
const app = express();

// Middleware 1: Logger
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// Middleware 2: Admin Authorization
app.use('/admin', (req, res, next) => {
  const token = "999";
  const isAuthorizedAdmin = token === "999";

  if (!isAuthorizedAdmin) {
    res.status(401).send("Unauthorized Admin");
  } else {
    next();
  }
});

app.get('/admin/getAllData', (req, res) => {
  res.send("All data generated");
});

app.get('/admin/deleteData', (req, res) => {
  res.send("Data deleted");
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
```

## HTTP Status Codes

HTTP status codes indicate the result of a client’s request.

**📂 Status Code Categories**

| Range | Meaning       |
| ----- | ------------- |
| 1xx   | Informational |
| 2xx   | Success       |
| 3xx   | Redirection   |
| 4xx   | Client Error  |
| 5xx   | Server Error  |

## Common HTTP Status Codes

### 2xx Success
- 200 OK – Request successful
- 201 Created – Resource created
- 204 No Content – Success, no response body

### 3xx Redirection
- 301 Moved Permanently
- 302 Found
- 304 Not Modified

### 4xx Client Errors
- 400 Bad Request
- 401 Unauthorized
- 403 Forbidden
- 404 Not Found

### 5xx Server Errors
- 500 Internal Server Error
- 502 Bad Gateway
- 503 Service Unavailable

## Using Status Codes in Express
```
app.get('/success', (req, res) => {
  res.status(200).send('Success');
});

app.get('/error', (req, res) => {
  res.status(404).send('Not Found');
});
```

## Difference Between app.use() and app.all()

| Feature       | app.use()        | app.all()                 |
| ------------- | ---------------- | ------------------------- |
| Purpose       | Apply middleware | Handle all HTTP methods   |
| Path Required | Optional         | Required                  |
| HTTP Methods  | All              | All                       |
| Common Use    | Middleware logic | One route for all methods |

### app.use() Example

```
app.use((req, res, next) => {
  console.log('Request received');
  next();
});

app.use('/user', (req, res, next) => {
  console.log('User route accessed');
  next();
});
```
### app.all() Example
```
app.all('/about', (req, res) => {
  res.send('Handles all HTTP methods');
});
```
## Error-Handling Middleware in Express

### 📖 What is Error-Handling Middleware?

Error-handling middleware catches errors and sends a proper response instead of crashing the app.

It has four parameters:
```
(err, req, res, next)
```

### Example Error Handler
```
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});
```

### Best Practice:

- Place error-handling middleware at the end
- Always return proper status codes

## Key Takeaways

- Route handlers can be chained
- next() controls request flow
- Middleware improves modularity
- Status codes communicate response meaning
- Error-handling middleware prevents crashes
- Clean middleware design = scalable backend