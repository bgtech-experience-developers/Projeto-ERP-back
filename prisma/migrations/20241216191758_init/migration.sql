-- DropIndex
DROP INDEX `Supplier_pf_email_key` ON `supplier_pf`;

-- AlterTable
ALTER TABLE `supplier_pf` MODIFY `birth_date` DATETIME(3) NULL;
