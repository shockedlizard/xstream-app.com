/*
  Warnings:

  - You are about to drop the column `amount` on the `wallethistory` table. All the data in the column will be lost.
  - You are about to drop the column `date` on the `wallethistory` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `wallethistory` table. All the data in the column will be lost.
  - You are about to drop the column `transactionDate` on the `wallethistory` table. All the data in the column will be lost.
  - You are about to drop the column `transactionStatus` on the `wallethistory` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `wallethistory` table. All the data in the column will be lost.
  - Added the required column `blockNumber` to the `WalletHistory` table without a default value. This is not possible if the table is not empty.
  - Added the required column `from` to the `WalletHistory` table without a default value. This is not possible if the table is not empty.
  - Added the required column `timestamp` to the `WalletHistory` table without a default value. This is not possible if the table is not empty.
  - Added the required column `to` to the `WalletHistory` table without a default value. This is not possible if the table is not empty.
  - Added the required column `value` to the `WalletHistory` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `wallethistory` DROP COLUMN `amount`,
    DROP COLUMN `date`,
    DROP COLUMN `status`,
    DROP COLUMN `transactionDate`,
    DROP COLUMN `transactionStatus`,
    DROP COLUMN `type`,
    ADD COLUMN `blockNumber` VARCHAR(191) NOT NULL,
    ADD COLUMN `from` VARCHAR(191) NOT NULL,
    ADD COLUMN `timestamp` VARCHAR(191) NOT NULL,
    ADD COLUMN `to` VARCHAR(191) NOT NULL,
    ADD COLUMN `value` VARCHAR(191) NOT NULL;
