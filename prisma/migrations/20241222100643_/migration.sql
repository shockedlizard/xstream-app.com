/*
  Warnings:

  - A unique constraint covering the columns `[blockNumber]` on the table `WalletHistory` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `wallet` ADD COLUMN `bnbBalance` VARCHAR(191) NOT NULL DEFAULT '0',
    ADD COLUMN `xtrBalance` VARCHAR(191) NOT NULL DEFAULT '0';

-- CreateIndex
CREATE UNIQUE INDEX `WalletHistory_blockNumber_key` ON `WalletHistory`(`blockNumber`);
