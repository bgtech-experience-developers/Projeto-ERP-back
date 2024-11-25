import { Router } from "express";
import { AdmController } from "../controller/adm.js";
import { AdmValidator } from "../middleware/admValidator.js";
import { GlobalError } from "../middleware/GlobalError.js";
import jwt from "jsonwebtoken";
export const routerAdm = Router();
routerAdm.post("/login", AdmValidator.loginValidator(), AdmController.login);
routerAdm.post("/criar", AdmValidator.loginValidator(true), AdmController.createAdm);
routerAdm.post("/refresh-token", async (request, response) => {
    const { token } = request.body;
    const secret = process.env.ADM_JWT_SECRET;
    const { payload } = jwt.verify(token, secret, { complete: true });
    // const { payload } = await JwtToken.RefreshToken(token, secret);
    response.status(200).json(payload);
});
routerAdm.use(GlobalError);
