# 🟢 Episode 19. Database, Schema & Models  Mongoose

## 📖 Table of Contents

- [MongoDB with Mongoose](#mongodb-with-mongoose)
- [Connecting to MongoDB Using Mongoose](#connecting-to-mongodb-using-mongoose)
  - [Step 1: Install Mongoose](#step-1-install-mongoose)
  - [Step 2: Basic Database Connection (Without-env)](#step-2-basic-database-connection-without-env)
- [Understanding Mongoose Schemas](#understanding-mongoose-schemas)
  - [What is a Schema?](#what-is-a-schema)
  - [Saving Data Using a Mongoose Model](#saving-data-using-a-mongoose-model)
  - [What .save() Does](#what-save-does)
- [Automatic Fields Added by MongoDB & Mongoose](#automatic-fields-added-by-mongodb--mongoose)
  - [_id Field](#_id-field)
  - [__v Field (Mongoose Only)](#v-field-mongoose-only)
  - [Why __v Matters](#why-v-matters)
- [Key Takeways](#key-takeways)

## MongoDB with Mongoose

This explains how to connect MongoDB with Node.js using Mongoose, define schemas, save documents, and understand the automatic fields MongoDB adds.
Examples are kept simple and beginner-friendly.

⚠️ Important: Some examples use a MongoDB connection string directly in code. This is okay for learning or testing but not recommended for production.

## Connecting to MongoDB Using Mongoose
Mongoose is an ODM (Object Data Modeling) library that helps you interact with MongoDB using schemas and models.

### Step 1: Install Mongoose
```
npm install mongoose

```
### Step 2: Basic Database Connection (Without .env)
database.js 
```database.js 
const mongoose = require("mongoose");
// Connect to MongoDB
const connectDB = async () => {
  await mongoose.connect(
    'mongodb+srv://<username>:<password>@cluster0.mongodb.net/myDatabase?retryWrites=true&w=majority',
		 // MongoDB connection string
  );
};

module.exports = connectDB;

```
app.js
```app.js
const connectDB = require("./config/database");
const express = require("express");
const port = 7777;

// Start server only after DB connection
connectDB()
  .then(() => {
    console.log("Database connected successfully");
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  })
  .catch((err) => console.error("Database connection error:", err));

```

**✅ Why start the server after connecting?**

If the database is not connected and the server starts anyway, your app may crash when it tries to access the database.

**⚠️ Security Note**

Hard-coding credentials exposes sensitive data.
For production, always use environment variables (.env).

## Understanding Mongoose Schemas
### What is a Schema?

A schema defines how data looks inside a MongoDB collection.

With schemas, you can:

- Define field names and data types
- Add validations (required, min/max, enums)
- Set default values
- Enforce data consistency

MongoDB itself is schema-less, but Mongoose adds structure on top of it.

Example: User Schema
```
const mongoose = require('mongoose');

// Define schema
const userSchema = new mongoose.Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  age: { type: Number, min: 0 },
  gender: { type: String, enum: ['Male', 'Female', 'Other'] }
});

// Create model
const User = mongoose.model('User', userSchema);

module.exports = User;
```
**Key Points**

- `required: true` → field must be provided
- `unique: true` → no duplicate values allowed
- `enum` → restricts values to a fixed list
- Model name `(User)` becomes the collection name (users)

### Saving Data Using a Mongoose Model

Once a schema and model are created, you can store data in MongoDB.

Example: Insert a User Document

```
const mongoose = require('mongoose');
const User = require('./models/User');

// Connect to MongoDB
mongoose
  .connect('mongodb+srv://<username>:<password>@cluster0.mongodb.net/myDatabase', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(async () => {
    console.log('Connected to MongoDB');

    // Create a new user
    const user = new User({
      firstname: 'Hina',
      lastname: 'Abbas',
      email: 'hina@example.com',
      age: 22,
      gender: 'female'
    });

    // Save user to database
    const savedUser = await user.save();
    console.log('Document inserted:', savedUser);
  })
  .catch((error) => {
    console.error('Error:', error);
  })
  .finally(() => {
    mongoose.disconnect();
  });
```
### What .save() Does
- Validates data using the schema
- Inserts the document into MongoDB
- Returns the saved document

## Automatic Fields Added by MongoDB & Mongoose

When a document is saved, MongoDB and Mongoose automatically add some fields.

### `_id` Field
**What is `_id`?**
- A unique identifier for every document
- Works like a primary key

**Characteristics**
- Type: `ObjectId`
- Automatically generated if not provided
- Must be unique

Example
```
{
  "_id": "60d5b6f0d89a3c52a8d7c331",
  "name": "Hina"
}
```
### `__v` Field (Mongoose Only)
**What is `__v`?**
- Used by Mongoose for document versioning
- Helps handle concurrent updates

**Characteristics**
- Type: `Number`
- Starts at `0`
- Increments every time the document is updated

Example
```
{
  "_id": "60d5b6f0d89a3c52a8d7c331",
  "name": "Hina",
  "__v": 0
}
```
### Why __v Matters

If multiple updates happen at the same time, Mongoose uses __v to prevent accidental overwrites.

## Key Takeways
- Mongoose simplifies MongoDB interactions
- Always connect to the database before starting the server
- Schemas provide structure and validation
- Models are used to create and save documents
- _id uniquely identifies each document
- __v helps manage document versions