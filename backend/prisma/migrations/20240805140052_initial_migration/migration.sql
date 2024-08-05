-- CreateEnum
CREATE TYPE "MuscleGroupEnum" AS ENUM ('CHEST', 'BACK', 'SHOULDERS', 'LEGS', 'ARMS', 'ABS');

-- CreateTable
CREATE TABLE "Exercise" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "img" TEXT NOT NULL,
    "instructions" TEXT NOT NULL,
    "muscle" INTEGER NOT NULL DEFAULT 0,
    "videolink" TEXT NOT NULL DEFAULT 'src',

    CONSTRAINT "Exercise_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MuscleGroup" (
    "id" SERIAL NOT NULL,
    "name" "MuscleGroupEnum" NOT NULL,
    "img" TEXT NOT NULL,

    CONSTRAINT "MuscleGroup_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "MuscleGroup_id_key" ON "MuscleGroup"("id");

-- AddForeignKey
ALTER TABLE "Exercise" ADD CONSTRAINT "Exercise_muscle_fkey" FOREIGN KEY ("muscle") REFERENCES "MuscleGroup"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
