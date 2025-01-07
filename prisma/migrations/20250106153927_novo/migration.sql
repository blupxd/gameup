/*
  Warnings:

  - Added the required column `gameMode` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "gameMode" TEXT NOT NULL,
ADD COLUMN     "microphone" BOOLEAN NOT NULL DEFAULT false;
