import { Router } from "express";
import admController from "../controller/adm.js";
const routerAdm = Router();
routerAdm.post("/login/adm", () => { });
routerAdm.post("/all", admController.getAll);
export default routerAdm;
