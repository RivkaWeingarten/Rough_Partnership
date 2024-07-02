/*
  Warnings:

  - Added the required column `userId` to the `RoughCrystal` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "RoughCrystal" ADD COLUMN     "userId" TEXT NOT NULL;

-- CreateIndex
CREATE INDEX "RoughCrystal_userId_idx" ON "RoughCrystal"("userId");
