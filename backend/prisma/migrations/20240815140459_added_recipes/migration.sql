-- CreateTable
CREATE TABLE "Diet" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "img" TEXT NOT NULL,

    CONSTRAINT "Diet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Recipes" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "img" TEXT NOT NULL,

    CONSTRAINT "Recipes_pkey" PRIMARY KEY ("id")
);
