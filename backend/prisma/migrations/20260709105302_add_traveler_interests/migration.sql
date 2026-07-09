-- AlterTable
ALTER TABLE "Booking" ALTER COLUMN "updatedAt" DROP DEFAULT;

-- AlterTable
ALTER TABLE "Event" ALTER COLUMN "title" DROP DEFAULT,
ALTER COLUMN "description" DROP DEFAULT,
ALTER COLUMN "category" DROP DEFAULT,
ALTER COLUMN "price" DROP DEFAULT,
ALTER COLUMN "date" DROP DEFAULT,
ALTER COLUMN "location" DROP DEFAULT,
ALTER COLUMN "updatedAt" DROP DEFAULT;

-- AlterTable
ALTER TABLE "TravelPackage" ADD COLUMN     "lodging" TEXT,
ALTER COLUMN "title" DROP DEFAULT,
ALTER COLUMN "description" DROP DEFAULT,
ALTER COLUMN "location" DROP DEFAULT,
ALTER COLUMN "type" DROP DEFAULT,
ALTER COLUMN "price" DROP DEFAULT,
ALTER COLUMN "duration" DROP DEFAULT,
ALTER COLUMN "updatedAt" DROP DEFAULT;

-- CreateTable
CREATE TABLE "TravelerInterest" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "travelPackageId" INTEGER,
    "eventId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TravelerInterest_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "TravelerInterest_userId_travelPackageId_key" ON "TravelerInterest"("userId", "travelPackageId");

-- CreateIndex
CREATE UNIQUE INDEX "TravelerInterest_userId_eventId_key" ON "TravelerInterest"("userId", "eventId");

-- AddForeignKey
ALTER TABLE "TravelerInterest" ADD CONSTRAINT "TravelerInterest_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TravelerInterest" ADD CONSTRAINT "TravelerInterest_travelPackageId_fkey" FOREIGN KEY ("travelPackageId") REFERENCES "TravelPackage"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TravelerInterest" ADD CONSTRAINT "TravelerInterest_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE SET NULL ON UPDATE CASCADE;
