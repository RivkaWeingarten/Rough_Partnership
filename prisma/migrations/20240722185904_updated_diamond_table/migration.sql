/*
  Warnings:

  - You are about to drop the column `actList` on the `Diamond` table. All the data in the column will be lost.
  - You are about to drop the column `estPrice` on the `Diamond` table. All the data in the column will be lost.
  - Added the required column `actTotalList` to the `Diamond` table without a default value. This is not possible if the table is not empty.
  - Added the required column `estTotalPrice` to the `Diamond` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Diamond" DROP COLUMN "actList",
DROP COLUMN "estPrice",
ADD COLUMN     "actTotalList" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "estTotalPrice" DOUBLE PRECISION NOT NULL;
