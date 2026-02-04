# 🟢 Episode 20. Diving into the APIs

## 📖 Table of Contents
- [1️⃣ JavaScript Object vs JSON Object](#1️⃣-javascript-object-vs-json-object)
  - [Key Differences](#-key-differences)
  - [Mental Model](#-mental-model)
- [2️⃣ Receiving Data Through POST API](#2️⃣-receiving-data-through-post-api)
  - [Overview](#overview)
  - [Request Flow](#request-flow)
  - [Example: Signup API](#-example-signup-api)
- [3️⃣ Retrieving Users from the Database (GET API)](#3️⃣-retrieving-users-from-the-database-get-api)
  - [Overview](#overview-1)
  - [Example: Feed API](#example-feed-api)
- [4️⃣ Handling Duplicate Documents with findOne()](#4️⃣-handling-duplicate-documents-with-findone)
  - [Overview](#overview-2)
  - [Important Notes](#important-notes)
  - [Example: Find User by Email](#example-find-user-by-email)
- [5️⃣ Delete API – Removing Documents](#5️⃣-delete-api--removing-documents)
  - [Overview](#overview-3)
  - [Example: Delete User](#example-delete-user)
- [6️⃣ PATCH vs PUT API](#6️⃣-patch-vs-put-api)
- [7️⃣ Updating Data with PATCH API](#7️⃣-updating-data-with-patch-api)
  - [Overview](#overview-4)
  - [Example: Update User](#example-update-user)
- [Summary](#summary)


## 1️⃣ JavaScript Object vs JSON Object

Although JavaScript Objects and JSON look similar, they serve very different purposes.

### 🔍 Key Differences

| Feature | JavaScript Object | JSON (JavaScript Object Notation) |
|------|------------------|----------------------------------|
| Definition | Native data structure in JavaScript | Text-based data format |
| Purpose | Used for logic & manipulation in JS | Used for data exchange |
| Data Types | All JS types (string, number, boolean, array, object, function, etc.) | Limited to string, number, boolean, array, object, `null` |
| Property Names | Quotes not required | Must be in double quotes |
| Functions | Allowed | ❌ Not allowed |
| Comments | Allowed | ❌ Not allowed |
| Parsing | Not needed | Needs `JSON.parse()` |
| Stringification | Needs `JSON.stringify()` | Already a string |

### 🧠 Mental Model

- **JavaScript Object** → used inside your application
- **JSON** → used between client and server

---

## 2️⃣ Receiving Data Through POST API

### Overview

POST APIs are used to receive data from the client.  
In the DevTinder app, this data is typically user information submitted during signup.

### Request Flow

1. Client sends JSON data
2. Express parses data using `express.json()`
3. Data is validated and sanitized
4. Data is stored in the database
5. Response is sent back to the client

### 📌 Example: Signup API

```js
app.use(express.json());

app.post("/signup", async (req, res) => {
  const data = req.body;
  const user = new User(data);

  try {
    await user.save();
    res.send("User added successfully");
  } catch (err) {
    res.status(400).send("Error in saving the user: " + err.message);
  }
});
```

## 3️⃣ Retrieving Users from the Database (GET API)
### Overview

GET APIs fetch data from the database and return it to the client.

### Example: Feed API
```js
app.get("/feed", async (req, res) => {
  try {
    const users = await User.find({});
    if (users.length === 0) {
      res.send("No user found");
    } else {
      res.send(users);
    }
  } catch (err) {
    res.status(400).send("Something went wrong");
  }
});
```

## 4️⃣ Handling Duplicate Documents with findOne()
### Overview

findOne() returns the first matching document found in the collection.

### Important Notes

- MongoDB does not guarantee order unless indexed
- Duplicate documents may return unexpected results
- Use unique indexes to prevent duplicates

### Example: Find User by Email
```js
app.get("/user", async (req, res) => {
  const userEmail = req.body.emailId;

  try {
    const user = await User.findOne({ emailId: userEmail });

    if (!user) {
      res.status(400).send("User not found");
    } else {
      res.send(user);
    }
  } catch (err) {
    res.status(400).send("Something went wrong");
  }
});
```

## 5️⃣ Delete API – Removing Documents
### Overview

DELETE APIs remove documents from the database.

### Example: Delete User
```js
app.delete("/user", async (req, res) => {
  const userId = req.body.userId;

  try {
    await User.findByIdAndDelete(userId);
    res.send("User deleted Successfully");
  } catch (err) {
    res.status(400).send("Something went wrong");
  }
});
```
## 6️⃣ PATCH vs PUT API
| Feature          | PATCH                   | PUT                   |
| ---------------- | ----------------------- | --------------------- |
| Purpose          | Partial update          | Full replacement      |
| Required Data    | Only fields to update   | Entire document       |
| Typical Use Case | Profile updates         | Replace full resource |
| Database Impact  | Updates selected fields | Rewrites document     |


## 7️⃣ Updating Data with PATCH API
### Overview

PATCH updates specific fields without affecting the rest of the document.

### Example: Update User
```js
app.patch("/user", async (req, res) => {
  const userId = req.body.userId;
  const data = req.body;

  try {
    await User.findByIdAndUpdate(
      { _id: userId },
      data,
      { returnDocument: "before" }
    );
    res.send("User updated successfully");
  } catch (err) {
    res.status(400).send("Something went wrong");
  }
});
```
## Summary
- JavaScript Objects are used for internal logic
- JSON is used for data transfer
- POST creates data
- GET retrieves data
- PATCH updates partial data
- PUT replaces entire data
- DELETE removes data
- Validation + proper API design ensures secure applications
