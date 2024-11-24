import { Router } from "express";
<<<<<<< HEAD
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
=======

import { AdmController } from "../controller/adm.js";
import { AdmValidator } from "../middleware/admValidator.js";
import { GlobalError } from "../middleware/GlobalError.js";
export const routerAdm = Router();
routerAdm.post("/login", AdmValidator.loginValidator(), AdmController.login);
routerAdm.post("/criar", AdmValidator.loginValidator(true), AdmController.createAdm);
routerAdm.use(GlobalError);
routerAdm.post("/all", admController.getAll);
>>>>>>> 6638f2e34ac65349d86dd1b6962d6860ef9c5ba9
