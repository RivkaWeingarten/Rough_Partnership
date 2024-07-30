/*
  Warnings:

  - You are about to drop the `Rap` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Rap";

-- CreateTable
CREATE TABLE "RBRap" (
    "id" SERIAL NOT NULL,
    "shape_color_clarity_size" TEXT NOT NULL,
    "list" DOUBLE PRECISION NOT NULL,
    "listDate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RBRap_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PSRap" (
    "id" SERIAL NOT NULL,
    "shape_color_clarity_size" TEXT NOT NULL,
    "list" DOUBLE PRECISION NOT NULL,
    "listDate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PSRap_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "RBRap_shape_color_clarity_size_key" ON "RBRap"("shape_color_clarity_size");

-- CreateIndex
CREATE UNIQUE INDEX "PSRap_shape_color_clarity_size_key" ON "PSRap"("shape_color_clarity_size");
