/*
  Warnings:

  - A unique constraint covering the columns `[lotName]` on the table `Lot` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `lotNumber` to the `Rough` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Option" ADD COLUMN     "plusMinusRClarity" TEXT,
ADD COLUMN     "plusMinusRColor" TEXT;

-- AlterTable
ALTER TABLE "Rough" ADD COLUMN     "lotNumber" TEXT NOT NULL,
ADD COLUMN     "plusMinusRClarity" TEXT,
ADD COLUMN     "plusMinusRColor" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Lot_lotName_key" ON "Lot"("lotName");

-- AddForeignKey
ALTER TABLE "Rough" ADD CONSTRAINT "Rough_lotNumber_fkey" FOREIGN KEY ("lotNumber") REFERENCES "Lot"("lotName") ON DELETE RESTRICT ON UPDATE CASCADE;
