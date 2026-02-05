# 🟢 Episode 21. Data Sanitization & Schema Validations

## 📖 Table of Contents

- [ Overview](#-overview)
- [Schema Validation in Mongoose](#schema-validation-in-mongoose)
  - [required](#1️⃣-required)
  - [unique](#2️⃣-unique)
  - [default](#3️⃣-default)
  - [lowercase](#4️⃣-lowercase)
  - [trim](#5️⃣-trim)
  - [minlength and maxlength](#6️⃣-minlength-and-maxlength)
  - [min and max](#7️⃣-min-and-max)
  - [Custom Validation (validate)](#8️⃣-custom-validation-validate)
  - [timestamps](#9️⃣-timestamps)
  - [Custom Validator Functions (Concept)](#custom-validator-functions-concept)
- [🔐 API-Level Validation (PATCH Requests)](#-api-level-validation-patch-requests)
  - [Allowed Fields Approach](#allowed-fields-approach)
- [Validator.js for Advanced Validation](#validatorjs-for-advanced-validation)
  - [Email Validation (isEmail)](#1️⃣-email-validation-isemail)
  - [Profile Photo URL Validation (isURL)](#2️⃣-profile-photo-url-validation-isurl)
  - [Password Strength Validation (isStrongPassword)](#3️⃣-password-strength-validation-isstrongpassword)
- [Benefits of Validation & Sanitization](#benefits-of-validation--sanitization)
- [Key Takeaways](#key-takeaways)

## Overview

In this episode, I explored data sanitization and validation in Mongoose and how they help maintain data integrity, security, and consistency in a MongoDB database.

By defining rules at both:
- **Schema level (Mongoose)**
- **API level (Express logic)**

we ensure that only clean, valid, and expected data gets stored.

## Schema Validation in Mongoose

Mongoose schemas allow us to define rules for each field. These rules run before data is saved to MongoDB, acting as a safety net.

### 1️⃣ required

Ensures a field must be present before saving the document.
```js
firstName: {
  type: String,
  required: [true, "First name is required"],
  minlength: 3,
  maxlength: 50,
}
```
✅ Prevents incomplete documents

❌ Blocks save if value is missing

### 2️⃣ unique

Ensures a field value is unique across the collection.
```js
email: {
  type: String,
  required: true,
  unique: true,
}
```

⚠️ Important:
- unique creates a MongoDB index
- It is not a validator
- Duplicate values must be handled using error codes `(11000)`

### 3️⃣ default

Assigns a default value if no value is provided.
```js
about: {
  type: String,
  default: "Dev is in search for someone here",
}
```

✅ Useful for optional fields

✅ Avoids undefined values

### 4️⃣ lowercase

Automatically converts string values to lowercase before saving.
```js
email: {
  type: String,
  lowercase: true,
}
```

✅ Prevents duplicate emails like Test@Gmail.com vs test@gmail.com

### 5️⃣ trim

Removes leading and trailing spaces from strings.
```js
email: {
  type: String,
  trim: true,
}
```

✅ Keeps data clean

✅ Avoids whitespace-related bugs

### 6️⃣ minlength and maxlength

Restricts the length of string values.
```js
firstName: {
  type: String,
  minlength: 3,
  maxlength: 50,
}
```

✅ Prevents extremely short or long values

### 7️⃣ min and max

Defines minimum and maximum values for numbers.
```js
age: {
  type: Number,
  min: [18, "Age must be at least 18 years"],
  max: [120, "Age seems invalid"],
}
```

✅ Enforces realistic numeric values

### 8️⃣ Custom Validation (validate)

Allows writing custom logic for validation.
```js
gender: {
  type: String,
  trim: true,
  validate(value) {
    if (!["male", "female", "other"].includes(value)) {
      throw new Error("Not a valid gender");
    }
  },
}
```

✅ Useful when built-in validators are not enough

✅ Runs before saving to DB

### 9️⃣ timestamps

Automatically adds metadata fields:

- `createdAt`
- `updatedAt`
```
const userSchema = new Schema({}, { timestamps: true });
```

✅ Helps with auditing and tracking changes

### Custom Validator Functions (Concept)

Custom validators let you enforce business rules, not just formatting.

**Example use cases:**

- Age restrictions
- Enum checks
- Conditional validations

**They work by:**

- Receiving the field value
- Returning true or throwing an error

## 🔐 API-Level Validation (PATCH Requests)

- Schema validation alone is not enough.
- We must also control what fields are allowed to be updated via APIs.

### Allowed Fields Approach
```js
const ALLOWED_UPDATES = [
  "photoURL",
  "about",
  "gender",
  "skills",
  "firstName",
  "lastName",
  "age",
];

const isUpdateAllowed = Object.keys(data).every((key) =>
  ALLOWED_UPDATES.includes(key)
);

if (!isUpdateAllowed) {
  throw new Error("Update Not Allowed");
}
```
**Benefits:**
- Prevents accidental or malicious updates
- Protects sensitive fields (email, password)
- Improves API security

## Validator.js for Advanced Validation

The validator package provides reliable, industry-standard validation utilities.

**Install:**
```
npm install validator
```

### 1️⃣ Email Validation (isEmail)
```js
validate: {
  validator: function (value) {
    return validator.isEmail(value);
  },
  message: "Please provide a valid email address",
}
```

✅ Handles edge cases better than regex

✅ Ensures proper email formatting

### 2️⃣ Profile Photo URL Validation (isURL)
```js
photourl: {
  type: String,
  trim: true,
  validate: {
    validator: function (value) {
      if (!value) return true;
      return validator.isURL(value, {
        protocols: ["http", "https"],
        require_protocol: true,
      });
    },
    message: "Please provide a valid profile image URL",
  },
},
```

✅ Ensures valid URLs

✅ Prevents random strings from being saved

### 3️⃣ Password Strength Validation (isStrongPassword)
```js
password: {
  type: String,
  required: true,
  select: false,
  validate: {
    validator: function (value) {
      return validator.isStrongPassword(value, {
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
      });
    },
    message:
      "Password must include uppercase, lowercase, number, and symbol",
  },
},
```

✅ Enforces strong passwords

✅ Improves account security

## Benefits of Validation & Sanitization
- Improved data quality
- Enhanced security
- Cleaner database
- Fewer runtime bugs
- Consistent data format

## Key Takeaways

- Mongoose schema validation ensures only clean and valid data is stored.
- Sanitization (trim, lowercase, default) keeps data consistent.
- Built-in validators handle common rules; custom validators enforce business logic.
- unique creates indexes and must be handled with API-level error handling.
- Validator.js simplifies advanced validations like email, URL, and password strength.
- API-level validation protects sensitive fields from unwanted updates.
- Strong validation improves security, reliability, and scalability.