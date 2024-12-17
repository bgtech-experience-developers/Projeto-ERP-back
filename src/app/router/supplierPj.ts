import { Router } from "express";
import { UploadFile } from "../utils/multer.js";

import { SupplierPjValidator } from "../middleware/SupplierPjValidator.js";
import { GlobalError } from "../middleware/GlobalError.js";
import { SupplierControllerPj } from "../controller/SupplierControllerPj.js";
export const supplierPjRouter = Router();
supplierPjRouter.post(
  "/registro",
  UploadFile.Upload().single("photo"),
  SupplierPjValidator.setSupplierPj,
  SupplierControllerPj.setSupplier
);
supplierPjRouter.patch(
  "/atualizar",
  UploadFile.Upload().single("photo"),
  SupplierPjValidator.setSupplierPj
);
supplierPjRouter.get("/filtrar");
supplierPjRouter.get("/:id");
supplierPjRouter.get("/");
supplierPjRouter.use(GlobalError);
