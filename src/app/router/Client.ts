import express, { Request, Response, urlencoded } from "express";

import { GlobalError } from "../middleware/GlobalError.js";
import { JoiValidation } from "../utils/joi.js";
import { UploadFile } from "../utils/multer.js";
import { ClientValidator } from "../middleware/ClientValidator.js";
import { Client } from "../controller/client.js";
import { authentication } from "../middleware/authTentication.js";
import { hasPermission } from "../middleware/permission.js";

export const clientRouter = express.Router();
const { CreateClientValidator } = new ClientValidator();
const { showClients, showClientById } = new Client();

clientRouter.post(
  "/registro",
  authentication,
  hasPermission("criar"),

  UploadFile.Upload().array("photos", 5),
  CreateClientValidator(),
  Client.CreateClient
);
clientRouter.get("/", authentication, hasPermission("ler"), showClients);
clientRouter.get("/", showClients);
clientRouter.get("/filtragem", Client.showClientsFilter);
clientRouter.get("/:id", showClientById);
clientRouter.get("/enderecos/:id", Client.getAllAddress);
clientRouter.patch(
  "/atualizar/:id",
  
  authentication,
  hasPermission("atualizar"),

  UploadFile.Upload().array("photos", 5),
  CreateClientValidator(),
  Client.updateClient
);

clientRouter.delete(
  "/remover/:id",
  authentication,
  hasPermission("deletar"),
  Client.deleteClient
);

clientRouter.use(GlobalError);
