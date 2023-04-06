-- CreateTable
CREATE TABLE `geojson` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `iso_name` VARCHAR(191) NOT NULL,
    `geojson` JSON NOT NULL,
    `created_at` TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `geojson_iso_name_key`(`iso_name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
