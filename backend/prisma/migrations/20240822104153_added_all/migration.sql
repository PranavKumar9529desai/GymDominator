-- CreateTable
CREATE TABLE "UserHealthprofile" (
    "id" SERIAL NOT NULL,
    "userid" INTEGER NOT NULL,
    "fullname" TEXT NOT NULL,
    "contact" INTEGER NOT NULL DEFAULT 2112,
    "weight" INTEGER NOT NULL,
    "height" INTEGER NOT NULL,
    "diet" TEXT NOT NULL,
    "address" TEXT NOT NULL,

    CONSTRAINT "UserHealthprofile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Workplacepreference" (
    "id" SERIAL NOT NULL,
    "userid" INTEGER NOT NULL DEFAULT 2,
    "workoutplace" TEXT NOT NULL,
    "gymname" TEXT,

    CONSTRAINT "Workplacepreference_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserHealthprofile_userid_key" ON "UserHealthprofile"("userid");

-- CreateIndex
CREATE UNIQUE INDEX "Workplacepreference_userid_key" ON "Workplacepreference"("userid");

-- AddForeignKey
ALTER TABLE "UserHealthprofile" ADD CONSTRAINT "UserHealthprofile_userid_fkey" FOREIGN KEY ("userid") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Workplacepreference" ADD CONSTRAINT "Workplacepreference_userid_fkey" FOREIGN KEY ("userid") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
