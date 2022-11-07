-- CreateTable
CREATE TABLE `app_constants` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `rootAccess` VARCHAR(191) NOT NULL,
    `users` VARCHAR(191) NOT NULL,
    `lastPushNotification` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
