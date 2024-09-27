/*
  Warnings:

  - The primary key for the `Aisle` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Aisle` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `aisleId` on the `Product` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_aisleId_fkey";

-- AlterTable
ALTER TABLE "Aisle" DROP CONSTRAINT "Aisle_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Aisle_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "aisleId",
ADD COLUMN     "aisleId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_aisleId_fkey" FOREIGN KEY ("aisleId") REFERENCES "Aisle"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
