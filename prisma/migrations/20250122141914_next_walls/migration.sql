/*
  Warnings:

  - You are about to drop the `colorpalette` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `colorpalette` DROP FOREIGN KEY `ColorPalette_wallpaperId_fkey`;

-- DropTable
DROP TABLE `colorpalette`;

-- CreateTable
CREATE TABLE `color_palettes` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `color` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `color_palettes_color_key`(`color`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `wallpaper_color_palettes` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `wallpaperId` INTEGER NOT NULL,
    `colorPaletteId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `wallpaper_color_palettes_wallpaperId_colorPaletteId_key`(`wallpaperId`, `colorPaletteId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `wallpaper_color_palettes` ADD CONSTRAINT `wallpaper_color_palettes_wallpaperId_fkey` FOREIGN KEY (`wallpaperId`) REFERENCES `wallpapers`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `wallpaper_color_palettes` ADD CONSTRAINT `wallpaper_color_palettes_colorPaletteId_fkey` FOREIGN KEY (`colorPaletteId`) REFERENCES `color_palettes`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
