import { Router } from "express";
import { AdmController } from "../controller/adm.js";
import { AdmValidator } from "../middleware/admValidator.js";
import { GlobalError } from "../middleware/GlobalError.js";
import { JwtToken, payload } from "../utils/Jwt.js";
import jwt, { JsonWebTokenError } from "jsonwebtoken";
import { AllError } from "../error/AllError.js";

export const routerAdm = Router();
routerAdm.post("/login", AdmValidator.loginValidator(), AdmController.login);
routerAdm.post(
  "/criar",
  AdmValidator.loginValidator(true),
  AdmController.createAdm
);
routerAdm.get("/refresh-token", async (request, response, next) => {
  try {
    const { logout } = request.query;
    if (logout === "true") {
      response.clearCookie("refreshToken"); // utilizo isso para que haja uma limpeza do token armazenado lá
      response.status(200).json("usuário deslogado com sucesso");
      return;
    }
    const refreshToken = request.cookies.refreshToken as string;
    console.log("esse é ", refreshToken);
    console.log(refreshToken); // esse é o token que eu armazenei durante o login
    const secretKeyRefresh = process.env.REFRESH_TOKEN;
    if (!secretKeyRefresh || !refreshToken) {
      throw new AllError("não autorizado", 403);
    }

    jwt.verify(refreshToken, secretKeyRefresh, (err, decoded) => {
      if (err) {
        throw new AllError("token expirado", 403);
      }
    });
    const { payload } = jwt.verify(refreshToken, secretKeyRefresh, {
      complete: true,
    });
    const user = payload as payload;
    const newRereshToken = JwtToken.RefreshToken(user, user.role);
    console.log("esse é o novo refresh token ", newRereshToken);

    const acessToken = JwtToken.getCodeToken(user, user.role, {
      expiresIn: "15min",
    });
    response.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 7000,
      secure: false,
      sameSite: "none",
    });
    response.json({ acessToken });
  } catch (error) {
    next(error);
  }
});
routerAdm.post("/payload/:type", (req, res) => {
  const { token } = req.body;
  const { type } = req.params;

  const secreteKey =
    type === "adm" ? process.env.ADM_JWT_SECRET : process.env.REGULAR_JWT_SECRE;
  const { payload } = jwt.verify(token, secreteKey!, { complete: true });
  res.status(200).json(payload);
});
routerAdm.get("/all", AdmController.getAll);
routerAdm.get("/test", (request, response): any => {
  const data = request.query;
  console.log(data);

  console.log("Estou aqui");
  response.status(200).json(data);
});

routerAdm.use(GlobalError);
