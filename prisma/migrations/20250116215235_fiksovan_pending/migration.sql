-- AlterTable
ALTER TABLE "Invite" ALTER COLUMN "accepted" SET DEFAULT 'pending',
ALTER COLUMN "accepted" SET DATA TYPE TEXT;
