import express, { Request, Response, urlencoded } from "express";

import { GlobalError } from "../middleware/GlobalError.js";
import { JoiValidation } from "../utils/joi.js";
import { UploadFile } from "../utils/multer.js";
import { ClientValidator } from "../middleware/ClientValidator.js";
import { Client } from "../controller/client.js";

export const clientRouter = express.Router();
const { CreateClientValidator } = new ClientValidator();
clientRouter.post(
  "/criarCliente",
  UploadFile.Upload().array("photos", 4),
  CreateClientValidator(),
  Client.CreateClient
);
clientRouter.get("/enderecos/:id", Client.getAllAddress);
clientRouter.use(GlobalError);
