-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "clerkUserId" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "imageUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Lot" (
    "id" SERIAL NOT NULL,
    "lotName" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "totalStones" INTEGER NOT NULL,
    "totalCts" DOUBLE PRECISION NOT NULL,
    "source" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "origin" TEXT NOT NULL,
    "notes" TEXT,

    CONSTRAINT "Lot_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RoughCrystal" (
    "id" SERIAL NOT NULL,
    "resourceNumber" TEXT NOT NULL,
    "roughWeight" DOUBLE PRECISION NOT NULL,
    "color" TEXT NOT NULL,
    "clarity" TEXT NOT NULL,
    "fluor" TEXT NOT NULL,
    "stones" TEXT NOT NULL,
    "lotId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RoughCrystal_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Option" (
    "id" SERIAL NOT NULL,
    "roughCrystalId" INTEGER NOT NULL,
    "estProgram" TEXT NOT NULL,
    "estShape" TEXT NOT NULL,
    "estColor" TEXT NOT NULL,
    "estClarity" TEXT NOT NULL,
    "estFluor" TEXT NOT NULL,
    "estPrice" DOUBLE PRECISION NOT NULL,
    "estList" DOUBLE PRECISION NOT NULL,
    "estDiscount" DOUBLE PRECISION NOT NULL,
    "selected" BOOLEAN NOT NULL,

    CONSTRAINT "Option_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Diamond" (
    "id" SERIAL NOT NULL,
    "optionId" INTEGER NOT NULL,
    "estimatedWeight" DOUBLE PRECISION NOT NULL,
    "estimatedColor" TEXT NOT NULL,
    "estimatedClarity" TEXT NOT NULL,
    "estimatedProgram" TEXT NOT NULL,
    "estDiscount" DOUBLE PRECISION NOT NULL,
    "location" TEXT NOT NULL,
    "isPolished" BOOLEAN NOT NULL,
    "inventory" TEXT NOT NULL,
    "giaNumber" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Diamond_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_clerkUserId_key" ON "User"("clerkUserId");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "RoughCrystal_resourceNumber_key" ON "RoughCrystal"("resourceNumber");

-- AddForeignKey
ALTER TABLE "RoughCrystal" ADD CONSTRAINT "RoughCrystal_lotId_fkey" FOREIGN KEY ("lotId") REFERENCES "Lot"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Option" ADD CONSTRAINT "Option_roughCrystalId_fkey" FOREIGN KEY ("roughCrystalId") REFERENCES "RoughCrystal"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Diamond" ADD CONSTRAINT "Diamond_optionId_fkey" FOREIGN KEY ("optionId") REFERENCES "Option"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
