/*
  Warnings:

  - You are about to drop the column `clarity` on the `RoughCrystal` table. All the data in the column will be lost.
  - You are about to drop the column `color` on the `RoughCrystal` table. All the data in the column will be lost.
  - Added the required column `machineClarity` to the `RoughCrystal` table without a default value. This is not possible if the table is not empty.
  - Added the required column `machineColor` to the `RoughCrystal` table without a default value. This is not possible if the table is not empty.
  - Added the required column `roughClarity` to the `RoughCrystal` table without a default value. This is not possible if the table is not empty.
  - Added the required column `roughColor` to the `RoughCrystal` table without a default value. This is not possible if the table is not empty.
  - Added the required column `roughDescription` to the `RoughCrystal` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "RoughCrystal" DROP COLUMN "clarity",
DROP COLUMN "color",
ADD COLUMN     "machineClarity" TEXT NOT NULL,
ADD COLUMN     "machineColor" TEXT NOT NULL,
ADD COLUMN     "roughClarity" TEXT NOT NULL,
ADD COLUMN     "roughColor" TEXT NOT NULL,
ADD COLUMN     "roughDescription" TEXT NOT NULL;
