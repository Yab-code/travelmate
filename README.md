# TravelMate

> A full-stack capstone travel and event planning platform built with **Node.js**, **Express.js**, **React**, and **PostgreSQL**.  
> TravelMate enables travellers to explore destinations, book packages, and plan itineraries — while event planners manage listings, and a super admin governs the entire system.

---

## Table of Contents

- [Project Description](#project-description)
- [Tech Stack](#tech-stack)
- [Features](#features)
- [Architecture (MVC)](#architecture-mvc)
- [Security Implementation](#security-implementation)
- [Database Schema](#database-schema)
- [Setup & Installation](#setup--installation)
- [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)
- [Extra Features Beyond Course Scope](#extra-features-beyond-course-scope)

---

## Project Description

TravelMate is a multi-role, capstone-level web application for the travel and event-planning domain. The system supports three user roles:

- **Super Admin** — Manages all users, reviews & approves company registrations, monitors system-wide activity logs.
- **Event Planner** — Registers a company profile (pending admin approval), creates travel packages and events, manages bookings, and tracks analytics.
- **Traveller** — Explores packages and events, books trips, manages a wishlist/favourites list, builds an itinerary, and submits reviews.

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Runtime | Node.js |
| Backend Framework | Express.js |
| Frontend Framework | React (Vite) |
| CSS | Tailwind CSS |
| ORM | Prisma v7 |
| Database | PostgreSQL |
| Auth | JWT (jsonwebtoken) |
| Password Hashing | BCrypt |
| Security Headers | Helmet.js |
| Cross-Origin | CORS |
| Logging | Custom middleware → `logs/access.log` |

---

## Features

### Traveller
- Explore travel packages with filtering and sorting
- Explore events with location and date filters
- Book packages and view booking history with details
- Save favourite packages to a Wishlist
- Build a custom day-by-day itinerary planner
- Submit and view reviews & star ratings

### Event Planner
- Register company (pending admin approval)
- Create, edit, and delete travel packages and events
- Manage incoming bookings
- View company analytics and profile settings

### Super Admin
- View and filter all registered users; change user roles
- Review, approve, or reject pending company registrations with a side-panel details drawer
- Monitor real-time activity logs (system events, security events, internal planner actions)
- Download audit reports (CSV, PDF, JSON)
- Schedule automated report generation

---

## Architecture (MVC)

```
travelmate/
├── backend/
│   └── src/
│       ├── controllers/       ← Business logic (Controller layer)
│       │   ├── authController.js
│       │   └── userController.js
│       ├── middleware/        ← Cross-cutting concerns
│       │   ├── auth.js        ← JWT protect + requireRole
│       │   ├── logger.js      ← Request logging middleware
│       │   └── errorHandler.js
│       ├── models/            ← Model layer (via Prisma schema)
│       ├── routes/            ← Route definitions (View-to-Controller mapping)
│       │   ├── auth.js
│       │   ├── users.js
│       │   ├── companies.js
│       │   ├── packages.js
│       │   ├── events.js
│       │   └── destinations.js
│       └── config/
│           └── prisma.js      ← Prisma client singleton
│
├── frontend/
│   └── src/
│       ├── components/        ← Reusable UI components (Navbar, Footer, ProtectedRoute)
│       ├── context/           ← React Context (AuthContext)
│       ├── pages/             ← Public pages (Home, Packages, Events, Auth)
│       │   └── dashboard/     ← Role-specific dashboard pages
│       └── services/
│           └── api.js         ← Axios client + service functions
│
└── database/
    ├── schema.sql             ← Raw PostgreSQL DDL
    └── DATABASE.md            ← ER diagram + schema documentation
```

---

## Security Implementation

| Mechanism | Implementation |
|-----------|---------------|
| **Password Hashing** | All passwords are hashed with BCrypt (10 salt rounds) before storage. Plain-text passwords are never persisted. |
| **JWT Authentication** | On login/register, a signed JWT is issued (`7d` expiry) and returned to the client. Subsequent requests attach it in the `Authorization: Bearer <token>` header. |
| **Route Authorization** | The `protect` middleware validates the JWT on every protected route. The `requireRole(...roles)` middleware then checks the decoded user's role against the allowed list, returning `403 Forbidden` on mismatch. |
| **Security Headers** | `Helmet.js` sets best-practice HTTP security headers (CSP, HSTS, X-Frame-Options, etc.) on every response. |
| **CORS** | Restricted to `localhost:5173` (Vite dev) and `localhost:4173` (Vite preview). |
| **Logging** | All HTTP requests are logged with method, path, status, duration, and IP address — written to both console (colorised) and `backend/logs/access.log`. |

---

## Database Schema

The full database is documented in [`database/DATABASE.md`](./database/DATABASE.md), including:
- Mermaid ER diagram
- Table descriptions with column types and constraints
- Relationship summary

The raw PostgreSQL DDL script is at [`database/schema.sql`](./database/schema.sql).

The Prisma schema definition is at [`backend/prisma/schema.prisma`](./backend/prisma/schema.prisma).

---

## Setup & Installation

### Prerequisites
- Node.js v18+
- PostgreSQL 14+
- npm

### 1. Clone the repository
```bash
git clone <your-repo-url>
cd travelmate
```

### 2. Set up the backend environment

Create `backend/.env`:
```env
PORT=5000
DATABASE_URL="postgresql://<user>:<password>@localhost:5432/travelmate"
JWT_SECRET="your_secret_key_here"
NODE_ENV="development"
```

### 3. Install backend dependencies
```bash
cd backend
npm install
```

### 4. Run database migrations
```bash
npx prisma migrate deploy
```
> Or for development with migration history tracking:
```bash
npx prisma migrate dev --name init
```

### 5. Seed the database (creates default roles)
```bash
npm run seed
```

### 6. Install frontend dependencies
```bash
cd ../frontend
npm install
```

### 7. Set up frontend environment (optional)

Create `frontend/.env`:
```env
VITE_API_URL=http://localhost:5000/api
```

---

## Running the Application

### Start the backend (development mode with auto-restart)
```bash
cd backend
npm run dev
```
Backend runs at: `http://localhost:5000`

### Start the frontend (Vite dev server)
```bash
cd frontend
npm run dev
```
Frontend runs at: `http://localhost:5173`

---

## API Endpoints

### Auth
| Method | Path | Description |
|--------|------|-------------|
| POST | `/api/auth/register` | Register new user (traveller or event planner with company) |
| POST | `/api/auth/login` | Login and receive JWT token |

### Users
| Method | Path | Auth | Description |
|--------|------|------|-------------|
| GET | `/api/users/profile` | Any authenticated | Get own profile |
| PUT | `/api/users/profile` | Any authenticated | Update own profile |
| GET | `/api/users` | SUPER_ADMIN | List all users |
| PUT | `/api/users/:id/role` | SUPER_ADMIN | Change user role |

### Companies
| Method | Path | Auth | Description |
|--------|------|------|-------------|
| GET | `/api/companies/pending` | SUPER_ADMIN | List companies pending approval |
| GET | `/api/companies/my-company` | EVENT_PLANNER | Get own company profile |
| POST | `/api/companies` | EVENT_PLANNER | Register a new company |
| GET | `/api/companies/:id` | Public | Get company details |
| PUT | `/api/companies/:id/approve` | SUPER_ADMIN | Approve or reject company |

### Packages
| Method | Path | Auth | Description |
|--------|------|------|-------------|
| GET | `/api/packages` | Public | List all packages |
| GET | `/api/packages/:id` | Public | Get package details |
| POST | `/api/packages` | EVENT_PLANNER | Create package |
| PUT | `/api/packages/:id` | EVENT_PLANNER | Update package |
| DELETE | `/api/packages/:id` | EVENT_PLANNER | Delete package |

### Events
| Method | Path | Auth | Description |
|--------|------|------|-------------|
| GET | `/api/events` | Public | List all events |
| GET | `/api/events/:id` | Public | Get event details |
| POST | `/api/events` | EVENT_PLANNER | Create event |
| PUT | `/api/events/:id` | EVENT_PLANNER | Update event |
| DELETE | `/api/events/:id` | EVENT_PLANNER | Delete event |

---

## Extra Features Beyond Course Scope

| Feature | Description |
|---------|-------------|
| **Role-Based Access Control (RBAC)** | Three distinct roles (`SUPER_ADMIN`, `EVENT_PLANNER`, `TRAVELER`) each with protected, role-specific dashboard views and API routes. |
| **Prisma ORM v7** | Used Prisma with the PostgreSQL driver adapter for type-safe, schema-driven database access. |
| **Atomic Transactions** | Event planner registration uses a `prisma.$transaction()` to atomically create both the User and Company records — ensuring referential integrity even on partial failures. |
| **Custom Request Logger** | All HTTP requests are logged to both the console (colorized by status code) and a persistent `logs/access.log` file for audit and debugging purposes. |
| **Premium React Dashboard** | Multi-view, role-specific SaaS-quality dashboards built with React + Tailwind CSS and featuring animated sidebars, slide-out detail panels, and real-time status badges. |
| **Company Approval Workflow** | Pending → Approved/Rejected state machine for company registrations managed in a dedicated super admin control panel with a document verification side drawer. |
| **Security Headers via Helmet.js** | All HTTP responses include industry-standard security headers (CSP, HSTS, X-Content-Type-Options, X-Frame-Options). |
| **Soft Delete / User Active Flag** | Users have an `isActive` boolean flag allowing admin-side account deactivation without data loss. |
