/*
  Warnings:

  - Added the required column `rank` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rankIcon` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `winRate` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "rank" TEXT NOT NULL,
ADD COLUMN     "rankIcon" TEXT NOT NULL,
ADD COLUMN     "winRate" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Invite" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "senderId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "accepted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Invite_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Invite" ADD CONSTRAINT "Invite_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Invite" ADD CONSTRAINT "Invite_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
