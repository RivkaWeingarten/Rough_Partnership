-- CreateTable
CREATE TABLE "Rap" (
    "id" SERIAL NOT NULL,
    "shape_color_clarity_size" TEXT NOT NULL,
    "list" DOUBLE PRECISION NOT NULL,
    "listDate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Rap_pkey" PRIMARY KEY ("id")
);
