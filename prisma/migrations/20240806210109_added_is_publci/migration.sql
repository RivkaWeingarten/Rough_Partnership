-- AlterTable
ALTER TABLE "Diamond" ADD COLUMN     "company" TEXT;

-- AlterTable
ALTER TABLE "Option" ADD COLUMN     "company" TEXT,
ADD COLUMN     "isPublic" BOOLEAN NOT NULL DEFAULT true;
