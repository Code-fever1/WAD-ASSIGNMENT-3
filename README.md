📚 Library Management System API

A simple and secure **RESTful API** for managing a library system with **user registration, login, and book management**.

---

## 🌐 GitHub Repository

👉 **https://github.com/Code-fever1/WAD-ASSIGNMENT-3**

---

## 🛠️ Tech Stack

- **Node.js** – Runtime Environment  
- **Express.js** – Web Framework  
- **MongoDB** – Database  
- **Mongoose** – ODM  
- **bcrypt** – Secure Password Hashing  
- **CommonJS** – Module System  

---

## 📁 Project Structure

library-management-api/
│
├── index.js # Main server file with routes
├── db.js # MongoDB connection
├── Person.js # User/Person schema
├── book.js # Book schema
├── package.json # Dependencies
└── README.md # Documentation

yaml
Copy code

---

## 🚀 Installation & Setup

### ✅ Prerequisites
- Node.js (v18+ recommended)
- MongoDB (Local or MongoDB Atlas)

### 1️⃣ Install Dependencies
```bash
npm install
2️⃣ Start MongoDB
bash
Copy code
# Windows
net start MongoDB

# macOS / Linux
sudo systemctl start mongod
# or
mongod
3️⃣ Run the Server
bash
Copy code
npm start
For development (auto reload):

bash
Copy code
npm run dev
Server runs on:

arduino
Copy code
http://localhost:3000
📡 API Endpoints
🔹 1. Register User
POST /register

Request Body

json
Copy code
{
  "username": "john_doe",
  "password": "password123",
  "email": "john@example.com"
}
🔹 2. Login User
POST /login

Request Body

json
Copy code
{
  "username": "john_doe",
  "password": "password123"
}
🔹 3. Get All Books
GET /books

Returns all library books.

🔹 4. Add a Book
POST /books

Request Body

json
Copy code
{
  "title": "The Great Gatsby",
  "author": "F. Scott Fitzgerald",
  "isbn": "978-0-7432-7356-5"
}
🧪 Testing with Postman
✅ Register
bash
Copy code
POST http://localhost:3000/register
✅ Login
bash
Copy code
POST http://localhost:3000/login
✅ Get Books
bash
Copy code
GET http://localhost:3000/books
✅ Add Book
bash
Copy code
POST http://localhost:3000/books
🔒 Authentication Flow
1️⃣ Register → Create account
2️⃣ Login → Authenticate user

✅ Validation Rules
User
Username → Required, Unique, Lowercase

Password → Required, Hashed Automatically

Email → Required, Unique, Lowercase

Book
Title → Required

Author → Required

ISBN → Required, Unique

🐛 Error Handling
400 – Bad Request

401 – Unauthorized

409 – Conflict / Duplicate

500 – Server Error

📝 Notes
Passwords are securely hashed

Emails & usernames are stored lowercase

ISBN must be unique

🚨 Security Recommendations
Use HTTPS in production

Add rate limiting

Input validation & sanitization

Session / JWT authentication for production level

📄 License
ISC

🌐 GitHub Repository
👉 https://github.com/Code-fever1/WAD-ASSIGNMENT-3

If you like this project, don’t forget to ⭐ the repo!
