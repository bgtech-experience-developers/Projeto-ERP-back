import { Router } from "express";
import { AdmController } from "../controller/adm.js";
import { AdmValidator } from "../middleware/admValidator.js";
import { GlobalError } from "../middleware/GlobalError.js";

export const routerAdm = Router();
routerAdm.post("/login", AdmValidator.loginValidator(), (request, response) => {
  response.json("voce veio para uma rota segura para bens"); // tomorrow
});
routerAdm.post(
  "/criar/adm",
  AdmValidator.loginValidator(true),
  AdmController.createAdm
);
routerAdm.use(GlobalError);
