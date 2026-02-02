# 🟢 Episode 13: Creating a database  mongodb

This README explains **how to set up MongoDB using MongoDB Atlas**, connect it with **MongoDB Compass**, and perform **CRUD operations using Node.js**.  

---

## 📖 Table of Contents

1. [Introduction](#1-introduction)
2. [What is MongoDB Atlas?](#2-what-is-mongodb-atlas)
3. [Creating a MongoDB Atlas Cluster](#3-creating-a-mongodb-atlas-cluster)
   - [Create an Account](#step-1-create-an-account)
   - [Create a Free Cluster](#step-2-create-a-free-cluster)
4. [Creating a Database User](#4-creating-a-database-user)
5. [Configuring Network Access (IP Whitelisting)](#5-configuring-network-access-ip-whitelisting)
6. [Getting the Connection String](#6-getting-the-connection-string)
7. [Connecting with MongoDB Compass](#connecting-with-mongodb-compass)
   - [Install MongoDB Compass](#install-mongodb-compass)
   - [Connect to Atlas](#connect-to-atlas)
8. [Creating and Managing Databases](#creating-and-managing-databases)
   - [Create a Database](#create-a-database)
   - [Manage Collections](#manage-collections)
9. [Connecting MongoDB with Node.js](#connecting-mongodb-with-nodejs)
10. [CRUD Operations](#crud-operations)
11. [Troubleshooting](#troubleshooting)
    - [Common Issues](#common-issues)
    - [MongoDB Compass Fix](#mongodb-compass-fix)
12. [Key Takeaways](#key-takeaways)

---

## 1. Introduction

MongoDB is a **NoSQL database** that stores data in a flexible JSON-like format.  
we will:
- Create a cloud database
- Connect visually using MongoDB Compass
- Connect programmatically using Node.js
- Perform CRUD operations

---

## 2. What is MongoDB Atlas?

MongoDB Atlas is a **cloud-based MongoDB service**.  
It allows you to create and manage MongoDB databases without installing MongoDB locally.

---

## 3. Creating a MongoDB Atlas Cluster

### Step 1: Create an Account
1. Visit the MongoDB Atlas website
2. Sign up or log in
3. Open the **Atlas Dashboard**

### Step 2: Create a Free Cluster
1. Click **Create a New Cluster**
2. Choose **M0 (Free Tier / Sandbox)**
3. Select:
   - Cloud Provider (AWS / GCP / Azure)
   - Region (closest to your location)
4. Click **Create Cluster**
5. Wait until the cluster becomes **Active**

---

## 4. Creating a Database User

1. Go to **Database Access**
2. Click **Add New Database User**
3. Enter:
   - Username
   - Password
4. Role: **Read and write to any database**
5. Click **Add User**

⚠️ Save these credentials securely.

---

## 5. Configuring Network Access (IP Whitelisting)

1. Go to **Network Access**
2. Click **Add IP Address**
3. Choose one:
   - Allow access from anywhere (for learning)
   - Add your current IP address (recommended)
4. Click **Confirm**

---

## 6. Getting the Connection String

1. Go to **Clusters**
2. Click **Connect**
3. Choose **Connect your application**
4. Copy the connection string:

```text
mongodb+srv://<username>:<password>@cluster0.mongodb.net/<dbname>?retryWrites=true&w=majority
```

***Replace:***

```<username>``` → database username

```<password> ``` → database password

```<dbname>``` → database name

💡 Best practice: store this string in an environment variable.

## Connecting with MongoDB Compass
### Install MongoDB Compass
- Download MongoDB Compass
- Install and open it
### Connect to Atlas
- Paste the connection string
- Replace <password> with your password
- Click Connect
- If successful, your databases will appear in Compass.

## Creating and Managing Databases
### Create a Database
- Click Create Database
- Enter:
  - Database Name
  - Collection Name
  - Click Create Database

### Manage Collections
- You can:
  - Insert documents (JSON format)
  - Update documents
  - Delete documents
  - Run queries

## Connecting MongoDB with Node.js

Install MongoDB library 

```
npm install mongodb
```
Database Connection Example
```
const { MongoClient } = require("mongodb");

const url = "mongodb://localhost:27017"; // Local MongoDB
// OR Atlas connection string
// const url = process.env.MONGO_URI;

const client = new MongoClient(url);
const dbName = "Namaste-Nodejs";

async function main() {
  await client.connect();
  console.log("Connected successfully to MongoDB");

  const db = client.db(dbName);
  const collection = db.collection("User");

  return "done";
}

main()
  .then(console.log)
  .catch(console.error)
  .finally(() => client.close());
```

## CRUD Operations
- CRUD stands for Create, Read, Update, Delete.

Create (Insert Data)
```
const data = {
  firstname: "Hina",
  lastname: "Abbas",
  city: "Islamabad",
  phoneNumber: "12345678",
};

const insertData = await collection.insertMany([data]);
console.log("Data inserted:", insertData);
```

Read (Fetch Data)
```
const findData = await collection.find({}).toArray();
console.log("All data:", findData);
```

Update (Modify Data)
```
const { ObjectId } = require("mongodb");

const updateData = await collection.updateOne(
  { _id: new ObjectId("67066d6a3be8f41630d5dae4") },
  { $set: { firstname: "Mint" } }
);

console.log("Updated document:", updateData);
```

Delete (Remove Data)
```
const deleteData = await collection.deleteOne({
  _id: new ObjectId("670668562c6bd11e25050c13"),
});

console.log("Deleted data:", deleteData);
```

## Troubleshooting
### Common Issues
- IP not whitelisted
- Wrong username or password
- Cluster not active
- Internet connectivity issues

### MongoDB Compass Fix
- Restart Compass
- Reset settings: Settings → Reset Compass


## Key Takeaways

- MongoDB Atlas lets you create and manage a cloud database without local installation, making it ideal for beginners.

- A complete MongoDB setup involves three core steps: creating a cluster, configuring security (users + IP access), and obtaining a connection string.

- MongoDB Compass provides a visual way to explore databases, collections, and documents, which is great for learning and debugging.

- Node.js connects to MongoDB using the official mongodb driver, enabling programmatic access to your data.

- CRUD operations (Create, Read, Update, Delete) form the foundation of all database interactions and were demonstrated using real Node.js examples.

- Storing sensitive data like the connection string in environment variables is a best practice for security.

- Most connection issues come from IP whitelisting, incorrect credentials, or inactive clusters, and can be fixed quickly by checking Atlas settings.