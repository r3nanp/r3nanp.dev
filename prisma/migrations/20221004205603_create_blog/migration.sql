-- CreateTable
CREATE TABLE `blog` (
    `slug` VARCHAR(128) NOT NULL,
    `view` BIGINT NOT NULL DEFAULT 1,
    `count` INTEGER NOT NULL DEFAULT 0,

    PRIMARY KEY (`slug`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
