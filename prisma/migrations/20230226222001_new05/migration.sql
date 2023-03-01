/*
  Warnings:

  - You are about to drop the column `commentId` on the `Like` table. All the data in the column will be lost.
  - Made the column `postId` on table `Like` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Like" DROP COLUMN "commentId",
ALTER COLUMN "postId" SET NOT NULL;
