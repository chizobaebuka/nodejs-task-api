# Task Management API

This is a RESTful API built using **Node.js**, **Express.js**, and **MongoDB** (with Mongoose) for managing tasks.  
It includes **user authentication, authorization, task CRUD operations**, and supports **query filters**.

## 🚀 Features
- **User Authentication (JWT-based)**
- **Task Management (Create, Read, Update, Delete)**
- **Filtering & Searching** (`status`, `search by title`)
- **Validation using Zod**
- **Secure Authentication with Argon2 Password Hashing**
- **Middleware for Authentication & Authorization**
- **RESTful API with MVC Architecture**
- **Swagger API Documentation**

---

## 🛠 Tech Stack
- **Node.js** (Runtime)
- **Express.js** (Web Framework)
- **MongoDB** (Database)
- **Mongoose** (ODM for MongoDB)
- **Typescript** (Strongly Typed JavaScript)
- **Zod** (Data Validation)
- **Argon2** (Password Hashing)
- **JSON Web Token (JWT)** (Authentication)
- **Swagger** (API Documentation)
- **Nodemon** (Hot Reloading)

---

## 🔧 Installation & Setup

### **1️⃣ Clone the Repository**
### **1️⃣ Install the dependencies** - npm install
### **1️⃣ Create your env taking sample from the .env.sample**  
### **1️⃣ Start the server** - npm run dev  
### **1️⃣ Create your env taking sample from the .env.sample**  
### **1️⃣ When you want to run the test ensure the NODE_ENV = test in your .env**  
### **1️⃣ To run the test, use command** - npm run test

***baseUrl=http://localhost:{port}***
### To see the swagger documentation, upon successfully starting the server, go to {{base_url}}/api-docs

## 🛠 API ENDPOINTS
**Signup (POST {{baseUrl}}/api/users/signup)** 
**Login (POST {{baseUrl}}/api/users/login)**
**Get All Users (GET {{baseUrl}}/api/users)**
**Get User by ID (GET {{baseUrl}}/api/users/:id)**
**Update User (PATCH {{baseUrl}}/api/users/:id)**
**Delete User (DELETE {{baseUrl}}/api/users/:id)**
**Create Task (POST {{baseUrl}}/api/tasks/add)**: Requires auth token. The body should have title, description, maybe a dueDate. Example provided.
**Get All Tasks (GET {{baseUrl}}/api/tasks)**: Requires token in headers.
**Get Task by ID (GET {{baseUrl}}/api/tasks/:id)**: Example ID and token. Requires token in headers
**Update Task (PATCH {{baseUrl}}/api/tasks/:id)**: Partial updates, example body with title or status. Requires token in headers
**Delete Task (DELETE {{baseUrl}}/api/tasks/:id)**: ID and token. Requires token in headers