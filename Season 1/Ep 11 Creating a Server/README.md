# 🟢 Episode 11 – Creating a Server

This episode explains **what a server really is**, how **clients and servers communicate**, how **Node.js creates servers**, and how **real-world server architectures** work at scale.

## 📑 Table of Contents

- [What Is a Server?](#what-is-a-server)
  - [Server as Hardware](#server-as-hardware)
  - [Server as Software](#server-as-software)

- [Deploying an Application on a Server](#deploying-an-application-on-a-server)

- [Cloud Servers & AWS (High-Level)](#cloud-servers--aws-high-level)
  - [AWS (Amazon Web Services)](#aws-amazon-web-services)
  - [EC2 Instance](#ec2-instance)
  - [Why Cloud Is Better Than a Laptop](#why-cloud-is-better-than-a-laptop)

- [Can You Use Your Laptop as a Server?](#can-you-use-your-laptop-as-a-server)

- [Client–Server Architecture](#clientserver-architecture)
  - [What Is a Client?](#what-is-a-client)
  - [How Communication Works](#how-communication-works)

- [Sockets & TCP/IP](#sockets--tcpip)

- [What Is a Protocol?](#what-is-a-protocol)

- [How Data Is Sent Over the Network](#how-data-is-sent-over-the-network)

- [Domain Names & DNS](#domain-names--dns)
  - [DNS (Domain Name System)](#dns-domain-name-system)
  - [Request Flow](#request-flow)

- [IP Address, Port & Path](#ip-address-port--path)

- [Real-World Architecture (Distributed Systems)](#real-world-architecture-distributed-systems)

- [Socket vs WebSocket](#socket-vs-websocket)
  - [Normal Socket (HTTP)](#normal-socket-http)
  - [WebSocket](#websocket)

- [Creating a Server in Node.js](#creating-a-server-in-nodejs)

- [Key Takeaways](#key-takeaways)

---

## What Is a Server?

A **server** can mean **two different things**, depending on context.

### Server as Hardware
- A physical machine (computer)
- Provides:
  - CPU
  - RAM
  - Storage
  - Network access
- Serves requests from other computers (clients)

### Server as Software
- A program or application
- Listens for client requests
- Processes requests
- Sends responses

> In Node.js, when we say *“create a server”*, we usually mean a **software server**.

---

## Deploying an Application on a Server

When someone says **“deploy your app on a server”**, it usually involves:

1. Hardware  
   - Physical or virtual machine

2. Operating System  
   - Linux or Windows

3. Server Software  
   - Apache / Nginx  
   - Node.js HTTP server  
   - Express server

---

## Cloud Servers & AWS (High-Level)

### AWS (Amazon Web Services)
- Provides cloud-based servers
- You don’t manage physical hardware

### EC2 Instance
- A virtual server
- AWS manages:
  - Power
  - Hardware failures
  - Network reliability

### Why Cloud Is Better Than a Laptop
- Easy scalability
- High availability
- Better uptime
- Backup power and networking

---

## Can You Use Your Laptop as a Server?

Yes, but with limitations:

- Limited CPU and RAM
- Home internet is slower and unreliable
- Often uses dynamic IP addresses
- Hard to keep running 24/7

> Fine for learning, not for production.

---

## Client–Server Architecture

### What Is a Client?
- Any device requesting data
- Examples:
  - Browser
  - Mobile app
  - API consumer

### How Communication Works
1. Client opens a socket connection
2. Client sends a request
3. Server processes the request
4. Server sends a response
5. Connection closes

---

## Sockets & TCP/IP

- Communication uses TCP/IP
- Data is sent in small chunks called packets
- TCP ensures:
  - Correct order
  - Reliable delivery

---

## What Is a Protocol?

A protocol is a set of communication rules.

Examples:
- HTTP – Web communication
- FTP – File transfer
- SMTP – Email

Web servers mainly use **HTTP**.

---

## How Data Is Sent Over the Network

- Data is broken into packets
- Packets travel independently
- Reassembled at destination

Node.js uses:
- Streams → chunk-by-chunk data handling
- Buffers → raw binary data

This is why videos sometimes buffer.

---

## Domain Names & DNS

Instead of using IP addresses directly, we use domain names.

Example: ```www.google.com```


### DNS (Domain Name System)
- Maps domain names to IP addresses
- Works like a contact list

### Request Flow
1. Browser asks DNS for IP
2. DNS returns IP
3. Browser sends request to the IP
4. Server responds

---

## IP Address, Port & Path

A single server can run multiple applications.

Example:
```
102.209.1.3:3000 → React app
102.209.1.3:3001 → Node.js API
```

- Port identifies which application handles the request
- Path helps route requests inside the application

---

## Real-World Architecture (Distributed Systems)

Large applications do not rely on a single server.

Typical setup:
- Frontend server (UI)
- Backend server (APIs, logic)
- Database server
- Media servers or CDN

This improves scalability and reliability.

---

## Socket vs WebSocket

### Normal Socket (HTTP)
- Connection opens
- Request → response
- Connection closes
- New request = new connection

### WebSocket
- Connection stays open
- Two-way communication
- Real-time data transfer

Used in chat apps, live updates, and games.

---

## Creating a Server in Node.js

```localhost:999

const http = require("node:http");
const port = 999;
const server = http.createServer(function (req, res) {
    res.end("server Created")
})
server.listen(port, () => {
    console.log("Server running on port " + port)
})
```
Now, I want to handle different responses for the URL localhost:3000/getsecretdata
```
const http = require("node:http");
const port = 999;
const server = http.createServer(function (req, res) {
    if (req.url === "/getSecretData") {
        res.end("You are a human and the the secret so chill")
    }
    res.end("server Created")
})

server.listen(port, () => {
    console.log("Server running on port " + port)
})
```
We use Express to create a server. Express is a framework built on top of Node.js that makes our lives easier.



- Node.js provides the `http` module
- Express is built on top of Node.js
- Express simplifies:
  - Routing
  - Middleware
  - Request handling


---

## Key Takeaways

- Server can mean hardware or software
- Node.js creates software servers
- Clients server communicate using websockets
- Data travels as packets
- DNS maps domains to IPs
- Ports differentiate applications
- Distributed systems improve scalability
- WebSockets enable real-time communication
- Express simplifies server creation

