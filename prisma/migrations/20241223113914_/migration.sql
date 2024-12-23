-- DropForeignKey
ALTER TABLE `account` DROP FOREIGN KEY `Account_userId_fkey`;

-- DropForeignKey
ALTER TABLE `session` DROP FOREIGN KEY `Session_userId_fkey`;

-- DropForeignKey
ALTER TABLE `staking` DROP FOREIGN KEY `Staking_packageId_fkey`;

-- DropForeignKey
ALTER TABLE `staking` DROP FOREIGN KEY `Staking_userId_fkey`;

-- DropForeignKey
ALTER TABLE `supportticket` DROP FOREIGN KEY `SupportTicket_userId_fkey`;

-- DropForeignKey
ALTER TABLE `swap` DROP FOREIGN KEY `Swap_userId_fkey`;

-- DropForeignKey
ALTER TABLE `swap` DROP FOREIGN KEY `Swap_walletHistoryId_fkey`;

-- DropForeignKey
ALTER TABLE `swap` DROP FOREIGN KEY `Swap_walletId_fkey`;

-- DropForeignKey
ALTER TABLE `ticketreply` DROP FOREIGN KEY `TicketReply_ticketId_fkey`;

-- DropForeignKey
ALTER TABLE `ticketreply` DROP FOREIGN KEY `TicketReply_userId_fkey`;

-- DropForeignKey
ALTER TABLE `wallet` DROP FOREIGN KEY `Wallet_userId_fkey`;

-- DropForeignKey
ALTER TABLE `wallethistory` DROP FOREIGN KEY `WalletHistory_walletId_fkey`;

-- CreateTable
CREATE TABLE `usergenerasi` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `sponsorId` VARCHAR(191) NOT NULL,
    `generasi` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `account` ADD CONSTRAINT `account_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `session` ADD CONSTRAINT `session_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `wallet` ADD CONSTRAINT `wallet_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `wallethistory` ADD CONSTRAINT `wallethistory_walletId_fkey` FOREIGN KEY (`walletId`) REFERENCES `wallet`(`address`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `swap` ADD CONSTRAINT `swap_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `swap` ADD CONSTRAINT `swap_walletHistoryId_fkey` FOREIGN KEY (`walletHistoryId`) REFERENCES `wallethistory`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `swap` ADD CONSTRAINT `swap_walletId_fkey` FOREIGN KEY (`walletId`) REFERENCES `wallet`(`address`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `supportticket` ADD CONSTRAINT `supportticket_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ticketreply` ADD CONSTRAINT `ticketreply_ticketId_fkey` FOREIGN KEY (`ticketId`) REFERENCES `supportticket`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ticketreply` ADD CONSTRAINT `ticketreply_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `staking` ADD CONSTRAINT `staking_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `staking` ADD CONSTRAINT `staking_packageId_fkey` FOREIGN KEY (`packageId`) REFERENCES `stakingpackage`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `usergenerasi` ADD CONSTRAINT `usergenerasi_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `usergenerasi` ADD CONSTRAINT `usergenerasi_sponsorId_fkey` FOREIGN KEY (`sponsorId`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- RenameIndex
ALTER TABLE `account` RENAME INDEX `Account_provider_providerAccountId_key` TO `account_provider_providerAccountId_key`;

-- RenameIndex
ALTER TABLE `session` RENAME INDEX `Session_sessionToken_key` TO `session_sessionToken_key`;

-- RenameIndex
ALTER TABLE `user` RENAME INDEX `User_email_key` TO `user_email_key`;

-- RenameIndex
ALTER TABLE `verificationtoken` RENAME INDEX `VerificationToken_identifier_token_key` TO `verificationtoken_identifier_token_key`;

-- RenameIndex
ALTER TABLE `verificationtoken` RENAME INDEX `VerificationToken_token_key` TO `verificationtoken_token_key`;

-- RenameIndex
ALTER TABLE `wallet` RENAME INDEX `Wallet_address_key` TO `wallet_address_key`;

-- RenameIndex
ALTER TABLE `wallet` RENAME INDEX `Wallet_userId_key` TO `wallet_userId_key`;
