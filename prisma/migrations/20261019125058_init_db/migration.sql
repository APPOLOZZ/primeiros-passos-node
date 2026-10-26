-- CreateTable
CREATE TABLE `jogos` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `titulo` VARCHAR(75) NOT NULL,
    `genero` VARCHAR(50) NOT NULL,
    `plataforma` VARCHAR(50) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
