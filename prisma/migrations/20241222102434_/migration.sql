/*
  Warnings:

  - You are about to drop the column `timestamp` on the `wallethistory` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `wallethistory` DROP FOREIGN KEY `WalletHistory_walletId_fkey`;

-- DropIndex
DROP INDEX `WalletHistory_blockNumber_key` ON `wallethistory`;

-- DropIndex
DROP INDEX `WalletHistory_walletId_fkey` ON `wallethistory`;

-- AlterTable
ALTER TABLE `wallethistory` DROP COLUMN `timestamp`;

-- AddForeignKey
ALTER TABLE `WalletHistory` ADD CONSTRAINT `WalletHistory_walletId_fkey` FOREIGN KEY (`walletId`) REFERENCES `Wallet`(`address`) ON DELETE RESTRICT ON UPDATE CASCADE;
