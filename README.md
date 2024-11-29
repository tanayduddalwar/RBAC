
# **Role-Based Authentication and Authorization System**

## **Project Overview**

This project implements a secure **authentication** and **authorization** system using **JWT (JSON Web Tokens)** and **Google OAuth 2.0**. It includes **Role-Based Access Control (RBAC)**, allowing different access levels based on user roles. Each user can register and log in using either traditional username/password or Google OAuth. Roles such as **Admin**, **Moderator**, and **User** have specific access to routes.

### **Core Features**

- **User Registration & Authentication**: Users can register using a username and password or authenticate via **Google OAuth 2.0**.
- **JWT Authentication**: Users receive a JWT token upon successful login, which they use to access protected routes.
- **Role-Based Access Control (RBAC)**: Roles determine which resources and routes each user can access.
- **Secure Sessions**: All authentication processes are secure, utilizing hashed passwords, JWT, and OAuth 2.0.

---

## **Table of Contents**

1. [Installation](#installation)
2. [Core Functionality](#core-functionality)
   - [User Registration](#user-registration)
   - [Login & Logout](#login-logout)
   - [Role-Based Access Control (RBAC)](#role-based-access-control-rbac)
   - [Google OAuth Authentication](#google-oauth-authentication)
3. [Technologies Used](#technologies-used)
4. [Security Best Practices](#security-best-practices)
5. [Code Structure](#code-structure)
6. [Role-Based Access Control Diagram](#role-based-access-control-diagram)


---

## **Installation**

### 1. **Clone the Repository**

```bash
git clone https://github.com/tanayduddalwar/RBAC.git
```

### 2. **Install Dependencies**

```bash
npm install
```


---

### 3. **Set Up Environment Variables**

1. **Download the `.env` File:**
   - The `.env` file containing the necessary environment variables can be downloaded from the following link:  
     [Download `.env` file](https://drive.google.com/file/d/1rHbY3QFnvW2-lOXbHCSJEizSYE_YF7tY/view?usp=drive_link)

2. **Place the `.env` File in the Root Directory:**
   - After downloading, place the `.env` file in the **root directory** of the project (the same location as `package.json` or the main application file).

3. **Environment Variables to Configure:**
   Ensure the `.env` file contains the following variables:

   ```plaintext
   JWT_SECRET=your-jwt-secret-key
   GOOGLE_CLIENT_ID=your-google-client-id
   GOOGLE_CLIENT_SECRET=your-google-client-secret
   MONGO_URI=mongodb://localhost:27017/your-database-name
   ```
---


### 4. **Start the Application**

```bash
node index.js
```

The server will start on `http://localhost:5000`.

---

## **Core Functionality**

### **User Registration**

Users can register with a username and password. Passwords are securely hashed using `bcryptjs` before saving them to the database. Each user is assigned a role (Admin, Moderator, or User) during registration. The default role is `User`.

**API Endpoint:**

- **POST /api/register**: Registers a new user.

Example Request Body:

```json
{
  "username": "testuser",
  "password": "testpassword123",
  "role": "User"
}
```

### **Login & Logout**

Users can log in by providing their username and password. Upon successful login, a JWT token is generated, which the user can use to access protected routes.

**API Endpoints:**

- **POST /api/login**: Logs in a user and returns a JWT token.

  ```json
{
  "username": "testuser",
  "password": "testpassword123",
}
```
- **GET /api/logout**: Logs out the user and ends the session.

### **Role-Based Access Control (RBAC)**

The system uses **Role-Based Access Control (RBAC)** to manage user access to different API routes. Each user is assigned one of the following roles:

- **Admin**: Limited access (can only access `/admin` route).
- **Moderator**: LLimited access (can only access `/moderator` route).
- **User**: Limited access (can only access `/user` route).

#### Protected Routes:

- **GET /api/admin**: Only accessible by Admins.
- **GET /api/moderator**: Only accessible by Moderators.
- **GET /api/user**: Only accessible by Users.

#### Route Access Overview:

| Role      | `/api/admin` | `/api/moderator` | `/api/user` |
|-----------|--------------|------------------|-------------|
| **Admin** | Yes          | No               | No          |
| **Moderator** | No       | Yes              | No          |
| **User**   | No          | No               | Yes         |

The system uses **JWT tokens** to verify the user's role and ensure that they have the correct permissions to access specific routes.

### **Google OAuth Authentication**

Users can log in using their **Google account** via OAuth 2.0. After successful authentication, the backend generates a JWT token for the user.

**Google OAuth API Endpoints:**

- **GET /auth/google**: Initiates the Google OAuth flow.
- **GET /auth/google/callback**: Callback route that receives the Google ID token, verifies it, and returns a JWT token.

---

## **Technologies Used**

- **Node.js**: Backend runtime environment.
- **Express.js**: Web framework for Node.js to handle routing and middleware.
- **MongoDB**: NoSQL database to store user data.
- **Mongoose**: ODM (Object Document Mapping) for MongoDB.
- **JWT (JSON Web Tokens)**: Secure token-based authentication.
- **bcryptjs**: For hashing passwords securely.
- **Google OAuth 2.0**: For authentication using Google accounts.
- **Passport.js**: Authentication middleware for Node.js.

---

## **Security Best Practices**

- **Password Hashing**: User passwords are hashed using `bcryptjs` before being stored in the database.
- **JWT Authentication**: JWT tokens are used for stateless authentication. Tokens are signed with a secret key and have an expiration time.
- **OAuth 2.0 with Google**: Google OAuth 2.0 is implemented for users who prefer logging in with their Google account. Tokens are verified using Google’s public keys.
- **Role-Based Access Control (RBAC)**: Users' access to routes is controlled based on their role. Unauthorized access attempts are blocked with HTTP 403 (Forbidden) status codes.

---

## **Code Structure**

Below is the updated directory structure for the project:

```
├── controllers/
│   ├── authController.js   # Handles registration, login, and Google login
├── models/
│   ├── user.js             # Mongoose User schema
├── routes/
│   ├── authRoutes.js       # Defines authentication routes (login, register, etc.)
├── middlewares/
│   ├── checkAuth.js        # Middleware for JWT authentication and role-based authorization
├── passport.js             # Passport configuration for Google OAuth
├── .env                    # Environment variables (Google credentials, JWT secret, etc.)
├── index.js                # Main entry point (server setup)
└── package.json            # Node.js package manager file for dependencies and scripts
```

---

## **Role-Based Access Control Diagram**

Below is a visual representation of the **Role-Based Access Control (RBAC)** system, showing the routes each role can access:

```
            +-------------------------+             +-------------------------+             +-------------------------+
            |        Admin             |             |        Moderator         |             |         User             |
            |  (Access to /admin)      |             |  (Access to /moderator)  |             |  (Access to /user)      |
            +-------------------------+             +-------------------------+             +-------------------------+
                     |                                          |                                      |
                     v                                          v                                      v
           +---------------------------+             +----------------------------+         +---------------------------+
           | Access to /admin route    |             | Access to /moderator route |         | Access to /user route     |
           |                           |             |                            |         |                           |
           +---------------------------+             +----------------------------+         +---------------------------+

```

- **Admin**: Has access only to `/admin` route only.
- **Moderator**:  Has access only to `/moderator` route only.
- **User**: Has access only to `/user` route only.

---


---

### **Conclusion**

This project demonstrates the implementation of a secure authentication system with **Google OAuth** and **JWT tokens**. It also uses **Role-Based Access Control (RBAC)** to manage user permissions effectively. The solution is designed to be flexible, allowing the addition of more roles and custom authorization logic as needed.

```

---

