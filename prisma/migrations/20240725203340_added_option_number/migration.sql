/*
  Warnings:

  - A unique constraint covering the columns `[resourceNumber]` on the table `Diamond` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Option" ADD COLUMN     "optionNumber" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "Diamond_resourceNumber_key" ON "Diamond"("resourceNumber");
