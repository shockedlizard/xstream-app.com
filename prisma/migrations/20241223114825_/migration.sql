/*
  Warnings:

  - Made the column `sponsor` on table `user` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `user` MODIFY `sponsor` VARCHAR(191) NOT NULL;
