/*
  Warnings:

  - Added the required column `notes` to the `Option` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Option" ADD COLUMN     "notes" TEXT  ;
