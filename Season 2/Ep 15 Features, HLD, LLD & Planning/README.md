# 🟢 Episode 15. Features, HLD, LLD & Planning

## 📖 Table of Contents
## Table of Contents

- [DevTinder Project Development](#devtinder-project-development)
- [Development Approach](#development-approach)
- [1. Requirements Gathering](#1-requirements-gathering)
  - [Project Overview](#project-overview)
  - [Core Features](#core-features)
    - [User Account Management](#user-account-management)
    - [Developer Exploration](#developer-exploration)
    - [Connections Management](#connections-management)
    - [Additional Features](#additional-features)
- [2. High-Level Design (HLD)](#2-high-level-design-hld)
  - [Architecture Planning](#architecture-planning)
  - [Technology Stack](#technology-stack)
  - [Team Structure](#team-structure)
  - [HLD Note](#hld-note)
- [3. Low-Level Design (LLD)](#3-low-level-design-lld)
  - [Database Design](#database-design)
    - [User Collection](#user-collection)
    - [ConnectionRequest Collection](#connectionrequest-collection)
  - [API Design](#api-design)
    - [REST API Basics](#rest-api-basics)
    - [HTTP Methods and Usage](#http-methods-and-usage)
    - [PUT vs PATCH](#put-vs-patch)
  - [Required REST APIs](#required-rest-apis)
    - [User Management APIs](#user-management-apis)
    - [Connection Management APIs](#connection-management-apis)
- [4. Next Steps](#4-next-steps)
- [Key Takeaways](#key-takeaways)


# DevTinder Project Development  
## HLD & LLD Overview

## Development Approach

DevTinder is developed using a **structured industry-style development cycle**, similar to real-world software projects.  
The process includes:
- Requirements Gathering
- High-Level Design (HLD)
- Low-Level Design (LLD)
- Implementation and Testing


## 1. Requirements Gathering

### Project Overview
- **Project Name:** DevTinder
- **Concept:**  
  A developer-focused platform inspired by Tinder, designed to help developers connect, network, and collaborate.


### Core Features

#### User Account Management
- User signup and login
- Secure authentication
- Create and update user profile

#### Developer Exploration
- Feed page to browse developer profiles
- View basic profile information
- Send connection requests

#### Connections Management
- View received and sent requests
- Accept or reject requests
- View matched connections (mutual interest)

#### Additional Features
- Feature set can expand based on future requirements
- Scalability and extensibility considered from the start

## 2. High-Level Design (HLD)

### Architecture Planning
- **Architecture Style:** Microservices
- Frontend and backend are developed as **separate services**
- Clear separation of concerns improves scalability and maintenance


### Technology Stack

| Layer | Technology |
|-----|-----------|
| Frontend | React.js |
| Backend | Node.js |
| Database | MongoDB |


### Team Structure
- Frontend Developers
- Backend Developers (SDE1, SDE2)
- Database & API developers
- DevOps (as the system grows)



### HLD Note
- Strong planning at this stage reduces complexity later.
- A clear HLD makes development faster and more predictable.



## 3. Low-Level Design (LLD)

### Database Design

#### User Collection
Stores developer profile and authentication data.

**Fields:**
- firstName
- lastName
- email
- password
- age
- gender
- profile details (skills, bio, etc.)


#### ConnectionRequest Collection
Handles all connection-related interactions.

**Fields:**
- fromUserId (sender)
- toUserId (receiver)
- status  
  - pending  
  - accepted  
  - rejected  
  - ignored  



### API Design

#### REST API Basics
- REST (Representational State Transfer) is an architectural style.
- Uses **HTTP protocol** for communication.
- Communication is **stateless**.
- Data is exchanged mainly in **JSON format**.



### HTTP Methods and Usage

| Method | Purpose |
|-----|--------|
| GET | Retrieve data |
| POST | Create new data |
| PUT | Replace entire resource |
| PATCH | Update specific fields |
| DELETE | Remove data |


### PUT vs PATCH
- **PUT:** Replaces the entire resource.
- **PATCH:** Updates only specific fields.



## Required REST APIs

### User Management APIs
- `POST /signup` → Register a new user
- `POST /login` → Authenticate user
- `POST /profile` → Create user profile
- `GET /profile` → Fetch profile details
- `PATCH /profile` → Update profile
- `DELETE /profile` → Delete user account



### Connection Management APIs
- `POST /sendRequest` → Send connection request
- `POST /reviewRequest` → Accept or reject request
- `GET /request` → View sent and received requests
- `GET /connections` → View matched connections



## 4. Next Steps

- Finalize database schemas
- Implement backend APIs
- Integrate frontend with backend services
- Perform testing and bug fixing
- Prepare for deployment and scaling



## Key Takeaways

- DevTinder follows a **real-world industry development process**.
- HLD focuses on architecture and technology decisions.
- LLD defines databases, APIs, and internal logic.
- REST APIs enable clean communication between frontend and backend.
- Good design early leads to faster, cleaner development later.


