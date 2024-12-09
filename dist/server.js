import express from "express";
import dotnev from "dotenv";
import { clientRouter } from "./router/Client.js";
import cors from "cors";
import { routerAdm } from "./router/adm.js";
import cookieParse from 'cookie-parser';
dotnev.config();
const app = express();
const port = Number(process.env.PORT);
const host = "0.0.0.0";
app.use("/files", express.static("uploads")); // diretório acessível para requisições vindo do cliente, tendo acesso à arquivos hospedado internamente dentro dessa pasta!
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}));
app.use(cookieParse());
app.use(express.json()); // parte para a deserializaç~~ao das informações
app.use("/clientes", clientRouter);
app.use("/adm", routerAdm);
app.listen(port, host, () => {
    console.log("meu servidor está rodando na porta " + port);
});
