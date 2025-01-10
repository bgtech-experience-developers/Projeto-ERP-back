import { Router } from "express";
import { UploadFile } from "../utils/multer.js";
import { SupplierPjValidator } from "../middleware/SupplierPjValidator.js";
import { GlobalError } from "../middleware/GlobalError.js";
import { SupplierControllerPj } from "../controller/SupplierControllerPj.js";
import { authentication } from "../middleware/authTentication.js";
import { hasPermission } from "../middleware/permission.js";

export const supplierPjRouter = Router();
supplierPjRouter.get("/", SupplierControllerPj.viewSupplier);
supplierPjRouter.post(
  "/registro",
  authentication,
  hasPermission("criar"),
  UploadFile.Upload().single("photo"),
  SupplierPjValidator.setSupplierPj,
  SupplierControllerPj.setSupplier
);
supplierPjRouter.patch(
  "/atualizar/:id",
  authentication,
  hasPermission("atualizar"),
  UploadFile.Upload().single("photo"),
  SupplierPjValidator.setSupplierPj,
  SupplierPjValidator.getByIdSupplier,
  SupplierControllerPj.updateSupplier
);
supplierPjRouter.get("/filtrar");
supplierPjRouter.get(
  "/:id",
  SupplierPjValidator.getByIdSupplier,
  SupplierControllerPj.getByIdSupplier
);
supplierPjRouter.delete(
  "/remover/:id",
  authentication,
  hasPermission("deletar"),
  SupplierPjValidator.getByIdSupplier,
  SupplierControllerPj.removeByIdSupplier
);
supplierPjRouter.use(GlobalError);
