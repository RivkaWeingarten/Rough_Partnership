/*
  Warnings:

  - Added the required column `actList` to the `Diamond` table without a default value. This is not possible if the table is not empty.
  - Added the required column `estPrice` to the `Diamond` table without a default value. This is not possible if the table is not empty.
  - Added the required column `resourceNumber` to the `Diamond` table without a default value. This is not possible if the table is not empty.
  - Added the required column `roughResourceNumber` to the `Diamond` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Diamond" ADD COLUMN     "actList" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "estPrice" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "resourceNumber" TEXT NOT NULL,
ADD COLUMN     "roughResourceNumber" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Diamond" ADD CONSTRAINT "Diamond_roughResourceNumber_fkey" FOREIGN KEY ("roughResourceNumber") REFERENCES "Rough"("resourceNumber") ON DELETE RESTRICT ON UPDATE CASCADE;
