/*
  Warnings:

  - Added the required column `date` to the `WalletHistory` table without a default value. This is not possible if the table is not empty.
  - Added the required column `gas` to the `WalletHistory` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `WalletHistory` table without a default value. This is not possible if the table is not empty.
  - Added the required column `timestamp` to the `WalletHistory` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `WalletHistory` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `wallethistory` ADD COLUMN `date` VARCHAR(191) NOT NULL,
    ADD COLUMN `gas` VARCHAR(191) NOT NULL,
    ADD COLUMN `status` VARCHAR(191) NOT NULL,
    ADD COLUMN `timestamp` VARCHAR(191) NOT NULL,
    ADD COLUMN `type` VARCHAR(191) NOT NULL;
