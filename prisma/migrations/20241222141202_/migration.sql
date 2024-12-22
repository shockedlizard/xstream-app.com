-- CreateTable
CREATE TABLE `StakingPackage` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `stakingDays` INTEGER NOT NULL,
    `minAmount` VARCHAR(191) NOT NULL,
    `maxAmount` VARCHAR(191) NOT NULL,
    `dailyReward` VARCHAR(191) NOT NULL,
    `status` ENUM('ACTIVE', 'INACTIVE') NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Staking` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `packageId` VARCHAR(191) NOT NULL,
    `amount` VARCHAR(191) NOT NULL,
    `status` ENUM('WAITING', 'PENDING', 'RUNNING', 'CANCELLED') NOT NULL,
    `canceledDate` DATETIME(3) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Staking` ADD CONSTRAINT `Staking_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Staking` ADD CONSTRAINT `Staking_packageId_fkey` FOREIGN KEY (`packageId`) REFERENCES `StakingPackage`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
