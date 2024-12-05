import express from "express";
import dotnev from "dotenv";
import { clientRouter } from "./router/Client.js";
import cors from "cors";
import { routerAdm } from "./router/adm.js";
dotnev.config();
const app = express();
const port = Number(process.env.PORT);
const host = "0.0.0.0";
app.use("/files", express.static("uploads")); // diretório acessível para requisições vindo do cliente, tendo acesso à arquivos hospedado internamente dentro dessa pasta!
app.use(cors());
app.use(express.json()); // parte para a deserializaç~~ao das informações
app.use("/cliente", clientRouter);
app.use("/adm", routerAdm);
app.listen(port, host, () => {
    console.log("meu servidor está rodando na porta " + port);
});
