-- RedefineIndex
CREATE UNIQUE INDEX `adm_cnpj_key` ON `adm`(`cnpj`);
DROP INDEX `Adm_cnpj_key` ON `adm`;

-- RedefineIndex
CREATE UNIQUE INDEX `supplier_pf_cpf_key` ON `supplier_pf`(`cpf`);
DROP INDEX `Supplier_pf_cpf_key` ON `supplier_pf`;

-- RedefineIndex
CREATE UNIQUE INDEX `supplier_pj_cnpj_key` ON `supplier_pj`(`cnpj`);
DROP INDEX `Supplier_pj_cnpj_key` ON `supplier_pj`;
