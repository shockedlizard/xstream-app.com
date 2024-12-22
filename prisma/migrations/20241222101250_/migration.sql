/*
  Warnings:

  - A unique constraint covering the columns `[address]` on the table `Wallet` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `wallet` ALTER COLUMN `bnbBalance` DROP DEFAULT,
    ALTER COLUMN `xtrBalance` DROP DEFAULT;

-- CreateIndex
CREATE UNIQUE INDEX `Wallet_address_key` ON `Wallet`(`address`);
