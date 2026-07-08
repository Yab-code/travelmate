# TravelMate Database Documentation

TravelMate uses PostgreSQL with Prisma migrations. The schema stores users, roles, planner companies, travel packages, and events.

## ER Diagram

```mermaid
erDiagram
  Role ||--o{ User : assigns
  Company ||--o{ User : has_members
  User ||--o| Company : owns
  Company ||--o{ TravelPackage : offers
  Company ||--o{ Event : organizes

  Role {
    int id PK
    RoleName name UK
  }

  User {
    int id PK
    string name
    string email UK
    string password
    int roleId FK
    boolean isActive
    int companyId FK
    datetime createdAt
    datetime updatedAt
  }

  Company {
    int id PK
    string companyName
    string businessEmail UK
    string phone
    string address
    string description
    CompanyStatus status
    int ownerId FK UK
  }

  TravelPackage {
    int id PK
    string title
    string location
    string type
    decimal price
    int duration
    int companyId FK
  }

  Event {
    int id PK
    string title
    string category
    decimal price
    datetime date
    string location
    int companyId FK
  }
```

## Tables

- `Role`: allowed roles are `SUPER_ADMIN`, `EVENT_PLANNER`, and `TRAVELER`.
- `User`: stores accounts with bcrypt-hashed passwords and a role reference.
- `Company`: stores event planner company profiles and approval status.
- `TravelPackage`: stores public travel package listings owned by a company.
- `Event`: stores public event listings owned by a company.

## Relationships

- One role can have many users.
- One company owner is one user.
- One company can have many members, packages, and events.
- Packages and events cannot exist without a company.

## DDL

The raw SQL DDL script is in `database/schema.sql`.

## Prisma

The Prisma schema is in `backend/prisma/schema.prisma`, with migrations in `backend/prisma/migrations/`.
