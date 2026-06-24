# Student Management API

A robust, RESTful Student Management API built with Node.js, Express.js, and MongoDB. This backend service provides full CRUD capabilities, JWT-based authentication, and dynamic search filtering, structured using the MVC design pattern.

## Features

* **RESTful CRUD Operations:** Complete Create, Read, Update, and Delete functionality for student records.
* **MongoDB Integration:** Persistent data storage using MongoDB Atlas and Mongoose ODM.
* **JWT Authentication:** Secure route protection using JSON Web Tokens.
* **Dynamic Searching:** Filter students by name, course, and batch using query parameters.
* **MVC Architecture:** Clean, maintainable codebase separated into Models, Views (Routes), and Controllers.
* **Environment Configuration:** Secure handling of secrets using `dotenv`.

## Technology Stack

* **Runtime:** Node.js
* **Framework:** Express.js
* **Database:** MongoDB Atlas
* **ODM:** Mongoose
* **Authentication:** jsonwebtoken (JWT)
* **Environment Management:** dotenv

## Prerequisites

Before you begin, ensure you have the following installed:

* [Node.js](https://nodejs.org/) (v14 or higher recommended)
* [npm](https://www.npmjs.com/) (usually installed with Node.js)
* A [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) account (or a local MongoDB installation)

## Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/student-management-api.git
    cd student-management-api
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Environment Configuration:**
    Create a `.env` file in the root directory of the project and add the following variables:
    ```env
    # The port your server will run on (default is 3000)
    PORT=3000

    # Your secret key for signing JSON Web Tokens
    JWT_SECRET=your_super_secret_key_here

    # Your MongoDB connection string
    MONGO_URI=mongodb+srv://<username>:<password>@cluster0.abcde.mongodb.net/studentDB?retryWrites=true&w=majority&appName=Cluster0
    ```
    *Replace `<username>` and `<password>` with your actual MongoDB Atlas credentials.*

4.  **Start the server:**
    ```bash
    # Start using node
    node app.js

    # Or, if you use nodemon for development
    npm run dev
    ```
    You should see the following messages in your terminal:
    * `🚀 Server is running securely on port 3000`
    * `📦 Connected to MongoDB successfully!`

## API Endpoints

### Authentication
* **`POST /login`**
    * Generates a JWT token (currently issues a token to any request).
    * **Response:** `{ "message": "Login successful...", "token": "<JWT_STRING>" }`

### Public Endpoints (No Token Required)
* **`GET /students`**
    * Retrieves a list of all students.
    * **Query Parameters (Optional):**
        * `?name=ali` - Filter by partial name match.
        * `?course=MERN` - Filter by exact course.
        * `?batch=2026` - Filter by exact batch.
        * *Example:* `/students?course=MERN&batch=2026`
* **`GET /students/:id`**
    * Retrieves a specific student by their MongoDB `_id`.

### Protected Endpoints (Requires JWT)
*Require Header: `Authorization: Bearer <token>`*

* **`POST /students`**
    * Creates a new student.
    * **Body:** `{ "name": "Ali", "course": "MERN", "batch": "2026" }`
* **`PUT /students/:id`**
    * Updates an existing student entirely.
    * **Body:** Fields to update.
* **`PATCH /students/:id`**
    * Updates specific fields of an existing student.
* **`DELETE /students/:id`**
    * Deletes a student by their `_id`.

## Project Structure (MVC)

```text
student-management-api/
│
├── controllers/
│   ├── authController.js     # Handles login logic
│   └── studentController.js  # Handles CRUD business logic
│
├── middleware/
│   └── authMiddleware.js     # Intercepts requests to verify JWTs
│
├── models/
│   └── studentModel.js       # Defines the Mongoose schema for a Student
│
├── routes/
│   └── studentRoutes.js      # Maps URL paths and HTTP methods to Controllers
│
├── .env                      # Environment variables (Ignored by Git)
├── app.js                    # Application entry point and server configuration
├── package.json              # Project dependencies and scripts
└── README.md                 # Project documentation
```

