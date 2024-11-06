/*
  Warnings:

  - You are about to drop the column `fromLocation` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `returnDate` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `toLocation` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `travelDate` on the `Post` table. All the data in the column will be lost.
  - Made the column `destination` on table `Post` required. This step will fail if there are existing NULL values in that column.
  - Made the column `destination_arrival` on table `Post` required. This step will fail if there are existing NULL values in that column.
  - Made the column `origin` on table `Post` required. This step will fail if there are existing NULL values in that column.
  - Made the column `origin_arrival` on table `Post` required. This step will fail if there are existing NULL values in that column.
  - Made the column `origin_departure` on table `Post` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Post" DROP COLUMN "fromLocation",
DROP COLUMN "returnDate",
DROP COLUMN "toLocation",
DROP COLUMN "travelDate",
ALTER COLUMN "destination" SET NOT NULL,
ALTER COLUMN "destination_arrival" SET NOT NULL,
ALTER COLUMN "origin" SET NOT NULL,
ALTER COLUMN "origin_arrival" SET NOT NULL,
ALTER COLUMN "origin_departure" SET NOT NULL;
