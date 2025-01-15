/*
  Warnings:

  - A unique constraint covering the columns `[postId]` on the table `Invite` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Invite" ADD COLUMN     "postId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Invite_postId_key" ON "Invite"("postId");
