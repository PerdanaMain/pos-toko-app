-- AlterTable
ALTER TABLE `products` ADD COLUMN `image` VARCHAR(191) NULL,
    MODIFY `description` VARCHAR(191) NULL,
    MODIFY `price` DOUBLE NULL;
