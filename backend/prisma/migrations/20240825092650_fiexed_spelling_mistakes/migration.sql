/*
  Warnings:

  - The values [UpperBack,Biceps,Triceps] on the enum `MuscleGroupEnum` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "MuscleGroupEnum_new" AS ENUM ('CHEST', 'UPPERBACK', 'SHOULDERS', 'BICEPS', 'TRICEPS', 'ABS');
ALTER TABLE "MuscleGroup" ALTER COLUMN "name" TYPE "MuscleGroupEnum_new" USING ("name"::text::"MuscleGroupEnum_new");
ALTER TYPE "MuscleGroupEnum" RENAME TO "MuscleGroupEnum_old";
ALTER TYPE "MuscleGroupEnum_new" RENAME TO "MuscleGroupEnum";
DROP TYPE "MuscleGroupEnum_old";
COMMIT;
