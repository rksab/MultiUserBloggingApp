# 📝 BlogApp Backend – Node.js, MongoDB, JWT

A RESTful API backend for a blogging platform built with **Node.js**, **Express**, and **MongoDB**, supporting secure user authentication and protected blog operations.

---

## 🔧 Key Features

- ✅ **User authentication** with JSON Web Tokens (JWT)
- 🔐 **Token-based authorization** for creating, deleting, and updating blogs
- 📄 **Full CRUD** functionality for blog posts using Mongoose models
- 🔍 **User–blog association** with population of user data
- 🧱 Centralized **middleware** for error handling and request logging
- 🧪 **Extensive test suite** using Node's native test runner and `supertest`
  - Covers login, validation, success/failure flows, and CRUD
  - 🌍 **End-to-End testing** using Cypress
  - Simulates real user flows including login, blog creation, likes, and deletion
  - Tests both frontend interaction and backend integration

---

## 🌐 Live Demo

🔗 Backend is live at:  
[https://blogapp-tuft.onrender.com](https://blogapp-tuft.onrender.com)

This is a full-stack deployment — the **React frontend is built and served** from the `/dist` folder inside the Node.js backend. The server connects to a live **MongoDB Atlas** database.

---

## 🔐 Sample Credentials

Use the following accounts to test:

- `username: root`  
  `password: sekret`  

- `username: Lily`  
  `password: password123`  

---

## 📦 Tech Stack

| Layer     | Tech                     |
|-----------|--------------------------|
| Backend   | Node.js, Express.js       |
| Database  | MongoDB, Mongoose         |
| Auth      | JSON Web Tokens (JWT), bcrypt |
| Testing   | Node:test, Supertest , cypress |E2E testing  |
| Linting   | ESLint                    |

---

## 🛠 Setup (Locally)

1. Clone the repo:
   ```bash
   git clone https://github.com/yourusername/blogapp-backend.git
   cd blogapp-backend

