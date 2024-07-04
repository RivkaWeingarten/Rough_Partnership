/*
  Warnings:

  - Added the required column `ABC` to the `Option` table without a default value. This is not possible if the table is not empty.
  - Added the required column `resourceNumber` to the `Option` table without a default value. This is not possible if the table is not empty.
  - Added the required column `roughResourceNumber` to the `Option` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Option" ADD COLUMN     "ABC" TEXT NOT NULL,
ADD COLUMN     "resourceNumber" TEXT NOT NULL,
ADD COLUMN     "roughResourceNumber" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Option" ADD CONSTRAINT "Option_roughResourceNumber_fkey" FOREIGN KEY ("roughResourceNumber") REFERENCES "Rough"("resourceNumber") ON DELETE RESTRICT ON UPDATE CASCADE;
