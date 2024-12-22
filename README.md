# Hands Limited API

A focused Node.js/TypeScript API for managing user testimonials and company updates.

## 🚀 Core Features

- 🔐 User Authentication & Authorization
- 👥 User Management
- 📝 Testimonials System
- 📢 Company Updates
- 📧 Welcome Email Notifications
- 🛡️ Security Features (CSRF, Rate Limiting)
- 📊 Performance Monitoring

## 🛠️ Tech Stack

- **Runtime**: Node.js
- **Language**: TypeScript
- **Framework**: Hono
- **Database**: PostgreSQL with Drizzle ORM
- **Email**: Nodemailer
- **Authentication**: JWT
- **Validation**: Zod

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
```bash
npm install
```

3. Set up environment variables:
```bash
DATABASE_URL=your_postgresql_url
JWT_SECRET=your_jwt_secret
EMAIL_USER=your_email
EMAIL_PASS=your_email_password
PORT=3000
```

4. Run migrations:
```bash
npm run migrate
```

5. Start the server:
```bash
npm run dev
```

## 🔑 API Endpoints

### Authentication
- `POST /auth/register` - Register new user
- `POST /auth/login` - User login

### Users
- `GET /users` - Get all users (Admin)
- `GET /users/:id` - Get user by ID
- `PUT /users/:id` - Update user
- `DELETE /users/:id` - Delete user (Admin)

### Testimonials
- `GET /testimonials` - Get all testimonials
- `POST /testimonials` - Create testimonial
- `GET /testimonials/:id` - Get testimonial by ID
- `DELETE /testimonials/:id` - Delete testimonial (Admin)

### Updates
- `GET /updates` - Get all updates
- `POST /updates` - Create update (Admin)
- `PUT /updates/:id` - Edit update (Admin)
- `DELETE /updates/:id` - Delete update (Admin)
