# 🟢 Episode 22. Encrypting Passwords

## 📖 Table of Contents
- [Overview](#overview)
- [Signup Data Validation](#1-signup-data-validation)
  - [Why Validation Is Important](#why-validation-is-important)
  - [Validation Strategy](#validation-strategy)
    - [Reusable Helper Functions](#reusable-helper-functions)
    - [Validator Library](#validator-library)
- [Password Encryption (Hashing)](#2-password-encryption-hashing)
  - [Why Hash Passwords?](#why-hash-passwords)
  - [Hashing with bcrypt](#hashing-with-bcrypt)
- [Login Authentication](#3-login-authentication)
  - [Verifying Passwords](#verifying-passwords)
  - [Why bcrypt.compare Is Secure](#why-bcryptcompare-is-secure)
- [Additional Security Best Practices](#4-additional-security-best-practices)
- [Benefits of Password Hashing](#benefits-of-password-hashing)
- [Key Takeaways](#key-takeaways)


## Overview
In this episode I learned best practices for handling user authentication in the **DevTinder** application. It focuses on validating user input, securely storing passwords, and verifying user credentials during login to ensure strong security.

---

## 1. Signup Data Validation

### Why Validation Is Important
All user input must be validated before processing or storing it. Proper validation:
- Prevents invalid or malicious data
- Improves data integrity
- Reduces security vulnerabilities

### Validation Strategy

#### Reusable Helper Functions
- Create helper functions to validate individual fields such as:
  - First name
  - Last name
  - Email
  - Password
- This keeps validation logic clean and reusable across the app.

#### Validator Library
The `validator` library is used for reliable and pre-built validations.

Common checks include:
- Valid email format
- Strong password requirements
- Optional fields such as profile URLs or phone numbers

### Example Validation Rules
- First name and last name must not be empty
- Email must be valid
- Password must be strong

If validation fails, an error is thrown immediately.

---

## 2. Password Encryption (Hashing)

### Why Hash Passwords?
Storing passwords in plain text is extremely insecure. If a database is compromised, all user accounts are exposed. Hashing ensures passwords cannot be read or reversed.

### Hashing with bcrypt

#### bcryptjs
- A secure and lightweight library designed for Node.js
- Automatically handles salting and multiple hashing rounds

#### Hashing Passwords
Use `bcrypt.hash()` to convert a plain password into a hashed value.

Parameters:
- Plain text password
- Salt rounds (recommended: `10–12`)

```js
const passwordHash = await bcrypt.hash(password, 10)
```

#### Storing Passwords

- Store only the hashed password in the database
- Never store or log plain text passwords

## 3. Login Authentication

### Verifying Passwords
 
Use bcrypt.compare() during login to validate credentials.

**It compares:**
- The password entered by the user
- The hashed password stored in the database
```js
const isValidPassword = await bcrypt.compare(password, user.password)
```
### Why bcrypt.compare Is Secure

- Plain text passwords are never exposed
- Hashes cannot be reversed
- Resistant to brute-force attacks

## 4. Additional Security Best Practices

- Always use HTTPS to protect data in transit
- Avoid detailed authentication error messages
- Use generic messages like “Invalid credentials”
- Rate-limit login attempts to prevent brute-force attacks

**Consider adding:**

- Email verification
- Password reset with expiring tokens
- Multi-factor authentication (MFA)

## Benefits of Password Hashing
#### Enhanced Security
Passwords remain protected even if the database is leaked

#### Compliance

Aligns with security standards and data protection regulations

#### User Trust

Secure authentication increases confidence in the platform

## Key Takeaways

- Always validate user input before processing or storing it
- Use reusable helper functions for clean and consistent validation logic
- Never store passwords in plain text
- Hash passwords using a secure library like `bcryptjs`
- Use sufficient salt rounds (10–12) for strong password hashing
- Store only hashed passwords in the database
- Verify passwords during login using `bcrypt.compare`
- Never expose or log plain text passwords
- Use generic error messages to avoid leaking authentication details
- Protect authentication endpoints with HTTPS and rate limiting
- Follow industry best practices to improve security, compliance, and user trust
