# 🟢 Episode 17. Routing and Request Handlers

## 📖 Table of Contents

- [🌐 Understanding HTTP Methods](#-understanding-http-methods)
  - [📌 Common HTTP Methods](#-common-http-methods)
    - [POST](#post)
    - [GET](#get)
    - [PATCH](#patch)
    - [PUT](#put)
    - [DELETE](#delete)
  - [🧠 CRUD Summary](#-crud-summary)
- [🧪 API Testing with Postman](#-api-testing-with-postman)
  - [🔍 What is Postman?](#-what-is-postman)
  - [✅ Why Use Postman?](#-why-use-postman)
  - [🛠 How to Use Postman](#-how-to-use-postman)
- [🚦 Routing in Express.js](#-routing-in-expressjs)
- [🔧 Advanced Routing Techniques](#-advanced-routing-techniques)
  - [`+` (One or More)](#-one-or-more)
  - [`?` (Optional Character)](#-optional-character)
  - [`*` (Wildcard)](#-wildcard)
  - [Routing with Regular Expressions](#routing-with-regular-expressions)
- [Best Practices for Routing](#best-practices-for-routing)
- [Key Takeaways](#key-takeaways)

## 🌐 Understanding HTTP Methods

HTTP methods define **what action** a client wants to perform on a resource.  
They are essential for building RESTful APIs and implementing CRUD operations.

---

### 📌 Common HTTP Methods

### **POST**
- Used to **create** a new resource
- Data is sent in the request body  
- Example:
  - Creating a new user account
  - Registering a profile

---

### **GET**
- Used to **retrieve** data from the server
- Query parameters can be used for filtering or sorting  
- Example:
  - Fetching all users
  - Retrieving a user profile

---

### **PATCH**
- Used to **partially update** a resource
- Only specific fields are updated  
- Example:
  - Updating a user’s bio or skills

---

### **PUT**
- Used to **replace an entire resource**
- Requires sending the full updated object  
- Example:
  - Updating the complete user profile

---

### **DELETE**
- Used to **remove** a resource from the server  
- Example:
  - Deleting a user account

---

### 🧠 CRUD Summary

| Operation | HTTP Method |
|----------|-------------|
| Create   | POST |
| Read     | GET |
| Update   | PUT / PATCH |
| Delete   | DELETE |

Understanding these methods is crucial for building **scalable and maintainable backends**.

---

## 🧪 API Testing with Postman

### 🔍 What is Postman?

Postman is an API testing tool that allows developers to send HTTP requests and inspect responses without building a frontend.

---

### ✅ Why Use Postman?

- Test APIs without UI
- Supports all HTTP methods
- Easy request/response visualization
- Helpful for debugging backend logic

---

### 🛠 How to Use Postman

1. Download and install Postman
2. Create a new request
3. Select the HTTP method (GET, POST, etc.)
4. Enter the API endpoint URL
5. Add headers, query parameters, or body data if required
6. Send the request and review the response

---

## 🚦 Routing in Express.js

Routing defines how a server responds to a specific endpoint and HTTP method.

Express.js supports:
- Static routes
- Dynamic routes
- Pattern-based routes
- Regular expression routes

---

## 🔧 Advanced Routing Techniques

Express allows special characters to create flexible routes.

---

### ➕ `+` (One or More)

Matches **one or more** occurrences of the previous character.

```js
app.get('/ab+c', (req, res) => {
  res.send('Route matched: /ab+c');
});
```
Matches:
```
/abc
/abbc
/abbbc
```
### ❓ ? (Optional Character)

Makes the preceding character optional.
```
app.get('/ab?c', (req, res) => {
  res.send('Route matched: /ab?c');
});
```
Matches:
```
/abc
/ac
```
### ✳️ * (Wildcard)

Matches any sequence of characters.
```
app.get('/a*cd', (req, res) => {
  res.send('Route matched: /a*cd');
});
```
Matches:
```
/acd
/abcd
/a123cd
```

### Routing with Regular Expressions

Regular expressions allow complex matching patterns.
```
app.get(/a/, (req, res) => {
  res.send('Route contains letter "a"');
});
```
Matches:
```
/abc
/123a
/data
```
## Best Practices for Routing

- Use express.Router() for modular routing
- Separate routes by feature (auth, users, connections)
- Keep business logic in controllers
- Use middleware for authentication and validation
- Keep server.js or app.js clean

## Key Takeaways:
- HTTP methods define what action happens
- Routes define where the action happens
- Postman helps test how APIs behave
- Clean routing improves scalability and readability

