-- CreateTable
CREATE TABLE `Swap` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `walletId` VARCHAR(191) NOT NULL,
    `from` VARCHAR(191) NOT NULL,
    `to` VARCHAR(191) NOT NULL,
    `amount` VARCHAR(191) NOT NULL,
    `status` ENUM('WAITING', 'PENDING', 'SUCCESS', 'FAILED', 'REJECTED') NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Swap` ADD CONSTRAINT `Swap_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Swap` ADD CONSTRAINT `Swap_walletId_fkey` FOREIGN KEY (`walletId`) REFERENCES `Wallet`(`address`) ON DELETE RESTRICT ON UPDATE CASCADE;
