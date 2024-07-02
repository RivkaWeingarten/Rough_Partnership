/*
  Warnings:

  - Added the required column `userId` to the `Rough` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Rough" ADD COLUMN     "userId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Rough" ADD CONSTRAINT "Rough_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("clerkUserId") ON DELETE CASCADE ON UPDATE CASCADE;
