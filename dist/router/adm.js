import { Router } from "express";
import admController from "../controller/adm.js";
const routerAdm = Router();
routerAdm.post("/login/adm", () => { });
routerAdm.get("/all", admController.getAll);
routerAdm.get("/test", (request, response) => {
    const data = request.query;
    console.log(data);
    console.log("Estou aqui");
    return response.status(200).json(data);
});
export default routerAdm;
