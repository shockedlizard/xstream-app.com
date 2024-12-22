/*
  Warnings:

  - Added the required column `amountUSDT` to the `Swap` table without a default value. This is not possible if the table is not empty.
  - Added the required column `network` to the `Swap` table without a default value. This is not possible if the table is not empty.
  - Added the required column `walletHistoryId` to the `Swap` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `swap` ADD COLUMN `amountUSDT` VARCHAR(191) NOT NULL,
    ADD COLUMN `network` VARCHAR(191) NOT NULL,
    ADD COLUMN `walletHistoryId` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `Swap` ADD CONSTRAINT `Swap_walletHistoryId_fkey` FOREIGN KEY (`walletHistoryId`) REFERENCES `WalletHistory`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
