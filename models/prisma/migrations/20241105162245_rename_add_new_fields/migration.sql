-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "destination" TEXT,
ADD COLUMN     "destination_arrival" TIMESTAMP(3),
ADD COLUMN     "destination_departure" TIMESTAMP(3),
ADD COLUMN     "origin" TEXT,
ADD COLUMN     "origin_arrival" TIMESTAMP(3),
ADD COLUMN     "origin_departure" TIMESTAMP(3),
ADD COLUMN     "restrictions" TEXT,
ALTER COLUMN "fromLocation" DROP NOT NULL,
ALTER COLUMN "toLocation" DROP NOT NULL,
ALTER COLUMN "travelDate" DROP NOT NULL,
ALTER COLUMN "returnDate" DROP NOT NULL;
