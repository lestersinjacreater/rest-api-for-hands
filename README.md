# Hands Limited API

A robust Node.js/TypeScript API for managing testimonials and user authentication, built with Hono framework and PostgreSQL.

## 🚀 Features

- 🔐 JWT Authentication & Authorization
- 👥 User Management
- 📝 Testimonials System
- 📧 Email Notifications
- 🛡️ CSRF Protection
- 🚦 Rate Limiting
- 📊 Prometheus Metrics
- 🔄 Database Migrations
- 🌐 RESTful API Design

## 🛠️ Tech Stack

- **Runtime**: Node.js
- **Language**: TypeScript
- **Framework**: Hono
- **Database**: PostgreSQL (with Drizzle ORM)
- **Email**: Nodemailer
- **Authentication**: JWT
- **Validation**: Zod
- **Monitoring**: Prometheus

## 📋 Prerequisites

- Node.js (v18 or higher)
- PostgreSQL
- npm or yarn

## 🔧 Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/hands-limited-api.git
cd hands-limited-api
```

2. Install dependencies:
```
npm install
npm run dev
```

```
open http://localhost:3000
```

## 📡 API Endpoints Reference

### 🔐 Authentication Endpoints

#### Register User
```http
POST /auth/register
Content-Type: application/json

{
    "username": "string",
    "password": "string",
    "name": "string",
    "email": "string",
    "phone": "string" (optional),
    "role": "admin" | "user" | "superuser"
}

Response: {
    "message": "User registered successfully",
    "success": true
}
```

#### Login
```http
POST /auth/login
Content-Type: application/json

{
    "email": "string",
    "password": "string"
}

Response: {
    "token": "JWT_TOKEN",
    "user": {
        "email": "string",
        "role": "string",
        "userid": number
    }
}
```

### 👥 User Endpoints

#### Get All Users (Admin/User)
```http
GET /users
Authorization: Bearer <token>

Response: [
    {
        "userid": number,
        "username": "string",
        "email": "string",
        "createdAt": "datetime",
        "updatedAt": "datetime"
    }
]
```

#### Get User by ID (Admin/User)
```http
GET /users/:id
Authorization: Bearer <token>

Response: {
    "userid": number,
    "username": "string",
    "email": "string",
    "createdAt": "datetime",
    "updatedAt": "datetime"
}
```

#### Update User (Admin/User)
```http
PUT /users/:id
Authorization: Bearer <token>
Content-Type: application/json

{
    "name": "string",
    "email": "string",
    "phone": "string"
}

Response: {
    "msg": "User updated successfully"
}
```

#### Delete User (Admin only)
```http
DELETE /users/:id
Authorization: Bearer <token>

Response: {
    "msg": "User deleted successfully"
}
```

### 📝 Testimonials Endpoints

#### Create Testimonial (Admin/User)
```http
POST /testimonials
Authorization: Bearer <token>
Content-Type: application/json

{
    "userId": number,
    "text": "string (max 1000 chars)"
}

Response: "Testimonial created successfully"
```

#### Get All Testimonials (Admin/User)
```http
GET /testimonials
Authorization: Bearer <token>

Response: [
    {
        "testimonialid": number,
        "userId": number,
        "text": "string",
        "createdAt": "datetime"
    }
]
```

#### Get Testimonial by ID (Admin/User)
```http
GET /testimonials/:id
Authorization: Bearer <token>

Response: {
    "testimonialid": number,
    "userId": number,
    "text": "string",
    "createdAt": "datetime"
}
```

#### Delete Testimonial (Admin only)
```http
DELETE /testimonials/:id
Authorization: Bearer <token>

Response: "Testimonial deleted successfully"
```

### 📢 Updates Endpoints

#### Create Update (Admin only)
```http
POST /updates
Authorization: Bearer <token>
Content-Type: application/json

{
    "userId": number,
    "content": "string (max 500 chars)"
}

Response: "Update created successfully"
```

#### Get All Updates (Admin/User)
```http
GET /updates
Authorization: Bearer <token>

Response: [
    {
        "updateid": number,
        "userId": number,
        "content": "string",
        "createdAt": "datetime"
    }
]
```

#### Edit Update (Admin only)
```http
PUT /updates/:id
Authorization: Bearer <token>
Content-Type: application/json

{
    "content": "string"
}

Response: "Update edited successfully"
```

#### Delete Update (Admin only)
```http
DELETE /updates/:id
Authorization: Bearer <token>

Response: "Update deleted successfully"
```

## 🔑 Authentication

All protected endpoints require a JWT token in the Authorization header:
```http
Authorization: Bearer <your_jwt_token>
```

## 🎭 Role-Based Access

- **Admin**: Full access to all endpoints
- **User**: Limited access to user-specific endpoints
- **Superuser**: Special privileges (system maintenance)

## ⚠️ Error Responses

```json
{
    "error": "Error message",
    "success": false
}
```

Common HTTP Status Codes:
- 200: Success
- 201: Created
- 400: Bad Request
- 401: Unauthorized
- 403: Forbidden
- 404: Not Found
- 500: Server Error
