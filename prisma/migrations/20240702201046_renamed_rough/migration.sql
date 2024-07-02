/*
  Warnings:

  - You are about to drop the column `roughCrystalId` on the `Option` table. All the data in the column will be lost.
  - You are about to drop the `Roughcrystal` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Option" DROP CONSTRAINT "Option_roughCrystalId_fkey";

-- DropForeignKey
ALTER TABLE "Roughcrystal" DROP CONSTRAINT "Roughcrystal_lotId_fkey";

-- AlterTable
ALTER TABLE "Option" DROP COLUMN "roughCrystalId";

-- DropTable
DROP TABLE "Roughcrystal";

-- CreateTable
CREATE TABLE "Rough" (
    "id" SERIAL NOT NULL,
    "resourceNumber" TEXT NOT NULL,
    "roughWeight" DOUBLE PRECISION NOT NULL,
    "roughColor" TEXT NOT NULL,
    "roughClarity" TEXT NOT NULL,
    "machineColor" TEXT NOT NULL,
    "machineClarity" TEXT NOT NULL,
    "roughDescription" TEXT NOT NULL,
    "fluor" TEXT NOT NULL,
    "stones" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Rough_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Rough_resourceNumber_key" ON "Rough"("resourceNumber");
