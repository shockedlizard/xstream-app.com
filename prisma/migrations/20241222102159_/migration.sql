/*
  Warnings:

  - You are about to alter the column `blockNumber` on the `wallethistory` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `BigInt`.

*/
-- AlterTable
ALTER TABLE `wallethistory` MODIFY `blockNumber` BIGINT NOT NULL;
