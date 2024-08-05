/*
  Warnings:

  - You are about to drop the column `fullimage` on the `Exercise` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Exercise" DROP COLUMN "fullimage";

-- AlterTable
ALTER TABLE "MuscleGroup" ADD COLUMN     "fullimage" TEXT NOT NULL DEFAULT 'src';
