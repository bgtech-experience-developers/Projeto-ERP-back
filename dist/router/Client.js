import express from "express";
import { GlobalError } from "../middleware/GlobalError.js";
import { UploadFile } from "../utils/multer.js";
import { ClientValidator } from "../middleware/ClientValidator.js";
import { Client } from "../controller/client.js";
export const clientRouter = express.Router();
const { CreateClientValidator } = new ClientValidator();
const { showClients, showClientById } = new Client();
clientRouter.post("/criarCliente", UploadFile.Upload().array("photos", 5), CreateClientValidator(), Client.CreateClient);
clientRouter.get("/", showClients);
clientRouter.get("/:id", showClientById);
clientRouter.get("/enderecos/:id", Client.getAllAddress);
clientRouter.use(GlobalError);
