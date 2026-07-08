-- =============================================================
-- TravelMate - PostgreSQL DDL Schema
-- Database: travelmate
-- Generated: 2026-07-08
-- =============================================================

-- STEP 1: Create ENUMs
-- =============================================================

CREATE TYPE "RoleName" AS ENUM (
  'SUPER_ADMIN',
  'EVENT_PLANNER',
  'TRAVELER'
);

CREATE TYPE "CompanyStatus" AS ENUM (
  'PENDING',
  'APPROVED',
  'REJECTED'
);

-- =============================================================
-- STEP 2: Create Tables
-- =============================================================

-- Role table: defines user permission tiers
CREATE TABLE "Role" (
  "id"   SERIAL      NOT NULL,
  "name" "RoleName"  NOT NULL,

  CONSTRAINT "Role_pkey" PRIMARY KEY ("id")
);

-- Unique constraint on role name
CREATE UNIQUE INDEX "Role_name_key" ON "Role"("name");

-- User table: stores registered user accounts
CREATE TABLE "User" (
  "id"        SERIAL      NOT NULL,
  "name"      TEXT        NOT NULL,
  "email"     TEXT        NOT NULL,
  "password"  TEXT        NOT NULL,       -- BCrypt hashed, never plain-text
  "roleId"    INTEGER     NOT NULL,        -- FK → Role.id
  "isActive"  BOOLEAN     NOT NULL DEFAULT true,
  "companyId" INTEGER,                    -- FK → Company.id (NULL for travellers)
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,

  CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- Unique index on email (login identifier)
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- Company table: event planner company profiles
CREATE TABLE "Company" (
  "id"               SERIAL          NOT NULL,
  "companyName"      TEXT            NOT NULL,
  "businessEmail"    TEXT            NOT NULL,
  "phone"            TEXT            NOT NULL,
  "address"          TEXT            NOT NULL,
  "description"      TEXT            NOT NULL,
  "logo"             TEXT,                      -- URL or file path
  "licenseDocument"  TEXT,                      -- URL or file path
  "status"           "CompanyStatus" NOT NULL DEFAULT 'PENDING',
  "ownerId"          INTEGER         NOT NULL,   -- FK → User.id (one-to-one)
  "createdAt"        TIMESTAMP(3)    NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt"        TIMESTAMP(3)    NOT NULL,

  CONSTRAINT "Company_pkey" PRIMARY KEY ("id")
);

-- Unique constraints on company
CREATE UNIQUE INDEX "Company_businessEmail_key" ON "Company"("businessEmail");
CREATE UNIQUE INDEX "Company_ownerId_key"        ON "Company"("ownerId");

-- TravelPackage table: travel packages offered by companies
CREATE TABLE "TravelPackage" (
  "id"          SERIAL      NOT NULL,
  "companyId"   INTEGER     NOT NULL,   -- FK → Company.id

  CONSTRAINT "TravelPackage_pkey" PRIMARY KEY ("id")
);

-- Event table: events organised by companies
CREATE TABLE "Event" (
  "id"        SERIAL    NOT NULL,
  "companyId" INTEGER   NOT NULL,       -- FK → Company.id

  CONSTRAINT "Event_pkey" PRIMARY KEY ("id")
);

-- =============================================================
-- STEP 3: Foreign Key Constraints
-- =============================================================

-- User.roleId → Role.id
ALTER TABLE "User"
  ADD CONSTRAINT "User_roleId_fkey"
  FOREIGN KEY ("roleId") REFERENCES "Role"("id")
  ON DELETE RESTRICT ON UPDATE CASCADE;

-- User.companyId → Company.id (members / employees)
ALTER TABLE "User"
  ADD CONSTRAINT "User_companyId_fkey"
  FOREIGN KEY ("companyId") REFERENCES "Company"("id")
  ON DELETE SET NULL ON UPDATE CASCADE;

-- Company.ownerId → User.id (one-to-one owner relationship)
ALTER TABLE "Company"
  ADD CONSTRAINT "Company_ownerId_fkey"
  FOREIGN KEY ("ownerId") REFERENCES "User"("id")
  ON DELETE RESTRICT ON UPDATE CASCADE;

-- TravelPackage.companyId → Company.id
ALTER TABLE "TravelPackage"
  ADD CONSTRAINT "TravelPackage_companyId_fkey"
  FOREIGN KEY ("companyId") REFERENCES "Company"("id")
  ON DELETE RESTRICT ON UPDATE CASCADE;

-- Event.companyId → Company.id
ALTER TABLE "Event"
  ADD CONSTRAINT "Event_companyId_fkey"
  FOREIGN KEY ("companyId") REFERENCES "Company"("id")
  ON DELETE RESTRICT ON UPDATE CASCADE;

-- =============================================================
-- STEP 4: Seed default roles
-- =============================================================

INSERT INTO "Role" ("name") VALUES
  ('SUPER_ADMIN'),
  ('EVENT_PLANNER'),
  ('TRAVELER')
ON CONFLICT ("name") DO NOTHING;
