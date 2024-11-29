/*
  Warnings:

  - A unique constraint covering the columns `[contact]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Made the column `contact` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "User" ALTER COLUMN "contact" SET NOT NULL,
ALTER COLUMN "contact" DROP DEFAULT;

-- CreateIndex
CREATE UNIQUE INDEX "User_contact_key" ON "User"("contact");
