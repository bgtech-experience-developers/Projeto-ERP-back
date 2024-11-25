import { Router } from "express";
import { AdmController } from "../controller/adm.js";
import { AdmValidator } from "../middleware/admValidator.js";
import { GlobalError } from "../middleware/GlobalError.js";
import { JwtToken } from "../utils/Jwt.js";
import jwt from "jsonwebtoken";

export const routerAdm = Router();
routerAdm.post("/login", AdmValidator.loginValidator(), AdmController.login);
routerAdm.post(
  "/criar",
  AdmValidator.loginValidator(true),
  AdmController.createAdm
);
routerAdm.post("/refresh-token", async (request, response) => {
  const { token } = request.body;
  const secret = process.env.ADM_JWT_SECRET!;
  const { payload } = jwt.verify(token, secret, { complete: true });
routerAdm.get("/all", AdmController.getAll);
routerAdm.get("/test", (request, response):any => {
    const data =request.query
    console.log(data);
    
    console.log("Estou aqui");
    return response.status(200).json(data);
    
} ) 

routerAdm.use(GlobalError);



