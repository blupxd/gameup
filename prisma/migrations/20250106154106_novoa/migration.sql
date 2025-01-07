/*
  Warnings:

  - You are about to drop the column `gameName` on the `Post` table. All the data in the column will be lost.
  - Added the required column `game` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `language` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Post" DROP COLUMN "gameName",
ADD COLUMN     "game" TEXT NOT NULL,
ADD COLUMN     "language" TEXT NOT NULL;
