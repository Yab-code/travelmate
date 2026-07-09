-- Add planner approval gating metadata, featured event requests, and booking records.

ALTER TABLE "TravelPackage" DROP COLUMN IF EXISTS "lodging";

ALTER TABLE "Event"
  ADD COLUMN IF NOT EXISTS "featuredRequested" BOOLEAN NOT NULL DEFAULT false;

DO $$ BEGIN
  CREATE TYPE "BookingType" AS ENUM ('TRAVEL_PACKAGE', 'EVENT');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE TYPE "BookingStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

CREATE TABLE IF NOT EXISTS "Booking" (
  "id" SERIAL NOT NULL,
  "type" "BookingType" NOT NULL,
  "quantity" INTEGER NOT NULL,
  "status" "BookingStatus" NOT NULL DEFAULT 'PENDING',
  "travelDate" TIMESTAMP(3),
  "travelerId" INTEGER,
  "travelPackageId" INTEGER,
  "eventId" INTEGER,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "Booking_pkey" PRIMARY KEY ("id")
);

DO $$ BEGIN
  ALTER TABLE "Booking" ADD CONSTRAINT "Booking_travelerId_fkey" FOREIGN KEY ("travelerId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  ALTER TABLE "Booking" ADD CONSTRAINT "Booking_travelPackageId_fkey" FOREIGN KEY ("travelPackageId") REFERENCES "TravelPackage"("id") ON DELETE SET NULL ON UPDATE CASCADE;
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  ALTER TABLE "Booking" ADD CONSTRAINT "Booking_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE SET NULL ON UPDATE CASCADE;
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;
