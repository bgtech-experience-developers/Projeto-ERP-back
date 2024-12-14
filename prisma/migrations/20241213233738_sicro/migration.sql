-- AlterTable
ALTER TABLE `client` MODIFY `fantasy_name` VARCHAR(100) NULL,
    MODIFY `branch_activity` VARCHAR(100) NULL,
    MODIFY `state_registration` VARCHAR(9) NULL,
    MODIFY `type_contribuition` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `sector` MODIFY `name` VARCHAR(100) NULL,
    MODIFY `email` VARCHAR(100) NULL,
    MODIFY `cell_phone` VARCHAR(100) NULL,
    MODIFY `rg` VARCHAR(191) NULL,
    MODIFY `cpf` VARCHAR(11) NULL;
