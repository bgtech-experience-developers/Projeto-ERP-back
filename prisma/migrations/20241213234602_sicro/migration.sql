-- AlterTable
ALTER TABLE `address` MODIFY `cep` VARCHAR(8) NULL,
    MODIFY `street` VARCHAR(100) NULL,
    MODIFY `number` VARCHAR(100) NULL,
    MODIFY `complement` VARCHAR(100) NULL,
    MODIFY `city` VARCHAR(100) NULL,
    MODIFY `neighborhood` VARCHAR(100) NULL;
