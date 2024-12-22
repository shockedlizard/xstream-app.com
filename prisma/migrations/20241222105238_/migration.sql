/*
  Warnings:

  - Made the column `status` on table `wallethistory` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `wallethistory` MODIFY `status` ENUM('WAITING', 'PENDING', 'SUCCESS', 'FAILED') NOT NULL;
