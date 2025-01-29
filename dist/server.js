import express from "express";
import dotnev from "dotenv";
import { clientRouter } from "./router/Client.js";
import cors from "cors";
import { routerAdm } from "./router/adm.js";
import cookieParse from "cookie-parser";
import supplierPf from "./router/SupplierPf.js";
import { supplierPjRouter } from "./router/supplierPj.js";
import Product from '../app/router/Product.js';
dotnev.config();
const app = express();
// const port = Number(process.env.PORT);
const host = "0.0.0.0";
const port = 3000;
app.use("/files", express.static("uploads")); // diretório acessível para requisições vindo do cliente, tendo acesso à arquivos hospedado internamente dentro dessa pasta!
app.use(cors({
    origin: ["https://erp-homologation.bgtech.com.br", "http://localhost:5173"],
    credentials: true,
}));
app.use('/products', Product);
app.use(cookieParse());
app.use(express.json()); // parte para a deserializaç~~ao das informações
app.use("/clientes", clientRouter);
app.use("/adm", routerAdm);
app.use("/fornecedor/fisico", supplierPf);
app.use("/fornecedor/juridico", supplierPjRouter);
app.listen(port, host, () => {
    console.log("meu servidor está rodando na porta " + port);
});
