-- CreateTable
CREATE TABLE "UserProgress" (
    "id" SERIAL NOT NULL,
    "enrolledDate" TIMESTAMP(3) NOT NULL,
    "ComlpetionDate" TIMESTAMP(3) NOT NULL,
    "userid" INTEGER NOT NULL,
    "progress1" BIGINT NOT NULL,
    "progress2" BIGINT NOT NULL,
    "progress3" BIGINT NOT NULL,

    CONSTRAINT "UserProgress_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserProgress_userid_enrolledDate_key" ON "UserProgress"("userid", "enrolledDate");

-- AddForeignKey
ALTER TABLE "UserProgress" ADD CONSTRAINT "UserProgress_userid_fkey" FOREIGN KEY ("userid") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
