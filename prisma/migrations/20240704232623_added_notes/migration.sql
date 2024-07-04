/*
  Warnings:

  - Made the column `notes` on table `Option` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Option" ALTER COLUMN "notes" SET NOT NULL;
