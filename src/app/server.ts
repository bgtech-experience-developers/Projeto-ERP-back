import express from "express";
import dotnev from "dotenv";
import { clientRouter } from "./router/Client.js";
import cors from "cors";
import { routerAdm } from "./router/adm.js";

import { number } from "joi";
import cookieParse from "cookie-parser";
import Supplier_pf from "./router/SupplierPf.js";
import supplierPf from "./router/SupplierPf.js";
import { supplierPjRouter } from "./router/supplierPj.js";
import https from "https";
import fs, { opendir } from "fs";
https.createServer();

dotnev.config();
const app = express();
const port = Number(process.env.PORT);
const host = "0.0.0.0";

app.use("/files", express.static("uploads")); // diretório acessível para requisições vindo do cliente, tendo acesso à arquivos hospedado internamente dentro dessa pasta!
app.use(
  cors({
    origin: ["https://erp-homologation.bgtech.com.br", "http://localhost:5173"],
    credentials: true,
  })
);
const options = {
  key: fs.readFileSync(
    "/etc/letsencrypt/live/erp-homologation.bgtech.com.br/privkey.pem"
  ),
  cert: fs.readFileSync(
    "/etc/letsencrypt/live/erp-homologation.bgtech.com.br/fullchain.pem"
  ),
};
app.use(cookieParse());
app.use(express.json()); // parte para a deserializaç~~ao das informações
app.use("/clientes", clientRouter);
app.use("/adm", routerAdm);
app.use("/fornecedor/fisico", supplierPf);
app.use("/fornecedor/juridico", supplierPjRouter);
https.createServer(options, app).listen(433, host, () => {
  "meu server está rodando em http";
});

// app.listen(port, host, () => {
//   console.log("meu servidor está rodando na porta " + port);
// });
