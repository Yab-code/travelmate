-- Make lodging optional for TravelPackage.
ALTER TABLE "TravelPackage" ADD COLUMN IF NOT EXISTS "lodging" TEXT;
