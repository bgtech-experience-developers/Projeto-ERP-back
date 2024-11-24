import { Router } from "express";
import { AdmController } from "../controller/adm.js";
import { AdmValidator } from "../middleware/admValidator.js";
import { GlobalError } from "../middleware/GlobalError.js";

export const routerAdm = Router();
routerAdm.post("/login", AdmValidator.loginValidator(), AdmController.login);
routerAdm.post(
  "/criar",
  AdmValidator.loginValidator(true),
  AdmController.createAdm
);

routerAdm.get("/all", AdmController.getAll);
routerAdm.post("/all",  AdmController.getAll)
routerAdm.delete("/delete", AdmController.delete)

routerAdm.get("/test", (request, response):any => {
    const data =request.query
    console.log(data);
    
    console.log("Estou aqui");
    return response.status(200).json(data);
    
} ) 
routerAdm.use(GlobalError);





