# 🟢 Episode 12 – Databases: SQL & NoSQL

This episode explains **what a database is**, the **different types of databases**, and provides a **deep comparison between Relational (SQL) and NoSQL databases**, with real-world examples and history.

## 📑 Table of Contents

- [What Is a Database?](#what-is-a-database)

- [Types of Databases](#types-of-databases)

- [Relational Databases (RDBMS)](#relational-databases-rdbms)

- [NoSQL Databases](#nosql-databases)

- [In-Memory Databases](#in-memory-databases)

- [Distributed SQL Databases](#distributed-sql-databases)

- [Time-Series Databases](#time-series-databases)

- [Object-Oriented Databases](#object-oriented-databases)

- [Graph Databases](#graph-databases)

- [Hierarchical Databases](#hierarchical-databases)

- [Network Databases](#network-databases)

- [Cloud Databases](#cloud-databases)

- [Most Commonly Used Databases](#most-commonly-used-databases)

- [RDBMS and Codd’s Rules](#rdbms-and-codds-rules)

- [The Story of MySQL](#the-story-of-mysql)

- [The Story of PostgreSQL](#the-story-of-postgresql)

- [NoSQL and MongoDB](#nosql-and-mongodb)

- [Types of NoSQL Databases](#types-of-nosql-databases)

- [RDBMS vs NoSQL (Document Databases)](#rdbms-vs-nosql-document-databases)

- [Key Takeaways](#key-takeaways)

---

## What Is a Database?

A **database** is an organized collection of data that allows:
- Efficient storage
- Easy retrieval
- Updating and management of data

Databases are used in almost every application:
- Web apps
- Mobile apps
- Banking systems
- Social networks

---

## Types of Databases

There are many types of databases, each designed for specific use cases.

---

## Relational Databases (RDBMS)

**Examples:** MySQL, PostgreSQL

- Data is stored in **tables**
- Tables have:
  - Rows (records)
  - Columns (fields)
- Schema is **predefined and strict**
- Relationships are created using **foreign keys**
- Supports **ACID properties**:
  - Atomicity
  - Consistency
  - Isolation
  - Durability

**Best suited for:**
- Complex queries
- Transactions
- Banking and financial systems
- Strong data integrity requirements

---

## NoSQL Databases

**Example:** MongoDB

- Data is stored in **documents**
- Schema is **flexible**
- Designed for:
  - Scalability
  - High performance
  - Large volumes of data
- Works very well with JavaScript and JSON

**Best suited for:**
- Modern web applications
- Rapidly changing data models
- Large-scale distributed systems

---

## In-Memory Databases

**Example:** Redis

- Data is stored in **RAM**
- Extremely fast
- Supports data structures:
  - Strings
  - Lists
  - Hashes
- Commonly used for:
  - Caching
  - Real-time analytics
  - Session storage
  - Message queues

---

## Distributed SQL Databases

**Example:** CockroachDB

- SQL-based
- Horizontally scalable
- Strong consistency
- ACID-compliant
- Designed for:
  - High availability
  - Fault tolerance
  - Geo-distributed systems

---

## Time-Series Databases

**Example:** InfluxDB

- Optimized for **time-stamped data**
- Handles:
  - High write loads
  - Fast time-based queries
- Used in:
  - Monitoring systems
  - IoT applications
  - Metrics and logs

---

## Object-Oriented Databases

**Example:** db4o

- Stores data as **objects**
- Matches object-oriented programming models
- Reduces object–relational mismatch
- Less commonly used today

---

## Graph Databases

**Example:** Neo4j

- Stores data as:
  - Nodes
  - Relationships
  - Properties
- Excellent for complex relationships
- Used in:
  - Social networks
  - Recommendation engines
  - Fraud detection

---

## Hierarchical Databases

**Example:** IBM IMS

- Tree-like structure
- Parent–child relationships
- Mostly used in legacy systems
- Known for:
  - High performance
  - Reliability in large systems

---

## Network Databases

**Example:** IDMS

- Uses graph-based relationships
- More flexible than hierarchical DBs
- Mostly used in legacy environments

---

## Cloud Databases

**Example:** Amazon RDS

- Managed database service
- Supports:
  - MySQL
  - PostgreSQL
  - Oracle
- Handles:
  - Backups
  - Patching
  - Scaling
- Reduces operational overhead

---

## Most Commonly Used Databases

1. Relational Databases (RDBMS)
2. NoSQL Databases

---

## RDBMS and Codd’s Rules

- Introduced by **E. F. Codd**
- Known as **Codd’s 12 Rules** (actually 13, numbered 0–12)
- Define what qualifies as a **true relational database**
- Emphasize:
  - Table-based structure
  - Relationships
  - Data integrity

---

## The Story of MySQL

- Created by **Michael Widenius**
- Named after his daughter **My**
- Other related databases:
  - MaxDB (second daughter)
  - MariaDB (third daughter)
- Acquired by:
  - Sun Microsystems
  - Later Oracle
- MariaDB was created as a fork after Oracle acquired MySQL

---

## The Story of PostgreSQL

- Created by **Michael Stonebraker**
- Originated from the **Ingres** project
- Later evolved into **Post Ingres**
- Became PostgreSQL due to its use of **SQL**

---

## NoSQL and MongoDB

- MongoDB was created in **2009**
- Developed by a company called **10gen**
- Name comes from **“humongous”**
- Later renamed to **MongoDB Inc.**
- Works extremely well with:
  - JSON
  - JavaScript
- Known for boosting developer productivity

---

## Types of NoSQL Databases

1. Document Databases
2. Key-Value Databases
3. Graph Databases
4. Wide-Column Databases
5. Multi-Model Databases

---

## RDBMS vs NoSQL (Document Databases)

### Structure
- **RDBMS:** Tables (rows and columns)
- **NoSQL:** Collections of documents (JSON-like)

### Schema
- **RDBMS:** Fixed schema
- **NoSQL:** Flexible schema

### Relationships
- **RDBMS:** Foreign keys and joins
- **NoSQL:** Embedded documents or references

### Normalization
- **RDBMS:** Highly normalized
- **NoSQL:** Denormalized

### Query Language
- **RDBMS:** SQL
- **NoSQL:** Database-specific queries

### Scaling
- **RDBMS:** Vertical scaling (harder to scale horizontally)
- **NoSQL:** Designed for horizontal scaling

### Use Cases
- **RDBMS:** Banking, transactions, financial systems
- **NoSQL:** CMS, analytics, real-time systems

---

## Key Takeaways

- Databases store and manage application data
- RDBMS provides strong consistency and structure
- NoSQL provides flexibility and scalability
- MongoDB works naturally with JavaScript
- Redis is ideal for fast, in-memory operations
- Database choice depends on:
  - Data structure
  - Scale
  - Consistency needs
