-- CreateEnum
CREATE TYPE "userRole" AS ENUM ('USER', 'ADMIN');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "role" "userRole" DEFAULT 'USER';
