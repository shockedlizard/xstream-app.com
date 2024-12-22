-- AlterTable
ALTER TABLE `wallethistory` MODIFY `transactionHash` VARCHAR(191) NULL,
    MODIFY `blockNumber` BIGINT NULL,
    MODIFY `date` VARCHAR(191) NULL,
    MODIFY `gas` VARCHAR(191) NULL,
    MODIFY `status` VARCHAR(191) NULL,
    MODIFY `timestamp` VARCHAR(191) NULL;
