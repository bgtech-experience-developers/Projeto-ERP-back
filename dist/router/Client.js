import express from "express";
import { GlobalError } from "../middleware/GlobalError.js";
import { UploadFile } from "../utils/multer.js";
import { ClientValidator } from "../middleware/ClientValidator.js";
import { Client } from "../controller/client.js";
export const clientRouter = express.Router();
const { CreateClientValidator } = new ClientValidator();
const { showClients, showClientById } = new Client();
clientRouter.post("/registro", UploadFile.Upload().array("photos", 5), CreateClientValidator(), Client.CreateClient);
<<<<<<< HEAD
clientRouter.put("/atualizar", UploadFile.Upload().array("photos", 5), CreateClientValidator(), Client.updateClient);
=======
>>>>>>> 470d696e41de1ac25ea70adf4d126560e327371e
clientRouter.get("/", showClients);
clientRouter.get("/:id", showClientById);
clientRouter.get("/enderecos/:id", Client.getAllAddress);
clientRouter.patch("/atualizar-cliente/:id", UploadFile.Upload().array("photos", 5), CreateClientValidator(), Client.updateClient);
clientRouter.delete("/remove/:id", Client.deleteClient);
clientRouter.use(GlobalError);
