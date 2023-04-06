/*
  Warnings:

  - The primary key for the `geojson` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `geojson` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `geojson` DROP PRIMARY KEY,
    DROP COLUMN `id`,
    ADD PRIMARY KEY (`iso_name`);
