# TravelMate — Database Documentation

## Overview

TravelMate uses **PostgreSQL** as the relational database engine, managed through **Prisma ORM** (v7).  
The schema models three user roles, company profiles under a one-to-one ownership pattern, and placeholder tables for travel packages and events.

---

## ER Diagram

```mermaid
erDiagram
    Role {
        int    id        PK
        string name      UK "SUPER_ADMIN | EVENT_PLANNER | TRAVELER"
    }

    User {
        int       id         PK
        string    name
        string    email      UK
        string    password          "BCrypt hashed"
        int       roleId     FK
        boolean   isActive          "default: true"
        int       companyId  FK     "nullable"
        timestamp createdAt
        timestamp updatedAt
    }

    Company {
        int       id              PK
        string    companyName
        string    businessEmail   UK
        string    phone
        string    address
        string    description
        string    logo                    "nullable"
        string    licenseDocument         "nullable"
        string    status                  "PENDING | APPROVED | REJECTED"
        int       ownerId         FK  UK  "one-to-one with User"
        timestamp createdAt
        timestamp updatedAt
    }

    TravelPackage {
        int id        PK
        int companyId FK
    }

    Event {
        int id        PK
        int companyId FK
    }

    Role        ||--o{ User          : "has many"
    User        ||--o| Company       : "owns (1-to-1)"
    User        }o--o| Company       : "member of"
    Company     ||--o{ TravelPackage : "offers"
    Company     ||--o{ Event         : "organises"
```

---

## Table Descriptions

### `Role`
Defines the system roles available:

| Column | Type | Description |
|--------|------|-------------|
| `id`   | SERIAL (PK) | Auto-incremented primary key |
| `name` | ENUM (`RoleName`) | One of: `SUPER_ADMIN`, `EVENT_PLANNER`, `TRAVELER` |

### `User`
Stores all registered user accounts across all roles.

| Column | Type | Description |
|--------|------|-------------|
| `id` | SERIAL (PK) | Auto-incremented primary key |
| `name` | TEXT | Full display name |
| `email` | TEXT (UNIQUE) | Login identifier |
| `password` | TEXT | BCrypt-hashed password (never stored plain-text) |
| `roleId` | INTEGER (FK → Role) | References the user's role |
| `isActive` | BOOLEAN | Soft-delete/ban flag, defaults to `true` |
| `companyId` | INTEGER? (FK → Company) | Optional — set when user joins or is assigned a company |
| `createdAt` | TIMESTAMP | Auto-set on insert |
| `updatedAt` | TIMESTAMP | Auto-updated on modification |

### `Company`
Represents event planner company profiles. Each company is **owned** by exactly one `EVENT_PLANNER` user.

| Column | Type | Description |
|--------|------|-------------|
| `id` | SERIAL (PK) | Auto-incremented primary key |
| `companyName` | TEXT | Official company name |
| `businessEmail` | TEXT (UNIQUE) | Primary contact email |
| `phone` | TEXT | Phone number |
| `address` | TEXT | Physical address |
| `description` | TEXT | Company summary |
| `logo` | TEXT? | Optional URL/path to logo |
| `licenseDocument` | TEXT? | Optional URL/path to license |
| `status` | ENUM (`CompanyStatus`) | `PENDING` → `APPROVED` or `REJECTED` by Super Admin |
| `ownerId` | INTEGER (FK → User, UNIQUE) | One-to-one with the owning planner user |
| `createdAt` | TIMESTAMP | Auto-set on insert |
| `updatedAt` | TIMESTAMP | Auto-updated on modification |

### `TravelPackage`
Placeholder table — associates travel packages with their issuing company.

| Column | Type | Description |
|--------|------|-------------|
| `id` | SERIAL (PK) | Auto-incremented primary key |
| `companyId` | INTEGER (FK → Company) | The company offering this package |

### `Event`
Placeholder table — associates events with their organising company.

| Column | Type | Description |
|--------|------|-------------|
| `id` | SERIAL (PK) | Auto-incremented primary key |
| `companyId` | INTEGER (FK → Company) | The company running this event |

---

## Relationships Summary

| Relationship | Type | Description |
|-------------|------|-------------|
| Role → User | 1-to-many | A role can be assigned to many users |
| User → Company (owner) | 1-to-1 | One planner owns exactly one company |
| User → Company (member) | many-to-1 | Many users can be members of a company |
| Company → TravelPackage | 1-to-many | A company offers many packages |
| Company → Event | 1-to-many | A company organises many events |

---

## ENUMs

### `RoleName`
```sql
CREATE TYPE "RoleName" AS ENUM ('SUPER_ADMIN', 'EVENT_PLANNER', 'TRAVELER');
```

### `CompanyStatus`
```sql
CREATE TYPE "CompanyStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED');
```

---

## DDL Script Location

The full raw SQL DDL script is at:  
[`database/schema.sql`](./schema.sql)

---

## Prisma Schema Location

The authoritative Prisma schema is at:  
[`backend/prisma/schema.prisma`](../backend/prisma/schema.prisma)

Migration history is maintained in:  
[`backend/prisma/migrations/`](../backend/prisma/migrations/)
