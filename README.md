# JobHub — Full-Stack MERN Job Portal

A complete interview-ready MERN stack job portal built with:

- React.js + Vite
- Node.js + Express.js
- MongoDB + Mongoose
- JWT authentication
- REST APIs
- Role-based access (candidate/admin)
- Git/GitHub ready structure

## Features

### Candidate
- Register / Login
- JWT protected authentication
- Browse jobs
- Search jobs
- Filter by location, type and experience
- View job details
- Apply for jobs
- Prevent duplicate applications
- View My Applications
- Update profile

### Admin
- Admin login
- Admin dashboard
- Add jobs
- Edit jobs
- Delete jobs
- View all applications
- View application details

## Project structure

```text
job-portal-mern/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   └── utils/
│   ├── .env.example
│   ├── package.json
│   └── server.js
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   └── services/
│   ├── .env.example
│   ├── package.json
│   └── vite.config.js
└── README.md
```

## Requirements

Install these first:

- Node.js 18+
- npm
- MongoDB local OR MongoDB Atlas
- Git

## 1. Backend setup

```bash
cd backend
npm install
```

Copy `.env.example` to `.env` and update:

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/jobhub
JWT_SECRET=change_this_to_a_long_random_secret
JWT_EXPIRES_IN=7d
ADMIN_EMAIL=admin@jobhub.com
ADMIN_PASSWORD=Admin@123
```

Start backend:

```bash
npm run dev
```

Backend runs at:

```text
http://localhost:5000
```

Health check:

```text
http://localhost:5000/api/health
```

## 2. Create the first admin

With the backend running:

```bash
npm run seed:admin
```

Optional sample jobs:
```bash
npm run seed:jobs
```

Default admin:

```text
Email: admin@jobhub.com
Password: Admin@123
```

Change these values in `.env` before seeding if needed.

## 3. Frontend setup

Open another terminal:

```bash
cd frontend
npm install
```

Copy `.env.example` to `.env`:

```env
VITE_API_URL=http://localhost:5000/api
```

Run:

```bash
npm run dev
```

Open the URL printed by Vite, usually:

```text
http://localhost:5173
```

## Main API endpoints

### Auth

```text
POST /api/auth/register
POST /api/auth/login
GET  /api/auth/me
PUT  /api/auth/profile
```

### Jobs

```text
GET    /api/jobs
GET    /api/jobs/:id
POST   /api/jobs
PUT    /api/jobs/:id
DELETE /api/jobs/:id
```

### Applications

```text
POST /api/applications
GET  /api/applications/my
GET  /api/applications
GET  /api/applications/:id
PUT  /api/applications/:id/status
```

## Interview explanation

A good 30-second explanation:

> "I built JobHub as a full-stack job portal using React for the frontend, Node.js and Express for REST APIs, and MongoDB with Mongoose for persistence. I implemented JWT authentication and role-based authorization for candidates and admins. Candidates can search jobs, view details and apply, while admins can manage jobs and applications. I separated the backend into routes, controllers, models and middleware and used Axios on the frontend for API communication."

## Security notes

This project is suitable for learning/interview demonstration. Before production use, add stronger validation, rate limiting, refresh tokens, secure cookie-based authentication, email verification, password reset, file upload security, audit logging and other production controls.

## GitHub

Recommended commands:

```bash
git init
git add .
git commit -m "Initial MERN job portal"
git branch -M main
git remote add origin YOUR_GITHUB_REPOSITORY_URL
git push -u origin main
```

Do not commit `.env`.
