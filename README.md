# TravelMate

TravelMate is a full-stack travel and event planning platform built for the Web Programming II final project. It supports three roles: travelers, event planners, and a super admin.

## Tech Stack

- Backend: Node.js, Express.js
- Frontend: React, Vite, Tailwind CSS
- Database: PostgreSQL with Prisma ORM
- Security: JWT authentication, bcrypt password hashing, role-based authorization, Helmet, CORS
- Logging: custom Express request logger writing to `backend/logs/access.log`

## Main Features

- Traveler registration and login
- Event planner registration with company profile submission
- Super admin user management and company approval workflow
- Public package and event browsing
- Protected package and event CRUD for event planners and super admin
- Role-specific React dashboard routes

## Project Structure

```text
travelmate/
  backend/
    src/
      config/          Prisma/database config
      controllers/     Auth and user controllers
      middleware/      Auth, authorization, logging, error handling
      routes/          REST API routes
    prisma/            Prisma schema and migrations
  frontend/
    src/
      components/      Navbar, footer, protected route
      context/         Auth context
      pages/           Public pages and dashboard pages
      services/        Axios API client
  database/            SQL DDL and schema documentation
```

## Setup

### Backend

Create `backend/.env`:

```env
PORT=5000
DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/travelmate"
JWT_SECRET="change_this_secret"
```

Install and run:

```bash
cd backend
npm install
npx prisma migrate dev
npm run seed
npm run dev
```

The backend runs on `http://localhost:5000`.

### Frontend

Optional `frontend/.env`:

```env
VITE_API_URL=http://localhost:5000/api
```

Install and run:

```bash
cd frontend
npm install
npm run dev
```

The frontend runs on `http://localhost:5173`.

## API Summary

- `POST /api/auth/register` - register traveler or event planner
- `POST /api/auth/login` - login and receive JWT
- `GET /api/users/profile` - authenticated user profile
- `GET /api/users` - super admin user listing
- `GET /api/companies/pending` - super admin company approval list
- `PUT /api/companies/:id/approve` - approve or reject company
- `GET /api/packages` and `GET /api/packages/:id` - public package browsing
- `POST /api/packages`, `PUT /api/packages/:id`, `DELETE /api/packages/:id` - planner/admin package management
- `GET /api/events` and `GET /api/events/:id` - public event browsing
- `POST /api/events`, `PUT /api/events/:id`, `DELETE /api/events/:id` - planner/admin event management

## Database

The DDL is in `database/schema.sql`. Schema notes and an ER diagram are in `database/DATABASE.md`. Prisma schema and migrations are in `backend/prisma/`.

## Extra Features

- Role-based access control across backend and frontend
- Company approval workflow
- Request logging for audit/debugging
- Prisma migrations and seed script
- React dashboard routes for each role
