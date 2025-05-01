# Student Information System (SIS) - Server

This is the backend server for the Student Information System (SIS). It handles all database operations for students and users, providing a RESTful API that the frontend can interact with.

## 📂 Folder Structure

```
server/
├── models/               # Database schemas
│   ├── student.models.js # Student data structure
│   └── user.model.js     # User data structure
├── routes/               # API endpoints
│   ├── student.routes.js # Student CRUD operations
│   └── user.routes.js    # User CRUD operations
├── index.js              # Main server file
├── package.json          # Dependencies
└── README.md             # This file
```

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v12 or higher)
- [MongoDB](https://www.mongodb.com/try/download/community) installed locally

### Installation

1. Install dependencies:
   ```
   npm install
   ```

2. Make sure MongoDB is running locally on port 27017

3. Start the server:
   ```
   npm start
   ```

The server will start on port 5000 by default.

## 🔌 API Endpoints

### Students API

- **GET /api/students** - Get all students
- **GET /api/students/:id** - Get a student by ID
- **POST /api/students** - Add a new student
- **PUT /api/students/:id** - Update a student
- **DELETE /api/students/:id** - Delete a student

### Users API

- **GET /api/users** - Get all users
- **GET /api/users/:id** - Get a user by ID
- **POST /api/users** - Add a new user
- **PUT /api/users/:id** - Update a user
- **PUT /api/users/:id/password** - Update a user's password
- **DELETE /api/users/:id** - Delete a user

## 💡 Example Usage

### Adding a Student

```javascript
// Using fetch in JavaScript
fetch('http://localhost:5000/api/students', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    idNumber: '12345',
    firstName: 'John',
    lastName: 'Doe',
    middleName: 'Smith',
    course: 'Computer Science',
    year: '3rd'
  }),
})
.then(response => response.json())
.then(data => console.log(data));
```

## 📝 Notes for Beginners

- **Models**: Define the structure of your data (like templates)
- **Routes**: Define the endpoints (URLs) that clients can access
- **Middleware**: Functions that process requests before they reach the routes
- **MongoDB**: A NoSQL database that stores data in JSON-like documents

The code is thoroughly commented to help you understand what each part does. Look for comments in the files to learn more!

## ⚙️ Configuration

The MongoDB connection string is in `index.js`. If you need to connect to a different database, you can change it there. 